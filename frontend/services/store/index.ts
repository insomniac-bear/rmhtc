import { configureStore } from '@reduxjs/toolkit';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { rootReducer } from '../slices';

const state = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof state.getState>;
export type AppDispatch = typeof state.dispatch;

export type AppThunk<ReturnType = any> = ActionCreator<
  ThunkAction<ReturnType, RootState, any, AnyAction>
>;

export default state;
