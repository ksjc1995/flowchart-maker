export const RESET_WINDOW = "RESET_WINDOW";
export const SAVE_WINDOW = "SAVE_WINDOW";
export const UNDO_ACTION = "UNDO_ACTION";
export const LOAD_FLOWCHART = "LOAD_FLOWCHART";
export const DROP_COMPONENT = "DROP_COMPONENT";
export const UPDATE_OBJECT_POSITION = ' UPDATE_OBJECT_POSITION';
export const UPDATE_SAVED_FLOWCHART_IDS = 'UPDATE_SAVED_FLOWCHART_IDS';
export const ADD_ATTRIBUTE = 'ADD_ATTRIBUTE';


export function resetWindow(flowChartStack, currentComponentId) {
  return {
    type: RESET_WINDOW,
    flowChartStack,
    currentComponentId
  };
}

export function saveWindow(flowChartId, key) {
  return {
    type: SAVE_WINDOW,
    flowChartId,
    key 
  };
}

export function undoAction(flowChartStack, currentComponentId) {
  return {
    type: UNDO_ACTION,
    flowChartStack,
    currentComponentId 
  };
}

export function loadFlowChart(flowChartStack) {
  return {
    type: LOAD_FLOWCHART,
    flowChartStack 
  };
}

export function dropComponent(flowChartStack, currentComponentId) {
  return {
    type: DROP_COMPONENT,
    flowChartStack,
    currentComponentId
  };
}


export function updateObjectPosition(flowChartStack){
  return {
    type: UPDATE_OBJECT_POSITION,
    flowChartStack
  }
}

export function updateSavedFlowchartIds(savedFlowChartIds){
  return {
    type:UPDATE_SAVED_FLOWCHART_IDS,
    savedFlowChartIds
  }
}

export function addAttribute(flowChartStack){
  return {
    type:ADD_ATTRIBUTE,
    flowChartStack
  }
}