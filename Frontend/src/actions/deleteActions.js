import * as types from './actionTypes';
import { fetchStart } from './fetchActions';
import { clearError, displayError } from './errorActions';
import { deleteCourse } from '../api/requests';


export function deleteCourseStart(title) {
  return (dispatch) => {

    // Dispatch "START" action to update the UI

    dispatch({ type: types.DELETE_COURSE_START, title });

    // Async delete request

    return deleteCourse(title)
           .then(() => dispatch(deleteCourseSuccess(title)))
           .catch((err) => dispatch(displayError(err, { title })));
  };
 }

export function deleteCourseSuccess() {
  return (dispatch) => {

    return dispatch(fetchStart())
           .then(() => dispatch({ type: types.DELETE_COURSE_SUCCESS }))
           .then(() => dispatch(clearError()))
           .catch((err) => dispatch(displayError(err)));
  };
}
