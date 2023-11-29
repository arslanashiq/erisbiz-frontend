import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// shared
import FormikField from 'shared/components/form/FormikField';
// utilities and components
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { EMAIL_REGEX } from 'utilities/constants';

function ChangePassword({ userData }) {
  const [showOldPasword, setShowOldPasword] = useState(false);
  const [showNewPasword, setShowNewPasword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
  return (
    <Formik
      initialValues={{
        email: userData?.company_email,
        old_password: '',
        new_password: '',
        confirm_new_password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().matches(EMAIL_REGEX, 'Must be a valid Email').required('Email is required'),
        old_password: Yup.string().required('Old Password is required'),
        new_password: Yup.string().required('New Password is required'),
        confirm_new_password: Yup.string()
          .oneOf([Yup.ref('password'), null], 'New Password and Confirm New Password not match')
          .required('Confirm Password is required'),
      })}
    >
      <Form className="form form--horizontal row pt-3">
        <FormikField name="email" label="Email" className="col-12" type="email" isRequired disabled />
        <FormikField
          name="old_password"
          label="Old Password"
          className="col-12"
          type={showOldPasword ? 'text' : 'password'}
          endIcon={showOldPasword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          endIconClick={() => setShowOldPasword(!showOldPasword)}
          isRequired
        />
        <FormikField
          name="new_password"
          label="New Password"
          className="col-12"
          type={showNewPasword ? 'text' : 'password'}
          endIcon={showNewPasword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          endIconClick={() => setShowNewPasword(!showNewPasword)}
          isRequired
        />
        <FormikField
          name="confirm_new_password"
          label="Confirm New Password"
          className="col-12"
          type={showNewConfirmPassword ? 'text' : 'password'}
          endIcon={showNewConfirmPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          endIconClick={() => setShowNewConfirmPassword(!showNewConfirmPassword)}
          isRequired
        />
        <FormSubmitButton />
      </Form>
    </Formik>
  );
}

ChangePassword.propTypes = {
  userData: PropTypes.object.isRequired,
};
export default ChangePassword;
