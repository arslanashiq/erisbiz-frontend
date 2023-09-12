import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';

function SectionLoader({ options, children }) {
  const checkAllConditions = () => {
    let isLoading = false;
    options.forEach(option => {
      if (option === true) {
        isLoading = true;
      }
    });

    return isLoading;
  };
  if (checkAllConditions()) {
    return (
      <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return children;
}

SectionLoader.propTypes = {
  options: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
};
SectionLoader.defaultProps = {
  options: [],
};
export default SectionLoader;
