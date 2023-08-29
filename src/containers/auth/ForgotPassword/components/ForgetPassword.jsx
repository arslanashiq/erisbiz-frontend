import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import PersonIcon from '@mui/icons-material/Person';
import { FormikField } from 'shared/components/form/Field';
import { EMAIL_REGEX } from 'utilities/constants';
import InfoPopup from 'shared/modals/InfoPopup';

function ForgetPassword() {
  const [state, setState] = useState({
    open: false,
  });

  const toggleModal = () => {
    setState(prevState => ({ ...prevState, open: !prevState.open }));
  };
  return (
    <>
      <InfoPopup
        open={state.open}
        handleClose={toggleModal}
        infoDescription="Link Sent to your Email
        We’ve emailed you instructions for setting your password, kindly check your Inbox."
      />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().matches(EMAIL_REGEX, 'Invalid email address').required('Required'),
        })}
      >
        {({ isSubmitting }) => (
          <Form className="form auth-form">
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
              size="large"
              type="submit"
              className="btn btn-primary account__btn account__btn--small mt-3"
              disabled={isSubmitting}
              onClick={toggleModal}
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
