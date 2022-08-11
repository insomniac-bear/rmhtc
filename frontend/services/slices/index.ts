import { combineReducers } from 'redux';
import { apiService } from '../apiService';
import { adminSlice } from './admin';
import { userSlice } from './users';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  admin: adminSlice.reducer,
  [apiService.reducerPath]: apiService.reducer,
});
