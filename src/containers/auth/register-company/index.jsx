/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
// services
import { useVerifyAdminTokenQuery } from 'services/public/auth';
// shared
import Loader from 'shared/components/loader/Loader';
// components
import RegisterCompanyForm from './components/RegisterCompanyForm';

function RegisterCompanyPage() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const adminVerificationResponse = useVerifyAdminTokenQuery({ id, token }, { skip: !id || !token });
  if (id && token) {
    if (adminVerificationResponse?.data?.success) {
      navigate('/register-company/', {
        state: {
          token: adminVerificationResponse?.data?.token,
        },
      });
    }
    if (adminVerificationResponse?.error) {
      // enqueueSnackbar(adminVerificationResponse.error.data.message, { variant: 'error' });
      navigate('/auth/signup/', {});
    }
    return <Loader />;
  }

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
