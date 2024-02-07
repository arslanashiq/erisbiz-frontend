import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideBar, openSideBar } from 'store/slices/sideBarSlice';
import Sidebar from './sidebar';
import TopBar from './topbar';

function Layout() {
  const dispatch = useDispatch();
  const { sideBarStatus: open } = useSelector(state => state.sideBar);

  const handleToggleDrawer = () => {
    if (open) {
      dispatch(closeSideBar());
    } else {
      dispatch(openSideBar());
    }
  };
  const setOpen = value => {
    if (value) {
      dispatch(openSideBar());
    } else {
      dispatch(closeSideBar());
    }
  };

  useEffect(() => {
    sessionStorage.setItem('menu-state', open);
  }, [open]);

  return (
    <>
      <TopBar open={open} handleToggleDrawer={handleToggleDrawer} />
      <Sidebar open={open} setOpen={setOpen} handleToggleDrawer={handleToggleDrawer} />
    </>
  );
}

export default Layout;
