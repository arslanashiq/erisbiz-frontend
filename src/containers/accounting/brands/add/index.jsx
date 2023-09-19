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
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
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

  const { optionsList: brandsRegionOptions } = useListOptions(countriesResponse?.data?.data, {
    label: 'country',
    value: 'iso2',
  });

  return (
    <SectionLoader options={[brandsRegionOptions.length === 0]}>
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
            onSubmit={async (values, { setErrors }) => {
              try {
                let response = null;
                if (id) {
                  response = await editBrand({ id, payload: values });
                } else {
                  response = await addBrand(values);
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
    </SectionLoader>
  );
}

export default AddBrand;
