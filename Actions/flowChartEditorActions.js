export const RESET_WINDOW = "RESET_WINDOW";
export const SAVE_WINDOW = "SAVE_WINDOW";
export const UNDO_ACTION = "UNDO_ACTION";
export const LOAD_FLOWCHART = "LOAD_FLOWCHART";
export const DROP_COMPONENT = "DROP_COMPONENT";

export function resetWindow(flowChartStack, currentComponentId) {
  return {
    type: RESET_WINDOW,
    flowChartStack,
    currentComponentId
  };
}

export function saveWindow(flowChartId) {
  return {
    type: SAVE_WINDOW,
    flowChartId // action payload
  };
}

export function undoAction(flowChartStack, currentComponentId) {
  return {
    type: UNDO_ACTION,
    flowChartStack,
    currentComponentId // action payload
  };
}

export function loadFlowChart(flowChartStack) {
  return {
    type: LOAD_FLOWCHART,
    flowChartStack // action payload
  };
}

export function dropComponent(flowChartStack, currentComponentId) {
  return {
    type: DROP_COMPONENT,
    flowChartStack,
    currentComponentId
  };
}
