import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import MuiFormikField from 'shared/components/form/MuiFormikField';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useAdminLoginMutation } from 'services/public/auth';
import { setUser } from 'store/slices/userSlice';
import {
  loginFormChildWrapperStyle,
  loginFormIconStyle,
  loginFormInputStyle,
  loginFormParentWrapperStyle,
  loginFormMainHeadingStyle,
  loginFormIconButtonStyle,
  loginFormLoginButtonStyle,
} from 'styles/mui/container/auth/login/components/login-form';

function LogInForm() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    showPassword: false,
  });
  const [adminLogin] = useAdminLoginMutation();
  const showPassword = useCallback(e => {
    e.preventDefault();
    setState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }));
  }, []);

  const handleSubmitForm = useCallback(async (values, { setSubmitting, setErrors }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await adminLogin(payload);
      setSubmitting(false);

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        const companyStatus = response.data?.user?.is_regestered_company || false;
        // const paymentStatus = response.data?.user?.company?.is_payment || false;
        dispatch(
          setUser({
            user: response.data.user,
            company: response.data?.user?.company,
            isAuthenticated: true,
            is_regestered_company: companyStatus,
            // is_payment: paymentStatus,
            is_payment: true,
          })
        );

        setTimeout(() => {
          if (sessionStorage.getItem('lastUrl')) {
            navigate(sessionStorage.getItem('lastUrl'));
          } else {
            navigate('/', { replace: true });
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
      enqueueSnackbar('Somthing went wrong!', { variant: 'error' });
    }
  }, []);

  return (
    <Stack {...loginFormParentWrapperStyle}>
      <Stack {...loginFormChildWrapperStyle}>
        <Grid item xs={12} className="mb-3">
          <Typography sx={loginFormMainHeadingStyle}>{'Let\'s Get Started!'}</Typography>
          <Typography>Enter Your credentials to access your account</Typography>
        </Grid>
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmitForm}>
          {({ isSubmitting }) => (
            <Form>
              <Grid container>
                {/* email */}
                <MuiFormikField
                  name="email"
                  startIcon={<EmailOutlinedIcon sx={loginFormIconStyle} />}
                  type="email"
                  placeholder="Email"
                  sx={loginFormInputStyle}
                />
                {/* Password */}
                <MuiFormikField
                  name="password"
                  startIcon={<LockOutlinedIcon sx={loginFormIconStyle} />}
                  endIcon={(
                    <IconButton sx={loginFormIconButtonStyle} onClick={e => showPassword(e)}>
                      {state.showPassword ? (
                        <VisibilityOffOutlinedIcon sx={loginFormIconStyle} />
                      ) : (
                        <VisibilityOutlinedIcon sx={loginFormIconStyle} />
                      )}
                    </IconButton>
                  )}
                  type={state.showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  sx={loginFormInputStyle}
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
                  <Button disabled={isSubmitting} type="submit" sx={loginFormLoginButtonStyle}>
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
