/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Form, Formik } from 'formik';
import { Button, Card, CardContent, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { FormikField } from 'shared/components/form/Field';
import { bankFormValidationSchema } from 'utilities/validationSchema';
import { useAddBankAccountMutation, useGetSingleBankAccountQuery } from 'services/private/banking';
import FormikModernField from 'shared/components/form/FormikModernField';
import 'styles/form.scss';

function AddBankAccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addBankAccount, addBankAccountResponse] = useAddBankAccountMutation();

  const [initialValues, setInitialValues] = useState({
    bank_name: '',
    account_number: '',
    branch_name: '',
    IBAN: '',
    swift_code: '',
    gl_number: '',
    notes: '',

    // extra
  });
  console.log(addBankAccountResponse, 'addBankAccountResponse');
  if (id) {
    const singleBankAccount = useGetSingleBankAccountQuery(id);
    useEffect(() => {
      if (id) {
        const fetched = {};
        setInitialValues({ ...fetched });
      }
    }, [id]);
  }

  return (
    <Card>
      <CardContent>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          // validationSchema={bankFormValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
              let response = null;
              if (id) {
                // await editBankAccount(updatedValues);
              } else {
                console.log(values, 'sajkdakdkjsadksa');
                response = await addBankAccount(values);
              }
              if (response.data) {
                setSubmitting(false);
                resetForm(initialValues);
                navigate(-1);
              }
              if (response.error) {
                setSubmitting(false);
                setErrors(response.error.data);
              }
            } catch (err) {
              if (err.response && err.response.status === 400) {
                setSubmitting(true);
                setErrors(err.response.data);
                setSubmitting(false);
              } else {
                // doReturnErrors(err.response.data, err.response.status);
              }
            }
          }}
        >
          {({
            isSubmitting,
            touched,
            // setFieldValue,
            // setFieldTouched,
            resetForm,
            values,
            errors,
          }) => (
            <Form className="form form--horizontal mt-5 row">
              {/* Bank Name */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Bank Name</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    {' '}
                    <AccountBalanceIcon />
                  </div>
                  <FormikModernField name="bank_name" type="text" placeholder="Bank Name" />
                </div>
              </div>
              {/* Account Number */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Account Number</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <PersonIcon />
                  </div>
                  <FormikModernField name="account_number" type="text" placeholder="Bank Account Number" />
                </div>
              </div>

              {/* Branch Name */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Branch Name</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="branch_name" type="text" />
                </div>
              </div>

              {/* IBAN */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">IBAN</span>
                <div className="form__form-group-field ">
                  <FormikModernField
                    name="IBAN"
                    type="text"
                    placeholder="International Bank Account Number"
                  />
                </div>
              </div>

              {/* Swift Code */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Swift Code</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="swift_code" type="text" placeholder="Swift Code" />
                </div>
              </div>

              {/* GL Number */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">GL Number</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="gl_number" type="text" placeholder="GL No" />
                </div>
              </div>
              {/* notes */}
              <div className="form__form-group textarea">
                <span className="form__form-group-label">Notes</span>
                <div className="form__form-group-field col">
                  <FormikModernField name="notes" type="text" value={values.notes} textArea />
                </div>
              </div>

              {/* <ErrorFocus /> */}
              <Stack spacing={2} direction="row">
                <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
                  Save
                </Button>

                <Button
                  color="secondary"
                  onClick={() => resetForm(initialValues)}
                  disabled={!touched || isSubmitting}
                  className="text-capitalize"
                >
                  Clear
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default AddBankAccountPage;
