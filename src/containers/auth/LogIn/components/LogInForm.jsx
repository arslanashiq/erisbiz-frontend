/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import { FormikField } from 'shared/components/form/Field';
import { EMAIL_REGEX } from 'utilities/constants';
import { useNavigate } from 'react-router-dom';
import { useAdminLoginMutation } from 'services/public/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { Button } from '@mui/material';

function LogInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    showPassword: false,
  });
  const [adminLogin, response] = useAdminLoginMutation();
  const showPassword = e => {
    e.preventDefault();
    setState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }));
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().matches(EMAIL_REGEX, 'Invalid email address').required('Required'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const payload = {
          email: values.email,
          password: values.password,
        };
        const resp = await adminLogin(payload);
        setSubmitting(false);
        if (resp.data) {
          await dispatch(setUser({ user: resp.data, isAuthenticated: true }));
          localStorage.setItem('token', resp.data.token);
          setTimeout(() => {
            navigate('/');
          }, 10);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <div className="form__form-group">
            <span className="form__form-group-label">Email</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <PersonIcon />
              </div>
              <FormikField name="email" type="text" placeholder="Email" />
            </div>
            <ErrorMessage className="form__form-group-error" component="span" name="email" />
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Password</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <KeyIcon />
              </div>
              <FormikField
                name="password"
                type={state.showPassword ? 'text' : 'password'}
                placeholder="Password"
              />
              <button
                className={`form__form-group-button${state.showPassword ? ' active' : ''}`}
                onClick={e => showPassword(e)}
                type="button"
              >
                <VisibilityIcon />
              </button>
            </div>
            <div className="account__forgot-password">
              <a href="/auth/forgot-password">Forgot a password?</a>
            </div>
          </div>

          <Button
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
