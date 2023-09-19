import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import palette from 'styles/mui/theme/palette';
import MuiFormikField from 'shared/components/form/MuiFormikField';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useAdminLoginMutation } from 'services/public/auth';
import { setUser } from 'store/slices/userSlice';
import { mainColor } from 'containers/auth/utilities/constant';

function LogInForm() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    showPassword: false,
  });
  const [adminLogin] = useAdminLoginMutation();
  const showPassword = e => {
    e.preventDefault();
    setState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }));
  };

  return (
    <Stack sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Stack sx={{ width: '100%', maxWidth: 500, padding: '0px 50px' }}>
        <Grid item xs={12} className="mb-3">
          <Typography sx={{ fontSize: 30, color: mainColor }}>{'Let\'s Get Started!'}</Typography>
          <Typography>Enter Your credentials to access your account</Typography>
        </Grid>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const payload = {
              email: values.email,
              password: values.password,
            };
            try {
              const response = await adminLogin(payload);
              setSubmitting(false);

              if (response.data) {
                localStorage.setItem('token', response.data.token);
                // const companyStatus = response.data?.user?.is_regestered_company;
                await dispatch(
                  setUser({
                    user: response.data,
                    isAuthenticated: true,
                    // is_regestered_company: companyStatus,
                    is_regestered_company: true,
                  })
                );

                setTimeout(() => {
                  if (sessionStorage.getItem('lastUrl')) {
                    navigate(sessionStorage.getItem('lastUrl'));
                  } else {
                    navigate('/');
                  }
                }, 10);
              }

              if (response.error) {
                if (response.error.data.non_field_errors) {
                  enqueueSnackbar(response.error.data.non_field_errors[0], { variant: 'error' });
                } else {
                  setSubmitting(false);
                  setErrors(response.error.data);
                }
              }
            } catch (error) {
              enqueueSnackbar('Somthing went worng!', { variant: 'error' });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container>
                {/* email */}
                <MuiFormikField
                  name="email"
                  startIcon={<EmailOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />}
                  type="email"
                  placeholder="Email"
                  sx={{ backgroundColor: palette.primary.contrastText, borderColor: mainColor }}
                />
                {/* Password */}
                <MuiFormikField
                  name="password"
                  startIcon={<LockOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />}
                  endIcon={(
                    <IconButton sx={{ color: mainColor }} onClick={e => showPassword(e)}>
                      {state.showPassword ? (
                        <VisibilityOffOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />
                      ) : (
                        <VisibilityOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />
                      )}
                    </IconButton>
                  )}
                  type={state.showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  sx={{ backgroundColor: palette.primary.contrastText, borderColor: mainColor }}
                />
                {/* forgot Password */}
                <Grid item xs={12}>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, textAlign: 'end' }}>
                      Forgot Password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} className="mt-3">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    sx={{ backgroundColor: mainColor, fontSize: 18, width: '100%' }}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12} className="mt-2">
                  <Typography sx={{ textAlign: 'center', color: 'gray', fontSize: 14, maxWidth: 400 }}>
                    Create new account :{' '}
                    <Link to="/auth/signup" style={{ textDecoration: 'none' }}>
                      Sign Up
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

export default LogInForm;
