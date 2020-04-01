import React, { Component } from 'react';
import { Rect, Group, Stage, Layer } from 'react-konva';
import { Particle } from './Particle';
import { Button, Empty } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons'


/**
 *
 *
 * @class Simulation
 * @extends {Component}
 */
class Simulation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'green',
      particles: [
        {}
      ],
      offset: 10,
      radius: 4,
      width: 700,
      height: window.innerHeight - 100,
      x: 0,
      y: 0,
    }
  }

  getLimits = () => {
    const x0 = this.state.x + this.state.offset
    const x1 = this.state.width - 2 * this.state.offset
    const y0 = this.state.y + this.state.offset
    const y1 = this.state.height - 2 * this.state.offset
    return { x0, x1, y0, y1 }
  }

  randomRange = (start, end) => {
    if (end < start) {
      return (start - end) * Math.random() + end;
    }
    return (end - start) * Math.random() + start;
  }

  createParticles = () => {
    const { x0, x1, y0, y1 } = this.getLimits();
    const { settings } = this.props;
    const { radius } = this.state;
    const particles = Array.from({ length: settings.number }).map((_, i) => (
      {
        x: this.randomRange(x0 + 2 * radius, x1 - 2 * radius),
        y: this.randomRange(y0 + 2 * radius, y1 - 2 * radius),
        radius: radius,
        health: i === 0 ? 'infected' : 'normal',
        speedX: this.randomRange(settings.speed * (-1), settings.speed),
        speedY: this.randomRange(settings.speed * (-1), settings.speed)
      }
    ))

    this.setState({ particles, settings })
  }

  isInLimit = (x, x0, x1) => {
    return (x0 < x) && (x < x1)
  }

  updatePositions = () => {
    /* Limits */
    const limits = this.getLimits();

    /* Create new particles based on previous position */
    const particles = this.state.particles.map(part => {
      this.updatePosition(part, limits);
      if (part.health === 'infected') {
        this.infectParticles(part, this.state.particles);
      }
      return { ...part };
    })


    this.setState({ particles });
  }

  infectParticles = (part, otherParticles) => {
    const {infectionProb, infectionRadius} = this.props.settings;
    const infectionRatio = infectionProb / 100.0;

    otherParticles.forEach(p => {
      const dist = this.dist(part, p);
      if (dist < infectionRadius * 2 && Math.random() < infectionRatio) {
        p.health = 'infected'
      }
    })
  }

  dist = (p1, p2) => {
    const a = Math.pow(p1.x - p2.x, 2)
    const b = Math.pow(p1.y - p2.y, 2)
    return Math.sqrt(a + b)
  }

  updatePosition = (part, { x0, x1, y0, y1 }) => {
    if (!this.isInLimit(part.x, x0 + part.radius, x1 - part.radius)) {
      part.speedX *= -1
    }
    if (!this.isInLimit(part.y, y0 + part.radius, y1 - part.radius)) {
      part.speedY *= -1
    }

    part.x += part.speedX;
    part.y += part.speedY;
  }

  componentDidMount() {
    this.setState({
      width: this.node.clientWidth,
      x: this.node.offsetLeft,
      y: this.node.offsetTop
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.running !== this.props.running) {
      if (this.props.running) {
        this.createParticles();
        const {number} = this.props.settings;
        const delay = number > 500 ? 100 : 30;
        this.interval = setInterval(this.updatePositions, delay);
      } else {
        clearInterval(this.interval)
        this.setState({particles: []})
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { x0, x1, y0, y1 } = this.getLimits();
    const {width, height, x, y} = this.state;

    return (
      <div width='100%' ref={node => this.node = node}>
        {
          this.props.running ? (
            <Stage 
              width={width}
              height={height}
              x={x}
              y={y}
            >
              <Layer>
                <Group>
                  <Rect
                    width={x1 - x0}
                    height={y1 - y0}
                    stroke='white'
                    strokeWidth={1}
                    x={x0}
                    y={y0}
                  />
                  {
                    this.state.particles.map((el, i) => {
                      return (<Particle {...el} key={i} />)
                    })
                  }
                </Group>
              </Layer>
            </Stage>
          ) : (
              <Empty
                description={(
                  <div>
                    Simulação parada. <br />
                    Aperte play para iniciar
                  </div>
                )}
              >
                <Button type='primary' icon={<PlayCircleOutlined />}>Play</Button>
              </Empty>
            )
        }


      </div>
    )
  }
}

export { Simulation };