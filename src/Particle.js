import React from 'react'
import { Circle } from 'react-konva'

/**
 * 
 * @param {*} props 
 */
const Particle = (props) => {
    const colors = {
        health: 'blue',
        infected: 'red',
        recovered: 'gray',
        dead: 'yellow'
    }
    let color = colors[props.health] || 'gray';
    return (
      <Circle {...props} strokeWidth={1} stroke={color}/>
    )
}

export {Particle}