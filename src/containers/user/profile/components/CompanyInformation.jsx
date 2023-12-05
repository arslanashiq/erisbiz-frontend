import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import { Box, Button, Stack, Typography } from '@mui/material';
// services
import { useGetCurrenciesListQuery } from 'services/public/currency';
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
// custom hooks and containers
import useListOptions from 'custom-hooks/useListOptions';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import SecurityQuestions from 'containers/auth/register-company/components/SecurityQuestions';
import { CompanyFormValidationSchema } from 'containers/auth/register-company/utilities/validation-schema';
// utilities
import { convertURLToFile } from 'utilities/helpers';
import { useUpdateCompanyMutation } from 'services/private/user';

function CompanyInformation({ companyData }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isDisabled, setIsDisabled] = useState(true);
  const [updatedCompanyData, setUpdatedCompanyData] = useState(companyData);

  const [updateCompany] = useUpdateCompanyMutation();

  const countriesResponse = useGetAllCountriesListQuery();
  const activeCurrenciesResponse = useGetCurrenciesListQuery();

  const { optionsList: countriesList } = useListOptions(countriesResponse?.data?.data, {
    label: 'country',
    value: 'iso2',
  });
  const { optionsList: currenciesList } = useListOptions(activeCurrenciesResponse?.data?.results, {
    label: 'currency_name',
    value: 'id',
  });

  useEffect(() => {
    (async () => {
      if (!companyData.logo) return;
      const file = await convertURLToFile(companyData.logo);
      const updatedDataWithLogo = { ...companyData, currency: companyData?.currency_detail?.id, logo: file };
      if (updatedCompanyData.currency_detail) {
        delete updatedDataWithLogo.currency_detail;
      }
      if (updatedCompanyData.created_by) {
        delete updatedDataWithLogo.created_by;
      }
      if (updatedCompanyData.users) {
        delete updatedDataWithLogo.users;
      }
      setUpdatedCompanyData(updatedDataWithLogo);
    })();
  }, [companyData]);
  return (
    <Formik
      enableReinitialize
      initialValues={updatedCompanyData}
      validationSchema={CompanyFormValidationSchema}
      onSubmit={async (values, { setErrors }) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (key === 'security_question') {
            values.security_question.forEach((question, index) => {
              formData.append(`security_question[${index}]question`, question.question);
              formData.append(`security_question[${index}]answer`, question.answer);
            });
          } else {
            formData.append(key, values[key]);
          }
        });

        const response = await updateCompany(formData);
        if (response.error) {
          setErrors(response.error.data);
          return;
        }
        enqueueSnackbar('Company Data Uppdated Successfully', { varient: 'Success' });

        navigate('/');
      }}
    >
      <Box>
        <Form className={`${isDisabled ? 'user-profile' : 'form'} form form--horizontal row pt-3`}>
          <FormikField name="name" label="Company Name" className="col-12" isRequired disabled />
          <FormikField name="vat_number" label="VAT Number" className="col-lg-6" disabled={isDisabled} />
          <FormikField
            name="trade_license_number"
            label="License #"
            className="col-lg-6"
            disabled={isDisabled}
          />
          <FormikField name="phone" label="Phone Number" className="col-lg-6" disabled={isDisabled} />
          <FormikField name="website" label="Website" className="col-lg-6" disabled={isDisabled} />
          <FormikSelect
            name="country"
            options={countriesList}
            label="Country"
            className="col-lg-6"
            disabled={isDisabled}
            isRequired
          />
          <FormikSelect
            name="currency"
            options={currenciesList}
            label="Currency"
            className="col-lg-6"
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
