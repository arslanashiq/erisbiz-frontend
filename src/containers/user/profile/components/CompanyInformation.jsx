import { FieldArray, Form, Formik } from 'formik';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormikField from 'shared/components/form/FormikField';
import useListOptions from 'custom-hooks/useListOptions';
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
import FormikSelect from 'shared/components/form/FormikSelect';
import { useGetCurrenciesListQuery } from 'services/public/currency';
import SecurityQuestions from 'containers/auth/register-company/components/SecurityQuestions';
import { Box, Button, Stack, Typography } from '@mui/material';
import { CompanyFormValidationSchema } from 'containers/auth/register-company/utilities/validation-schema';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';

function CompanyInformation({ companyData }) {
  const [isDisabled, setIsDisabled] = useState(true);

  const countriesResponse = useGetAllCountriesListQuery();
  const activeCurrenciesResponse = useGetCurrenciesListQuery();
  const { optionsList: countriesList } = useListOptions(countriesResponse?.data?.data, {
    label: 'country',
    value: 'iso2',
  });
  const currenciesOption = activeCurrenciesResponse?.data?.results?.map(currency => ({
    value: currency.id,
    label: currency.currency_name,
  }));
  return (
    <Formik
      initialValues={{ ...companyData, currency: companyData.currency.id }}
      validationSchema={CompanyFormValidationSchema}
    >
      <Box>
        <Form className="form form--horizontal row pt-3">
          <FormikField name="name" label="Company Name" className="col-12" isRequired disabled />
          <FormikField name="vat_number" label="VAT Number" className="col-6" disabled={isDisabled} />
          <FormikField
            name="trade_license_number"
            label="License #"
            className="col-6"
            disabled={isDisabled}
          />
          <FormikField name="phone" label="Phone Number" className="col-6" disabled={isDisabled} />
          <FormikField name="website" label="Website" className="col-6" disabled={isDisabled} />
          <FormikSelect
            name="country"
            options={countriesList}
            label="Country"
            className="col-6"
            disabled={isDisabled}
            isRequired
          />
          <FormikSelect
            name="currency"
            options={currenciesOption}
            label="Currency"
            className="col-6"
            isRequired
            disabled
          />
          <FormikField name="location" label="Location" className="col-12" isRequired disabled={isDisabled} />
          <Typography sx={{ fontWeight: 'bold' }} className="required">
            Security Questions
          </Typography>

          <FieldArray
            name="security_question"
            render={props => (
              <SecurityQuestions disabled={isDisabled} useMuiField={false} showLabel {...props} />
            )}
          />
          {isDisabled ? (
            <Stack direction="row">
              <Button onClick={() => setIsDisabled(false)}>Edit</Button>
            </Stack>
          ) : (
            <FormSubmitButton
              clearButtonTitle="Cancel"
              clearButtonAction={() => {
                setIsDisabled(true);
              }}
            />
          )}
        </Form>
        {/* <Stack direction="row"> */}
        {/* </Stack> */}
      </Box>
    </Formik>
  );
}
CompanyInformation.propTypes = {
  companyData: PropTypes.object.isRequired,
};

export default CompanyInformation;
