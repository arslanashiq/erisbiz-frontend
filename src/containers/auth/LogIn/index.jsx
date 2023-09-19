import React from 'react';
import { Helmet } from 'react-helmet';
// components
import LogInForm from './components/LogInForm';
// styles
import 'styles/form/auth-form.scss';
import 'styles/form/auth-form-cards.scss';

function LogIn() {
  return (
    <>
      <Helmet>
        <title>Login - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <LogInForm />
    </>
  );
}

export default LogIn;
