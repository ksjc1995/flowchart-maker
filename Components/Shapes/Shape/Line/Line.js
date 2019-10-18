import React from "react";
import './Line.css';
export default function Line(props) {
  const { onShapeClick, position, id, onMouseDown, insideWindow, type } = props;
  let style = {};

  if (position) {
    style = {
      position: "absolute",
      left: position.x,
      top: position.y
    };
  }
  return (
    <div
      style={style}
      className={type || "line"}
      id={id || "line"}
      onClick={onShapeClick}
      onMouseDown={e => onMouseDown(e, insideWindow)}
    ></div>
  );
}
