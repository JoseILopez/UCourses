import * as types from './actionTypes';
import { clearCourseData } from './commonActions';
import { clearError, displayError } from './errorActions';
import { getCourse, getCourses } from '../api/requests';

// ------ Get all courses ------

export function fetchStart() {
  return (dispatch) => {

    // Dispatch "START" action and clear the course list to update the UI

    dispatch({ type: types.FETCH_START });
    dispatch(clearCourseData());

    // Async get request

    return getCourses()
           .then(res => res.json())
           .then(courses => dispatch(fetchSuccess(courses)))
           .then(() => dispatch(clearError()))
           .catch(err => dispatch(displayError(err)));
  };
};

export function fetchSuccess(courses) {
  return {
    type: types.FETCH_SUCCESS,
    courses,
  };
};


// ------ Get one course ------

export function fetchOneStart(title) {
  return (dispatch) => {

    // Dispatch "START" action to update the UI

    dispatch({ type: types.FETCH_START });

    // Async get request

    return getCourse(title)
           .then(res => res.json())
           .then(course => dispatch(fetchOneSuccess(course)))
           .then(() => dispatch(clearError()))
           .catch(err => dispatch(displayError(err)));
  };
};

export function fetchOneSuccess(course) {
  return {
    type: types.FETCH_ONE_SUCCESS,
    course,
  };
};
