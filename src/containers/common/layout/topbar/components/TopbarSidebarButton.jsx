import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

function TopbarSidebarButton(props) {
  const {
    // changeMobileSidebarVisibility,
    changeSidebarVisibility,
  } = props;

  return (
    <div>
      <IconButton onClick={changeSidebarVisibility}>
        <MenuIcon />
      </IconButton>
      {/* <button
        type="button"
        className="topbar__button topbar__button--desktop"
        onClick={changeSidebarVisibility}
      >
        <img src={icon} alt="" className="topbar__button-icon" />
      </button>
      <button
        type="button"
        className="topbar__button topbar__button--mobile"
        onClick={changeMobileSidebarVisibility}
      >
        <img src={icon} alt="" className="topbar__button-icon" />
      </button> */}
    </div>
  );
}

TopbarSidebarButton.propTypes = {
  // changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default TopbarSidebarButton;
