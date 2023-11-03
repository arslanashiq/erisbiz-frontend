import React from 'react';
import { Box } from '@mui/material';
import ForgetPasswordForm from './components/ForgetPassword';
import 'styles/form/auth-form-cards.scss';
import 'styles/form/auth-form.scss';

function ForgetPassword() {
  return (
    <Box className="account">
      <Box className="account__wrapper">
        <Box className="account__card">
          <Box className="account__head">
            <h3 className="account__title">
              <span className="account__logo">Forgot Password?</span>
            </h3>
            <h4 className="account__subhead subhead">Enter your email to reset your password.</h4>
          </Box>
          <ForgetPasswordForm />
        </Box>
      </Box>
    </Box>
  );
}
export default ForgetPassword;
