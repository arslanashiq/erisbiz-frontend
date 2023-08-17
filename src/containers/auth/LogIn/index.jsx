import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import LogInForm from './components/LogInForm';
import 'styles/auth-form.scss';
import 'styles/auth-form-cards.scss';

function LogIn() {
  return (
    <>
      <Helmet>
        <title>Login - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <div className="container-fluid account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">
                Welcome to
                <span className="account__logo">
                  {' '}
                  ErisBiz
                  {/* <span className="account__logo-accent">Explorers</span> */}
                </span>
              </h3>
              <h4 className="account__subhead subhead">Redefined Luxury</h4>
            </div>
            <LogInForm />
          </div>
        </div>
      </div>
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
