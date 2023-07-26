import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('token'),
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: state => state,
    setUser: (state, actions) => {
      const newData = {
        ...state,
        user: actions.payload.user,
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

export const { getUser, setUser, isUserAuthenticated } = userSlice.actions;
