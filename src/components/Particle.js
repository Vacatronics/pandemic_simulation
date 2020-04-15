import React from 'react'
import { Circle } from 'react-konva'
import { HEALTH_HELPERS } from '../_helpers';

/**
 * 
 * @param {*} props 
 */
const Particle = (props) => {
    let color = HEALTH_HELPERS[props.health].color;
    return (
      <Circle {...props} strokeWidth={1} stroke={color}/>
    )
}

export {Particle}