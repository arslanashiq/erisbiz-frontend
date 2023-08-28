import React, { useEffect, useState } from 'react';
// import { getMenuState } from 'utilities/helpers';
import Sidebar from './sidebar';
import TopBar from './topbar';

function Layout() {
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
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
