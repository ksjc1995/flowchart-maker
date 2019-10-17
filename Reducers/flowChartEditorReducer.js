import {
  RESET_WINDOW,
  SAVE_WINDOW,
  UNDO_ACTION,
  LOAD_FLOWCHART,
  DROP_COMPONENT
} from "../Actions/flowChartEditorActions";

const initialState = {
  shapes: ["circle", "rectangle", "triangle"],
  flowChartEditorState: {
    flowChartId: 0,
    currentComponentId: 1,
    flowChartStack: []
  },
  actionStatus: ""
};

function flowChartEditorReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_WINDOW:
      return {
        ...state,
        flowChartEditorState: {
          ...state.flowChartEditorState,
          currentComponentId: action.currentComponentId,
          flowChartStack: [...action.flowChartStack]
        }
      };
    case SAVE_WINDOW: {
      return {
        ...state,
        flowChartEditorState: {
          ...state.flowChartEditorState,
          flowChartId: action.flowChartId
        }
      };
    }

    case UNDO_ACTION:
      return {
        ...state,
        flowChartEditorState: {
          ...state.flowChartEditorState,
          flowChartStack: [...action.flowChartStack],
          currentComponentId: action.currentComponentId
        }
      };

    case LOAD_FLOWCHART:
      return {
        ...state,
        flowChartEditorState: {
          ...state.flowChartEditorState,
          flowChartStack: [...action.flowChartStack]
        }
      };
    case DROP_COMPONENT:
      return {
        ...state,
        flowChartEditorState: {
          ...state.flowChartEditorState,
          flowChartStack: [...action.flowChartStack],
          currentComponentId: action.currentComponentId
        }
      };
    default:
      return state;
  }
}

export default flowChartEditorReducer;
