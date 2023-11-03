import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import 'styles/form/form.scss';
import FormikSelect from 'shared/components/form/FormikSelect';

const itemFilterOptions = [
  { value: '', label: 'All', selectedValue: 'All Items' },
  { value: 'True', label: 'Active', selectedValue: 'Active Items' },
  { value: 'False', label: 'Inactive', selectedValue: 'Inactive Items' },
  { value: 'Goods', label: 'Goods', selectedValue: 'Goods' },
  { value: 'Service', label: 'Services', selectedValue: 'Services' },
];
function ItemFilter() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ filter: '' }}
      onSubmit={async (
        values
        //  { setSubmitting, resetForm, setErrors }
      ) => {
        try {
          if (values.filter === '') navigate(window.location.pathname);
          else {
            navigate({ pathname: `${window.location.pathname}`, search: `filter=${values.filter}` });
          }
        } catch (err) {
          enqueueSnackbar(err.message, { variant: 'error' });
        }
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form className="form personlized-search-form row pt-3">
          <Box className="form__form-group">
            <span className="form__form-group-label">Items</span>
            <Box className="form__form-group-field">
              <FormikSelect name="filter" type="text" options={itemFilterOptions} className="col-12" />
            </Box>
          </Box>

          <Stack spacing={2} direction="row">
            <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
              Filter
            </Button>

            <Button
              color="secondary"
              onClick={() => resetForm()}
              //   disabled={!touched || isSubmitting}
              className="text-capitalize"
            >
              Reset
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default ItemFilter;
