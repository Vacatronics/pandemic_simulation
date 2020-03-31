import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
import { Particle } from './Particle';


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
      ...props,
      contProb: 0.2,
      number: 10
    }
  }

  getLimits = (state = this.state) => {
    const x0 = state.x + this.state.offset
    const x1 = state.width - 2 * this.state.offset
    const y0 = state.y + this.state.offset
    const y1 = state.height - 2 * this.state.offset
    return { x0, x1, y0, y1 }
  }

  randomRange = (start, end) => {
    if (end < start) {
      return (start - end) * Math.random() + end;
    }
    return (end - start) * Math.random() + start;
  }

  createParticles = (state) => {
    const { x0, x1, y0, y1 } = this.getLimits(state);
    const { radius } = this.state;
    const particles = Array.from({ length: state.number }).map((_, i) => (
      {
        x: this.randomRange(x0 + 2 * radius, x1 - 2 * radius),
        y: this.randomRange(y0 + 2 * radius, y1 - 2 * radius),
        radius: radius,
        health: i === 0 ? 'infected' : 'normal',
        speedX: this.randomRange(-1, 1),
        speedY: this.randomRange(-1, 1)
      }
    ))

    this.setState({ particles, ...state })
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
    otherParticles.forEach(p => {
      const dist = this.dist(part, p);
      if (dist < part.radius && Math.random() < this.state.contProb) {
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

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      const newState = {...this.props};
      this.createParticles(newState)
      this.interval = setInterval(this.updatePositions, 30);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { x0, x1, y0, y1 } = this.getLimits();

    return (
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
    )
  }
}

export { Simulation };