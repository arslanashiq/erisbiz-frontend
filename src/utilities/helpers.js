/* eslint-disable import/prefer-default-export */
export const getMenuState = () => {
  const value = sessionStorage.getItem('menu-state');
  if (value === false || value === 'false') {
    return false;
  }
  return true;
};
