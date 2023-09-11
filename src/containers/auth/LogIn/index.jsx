import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

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

LogIn.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

LogIn.defaultProps = {
  location: {
    state: {
      pathname: '',
    },
  },
};

export default LogIn;
