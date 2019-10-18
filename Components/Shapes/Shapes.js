import React from "react";
import Shape from "@Components/Shapes/Shape/Shape";
import "./Shapes.css";
export default class Shapes extends React.PureComponent {
  render() {
    const { shapes,onMouseDown, onShapeClick} = this.props;
    return (
      <div id="shapesContainer">
        <h2 className="shapesContainerHeading"> Components </h2>
        {shapes.map(shape => {
          return <Shape type={shape} key={shape} onMouseDown={onMouseDown} />;
        })}
      </div>
    );
  }
}
