 import * as types from '../actions/actionTypes';

// Slice of the state managed by this reducer

const deleteState = { processing: false };

// ------- Reducer ------

function deleteReducer(state = deleteState, action) {
  switch(action.type) {
    case types.DELETE_COURSE_START:
      return deleteCourseStart(state, action.title);
    case types.DELETE_COURSE_SUCCESS:
      return deleteCourseSuccess(state, action.title);
    case types.DELETE_COURSE_FAIL:
      return deleteCourseFail(state, action.title);
    case types.ERROR:
      return deleteCourseFail(state, action.title);
    default:
      return state;
  }
}

// ------ Delete logic ------

function deleteCourseStart(state, title) {
  let newState = Object.assign({}, state);
  newState.processing = true;
  newState[title] = true;

  return newState;
}

function deleteCourseSuccess(state, title) {
  let newState = Object.assign({}, state);
  newState.processing = false;
  newState[title] = false;

  //window.location.reload();

  return newState;
}

function deleteCourseFail(state, title) {
  let newState = Object.assign({}, state);
  newState.processing = false;
  newState[title] = false;

  return newState;
}

export default deleteReducer;
