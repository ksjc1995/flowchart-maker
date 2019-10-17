import React from "react";
import "./Window.css";
import Shape from "@Components/Shapes/Shape/Shape";
export default class Window extends React.Component {
  render() {
    const {
      allowDrop,
      onDrop,
      flowChartStack,
      onDrag,
      onShapeClick,
      onMouseDown
    } = this.props;
    return (
      <div
        id="windowArea"
        onDragOver={e => allowDrop(e)}
        onDrop={e => onDrop(e)}
      >
        {flowChartStack.length > 0 ? (
          flowChartStack.map((shape, index) => {
            return (
              <Shape
                onMouseDown={onMouseDown}
                onShapeClick={onShapeClick}
                id={shape.shapeId}
                type={shape.name}
                position={index}
                key={shape.name + "" + index}
                onDrag={onDrag}
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
