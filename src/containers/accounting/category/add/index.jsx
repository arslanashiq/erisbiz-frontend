import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
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
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { categoryInitialValue } from '../utilities/constants';
import { categoryFormValidationSchema } from '../utilities/validation-schema';
import 'styles/form/form.scss';

function AddCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
      if (location?.state?.backUrl) {
        navigate(location.state.backUrl, {
          state: { initialValues: { ...location.state.initialValues, category: response.data.uid } },
          replace: true,
        });
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
            <Form className="form form--horizontal row mt-3">
              <FormikField
                name="category_name"
                type="text"
                // placeholder="Category Name"
                label="Category Name"
                isRequired
                className="col-12"
              />

              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddCategory;
