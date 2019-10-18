import {
  RESET_WINDOW,
  SAVE_WINDOW,
  UNDO_ACTION,
  LOAD_FLOWCHART,
  DROP_COMPONENT,
  UPDATE_OBJECT_POSITION,
  UPDATE_SAVED_FLOWCHART_IDS,
  ADD_ATTRIBUTE
} from "../Actions/flowChartEditorActions";

const initialState = {
  shapes: ["circle", "rectangle", "triangle", "line"],
  flowChartEditorState: {
    flowChartId: 0,
    currentComponentId: 1,
    flowChartStack: []
  },
  actionStatus: "",
  savedFlowChartIds:[]
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
    case SAVE_WINDOW: 
      let key = action.key;
      let savedFlowChartIds = [...state.savedFlowChartIds];
      savedFlowChartIds.push(key);
      return {
        ...state,
        flowChartEditorState: {
          ...state.flowChartEditorState,
          flowChartId: action.flowChartId
        },
        savedFlowChartIds: [...savedFlowChartIds]
      };

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

    case UPDATE_OBJECT_POSITION:
      return {
        ...state,
        flowChartEditorState: {
          ...state.flowChartEditorState,
          flowChartStack: [...action.flowChartStack]
        }
      };

    case UPDATE_SAVED_FLOWCHART_IDS:
      console.log(action.savedFlowChartIds + 'dsgs')
      return {
        ...state,
        flowChartEditorState: {
          ...state.flowChartEditorState,
          flowChartId:action.savedFlowChartIds.length - 1
        },
        savedFlowChartIds: [...action.savedFlowChartIds]
      }

    case ADD_ATTRIBUTE: 
    return {
      ...state,
      flowChartEditorState: {
        ...state.flowChartEditorState,
        flowChartStack: [...action.flowChartStack]
      }
    }
    default:
      return state;
  }
}

export default flowChartEditorReducer;
