import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { mainColor } from 'containers/auth/utilities/constant';

const textStyle = { fontSize: 30 };
function AuthLeftSection() {
  return (
    <>
      <Stack justifyContent="end" alignItems="center" sx={{ height: '100%' }}>
        <img src="/logo.png" alt="log" style={{ maxWidth: 250 }} />
        <Stack justifyContent="center" alignItems="center">
          <Typography sx={{ ...textStyle }}>
            Manage Your <span style={{ color: mainColor }}>Finance</span>
          </Typography>
          <Typography sx={{ ...textStyle }}>
            With Few <span style={{ color: mainColor }}>Clicks</span>
          </Typography>
        </Stack>
        <img src="/auth-screen-gif.gif" alt="log" style={{ height: '50vh' }} />
      </Stack>
      <Box position="absolute" left="49%" top="20%">
        <Stack border={1.5} borderColor={mainColor} height="50vh" />
      </Box>
    </>
  );
}

export default AuthLeftSection;
