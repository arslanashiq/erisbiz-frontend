import { Typography } from '@mui/material';
import React from 'react';

function PageNotFound() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">Page Not Found</Typography>
    </div>
  );
}

export default PageNotFound;
