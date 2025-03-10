import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';
import a11yProps from 'utilities/allyProps';

function DetailTabsWrapper({ activeTab, setActiveTab, className, tabsList, tabStyles, children }) {
  const handleChange = (_, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Box sx={{ minWidth: '100%' }}>
      <Box className="no-print" sx={{ borderBottom: 1, borderColor: 'divider', overflow: 'auto' }}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabsList.map((tab, index) => (
            <Tab sx={tabStyles} key={tab} label={tab} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      <Box className={`pt-3 ${className}`}>{children}</Box>
    </Box>
  );
}

DetailTabsWrapper.propTypes = {
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabsList: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tabStyles: PropTypes.object,
};
DetailTabsWrapper.defaultProps = {
  className: '',
  tabStyles: {},
};
export default DetailTabsWrapper;
