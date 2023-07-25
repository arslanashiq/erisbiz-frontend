/* eslint react/forbid-prop-types: 0 */
/* eslint no-script-url: 0 */

import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Collapse } from 'reactstrap';
// import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
// import { useNavigate } from 'react-router';
import TopbarMenuLink from './TopbarMenuLink';

function TopbarSettings() {
  const [isOpen, setOpen] = useState(false);
  // const { department } = props;
  // const navigate = useNavigate();
  const toggle = () => {
    setOpen(!isOpen);
    // if (isHrDepart) navigate('/pages/settings');
  };

  return (
    <div className="topbar__profile">
      <button className="topbar__avatar" type="button" onClick={toggle}>
        <Tooltip title="Setting" placement="bottom" arrow>
          <IconButton>
            <SettingsIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </button>
      {isOpen && (
        <button className="topbar__back" type="button" onClick={toggle}>
          {' '}
        </button>
      )}

      <Collapse isOpen={isOpen} className="topbar__menu-wrap">
        <div className="topbar__menu">
          {/* <TopbarMenuLink
            title="General Settings"
            path="/pages/settings"
            onClick={toggle}
          /> */}
          <TopbarMenuLink title="Opening Balance" path="/pages/accounting/openingBalance" onClick={toggle} />
          <TopbarMenuLink
            title="Stamp and Signature"
            path="/pages/accounting/stampAndSignature"
            onClick={toggle}
          />
          <TopbarMenuLink
            title="Requester Signature"
            path="/pages/accounting/uploadSignature"
            onClick={toggle}
          />
        </div>
      </Collapse>
    </div>
  );
}
TopbarSettings.propTypes = {
  // department: PropTypes.string.isRequired,
};
export default TopbarSettings;
