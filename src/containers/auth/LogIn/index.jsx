/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogInForm from './components/LogInForm';
import 'styles/auth-form.scss';
import 'styles/auth-form-cards.scss';

const LogIn = props => {
  const { isAuthenticated, allowSystemAccess } = props;
  const { location } = props;
  const { state } = location;

  if (isAuthenticated) {
    return (
      <Navigate
        to={
          allowSystemAccess
            ? {
                pathname: state ? state.from.pathname : '/',
                search: state ? state.from.search : '',
                state: state ? state.from.state : null,
              }
            : {
                pathname: '/pages/user/profile', // if user is not allowed for system then this route will work
              }
        }
      />
    );
  }

  return (
    <div className="container-fluid account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              Welcome to
              <span className="account__logo">
                {' '}
                Luxury
                <span className="account__logo-accent">Explorers</span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">Redefined Luxury</h4>
          </div>
          <LogInForm />
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  allowSystemAccess: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

LogIn.defaultProps = {
  isAuthenticated: false,
  location: {
    state: {
      pathname: '',
    },
  },
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    allowSystemAccess: state.auth.user ? state.auth.user.profile.system_access : false,
  };
};

export default connect(mapStateToProps, null)(LogIn);
