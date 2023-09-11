import React from 'react';
import { Helmet } from 'react-helmet';
// shared
import SignUpForm from './components/SignUpForm';

function SignupPage() {
  return (
    <>
      <Helmet>
        <title>SignUp - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <SignUpForm />
    </>
  );
}

export default SignupPage;
