import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  email: '',
  groups: [],
  profile: {},
  company: {},
  isAuthenticated: null,
  isPayment: false,
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
          is_payment: isPayment,
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
        isPayment,
      };
      return newData;
    },
    isUserAuthenticated: (
      state,
      {
        payload: {
          isAuthenticated,
          is_regestered_company: isRegesteredCompany,
          is_payment: isPayment,
          profile,
          company,
          email,
        },
      }
    ) => {
      const newData = { ...state, isAuthenticated, isRegesteredCompany, profile, company, email, isPayment };
      return newData;
    },
    logOut: () => {
      const newData = {
        token: localStorage.getItem('token'),
        email: '',
        groups: [],
        profile: {},
        company: {},
        isAuthenticated: false,
        isPayment: false,
        isRegesteredCompany: false,
      };
      return newData;
    },
  },
});

export default userSlice.reducer;

export const { logOut, setUser, isUserAuthenticated } = userSlice.actions;
