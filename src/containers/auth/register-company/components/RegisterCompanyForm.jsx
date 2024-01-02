import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldArray, Form, Formik } from 'formik';
import { Navigate, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import ImageIcon from '@mui/icons-material/Image';
import { Button, Grid, Stack, Typography } from '@mui/material';
// services
import { useRegisterCompanyMutation } from 'services/private/user';
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
import { useGetCurrenciesListQuery } from 'services/public/currency';
// store
import { isUserAuthenticated } from 'store/slices/userSlice';
// shared
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';
import MuiFormikField from 'shared/components/form/MuiFormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
// containers
import { registerCompanyInitialValues } from 'containers/auth/utilities/initialValues';
// styles
import 'styles/form/auth-form.scss';
import {
  registerCompanyChildWrapperStyle,
  registerCompanyFormTitleStyle,
  registerCompanyFormLogoStyle,
  registerCompanyParentWrapperStyle,
  registerCompanyFormWrapperStyle,
  registerCompanyCompanyLogoWrapperStyle,
  registerCompanyCompanyLogoStyle,
  registerCompanyCompanyInnerFormWrapperStyle,
  registerCompanyUploadLogoIconStyle,
  registerCompanyUploadLogoTypography,
  registerCompanySubmitButton,
} from 'styles/mui/container/auth/register-company/components/register-company-form';
// components
import SecurityQuestions from './SecurityQuestions';
import { CompanyFormValidationSchema } from '../utilities/validation-schema';

function RegisterCompanyForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [registerCompany] = useRegisterCompanyMutation();
  const imageInputRef = useRef();
  const countriesResponse = useGetAllCountriesListQuery();
  const currenciesResponse = useGetCurrenciesListQuery();

  const CountriesOptions = countriesResponse?.data?.data?.map(country => ({
    value: country.iso2,
    label: country.country,
  }));
  const currenciesOption = currenciesResponse?.data?.map(currency => ({
    value: currency.id,
    label: currency.currency_name,
  }));
  const handleChangeImage = (e, setFieldValue) => {
    if (e.target.files.length > 0) {
      setFieldValue('logo', e.target.files[0]);
    }
  };

  if (user.isRegesteredCompany) {
    return <Navigate to="/" replace />;
  }
  return (
    <Stack className="main__wrapper" sx={registerCompanyParentWrapperStyle}>
      <Stack direction="row-reverse" width="100%">
        <Button
          variant="text"
          onClick={() => {
            localStorage.clear();
            navigate('/auth/login');
            dispatch(
              isUserAuthenticated({
                isAuthenticated: false,
                is_regestered_company: false,
              })
            );
          }}
        >
          Logout
        </Button>
      </Stack>
      <Stack sx={registerCompanyChildWrapperStyle}>
        <Stack alignItems="center">
          <img src="/logo.png" alt="company-logo" style={registerCompanyFormLogoStyle} />
          <Typography sx={registerCompanyFormTitleStyle}>Set up Your Company Profile</Typography>
        </Stack>

        <Stack sx={registerCompanyFormWrapperStyle}>
          <Formik
            initialValues={registerCompanyInitialValues}
            validationSchema={CompanyFormValidationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const response = await registerCompany(values);
                if (response.error) {
                  if (response?.error?.data?.error) {
                    enqueueSnackbar(response.error.data.error, { variant: 'error' });
                  }

                  setSubmitting(false);
                  setErrors(response.error.data);
                  return;
                }
                enqueueSnackbar('Company Added Successfully', { variant: 'success' });
                window.location.reload();
                navigate('/');
              } catch (error) {
                enqueueSnackbar('Somthing went wrong!', { variant: 'error' });
              }
            }}
          >
            {({ values, isSubmitting, setFieldValue, touched, errors }) => (
              <Form>
                <Stack sx={registerCompanyCompanyInnerFormWrapperStyle}>
                  <Grid container>
                    <MuiFormikField
                      name="name"
                      //  placeholder="Company Name"
                      isRequired
                      size="small"
                      label="Company Name"
                    />
                    <Grid container columnSpacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormikSelect
                          name="country"
                          //  placeholder="Country Name"
                          isRequired
                          label="Country"
                          className="col-12 mt-2"
                          options={CountriesOptions}
                        />
                        <FormikSelect
                          name="currency"
                          //  placeholder="Currency"
                          label="Currency"
                          isRequired
                          className="col-12 mt-2"
                          options={currenciesOption}
                        />
                        <MuiFormikField
                          name="phone"
                          //  placeholder="Phone"
                          size="small"
                          label="Phone"
                          className="mt-2"
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className="mt-2 col-md-6">
                        <Typography className="required">Company Logo</Typography>
                        <Stack
                          sx={registerCompanyCompanyLogoWrapperStyle}
                          onClick={() => {
                            imageInputRef.current.click();
                          }}
                        >
                          {values.logo ? (
                            <img
                              style={registerCompanyCompanyLogoStyle}
                              src={URL.createObjectURL(values.logo)}
                              alt="company main profile logo"
                            />
                          ) : (
                            <>
                              <ImageIcon sx={registerCompanyUploadLogoIconStyle} />
                              <Typography sx={registerCompanyUploadLogoTypography}>Upload Logo</Typography>
                            </>
                          )}

                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={e => handleChangeImage(e, setFieldValue)}
                          />
                        </Stack>
                        {touched?.logo && errors?.logo && (
                          <span className="form__form-group-error">{errors.logo}</span>
                        )}
                      </Grid>
                    </Grid>
                    {/* Address */}
                    <Grid item xs={12} md={6} className="pe-2">
                      <MuiFormikField
                        isRequired
                        name="location"
                        //  placeholder="Address"
                        size="small"
                        label="Address"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} className="ps-2">
                      {/* website */}
                      <MuiFormikField
                        name="website"
                        //  placeholder="Website"
                        size="small"
                        label="Website"
                      />
                    </Grid>
                    {/* vat number */}
                    <MuiFormikField
                      name="vat_number"
                      //  placeholder="Vat Registration"
                      size="small"
                      label="VAT Registration No"
                    />
                    {/* license Number */}
                    <MuiFormikField
                      name="trade_license_number"
                      //  placeholder="License Number"
                      size="small"
                      label="License Number"
                    />

                    <Grid item xs={12}>
                      <FieldArray name="security_question" component={SecurityQuestions} />
                    </Grid>
                    <ErrorFocus />
                    <Grid item xs={12}>
                      <Button disabled={isSubmitting} type="submit" sx={registerCompanySubmitButton}>
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RegisterCompanyForm;
