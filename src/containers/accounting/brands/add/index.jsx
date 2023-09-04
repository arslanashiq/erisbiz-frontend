import React from 'react';
import { Helmet } from 'react-helmet';
import { Formik, Form } from 'formik';
import { Card, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
// services
import { useAddBrandMutation, useEditBrandMutation, useGetSingleBrandQuery } from 'services/private/brands';
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// utilities
import { brandInitialValue } from '../utilities/constants';
// styles
import 'styles/form/form.scss';

function AddBrand() {
  const { id } = useParams();
  const navigate = useNavigate();
  const countriesResponse = useGetAllCountriesListQuery();
  const [addBrand] = useAddBrandMutation();
  const [editBrand] = useEditBrandMutation();
  const { initialValues } = useInitialValues(brandInitialValue, useGetSingleBrandQuery);
  const brandsRegionOptions = countriesResponse?.data?.data?.map(country => ({
    value: country.iso2,
    label: country.country,
  }));

  return (
    <>
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
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                let response = null;
                if (id) {
                  response = await editBrand({ id, payload: values });
                } else {
                  response = await addBrand(values);
                }
                setSubmitting(false);
                if (response.data) {
                  navigate(-1);
                }
                if (response.error) {
                  setErrors(response.error.data);
                }
              } catch (err) {
                if (err.response && err.response.status === 400) {
                  setSubmitting(true);
                  setErrors(err.response.data);
                  setSubmitting(false);
                } else {
                  // doReturnErrors(err.response.data, err.response.status);
                }
              }
            }}
          >
            <Form className="form form--horizontal row mt-3">
              {/* Brand Name */}
              <FormikField name="brand_name" type="text" placeholder="Brand Name" label="Brand Name" />

              {/* Account Number */}
              <FormikSelect
                placeholder="Brand Region/Country"
                name="brand_region"
                options={brandsRegionOptions}
                label="Brand Region"
              />

              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </>
  );
}

export default AddBrand;
