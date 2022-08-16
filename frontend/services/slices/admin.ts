/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ICompanyData } from '../../components/CompanyCard/types';

interface IInitialState {
  moderateCompanies: []
  currentCompany: ICompanyData | null,
}

const initialState: IInitialState = {
  moderateCompanies: [],
  currentCompany: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setModerateCompanies(state, action) {
      state.moderateCompanies = action.payload;
    },
    setCurrentCompany(state, action) {
      state.currentCompany = action.payload;
    },
  },
});

export const {
  setModerateCompanies,
  setCurrentCompany,
} = adminSlice.actions;
