import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { loaderContainerStyle } from 'shared/components/loader/Loader';
import LoaderSvg from './component/LoaderSvg';

function SectionLoader({ options, condition, children }) {
  const checkAllConditions = () => options.some(option => option === true);
  if (condition || checkAllConditions()) {
    return (
      <Box sx={loaderContainerStyle}>
        <LoaderSvg />
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
