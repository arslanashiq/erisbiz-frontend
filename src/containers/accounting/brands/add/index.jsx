import { Button, Card, CardContent, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router';
import { useAddBrandMutation, useEditBrandMutation, useGetSingleBrandQuery } from 'services/private/brands';
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikModernField from 'shared/components/form/FormikModernField';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import 'styles/form.scss';
import { brandInitialValue } from '../utils/constants';

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
            {({ isSubmitting, touched, resetForm }) => (
              <Form className="form form--horizontal row mt-3">
                {/* Brand Name */}
                <div className="form__form-group col-md-6">
                  <span className="form__form-group-label col-lg-3 required">Brand Name</span>
                  <div className="form__form-group-field ">
                    <FormikModernField name="brand_name" type="text" placeholder="Brand Name" />
                  </div>
                </div>
                {/* Account Number */}
                <div className="form__form-group col-md-6">
                  <span className="form__form-group-label col-lg-3 required">Brand Region</span>
                  <div className="form__form-group-field ">
                    <FormikModernSelect
                      placeholder="Brand Region/Country"
                      name="brand_region"
                      options={brandsRegionOptions}
                    />
                  </div>
                </div>

                <ErrorFocus />
                <Stack spacing={2} direction="row">
                  <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
                    Save
                  </Button>

                  <Button
                    color="secondary"
                    onClick={() => resetForm(initialValues)}
                    disabled={!touched || isSubmitting}
                    className="text-capitalize"
                  >
                    {id ? 'Reset' : 'Clear'}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </>
  );
}

export default AddBrand;
