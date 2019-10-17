import React from "react";
import "./Circle.css";
export default function Circle(props) {
  const { onDrag, onShapeClick, position, id, onMouseDown } = props;
  return (
    <div
      draggable
      className="circle"
      id={id || "circle"}
      onClick={e => onShapeClick(e, position)}
      onDragStart={e => onDrag(e)}
      onMouseDown={onMouseDown}
    ></div>
  );
}
