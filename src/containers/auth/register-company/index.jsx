import React from 'react';
import { Helmet } from 'react-helmet';
// components
import RegisterCompanyForm from './components/RegisterCompanyForm';

function RegisterCompanyPage() {
  return (
    <>
      <Helmet>
        <title>Register Company - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <RegisterCompanyForm />
    </>
  );
}

export default RegisterCompanyPage;
