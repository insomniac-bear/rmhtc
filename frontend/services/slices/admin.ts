/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  moderateCompanies: []
}

const initialState: IInitialState = {
  moderateCompanies: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setModerateCompanies(state, action) {
      state.moderateCompanies = action.payload;
    },
  },
});

export const {
  setModerateCompanies,
} = adminSlice.actions;
