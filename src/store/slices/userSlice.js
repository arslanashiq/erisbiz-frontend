import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  email: '',
  groups: [],
  profile: {},
  isAuthenticated: false,
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
          user: { email, groups, profile },
        },
      }
    ) => {
      const newData = {
        ...state,
        email,
        groups,
        profile,
        isAuthenticated,
      };
      return newData;
    },
    isUserAuthenticated: (state, { payload: { isAuthenticated } }) => {
      const newData = { ...state, isAuthenticated };
      return newData;
    },
  },
});

export default userSlice.reducer;

export const { setUser, isUserAuthenticated } = userSlice.actions;
