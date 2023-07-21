import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: state => state,
  },
});

export default authSlice.reducer;

export const { onLogin } = authSlice.actions;
