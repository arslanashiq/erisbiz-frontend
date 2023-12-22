import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Stack, Typography } from '@mui/material';

function PageNotFound() {
  const navigate = useNavigate();
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
      <Stack>
        <Typography variant="h1">Page Not Found</Typography>
        <Stack direction="row" width="100%" justifyContent="center">
          <Button onClick={() => navigate('/')}>Go To Dashboard</Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default PageNotFound;
