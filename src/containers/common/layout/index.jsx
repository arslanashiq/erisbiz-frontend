import * as React from 'react';
// import { getMenuState } from 'utilities/helpers';
import Sidebar from './sidebar';
import TopBar from './topbar';

function Layout() {
  const [open, setOpen] = React.useState(false);
  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
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
