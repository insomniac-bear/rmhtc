import { combineReducers } from 'redux';
import { userSlice } from './users';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
});
