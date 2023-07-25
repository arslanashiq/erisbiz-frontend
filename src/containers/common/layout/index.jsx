/*eslint-disable*/
import * as React from 'react';
import Sidebar from './sidebar';

function Layout({ children }) {
  return (
    <Sidebar
      children={children}
      sidebar={true}
      changeToDark={() => {}}
      changeToLight={() => {}}
      changeMobileSidebarVisibility={() => {}}
    />
  );
}

export default Layout;
