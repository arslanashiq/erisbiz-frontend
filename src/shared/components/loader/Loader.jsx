import React from 'react';
import { Box } from '@mui/material';
import LoaderSvg from 'containers/common/loaders/component/LoaderSvg';

export const loaderContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};
function Loader() {
  return (
    <Box sx={{ ...loaderContainerStyle }}>
      <LoaderSvg />
    </Box>
  );
}

export default Loader;
