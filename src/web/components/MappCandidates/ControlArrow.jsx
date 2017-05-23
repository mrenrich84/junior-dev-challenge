import React from 'react';

const ControlArrow = (props) => {
  const height = '29px'
  return (
    <button onClick={props.clickHandle} style={{ height: height }}>
      <img src={props.icon} width={props.iconSize} height={props.iconSize}/>
    </button>
  )
}

export default ControlArrow
