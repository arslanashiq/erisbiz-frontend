import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import getSearchParamsList from 'utilities/getSearchParamsList';
// import { Form, Formik } from 'formik';
// import FormikField from '../form/FormikField';

function FilterDrawer({ open, setOpen, children }) {
  const location = useLocation();
  const initialValues = getSearchParamsList();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
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

        <Box component="div" className="container">
          <Formik
            initialValues={initialValues}
            onSubmit={async (
              values
              //  { setSubmitting, resetForm, setErrors }
            ) => {
              try {
                let searchQueryParams = '';
                Object.keys(values).forEach(key => {
                  if (key && values[key] !== '' && values[key] !== undefined) {
                    searchQueryParams = `${searchQueryParams}${
                      searchQueryParams?.length > 0 ? '&' : ''
                    }${key}=${values[key]}`;
                  }
                });
                if (searchQueryParams === '') navigate(location.pathname);
                else {
                  navigate({ pathname: `${location.pathname}`, search: searchQueryParams });
                }
                handleClose();
              } catch (err) {
                enqueueSnackbar(err.message, { variant: 'error' });
              }
            }}
          >
            {({ isSubmitting, resetForm }) => (
              <Form className="form personlized-search-form row pt-3">
                {children}

                <Stack spacing={2} direction="row">
                  <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
                    Filter
                  </Button>

                  <Button
                    color="secondary"
                    onClick={() => {
                      resetForm();
                      navigate(location.pathname);
                      handleClose();
                    }}
                    //   disabled={!touched || isSubmitting}
                    className="text-capitalize"
                  >
                    Reset
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Drawer>
  );
}
FilterDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
FilterDrawer.defaultProps = {
  //   otherOptions: [],
};

export default FilterDrawer;
