import React from "react";
import Circle from "@Components/Shapes/Shape/Circle/Circle";
import Rectangle from "@Components/Shapes/Shape/Rectangle/Rectangle";
import Triangle from "@Components/Shapes/Shape/Triangle/Triangle";

export default function Shape(props) {
  const { type, onDrag, onShapeClick, position, id, onMouseDown } = props;
  let shapeToRender = (
    <Circle
      id={id}
      onShapeClick={onShapeClick}
      onMouseDown={onMouseDown}
      position={position}
      onDrag={onDrag}
    />
  );
  if (type === "rectangle")
    shapeToRender = (
      <Rectangle
        id={id}
        position={position}
        onMouseDown={onMouseDown}
        onShapeClick={onShapeClick}
        onDrag={onDrag}
      />
    );
  else if (type === "triangle")
    shapeToRender = (
      <Triangle
        id={id}
        position={position}
        onMouseDown={onMouseDown}
        onShapeClick={onShapeClick}
        onDrag={onDrag}
      />
    );
  //   else if (type === "line") shapeToRender = "Line";
  return shapeToRender;
}
