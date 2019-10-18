import React from "react";
import "./Triangle.css";
export default function Triangle(props) {
  const { onShapeClick, position, id, onMouseDown, insideWindow} = props;

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
      className="triangle"
      id={id || "triangle"}
      onClick={(e) => onShapeClick(e)}
      onMouseDown={e => onMouseDown(e,insideWindow)}
    ></div>
  );
}
