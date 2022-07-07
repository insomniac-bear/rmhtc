import { combineReducers } from 'redux';
import { userAPI } from '../userService';
import { userSlice } from './users';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
});
