/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, Stack, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// shared
import MuiFormikField from 'shared/components/form/MuiFormikField';
import { CheckBoxField } from 'shared/components/form/CheckBox';
// containers
import { mainColor } from 'containers/auth/utilities/constant';
// utilities
import { RECAPTCHA_PRIVATE_KEY } from 'utilities/constants';
// styles
import palette from 'styles/mui/theme/palette';
import { useAdminSignUpMutation } from 'services/public/auth';

function SignUpForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [singUpAdmin] = useAdminSignUpMutation();
  function onChangeCaptcha(value, setFieldValue) {
    console.log('Captcha value:', value);
    setFieldValue('g_recaptcha_response', value);
  }
  return (
    <Stack justifyContent="center" sx={{ height: '100%', width: '100%', padding: '0px 60px' }}>
      <Typography sx={{ fontSize: 40, color: mainColor }}>Let's Get Started!</Typography>
      <Typography>Enter Your credentials to access your account</Typography>
      <Formik
        initialValues={{ email: '', agreed_to_terms: false, is_admin: true, g_recaptcha_response: '' }}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            let response = null;
            response = await singUpAdmin(values);
            if (response.data) {
              enqueueSnackbar(response.data.message, { variant: 'success' });
              resetForm();
            }
            if (response.error) {
              enqueueSnackbar(response.error.data.email[0], { variant: 'error' });

              setSubmitting(false);
              setErrors(response.error.data);
            }
          } catch (error) {
            enqueueSnackbar('Somthing went worng!', { variant: 'error' });
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Stack spacing={2} sx={{ width: '100%', marginTop: 2 }}>
              {/* email */}
              <MuiFormikField
                name="email"
                startIcon={<EmailOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />}
                type="email"
                className="col-12"
                placeholder="Email"
                sx={{ backgroundColor: palette.primary.contrastText, borderColor: mainColor }}
              />

              <CheckBoxField name="agreed_to_terms" label="Agree Terms and Conditions" />
              <ReCAPTCHA
                sitekey={RECAPTCHA_PRIVATE_KEY}
                onChange={value => onChangeCaptcha(value, setFieldValue)}
              />
              <Stack sx={{ padding: '0px 10px' }}>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  sx={{ backgroundColor: mainColor, fontSize: 18 }}
                >
                  Sign Up
                </Button>
              </Stack>
              <Typography sx={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>
                Create new account :{' '}
                <Link to="/auth/signup" style={{ textDecoration: 'none' }}>
                  Sign In
                </Link>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}

export default SignUpForm;
