import React, {Component} from 'react';
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
            ...props
        }
    }

    getLimits = () => {
        const x0 = this.state.x + this.state.offset
        const x1 = this.state.width - 2 * this.state.offset
        const y0 = this.state.y + this.state.offset
        const y1 = this.state.height - 2 * this.state.offset
        return {x0, x1, y0, y1}
    }

    randomRange = (start, end) => {
        if (end < start) {
            return start * Math.random() + end;
        }
        return end * Math.random() + start;
    }

    createParticles = () => {
        const {x0, x1, y0, y1} = this.getLimits();
        const {radius} = this.state;
        const particles = Array.from({length: 100}).map((_, i) => (
            {
                x: this.randomRange(x0 + radius, x1 - radius),
                y: this.randomRange(y0 + radius, y1 - radius),
                radius: radius,
                health: i === 0 ? 'infected' : 'normal',
                speedX: this.randomRange(-1, 1),
                speedY: this.randomRange(-1, 1)
            }
        ))

        this.setState({particles})
    }

    isInLimit = (x, x0, x1) => {
        return (x0 < x) && (x < x1)
    } 

    updatePositions = () => {
        /* Limits */
        const {x0, x1, y0, y1} = this.getLimits();

        /* Create new particles based on previous position */
        const particles = this.state.particles.map(part => {
            if (!this.isInLimit(part.x, x0 + part.radius, x1 - part.radius)) {
                part.speedX *= -1
            }
            if (!this.isInLimit(part.y, y0 + part.radius, y1 - part.radius)) {
                part.speedY *= -1
            }

            part.x += part.speedX;
            part.y += part.speedY;
            return {...part};
        })

        this.setState({particles});
    }

    componentDidMount() {
        this.createParticles()
        this.interval = setInterval(this.updatePositions, 10);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.x !== this.props.x) {
            this.setState({...this.props})
        }
    }

    render() {
        const {x0, x1, y0, y1} = this.getLimits();
       
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
                        return (<Particle {...el} key={i}/>)
                    })
                }
            </Group>
        )
    }
}

export { Simulation };