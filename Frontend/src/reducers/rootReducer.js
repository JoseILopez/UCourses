import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import fetchReducer from './fetchReducer';
import saveReducer from './saveReducer';
import deleteReducer from './deleteReducer';
import errorReducer from './errorReducer';

export default combineReducers({ fetch: fetchReducer,
                                 saving: saveReducer,
                                 deleting: deleteReducer,
                                 errorMessage: errorReducer,
                                 toastr: toastrReducer });
