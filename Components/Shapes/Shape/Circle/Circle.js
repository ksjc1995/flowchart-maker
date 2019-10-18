import React from "react";
import "./Circle.css";
export default function Circle(props) {
  const { onShapeClick, position, id, onMouseDown, insideWindow } = props;
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
      className="circle"
      id={id || "circle"}
      onClick={onShapeClick}
      onMouseDown={e => onMouseDown(e,insideWindow)}
    ></div>
  );
}
