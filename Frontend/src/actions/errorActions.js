import { toastr } from 'react-redux-toastr'
import * as types from './actionTypes';

export function clearError() {
  return {
    type: types.ERROR_CLEAR,
  };
};

export function displayError(error, properties) {
  let action = Object.assign({ type: types.ERROR, error }, properties);
  toastr.error('Error', 'Something went wrong');

  return action;
};
