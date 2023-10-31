import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';

function SectionLoader({ options, condition, children }) {
  const checkAllConditions = () => options.some(option => option === true);
  if (condition || checkAllConditions()) {
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
  children: PropTypes.node.isRequired,
  condition: PropTypes.bool,
};
SectionLoader.defaultProps = {
  options: [],
  condition: false,
};
export default SectionLoader;
