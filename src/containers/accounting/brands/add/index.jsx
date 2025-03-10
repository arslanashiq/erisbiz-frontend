import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
// services
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
import { useAddBrandMutation, useEditBrandMutation, useGetSingleBrandQuery } from 'services/private/brands';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { brandInitialValue } from '../utilities/constants';
// styles
import { brandsFormValidationSchema } from '../utilities/validation-schema';
import 'styles/form/form.scss';

function AddBrand() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const countriesResponse = useGetAllCountriesListQuery();

  const [addBrand] = useAddBrandMutation();
  const [editBrand] = useEditBrandMutation();

  const { initialValues } = useInitialValues(brandInitialValue, useGetSingleBrandQuery);

  const { optionsList: brandsRegionOptions } = useListOptions(countriesResponse?.data?.data, {
    label: 'country',
    value: 'country',
  });

  const handleSubmitForm = useCallback(async (values, { setErrors, resetForm }) => {
    try {
      let response = null;
      if (id) {
        response = await editBrand({ id, payload: values });
      } else {
        response = await addBrand(values);
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
          state: { initialValues: { ...location.state.initialValues, brand: response.data.uid } },
          replace: true,
        });
        return;
      }
      if (response.data) {
        navigate(-1);
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setErrors(err.response.data);
      }
    }
  }, []);

  return (
    <SectionLoader>
      <Helmet>
        <title>Brands - ErisBiz</title>
        <meta name="description" content="CRM - Luxury Explorers" />
      </Helmet>
      <Card>
        <CardContent>
          <FormHeader title="Brands" />

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={brandsFormValidationSchema}
            onSubmit={handleSubmitForm}
          >
            <Form className="form form--horizontal row mt-3">
              <FormikField
                name="brand_name"
                type="text"
                // placeholder="Brand Name"
                label="Brand Name"
                isRequired
              />

              <FormikSelect
                // placeholder="Brand Region/Country"
                name="brand_region"
                options={brandsRegionOptions}
                label="Brand Region"
                isRequired
              />

              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddBrand;
