 import * as types from '../actions/actionTypes';

// Slice of the state managed by this reducer

const saveState = false;

// ------ Reducer ------

function saveReducer(state = saveState, action) {
  switch(action.type) {
    case types.SAVE_COURSE_START:
      return true;
    case types.SAVE_COURSE_SUCCESS:
      return false;
    case types.SAVE_COURSE_FAIL:
      return false;
    case types.ERROR:
      return false;
    default:
      return state;
  }
}


export default saveReducer;
