import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import 'styles/form-tabs.scss';

function FormTabs({ tabsList, activeTab, setActiveTab, className }) {
  return (
    <Stack direction="row" className={`${className} tabs-wrapper w-100`}>
      {tabsList.map(key => (
        <Button
          onClick={() => {
            setActiveTab(key);
          }}
          key={key}
          variant="text"
          className={`text-capitalize tab tab${activeTab === key ? '-' : '-not-'}selected`}
        >
          {key}
        </Button>
      ))}
    </Stack>
  );
}
FormTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabsList: PropTypes.array.isRequired,
  className: PropTypes.string,
};
FormTabs.defaultProps = {
  className: '',
};

export default FormTabs;
