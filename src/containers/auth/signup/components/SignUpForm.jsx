import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, Grid, Stack, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// shared
import MuiFormikField from 'shared/components/form/MuiFormikField';
import { CheckBoxField } from 'shared/components/form/CheckBox';
// utilities
import { RECAPTCHA_PUBLIC_KEY } from 'utilities/constants';
// styles
import { useAdminSignUpMutation } from 'services/public/auth';
// utilities and styles
import {
  loginFormChildWrapperStyle,
  loginFormIconStyle,
  loginFormInputStyle,
  loginFormLoginButtonStyle,
  loginFormMainHeadingStyle,
  loginFormParentWrapperStyle,
} from 'styles/mui/container/auth/login/components/login-form';

function SignUpForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [singUpAdmin] = useAdminSignUpMutation();

  function onChangeCaptcha(value, setFieldValue) {
    setFieldValue('g_recaptcha_response', value);
  }

  const handleSubmitForm = useCallback(async (values, { setErrors, resetForm }) => {
    let response = null;
    try {
      response = await singUpAdmin(values);

      if (response.error) {
        enqueueSnackbar(response.error.data.email[0], { variant: 'error' });
        setErrors(response.error.data);
        return;
      }

      enqueueSnackbar('Credentials have been forwarded to your email', { variant: 'success' });
      navigate('/auth/login');
      resetForm();
    } catch (error) {
      if (response?.error?.data?.message) {
        enqueueSnackbar(response.error.data.message, { variant: 'error' });
        return;
      }
      enqueueSnackbar('Somthing went wrong!', { variant: 'error' });
    }
  }, []);
  return (
    <Stack sx={loginFormParentWrapperStyle}>
      <Stack sx={loginFormChildWrapperStyle}>
        <Grid item xs={12}>
          <Typography sx={loginFormMainHeadingStyle}>Let&apos;s Get Started!</Typography>
          <Typography>Enter Your credentials to access your account</Typography>
        </Grid>

        <Formik
          initialValues={{ email: '', agreed_to_terms: false, is_admin: true, g_recaptcha_response: '' }}
          onSubmit={handleSubmitForm}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Grid container>
                {/* email */}
                <MuiFormikField
                  name="email"
                  startIcon={<EmailOutlinedIcon sx={loginFormIconStyle} />}
                  type="email"
                  className="col-12"
                  placeholder="Email"
                  sx={loginFormInputStyle}
                />

                <Grid item xs={12} className="mt-3">
                  <CheckBoxField name="agreed_to_terms" label="Agree Terms and Conditions" />
                </Grid>

                <Grid item xs={12} className="mt-3">
                  <ReCAPTCHA
                    style={{ width: '100%' }}
                    sitekey={RECAPTCHA_PUBLIC_KEY}
                    onChange={value => onChangeCaptcha(value, setFieldValue)}
                  />
                </Grid>

                <Grid item xs={12} className="mt-3">
                  <Button disabled={isSubmitting} type="submit" sx={loginFormLoginButtonStyle}>
                    Sign Up
                  </Button>
                </Grid>

                <Grid item xs={12} className="mt-2">
                  <Typography sx={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>
                    Already have Account?
                    <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                      Sign In
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
}

export default SignUpForm;
