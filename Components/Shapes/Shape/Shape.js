import React from "react";
import Circle from "@Components/Shapes/Shape/Circle/Circle";
import Rectangle from "@Components/Shapes/Shape/Rectangle/Rectangle";
import Triangle from "@Components/Shapes/Shape/Triangle/Triangle";
import Line from '@Components/Shapes/Shape/Line/Line';
export default class Shape extends React.Component {
  render() {
    const {
      type,
      onShapeClick,
      position,
      id,
      onMouseDown,
      insideWindow
    } = this.props;
    let shapeToRender = (
      <Circle
        insideWindow={insideWindow}
        id={id}
        onShapeClick={onShapeClick}
        onMouseDown={onMouseDown}
        position={position}
      />
    );
    if (type === "rectangle")
      shapeToRender = (
        <Rectangle
          insideWindow={insideWindow}
          id={id}
          position={position}
          onMouseDown={onMouseDown}
          onShapeClick={onShapeClick}
        />
      );
    else if (type === "triangle")
      shapeToRender = (
        <Triangle
          insideWindow={insideWindow}
          id={id}
          position={position}
          onMouseDown={onMouseDown}
          onShapeClick={onShapeClick}
        />
      );
    else if (type === "line")
      shapeToRender = (
        <Line
          insideWindow={insideWindow}
          id={id}
          position={position}
          onMouseDown={onMouseDown}
          onShapeClick={onShapeClick}
        />
      );
    return shapeToRender;
  }
}
