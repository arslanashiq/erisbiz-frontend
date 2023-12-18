import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
import SideBarListItemButton from './SideBarListItemButton';

function SideBarChildLinks({
  childList,
  open,
  checkActive,
  setOpen,
  showSideBarChildLink,
  setShowSideBarChildLink,
  index,
}) {
  const transitionClass = useMemo(() => {
    if (!open) {
      return 'hide-transition';
    }
    return showSideBarChildLink[index] === true ? 'show-transition' : 'hide-transition';
  }, [open, showSideBarChildLink, index]);
  return (
    <div className={transitionClass}>
      {childList.map(child => (
        <SideBarListItem
          selected={checkActive(child.link)}
          key={child.name}
          disablePadding
          sx={{ display: open ? 'auto' : 'none' }}
        >
          <NavLink to={child.link} style={{ color: 'inherit', textDecoration: 'none', width: '100%' }}>
            <SideBarListItemButton
              sideBarListItem={child}
              open={open}
              setOpen={setOpen}
              showSideBarChildLink={showSideBarChildLink}
              setShowSideBarChildLink={setShowSideBarChildLink}
              isParent={false}
            />
          </NavLink>
        </SideBarListItem>
      ))}
    </div>
  );
}

SideBarChildLinks.propTypes = {
  childList: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  checkActive: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  showSideBarChildLink: PropTypes.array,
  setShowSideBarChildLink: PropTypes.func,
  index: PropTypes.number,
};

SideBarChildLinks.defaultProps = {
  index: 0,
  showSideBarChildLink: [],
  setShowSideBarChildLink: () => {},
};
export default SideBarChildLinks;
