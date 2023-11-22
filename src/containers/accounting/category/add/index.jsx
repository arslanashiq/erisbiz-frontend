import React from 'react';
import { Helmet } from 'react-helmet';
import { Formik, Form } from 'formik';
import { Card, CardContent } from '@mui/material';
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
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// utilities
import { categoryInitialValue } from '../utilities/constants';
// styles
import 'styles/form/form.scss';
import { categoryFormValidationSchema } from '../utilities/validation-schema';

function AddCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const { initialValues } = useInitialValues(categoryInitialValue, useGetSingleCategoryQuery);
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
            onSubmit={async (values, { setErrors }) => {
              try {
                let response = null;
                if (id) {
                  response = await editCategory({ id, payload: values });
                } else {
                  response = await addCategory(values);
                }

                if (response.data) {
                  navigate(-1);
                }
                if (response.error) {
                  setErrors(response.error.data);
                }
              } catch (err) {
                if (err?.response?.status === 400) {
                  setErrors(err.response.data);
                }
              }
            }}
          >
            <Form className="form form--horizontal row mt-3">
              <FormikField
                name="category_name"
                type="text"
                placeholder="Category Name"
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
