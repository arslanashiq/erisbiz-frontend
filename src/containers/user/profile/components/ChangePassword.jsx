import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// shared
import FormikField from 'shared/components/form/FormikField';
// utilities and components
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { EMAIL_REGEX } from 'utilities/constants';
import { useUpdatePasswordMutation } from 'services/private/user';

function ChangePassword({ userData }) {
  const { enqueueSnackbar } = useSnackbar();

  const [updatePassword] = useUpdatePasswordMutation();

  const [showOldPasword, setShowOldPasword] = useState(false);
  const [showNewPasword, setShowNewPasword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        confirm_password: Yup.string()
          .oneOf([Yup.ref('new_password'), null], 'New Password and Confirm Password not match')
          .required('Confirm Password is required'),
      })}
      onSubmit={async (values, { setErrors }) => {
        const response = await updatePassword(values);
        if (response.error) {
          setErrors(response.error.data);
          return;
        }
        enqueueSnackbar('Password Change Successfully', { varient: 'success' });
        localStorage.clear();
        window.location.reload();
      }}
    >
      <Form className="form form--horizontal row">
        <FormikField
          name="email"
          label="Email"
       //  placeholder="Email"
          className="col-md-6"
          type="email"
          isRequired
          disabled
        />
        <FormikField
          name="old_password"
          label="Old Password"
       //  placeholder="Old Password"
          className="col-md-6"
          type={showOldPasword ? 'text' : 'password'}
          endIcon={showOldPasword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          endIconClick={() => setShowOldPasword(!showOldPasword)}
          isRequired
        />
        <FormikField
          name="new_password"
          label="New Password"
       //  placeholder="New Password"
          className="col-12"
          type={showNewPasword ? 'text' : 'password'}
          endIcon={showNewPasword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          endIconClick={() => setShowNewPasword(!showNewPasword)}
          isRequired
        />
        <FormikField
          name="confirm_password"
          label="Confirm Password"
       //  placeholder="Confirm Password"
          className="col-12"
          type={showConfirmPassword ? 'text' : 'password'}
          endIcon={showConfirmPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          endIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
