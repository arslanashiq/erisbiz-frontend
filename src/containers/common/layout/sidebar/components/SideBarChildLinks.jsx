import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
import SideBarListItemButton from './SideBarListItemButton';

function SideBarChildLinks({
  sideBar,
  open,
  checkActive,
  setOpen,
  handleChnageSideBarChildDisplay,
  nestingLevel,
}) {
  const transitionClass = useMemo(() => {
    if (!open) {
      return 'hide-transition';
    }
    return sideBar?.showChildren ? 'show-transition' : 'hide-transition';
  }, [sideBar, open]);
  return (
    <div className={transitionClass}>
      {sideBar?.children?.map(child => (
        <div key={child.name}>
          <SideBarListItem
            selected={checkActive(child.link)}
            key={child.name}
            disablePadding
            sx={{ display: open ? 'auto' : 'none' }}
          >
            {child?.children?.length > 0 ? (
              <SideBarListItemButton
                sideBarListItem={child}
                open={open}
                setOpen={setOpen}
                handleChnageSideBarChildDisplay={handleChnageSideBarChildDisplay}
                isParent
                nestingLevel={nestingLevel + 1}
              />
            ) : (
              <NavLink to={child.link} style={{ color: 'inherit', textDecoration: 'none', width: '100%' }}>
                <SideBarListItemButton
                  sideBarListItem={child}
                  open={open}
                  setOpen={setOpen}
                  handleChnageSideBarChildDisplay={handleChnageSideBarChildDisplay}
                  isParent={false}
                  nestingLevel={nestingLevel + 1}
                />
              </NavLink>
            )}
          </SideBarListItem>
          <SideBarChildLinks
            sideBar={child}
            open={open}
            checkActive={checkActive}
            setOpen={setOpen}
            handleChnageSideBarChildDisplay={handleChnageSideBarChildDisplay}
            nestingLevel={nestingLevel + 1}
          />
        </div>
      ))}
    </div>
  );
}

SideBarChildLinks.propTypes = {
  sideBar: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  checkActive: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleChnageSideBarChildDisplay: PropTypes.func,
  nestingLevel: PropTypes.number,
};

SideBarChildLinks.defaultProps = {
  nestingLevel: 0,
  handleChnageSideBarChildDisplay: () => {},
};
export default SideBarChildLinks;
