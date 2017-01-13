import saveReducer from './saveReducer';
import * as types from '../actions/actionTypes';

// Tests

describe('Save reducer test', () => {

  // SAVE_COURSE_START

  it('Sets "saving" to true', () => {
    let action = { type: types.SAVE_COURSE_START };

    let saving = saveReducer(false, action);

    expect(saving).toBe(true);
  });

  // SAVE_COURSE_SUCCESS

  it('Sets "saving" to false', () => {
    let action = { type: types.SAVE_COURSE_SUCCESS };

    let saving = saveReducer(true, action);

    expect(saving).toBe(false);
  });

  // SAVE_COURSE_FAIL

  it('Sets "saving" to false', () => {
    let action = { type: types.SAVE_COURSE_FAIL };

    let saving = saveReducer(true, action);

    expect(saving).toBe(false);
  });
});
