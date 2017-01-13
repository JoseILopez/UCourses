import fetchReducer from './fetchReducer';
import * as types from '../actions/actionTypes';

// State

const fetchState = {
  fetching: false,
  courses: [],
  editCourse: {},
};

const courseA = {
  title: 'title',
  author: 'author',
  description: 'description',
  tags: ['tag1', 'tag2'],
};

const courseB = {
  title: 'titleB',
  author: 'authorB',
  description: 'descriptionB',
  tags: ['tag1B', 'tag2B'],
};

// Tests

describe('Fetch reducer test', () => {

  // CLEAR_COURSE_DATA

  it('Clears course list', () => {
    let action = { type: types.CLEAR_COURSE_DATA };

    let thisState = Object.assign({}, fetchState);
    thisState.courses = [courseA, courseB];

    let finalState = fetchReducer(thisState, action);

    expect(finalState.courses.length).toBe(0);
  });

  // FETCH_START

  it('Sets "fetching" to true when starting a fetch', () => {
    let action = { type: types.FETCH_START };

    let thisState = Object.assign({}, fetchState);

    let finalState = fetchReducer(thisState, action);

    expect(finalState.fetching).toBe(true);
  });

  // FETCH_SUCCESS

  it('Updates courses and sets "fetching" to false on success', () => {
    let action = { type: types.FETCH_SUCCESS,
                   courses: [courseA, courseB],
                   };

    let thisState = Object.assign({}, fetchState);
    let expectState = Object.assign({}, thisState);
    expectState.courses = action.courses;
    expectState.fetching = false;

    let finalState = fetchReducer(thisState, action);

    expect(finalState).toEqual(expectState);
  });

  // FETCH_FAIL

  it('Sets "fetching" to false on failure', () => {
    let action = { type: types.FETCH_FAIL };

    let thisState = Object.assign({}, fetchState);

    let finalState = fetchReducer(thisState, action);

    expect(finalState.fetching).toBe(false);
  });

  // FETCH_ONE_SUCCESS

  it('Stores "editCourse" and sets "fetching" to false', () => {
    let action = { type: types.FETCH_ONE_SUCCESS,
                   course: courseA,
                   };

    let thisState = Object.assign({}, fetchState);
    let expectState = Object.assign({}, thisState, { editCourse: courseA });

    let finalState = fetchReducer(thisState, action);

    expect(finalState).toEqual(expectState);
  });
});
