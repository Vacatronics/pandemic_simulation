import React, { Component } from 'react';
import { Rect, Group, Stage, Layer } from 'react-konva';
import { Particle } from './Particle';
import { Empty } from 'antd';
import { ParticleHelper } from '../_helpers/';


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
      particles: [],
      offset: 10,
      radius: 4,
      width: 700,
      height: window.innerHeight - 150,
      x: 0,
      y: 0,
      simulationDay: 0,
      simulationStep: 0.01
    }
  }

  getLimits = () => {
    const x0 = this.state.x
    const x1 = this.state.width
    const y0 = this.state.y
    const y1 = this.state.height
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
    const particles = Array.from({ length: settings.number }).map((_, i) => {
        const p = {
          x: this.randomRange(x0 + 2 * radius, x1 - 2 * radius),
          y: this.randomRange(y0 + 2 * radius, y1 - 2 * radius),
          radius: radius,
          health: i === 0 ? 'symptoms_none' : 'normal',
          speedX: this.randomRange(settings.speed * (-1), settings.speed),
          speedY: this.randomRange(settings.speed * (-1), settings.speed),
          contagious: i === 0
        }
        return new ParticleHelper(p)
      }
    )

    this.setState({ particles, settings })
  }

  updatePositions = () => {
    /* Limits */
    const limits = this.getLimits();

    /* Create new particles based on previous position */
    this.state.particles.forEach(part => {
      part.updatePosition(limits);
      if (part.contagious) {
        this.infectParticles(part, this.state.particles);
      }
      part.updateHealth(this.state.simulationDay, this.props.settings);
    })

    this.setState({simulationDay: this.state.simulationDay + this.state.simulationStep});
  }

  infectParticles = (part, otherParticles) => {
    const {infectionProb, infectionRadius} = this.props.settings;
    const settings = {
      probability: infectionProb / 100.0,
      radius: infectionRadius
    }

    otherParticles.forEach(p => part.tryInfectAnother(p, settings, this.state.simulationDay));
  }

  componentDidMount() {
    this.setState({
      width: this.node.clientWidth,
      x: 0,
      y: 0
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.running !== this.props.running) {
      if (JSON.stringify(prevProps.settings) !== JSON.stringify(this.props.settings)
          || this.state.particles.length === 0) {
        this.createParticles();
      }
      if (this.props.running) {
        const {number} = this.props.settings;
        const delay = number > 500 ? 100 : 30;
        this.setState({simulationDay: 0});
        this.interval = setInterval(this.updatePositions, delay);
      } else {
        clearInterval(this.interval)
        //this.setState({particles: []})
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {width, height} = this.state;

    return (
      <div width='100%' ref={node => this.node = node}>
        {
          this.state.particles.length > 0 ? (
            <Stage 
              width={width}
              height={height}
              x={0}
              y={0}
            >
              <Layer>
                <Group>
                  <Rect
                    width={width}
                    height={height}
                    stroke='white'
                    strokeWidth={1}
                    x={0}
                    y={0}
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
                style={{marginTop: '10%'}}
              >
              </Empty>
            )
        }


      </div>
    )
  }
}

export { Simulation };