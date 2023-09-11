import React, { useRef } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
// services
import { useRegisterCompanyMutation } from 'services/public/auth';
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
import { useGetCurrenciesListQuery } from 'services/public/currency';
// shared
import MuiFormikField from 'shared/components/form/MuiFormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
// containers
import { registerCompanyInitialValues } from 'containers/auth/utilities/initialValues';
// styles
import 'styles/form/auth-form.scss';
// components
import SecurityQuestions from './SecurityQuestions';

function RegisterCompanyForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [registerCompany] = useRegisterCompanyMutation();
  const imageInputRef = useRef();
  const countriesResponse = useGetAllCountriesListQuery();
  const currenciesResponse = useGetCurrenciesListQuery();

  const CountriesOptions = countriesResponse?.data?.data?.map(country => ({
    value: country.iso2,
    label: country.country,
  }));
  const currenciesOption = currenciesResponse?.data?.results?.map(currency => ({
    value: currency.id,
    label: currency.currency_name,
  }));
  const handleChangeImage = (e, setFieldValue) => {
    if (e.target.files.length > 0) {
      setFieldValue('logo', e.target.files[0]);
    }
  };
  if (!location?.state) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Grid
      container
      className="main__wrapper"
      sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid item xs={11} md={7}>
        <Formik
          initialValues={registerCompanyInitialValues}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await registerCompany({ values, token: location.state.token });
              console.log(response, 'asdad');
              if (response.error) {
                enqueueSnackbar(response.error.data.error, { variant: 'error' });
                setSubmitting(false);
                setErrors(response.error.data);
                return;
              }
              enqueueSnackbar('Company Added Successfully', { variant: 'success' });
              navigate('/auth/login');
            } catch (error) {
              enqueueSnackbar('Somthing went worng!', { variant: 'error' });
            }
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <Box spacing={2} sx={{ width: '100%', marginTop: 2 }} className="row">
                {/* company Name */}
                <MuiFormikField
                  name="name"
                  placeholder="Company Name"
                  isRequired
                  size="small"
                  label="Company Name"
                  className="col-12"
                />
                <Box className="col-12 row p-0 m-0">
                  <Box className="col-md-6">
                    {/* country */}
                    <FormikSelect
                      name="country"
                      placeholder="Country Name"
                      label="Country Name"
                      className="col-12"
                      options={CountriesOptions}
                    />
                    {/* currency */}
                    <FormikSelect
                      name="currency"
                      placeholder="Currency"
                      label="Currency"
                      className="col-12"
                      options={currenciesOption}
                    />
                    {/* phone num */}
                    <MuiFormikField
                      name="phone"
                      placeholder="Phone"
                      size="small"
                      label="Phone"
                      className="col-12"
                    />
                  </Box>
                  {/* logo */}
                  <Box className="mb-2 col-md-6">
                    <Typography>Company Logo</Typography>
                    <Stack
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: '#eaeaea',
                        height: 165,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                      }}
                      onClick={() => {
                        imageInputRef.current.click();
                      }}
                    >
                      {values.logo ? (
                        <img
                          style={{ height: 150, width: '100%', objectFit: 'contain' }}
                          src={URL.createObjectURL(values.logo)}
                          alt="company main profile logo"
                        />
                      ) : (
                        <>
                          <ImageIcon sx={{ fontSize: 100 }} />
                          <Typography sx={{ fontSize: 14 }}>Upload Logo</Typography>
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
                  </Box>
                </Box>

                {/* vat number */}
                <MuiFormikField
                  name="vat_number"
                  placeholder="Vat Registration"
                  size="small"
                  label="VAT Registration No"
                />
                {/* license Number */}
                <MuiFormikField
                  name="trade_license_number"
                  placeholder="License Number"
                  size="small"
                  label="License Number"
                />
                {/* Address */}
                <MuiFormikField name="location" placeholder="Address" size="small" label="Address" />
                {/* website */}
                <MuiFormikField name="website" placeholder="Website" size="small" label="Website" />

                <FieldArray name="security_question" component={SecurityQuestions} />
                <Stack sx={{ padding: '0px 10px' }}>
                  <Button disabled={isSubmitting} type="submit" sx={{ fontSize: 18 }}>
                    Register
                  </Button>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default RegisterCompanyForm;
