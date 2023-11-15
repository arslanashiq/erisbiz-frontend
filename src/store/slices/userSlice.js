import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  email: '',
  groups: [],
  profile: {},
  company: {},
  isAuthenticated: null,
  isRegesteredCompany: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      {
        payload: {
          isAuthenticated,
          is_regestered_company: isRegesteredCompany,
          user: { email, groups, profile, company },
        },
      }
    ) => {
      const newData = {
        ...state,
        email,
        groups,
        profile,
        isRegesteredCompany,
        isAuthenticated,
        company,
      };
      return newData;
    },
    isUserAuthenticated: (
      state,
      { payload: { isAuthenticated, is_regestered_company: isRegesteredCompany, profile, company } }
    ) => {
      const newData = { ...state, isAuthenticated, isRegesteredCompany, profile, company };
      return newData;
    },
  },
});

export default userSlice.reducer;

export const { setUser, isUserAuthenticated } = userSlice.actions;
