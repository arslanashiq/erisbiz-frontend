import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideBarStatus: true,
};

const sideBar = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    openSideBar: state => {
      const newState = { ...state, sideBarStatus: true };
      return newState;
    },
    closeSideBar: state => {
      const newState = { ...state, sideBarStatus: false };
      return newState;
    },
  },
});

export default sideBar.reducer;

export const { openSideBar, closeSideBar } = sideBar.actions;
