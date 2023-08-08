import { Box, CircularProgress } from '@mui/material';
import React from 'react';

function Loader() {
  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
