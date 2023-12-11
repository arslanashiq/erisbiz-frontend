import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
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
import FormikWrapper from 'containers/common/form/FormikWrapper';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// utilities
import { categoryInitialValue } from '../utilities/constants';
import { categoryFormValidationSchema } from '../utilities/validation-schema';

function AddCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const { initialValues } = useInitialValues(categoryInitialValue, useGetSingleCategoryQuery);

  const handleSubmitForm = useCallback(async (values, { setErrors }) => {
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
          <FormikWrapper
            initialValues={initialValues}
            validationSchema={categoryFormValidationSchema}
            onSubmit={handleSubmitForm}
          >
            <FormikField
              name="category_name"
              type="text"
              placeholder="Category Name"
              label="Category Name"
              isRequired
              className="col-12"
            />

            <FormSubmitButton />
          </FormikWrapper>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddCategory;
