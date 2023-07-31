import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form, ErrorMessage } from 'formik';
import PersonIcon from '@mui/icons-material/Person';
import * as Yup from 'yup';
import { FormikField } from 'shared/components/form/Field';
import { EMAIL_REGEX } from 'utilities/constants';
import InfoPopup from 'containers/common/InfoPopup';
import { Button } from '@mui/material';

function ForgetPassword() {
  const navigate = useNavigate(0);
  const [state, setState] = useState({
    showModal: false,
  });

  const toggleModal = () => {
    setState(prevState => ({ ...prevState, showModal: !prevState.showModal }));
    navigate(-1);
  };
  return (
    <>
      <InfoPopup
        isOpen={state.showModal}
        toggle={toggleModal}
        message="Link Sent to your Email
        We’ve emailed you instructions for setting your password, kindly check your Inbox."
      />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().matches(EMAIL_REGEX, 'Invalid email address').required('Required'),
        })}
        // onSubmit={async (values, { setSubmitting }) => {
        //   const status = await doResetPasswordEmail(values);
        //   setSubmitting(false);
        //   if (status === 200) setState({ ...state, showModal: !state.showModal });
        // }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form__form-group">
              <span className="form__form-group-label">Email</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <PersonIcon />
                </div>
                <FormikField name="email" type="text" placeholder="Email" />
              </div>
              <ErrorMessage className="form__form-group-error" component="span" name="email" />
            </div>
            <Button
              type="submit"
              className="btn btn-primary account__btn account__btn--small mt-3"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ForgetPassword;
