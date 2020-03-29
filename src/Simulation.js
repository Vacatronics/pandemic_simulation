import React, {Component} from 'react';
import Konva from 'konva';
import { Rect } from 'react-konva';


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
            color: 'green'
        }
    }

    handleClick = () => {
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    }

    render() {
        return (
            <Rect 
                x={10} y={10} width={50} height={50}
                fill={this.state.color}
                shadowBlur={10}
                onClick={this.handleClick}
            />
        )
    }
}

export { Simulation };