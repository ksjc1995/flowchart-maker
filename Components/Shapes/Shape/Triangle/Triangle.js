import React from "react";
import "./Triangle.css";
export default function Triangle(props) {
  const { onDrag, onShapeClick, position, id,onMouseDown } = props;
  return (
    <div
      draggable
      className="triangle"
      id={id || "triangle"}
      onClick={e => onShapeClick(e, position)}
      onDragStart={e => onDrag(e)}
      onMouseDown={onMouseDown}
    ></div>
  );
}
