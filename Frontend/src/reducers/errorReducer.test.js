import errorReducer from './errorReducer';
import * as types from '../actions/actionTypes';

// Tests

describe('Error reducer test', () => {

  // ERROR

  it('Returns formatted error when failing to fetch', () => {
    let action = { type: types.ERROR,
                   error: new SyntaxError('Failed to fetch'),
                 };

    let error = errorReducer('', action);

    expect(error).toBe('Error: Unable to connect to the server');
  });

  // ERROR_CLEAR

  it('Clears error message', () => {
    let action = { type: types.ERROR_CLEAR };

    let error = errorReducer('SomeError', action);

    expect(error).toBe('');
  });
});
