import React from 'react';
import { Button, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import GroupedOptionsFormikSelect from 'shared/components/form/GroupedOptionsFormikSelect';
import 'styles/form/form.scss';

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
      {({ isSubmitting, resetForm, setFieldValue, setFieldTouched, values, touched, errors }) => (
        <Form className="form personlized-search-form row pt-3">
          <div className="form__form-group">
            <span className="form__form-group-label">Items</span>
            <div className="form__form-group-field">
              <GroupedOptionsFormikSelect
                name="filter"
                type="text"
                itemOptions={itemFilterOptions}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                value={values.filter}
                touched={touched.filter}
                error={errors.filter}
              />
            </div>
          </div>

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
