import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import { EMAIL_REGEX } from 'utilities/constants';
import { useNavigate } from 'react-router-dom';
import { useAdminLoginMutation } from 'services/public/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { Button } from '@mui/material';
import FormikField from 'shared/components/form/FormikField';
import { useSnackbar } from 'notistack';

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
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().matches(EMAIL_REGEX, 'Invalid email address').required('Required'),
        // password: Yup.string().required('Required'),
      })}
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
        <Form className="form auth-form">
          <FormikField
            name="email"
            type="text"
            placeholder="Email"
            startIcon={<PersonIcon />}
            label="Email"
          />

          <FormikField
            name="password"
            type={state.showPassword ? 'text' : 'password'}
            placeholder="Password"
            startIcon={<KeyIcon />}
            label="Password"
            endIcon={state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            endIconClick={showPassword}
          />
          <div className="account__forgot-password d-flex justify-content-end">
            <a href="/auth/forgot-password">Forgot a password?</a>
          </div>

          <Button
            size="large"
            type="submit"
            className="btn btn-primary account__btn account__btn--small mt-5"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LogInForm;
