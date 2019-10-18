import React from "react";
import "./Rectangle.css";

export default function Rectangle(props) {
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
      className="rectangle"
      id={id || "rectangle"}
      onClick={onShapeClick}
      onMouseDown={e => onMouseDown(e,insideWindow)}
    ></div>
  );
}
