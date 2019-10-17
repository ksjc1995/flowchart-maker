import React from "react";
import ShapesContainer from "@Components/Shapes/Shapes";
import Window from "@Components/Window/Window";
import Actions from "@Components/Actions/Actions";
import { connect } from "react-redux";
import {
  resetWindow,
  saveWindow,
  loadFlowChart,
  undoAction,
  dropComponent
} from "../Actions/flowChartEditorActions";
import "./MainContainer.css";

class MainContainer extends React.Component {
  actions = [
    { name: "Save", onClick: () => this.saveClickHandler() },
    { name: "Undo", onClick: () => this.undoClickHandler() },
    { name: "Reset", onClick: () => this.resetClickHandler() }
  ];

  constructor(props) {
    super(props);
    this.onDrag = this.onDrag.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.saveClickHandler = this.saveClickHandler.bind(this);
    this.resetClickHandler = this.resetClickHandler.bind(this);
    this.undoClickHandler = this.undoClickHandler.bind(this);
    this.loadClickHandler = this.loadClickHandler.bind(this);
    this.onShapeClick = this.onShapeClick.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseUp.bind(this);
  }

  saveClickHandler() {
    let { flowChartEditorState, saveWindow } = this.props;
    if (flowChartEditorState.flowChartStack.length > 0) {
      localStorage.setItem(
        "flowChart" + flowChartEditorState.flowChartId,
        JSON.stringify(flowChartEditorState.flowChartStack)
      );
      flowChartEditorState.flowChartId += 1;
      saveWindow(flowChartEditorState.flowChartId);
    } else {
      console.log("Nothing to save!");
    }
  }

  resetClickHandler() {
    const { resetWindow, flowChartEditorState } = this.props;
    if (flowChartEditorState.flowChartStack.length > 0) {
      resetWindow([], 1);
    }
  }

  undoClickHandler() {
    let { flowChartEditorState, undoAction } = this.props;
    console.log(this.props);
    if (flowChartEditorState.flowChartStack.length > 0) {
      console.log("here");
      flowChartEditorState.currentComponentId -= 1;
      flowChartEditorState.flowChartStack.pop();
      undoAction(
        flowChartEditorState.flowChartStack,
        flowChartEditorState.currentComponentId
      );
    }
  }

  loadClickHandler(flowChartKey) {
    const { loadFlowChart } = this.props;
    console.log(this.props);
    const flowChartStack = JSON.parse(localStorage.getItem(flowChartKey));
    if (flowChartStack) loadFlowChart(flowChartStack);
    else {
      console.log("Nothing to load");
    }
  }

  onDrag(e) {
    const { flowChartEditorState } = this.props;
    let shapeId =
      e.target.className + "" + flowChartEditorState.currentComponentId;
    e.dataTransfer.setData("shapeName", e.target.className);
    e.dataTransfer.setData("shapeId", shapeId);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    console.dir(e.target);
    let { flowChartEditorState, dropComponent } = this.props;
    let shapeId = e.dataTransfer.getData("shapeId");
    let shapeName = e.dataTransfer.getData("shapeName");
    flowChartEditorState.flowChartStack.push({
      shapeId: shapeId,
      name: shapeName
    });
    flowChartEditorState.currentComponentId += 1;
    dropComponent(
      flowChartEditorState.flowChartStack,
      flowChartEditorState.currentComponentId
    );
  }

  onShapeClick(e, position) {
    // add attribute
    console.log("clicked", position);
  }

  renderSavedFlowChartsList() {
    let keys = Object.keys(localStorage);
    let list = "";
    if (keys) {
      list = keys.map(key => {
        if (key != "loglevel:webpack-dev-server")
          return (
            <button
              key={key}
              className="loadFlowChartButton"
              onClick={() => this.loadClickHandler(key)}
            >
              {key.toUpperCase()}
            </button>
          );
      });
    }

    return list;
  }

  onMouseDown(event){
    let shiftX = event.clientX - object.getBoundingClientRect().left;
    let shiftY = event.clientY - object.getBoundingClientRect().top;

    console.log(shiftX);
    console.log(shiftY);
    // object.style.position = "absolute";
    // object.style.zIndex = 1000;
    // document.body.append(object);

    // moveAt(event.pageX, event.pageY);

    // // moves the object at (pageX, pageY) coordinates
    // // taking initial shifts into account
    // function moveAt(pageX, pageY) {
    //   object.style.left = pageX - shiftX + "px";
    //   object.style.top = pageY - shiftY + "px";
    // }

    // function onMouseMove(event) {
    //   moveAt(event.pageX, event.pageY);
    // }

    // // move the object on mousemove
    // document.addEventListener("mousemove", onMouseMove);

    // // drop the object, remove unneeded handlers
    // object.onmouseup = function() {
    //   document.removeEventListener("mousemove", onMouseMove);
    //   object.onmouseup = null;
    // };
  };

  onMouseUp() {}

  render() {
    const { flowChartEditorState, shapes } = this.props;
    return (
      <div>
        <div id="mainContainer">
          <ShapesContainer
            shapes={shapes}
            onDrag={this.onDrag}
            allowDrop={this.allowDrop}
            onDrop={this.onDrop}
          />
          <Window
            flowChartStack={flowChartEditorState.flowChartStack}
            onDrag={this.onDrag}
            allowDrop={this.allowDrop}
            onDrop={this.onDrop}
            onShapeClick={this.onShapeClick}
            onMouseDown={this.onMouseDown}
          />
          <Actions actions={this.actions} />
        </div>
        <h3 className="savedChartListHeader">Load saved Charts</h3>
        <div className="savedChartList">
         
          {this.renderSavedFlowChartsList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const flowChartEditor = state;
  return flowChartEditor;
};

export default connect(
  mapStateToProps,
  { resetWindow, saveWindow, loadFlowChart, undoAction, dropComponent }
)(MainContainer);
