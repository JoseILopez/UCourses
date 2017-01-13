import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr'
import * as types from './actionTypes';
import { clearError, displayError } from './errorActions';
import { getCourse, saveCourse } from '../api/requests';


// ------ Action Creators -------

export function saveCourseStart(course, edit, oldName) {
  return (dispatch) => {

    // Dispatch "START" action to update the UI

    dispatch({ type: types.SAVE_COURSE_START });

    /*
    |  Verify that the course doesn't exist already in the database (when adding a new one).
    |  If it is not a duplicate, create or save course and dispatch a success.
    |
    |  The first catch allows the flow to continue when the course is not found
    |  The second one catches any other errors.
    */

    return getCourse(course.title)
           .then(res => res.json())
           .catch(handleError)
           .then(res => verifyCourse(res, edit, course, oldName))
           .then(() => { saveCourse(course, edit, oldName) })
           .then(() => { dispatchSuccessAndRedirect(dispatch); })
           .then(() => dispatch(clearError()))
           .then(() => showToastr(edit))
           .catch((err) => { dispatch(displayError(err)) });
  }
};

export function saveCourseSuccess() {
  return {
    type: types.SAVE_COURSE_SUCCESS,
  };
};


// ------ Logic functions ------

// Redirect to the courses page and dispatch a success

function dispatchSuccessAndRedirect(dispatch) {
  browserHistory.push('/courses');

  return dispatch(saveCourseSuccess());
}

// If the error is not a JSON error (not finding a duplicate course) rethrow

function handleError(err) {
  if (err.name !== 'SyntaxError') {
    throw err;
  }
}

// Verify that the returned course doesn't conflict if editing.
// If creating a new one verify that it doesn't exist.

function verifyCourse(res, edit, course, oldName) {
  const errorMsg = 'A course with that name already exists';

  // If editing check if it is the same course.

  if (edit) {
    if (res && res.title !== oldName) {
      throw new Error(errorMsg);
    }

  // It not editing, just compare if it already exists.

  } else {
    if (res) {
      throw new Error(errorMsg);
    }
  }
}

// Toastr 'success' notice

function showToastr(edit) {
  let msg = 'Created successfully!';

  if (edit) {
    msg = 'Saved succesfully!';
  }

  toastr.success('Success', msg);
}
