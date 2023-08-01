import { Card, CardContent } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { FormikField } from 'shared/components/form/Field';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import 'styles/form.scss';

const initialValues = {
  id: '',
  bank_name: '',
  account_number: '',
  branch_name: '',
  IBAN: '',
  swift_code: '',
  gl_number: '',
  notes: '',
};
function AddBankAccountPage() {
  return (
    <Card>
      <CardContent>
        <Formik enableReinitialize initialValues={initialValues}>
          {({
            touched,
            // setFieldValue,
            // setFieldTouched,
            values,
            errors,
          }) => (
            <Form className="form form--horizontal row mt-5">
              {/* Bank Name */}
              <div className="form__form-group col-6">
                <span className="form__form-group-label col-lg-2 required">Bank Name</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <AccountBalanceIcon />
                  </div>
                  <FormikField
                    name="bank_name"
                    type="text"
                    placeholder="Bank Name"
                    value={values.bank_name}
                    touched={touched.bank_name}
                    error={errors.bank_name}
                  />
                </div>
              </div>
              <div className="form__form-group col-6">
                <span className="form__form-group-label  required">Bank fdsfdfdsfdsfName</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <AccountBalanceIcon />
                  </div>
                  <FormikField
                    name="bank_name"
                    type="text"
                    placeholder="Bank Name"
                    value={values.bank_name}
                    touched={touched.bank_name}
                    error={errors.bank_name}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default AddBankAccountPage;
