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
  dropComponent,
  updateObjectPosition,
  updateSavedFlowchartIds,
  addAttribute
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
    this.saveClickHandler = this.saveClickHandler.bind(this);
    this.resetClickHandler = this.resetClickHandler.bind(this);
    this.undoClickHandler = this.undoClickHandler.bind(this);
    this.loadClickHandler = this.loadClickHandler.bind(this);
    this.onShapeClick = this.onShapeClick.bind(this);
    this.windowRef = React.createRef();
  }

  saveClickHandler() {
    let { flowChartEditorState, saveWindow } = this.props;
    let localStorageKeyForFlowChart =
      "flowChart" + flowChartEditorState.flowChartId;
    if (flowChartEditorState.flowChartStack.length > 0) {
      localStorage.setItem(
        localStorageKeyForFlowChart,
        JSON.stringify(flowChartEditorState.flowChartStack)
      );
      flowChartEditorState.flowChartId += 1;
      saveWindow(flowChartEditorState.flowChartId, localStorageKeyForFlowChart);
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

  dropObjectToWindow(shapeId, shapeName, position, isInsideWindowArea) {
    let { flowChartEditorState, dropComponent } = this.props;
    flowChartEditorState.flowChartStack.push({
      shapeId: shapeId,
      name: shapeName,
      position: {
        x: position.x,
        y: position.y
      },
      insideWindow: isInsideWindowArea
    });
    flowChartEditorState.currentComponentId += 1;
    dropComponent(
      flowChartEditorState.flowChartStack,
      flowChartEditorState.currentComponentId
    );
  }

  onShapeClick(e) {
    console.log('clicked');
    const { addAttribute, flowChartEditorState } = this.props;

    let key = prompt("Add Attribute key: ");
    let value = prompt("Add attribute value: ");

    let flowChartStack = [...flowChartEditorState.flowChartStack];
    let objectToBeUpdatedIndex = flowChartStack.findIndex(
      object => object.shapeId === e.target.id
    );
    if (!flowChartStack[objectToBeUpdatedIndex].attributes)
      flowChartStack[objectToBeUpdatedIndex].attributes = [];

    flowChartStack[objectToBeUpdatedIndex].attributes.push({ [key]: value });
    addAttribute(flowChartStack);
  }

  renderSavedFlowChartsList() {
    const { savedFlowChartIds, updateSavedFlowchartIds } = this.props;
    let keys = Object.keys(localStorage);
    let list = "";
    // on page load update keys from localStorage
    if (savedFlowChartIds.length == 0 && keys.length > 0) {
      console.log("here");
      updateSavedFlowchartIds(keys);
    } else {
      list = savedFlowChartIds.map(key => {
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

  updatePositionOfObjectInsideWindowArea = (shapeId, position) => {
    const { flowChartEditorState, updateObjectPosition } = this.props;
    let flowChartStack = [...flowChartEditorState.flowChartStack];
    let objectToBeUpdatedIndex = flowChartStack.findIndex(
      object => object.shapeId === shapeId
    );
    flowChartStack[objectToBeUpdatedIndex].position.x = position.x;
    flowChartStack[objectToBeUpdatedIndex].position.y = position.y;

    updateObjectPosition(flowChartStack);
  };

  componentDidMount(){
    console.log("cdm");
  }

  componentWillUnmount(){
    console.log('cwu');
  }

  componentDidUpdate(){
    console.log('cdu');
  }

  handleMouseDown = (event, isObjectInsideWindowArea) => {

    const { flowChartEditorState } = this.props;

    let object = event.target;
    let shiftX = event.clientX - event.target.getBoundingClientRect().left;
    let shiftY = event.clientY - event.target.getBoundingClientRect().top;

    let windowX = this.windowRef.current.getBoundingClientRect().x;
    let windowY = this.windowRef.current.getBoundingClientRect().y;

    if (!isObjectInsideWindowArea) {
      object = event.target.cloneNode(true);
      object.style.position = "absolute";
      object.style.zIndex = 1000;
    }

    document.body.append(object);
    moveAt(event.pageX, event.pageY);

    // moves the object at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      object.style.left = pageX - shiftX + "px";
      object.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // move the object on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // drop the object, remove unneeded handlers
    object.onmouseup = event => {
      // find object position
      let objectX = event.clientX - event.offsetX;
      let objectY = event.clientY - event.offsetY;
      //check if object is inside windowArea
      if (
        objectX - windowX > 0 &&
        objectY - windowY > 0 &&
        objectX + 100 < this.windowRef.current.offsetLeft + 502
      ) {
        let shapeId =
          event.target.id + "" + flowChartEditorState.currentComponentId;
        if (!isObjectInsideWindowArea) {
          this.dropObjectToWindow(
            shapeId,
            event.target.className,
            {
              x: objectX - windowX - 2,
              y: objectY - windowY - 12
            },
            true
          );
        } else {
          this.updatePositionOfObjectInsideWindowArea(event.target.id, {
            x: objectX - windowX - 2,
            y: objectY - windowY - 12
          });
        }
      }
      this.windowRef.current.append(object);
      // remove clone and listeners
      if (!isObjectInsideWindowArea) {
        object.remove();
      }

      object.onmouseup = null;
      document.removeEventListener("mousemove", onMouseMove);
    };
  };
  render() {
    const { flowChartEditorState, shapes } = this.props;
    return (
      <div>
        <div id="mainContainer">
          <ShapesContainer shapes={shapes} onMouseDown={this.handleMouseDown} />
          <Window
            flowChartStack={flowChartEditorState.flowChartStack}
            onShapeClick={this.onShapeClick}
            onMouseDown={this.handleMouseDown}
            windowRef={this.windowRef}
          />
          <Actions actions={this.actions} />
        </div>
        <h3 className="savedChartListHeader">Load saved Charts</h3>
        <div className="savedChartList">{this.renderSavedFlowChartsList()}</div>
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
  {
    resetWindow,
    saveWindow,
    loadFlowChart,
    undoAction,
    dropComponent,
    updateObjectPosition,
    updateSavedFlowchartIds,
    addAttribute
  }
)(MainContainer);
