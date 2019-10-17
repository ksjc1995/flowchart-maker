import React from "react";
import "./Rectangle.css";

export default function Rectangle(props) {
  const { onDrag, onShapeClick, position, id, onMouseDown } = props;

  return (
    <div
      draggable
      className="rectangle"
      id={id || "rectangle"}
      onClick={e => onShapeClick(e, position)}
      onDragStart={e => onDrag(e)}
      onMouseDown={onMouseDown}
    ></div>
  );
}
