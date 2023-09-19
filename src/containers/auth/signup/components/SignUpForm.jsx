import React from 'react';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, Grid, Stack, Typography } from '@mui/material';
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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [singUpAdmin] = useAdminSignUpMutation();

  // useHandleApiResponse(error, isSuccess, "");

  function onChangeCaptcha(value, setFieldValue) {
    setFieldValue('g_recaptcha_response', value);
  }

  return (
    <Stack sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Stack sx={{ width: '100%', maxWidth: 500, padding: '0px 50px' }}>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 30, color: mainColor }}>Let&apos;s Get Started!</Typography>
          <Typography>Enter Your credentials to access your account</Typography>
        </Grid>

        <Formik
          initialValues={{ email: '', agreed_to_terms: false, is_admin: true, g_recaptcha_response: '' }}
          onSubmit={async (values, { setErrors, resetForm }) => {
            try {
              const response = await singUpAdmin(values);

              if (response.error) {
                enqueueSnackbar(response.error.data.email[0], { variant: 'error' });
                setErrors(response.error.data);
                return;
              }

              enqueueSnackbar(response.data.message, { variant: 'success' });
              navigate('/auth/login');
              resetForm();
            } catch (error) {
              enqueueSnackbar('Somthing went worng!', { variant: 'error' });
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Grid container>
                {/* email */}
                <MuiFormikField
                  name="email"
                  startIcon={<EmailOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />}
                  type="email"
                  className="col-12"
                  placeholder="Email"
                  sx={{ backgroundColor: palette.primary.contrastText, borderColor: mainColor }}
                />

                <Grid item xs={12} className="mt-3">
                  <CheckBoxField name="agreed_to_terms" label="Agree Terms and Conditions" />
                </Grid>

                <Grid item xs={12} className="mt-3">
                  <ReCAPTCHA
                    style={{ width: '100%' }}
                    sitekey={RECAPTCHA_PRIVATE_KEY}
                    onChange={value => onChangeCaptcha(value, setFieldValue)}
                  />
                </Grid>

                <Grid item xs={12} className="mt-3">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    sx={{ backgroundColor: mainColor, fontSize: 18, width: '100%', maxWidth: 400 }}
                  >
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
