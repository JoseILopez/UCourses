import * as types from '../actions/actionTypes';

// Slice of the state managed by this reducer

const defaultError = '';

// ------ Reducer -------

function errorReducer(state = defaultError, action) {
  switch(action.type) {
    case types.ERROR:
      return formatError(action.error);
    case types.ERROR_CLEAR:
      return '';
    default:
      return state;
  }
}

// Customize error message so it is clearer for the user

function formatError(error) {
  let errorMsg = error

  if (errorMsg.message === 'Failed to fetch') {
    errorMsg.name = 'Error';
    errorMsg.message = 'Unable to connect to the server';
  }

  return errorMsg.toString();
}


export default errorReducer;
