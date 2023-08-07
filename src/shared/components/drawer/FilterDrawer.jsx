import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
// import { Form, Formik } from 'formik';
// import FormikModernField from '../form/FormikModernField';

function FilterDrawer({ open, setOpen, children }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Drawer variant="temporary" anchor="right" open={open} onClose={handleClose}>
      <Box style={{ width: 350, paddingTop: 80 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: '0px 10px' }}
        >
          <Typography sx={{ fontWeight: 600 }}>Personalized Search</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ height: 3, backgroundColor: 'black', marginBottom: 2 }} />

        <Box sx={{ padding: '0px 10px 10px 10px' }}>{children}</Box>
      </Box>
    </Drawer>
  );
}
FilterDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
FilterDrawer.defaultProps = {
  //   otherOptions: [],
};

export default FilterDrawer;
