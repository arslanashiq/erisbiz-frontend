import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Button, Card, CardContent, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
// services
import {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetSingleCategoryQuery,
} from 'services/private/category';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { categoryInitialValue } from '../utilities/constants';
import { categoryFormValidationSchema } from '../utilities/validation-schema';
import 'styles/form/form.scss';

function AddCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const { initialValues } = useInitialValues(categoryInitialValue, useGetSingleCategoryQuery);

  const handleSubmitForm = useCallback(async (values, { setErrors, resetForm }) => {
    try {
      let response = null;
      if (id) {
        response = await editCategory({ id, payload: values });
      } else {
        response = await addCategory(values);
      }

      if (response.error) {
        setErrors(response.error.data);
        return;
      }
      if (values.save_and_continue) {
        resetForm();
        return;
      }
      navigate(-1);
    } catch (err) {
      if (err?.response?.status === 400) {
        setErrors(err.response.data);
      }
    }
  }, {});
  return (
    <SectionLoader>
      <Helmet>
        <title>Category - ErisBiz</title>
        <meta name="description" content="CRM - Luxury Explorers" />
      </Helmet>
      <Card>
        <CardContent>
          <FormHeader title="Category" />

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={categoryFormValidationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ isSubmitting, setFieldValue, resetForm }) => (
              <Form className="form form--horizontal row mt-3">
                <FormikField
                  name="category_name"
                  type="text"
                  // placeholder="Category Name"
                  label="Category Name"
                  isRequired
                  className="col-12"
                />

                <ErrorFocus />

                <Stack spacing={2} direction="row">
                  <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => {
                      setFieldValue('save_and_continue', true);
                    }}
                    color="secondary"
                  >
                    Save and Continue
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      resetForm();
                    }}
                    disabled={isSubmitting}
                    className="text-capitalize"
                  >
                    Cancel
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddCategory;
