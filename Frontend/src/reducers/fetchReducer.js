 import * as types from '../actions/actionTypes';

// Slice of the state managed by this reducer

const fetchState = {
  fetching: false,
  courses: [],
  editCourse: {},
};

// ------ Reducer ------

function fetchReducer(state = fetchState, action) {
  switch(action.type) {
    case types.CLEAR_COURSE_DATA:
      return clearCourseData(state);
    case types.FETCH_START:
      return fetchStart(state);
    case types.FETCH_SUCCESS:
      return fetchSuccess(state, action.courses);
    case types.FETCH_FAIL:
      return fetchFail(state, action.error);
    case types.FETCH_ONE_START:
      return fetchStart(state);
    case types.FETCH_ONE_SUCCESS:
      return fetchOneSuccess(state, action.course);
    case types.FETCH_ONE_FAIL:
      return fetchFail(state);
    case types.ERROR:
      return fetchFail(state);
    default:
      return state;
  }
}

// ------ Common functions ------

function clearCourseData(state) {
  return Object.assign({}, state, { courses: [] });
}


// ------ Fetch functions ------

function fetchStart(state) {
  let newState = Object.assign({}, state);
  newState.fetching = true;

  return newState;
}

function fetchFail(state) {
  let newState = Object.assign({}, state);
  newState.fetching = false;

  return newState;
}


// GET All success

function fetchSuccess(state, courses) {
  let newState = Object.assign({}, state);
  newState.fetching = false;
  newState.courses = courses.slice();

  return newState;
}


// GET one success

function fetchOneSuccess(state, course) {
  let newState = Object.assign({}, state);
  newState.fetching = false;
  newState.editCourse = Object.assign({}, course);
  newState.editCourse.title = course.title.split('-').join(' ');

  return newState;
}


export default fetchReducer;
