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
    setUser: (state, actions) => {
      const newData = {
        ...state,
        email: actions.payload.user.email,
        groups: actions.payload.user.groups,
        profile: actions.payload.user.profile,
        isAuthenticated: actions.payload.isAuthenticated,
      };
      return newData;
    },
    isUserAuthenticated: (state, actions) => {
      const newData = { ...state, isAuthenticated: actions.payload.isAuthenticated };
      return newData;
    },
  },
});

export default userSlice.reducer;

export const { setUser, isUserAuthenticated } = userSlice.actions;
