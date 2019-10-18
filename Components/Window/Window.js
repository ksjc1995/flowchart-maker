import React from "react";
import "./Window.css";
import Shape from "@Components/Shapes/Shape/Shape";
export default class Window extends React.Component {
  render() {
    const {
      flowChartStack,
      windowRef,
      onShapeClick,
      onMouseDown
    } = this.props;
    return (
      <div
        id="windowArea"
        ref = {windowRef}
      >
        {flowChartStack.length > 0 ? (
          flowChartStack.map((shape, index) => {
            return (
              <Shape
                insideWindow={shape.insideWindow}
                onMouseDown={onMouseDown}
                onShapeClick={onShapeClick}
                id={shape.shapeId}
                type={shape.name}
                position={shape.position}
                key={shape.name + "" + index}
              />
            );
          })
        ) : (
          <p className="defaultText">Drag to add objects here!!</p>
        )}
      </div>
    );
  }
}
