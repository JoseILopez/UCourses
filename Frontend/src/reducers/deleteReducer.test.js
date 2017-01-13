import deleteReducer from './deleteReducer';
import * as types from '../actions/actionTypes';

// State
const state = { processing: false };

// Tests

describe('Error reducer test', () => {

  // DELETE_COURSE_START

  it('Sets "processing" and state[field] to true', () => {
    let action = { type: types.DELETE_COURSE_START,
                   title: 'title',
                 };

    let finalState = deleteReducer(state, action);
    let expectState = Object.assign({}, state, { processing: true, title: true });

    expect(finalState).toEqual(expectState);
  });

  // DELETE_COURSE_SUCCESS

  it('Sets "processing" and state[field] to false', () => {
    let action = { type: types.DELETE_COURSE_SUCCESS,
                   title: 'title',
                 };

    let finalState = deleteReducer(state, action);
    let expectState = Object.assign({}, state, { processing: false, title: false });

    expect(finalState).toEqual(expectState);
  });

  // DELETE_COURSE_FAIL

  it('Sets "processing" and state[field] to false', () => {
    let action = { type: types.DELETE_COURSE_SUCCESS,
                   title: 'title',
                 };

    let finalState = deleteReducer(state, action);
    let expectState = Object.assign({}, state, { processing: false, title: false });

    expect(finalState).toEqual(expectState);
  });
});
