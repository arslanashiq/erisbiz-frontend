import React from 'react';
import ForgetPasswordForm from './components/ForgetPassword';
import 'styles/auth-form-cards.scss';
import 'styles/auth-form.scss';

function ForgetPassword() {
  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              <span className="account__logo">Forgot Password?</span>
            </h3>
            <h4 className="account__subhead subhead">Enter your email to reset your password.</h4>
          </div>
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
}
export default ForgetPassword;
