/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button, IconButton, Stack, Typography } from '@mui/material';
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
    <Stack justifyContent="center" sx={{ height: '100%', width: '100%', padding: '0px 60px' }}>
      <Typography sx={{ fontSize: 40, color: mainColor }}>Let's Get Started!</Typography>
      <Typography>Enter Your credentials to access your account</Typography>
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
              await dispatch(setUser({ user: response.data, isAuthenticated: true }));
              localStorage.setItem('token', response.data.token);
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
            <Stack spacing={2} sx={{ width: '100%', marginTop: 2 }}>
              {/* email */}
              <MuiFormikField
                name="email"
                startIcon={<EmailOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />}
                type="email"
                placeholder="Email"
                className="col-12"
                sx={{ backgroundColor: palette.primary.contrastText, borderColor: mainColor }}
              />

              {/* Password */}
              <MuiFormikField
                name="password"
                className="col-12"
                startIcon={<LockOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />}
                endIcon={
                  <IconButton sx={{ color: mainColor }} onClick={e => showPassword(e)}>
                    {state.showPassword ? (
                      <VisibilityOffOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />
                    ) : (
                      <VisibilityOutlinedIcon sx={{ color: mainColor, fontSize: 20 }} />
                    )}
                  </IconButton>
                }
                type={state.showPassword ? 'text' : 'password'}
                placeholder="Password"
                sx={{ backgroundColor: palette.primary.contrastText, borderColor: mainColor }}
              />

              {/* forgot Password */}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography sx={{ textAlign: 'end', fontSize: 12, fontWeight: 400 }}>
                  Forgot Password?
                </Typography>
              </Link>

              <Stack sx={{ padding: '0px 50px' }}>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  sx={{ backgroundColor: mainColor, fontSize: 18 }}
                >
                  Login
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

export default LogInForm;
