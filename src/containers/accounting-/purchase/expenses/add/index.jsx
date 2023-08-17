import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import { Button, Card, CardContent, Stack } from '@mui/material';
import { useAddBankAccountMutation, useGetSingleBankAccountQuery } from 'services/private/banking';
import FormikModernField from 'shared/components/form/FormikModernField';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import 'styles/form.scss';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import { VAT_CHARGES } from 'utilities/constants';

function AddExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addBankAccount] = useAddBankAccountMutation();

  const [initialValues, setInitialValues] = useState({
    bank_name: '',
    date: moment().format('YYYY-MM-DD'),
    account_number: '',
    branch_name: '',
    IBAN: '',
    swift_code: '',
    gl_number: '',
    notes: '',

    // extra
  });
  if (id) {
    const singleBankAccount = useGetSingleBankAccountQuery(id);
    useEffect(() => {
      if (id && singleBankAccount.isSuccess) {
        setInitialValues({ ...singleBankAccount.data });
      }
    }, [id]);
  }

  return (
    <Card>
      <CardContent>
        <FormHeader title="Bank Master" />
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
            // values,
          }) => (
            <Form className="form form--horizontal row mt-3">
              {/* Bank Name */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Expense Account</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    {' '}
                    <TagIcon />
                  </div>
                  <FormikModernField name="expense_account" type="text" placeholder="Expense Account" />
                </div>
              </div>
              {/* date */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Date</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <CalendarMonthIcon />
                  </div>
                  <FormikDatePicker name="date" type="text" placeholder="Date" />
                </div>
              </div>
              {/* AMount */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Amount</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <PersonIcon />
                  </div>
                  <FormikModernField name="amount" type="text" placeholder="Amount" />
                </div>
              </div>

              {/* Paid Through */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Paid Through</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="paid_through" type="text" placeholder="Paid Through" />
                </div>
              </div>

              {/* Supplier */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Supplier</span>
                <div className="form__form-group-field ">
                  <FormikModernSelect options={[]} name="supplier" placeholder="Supplier" />
                </div>
              </div>

              {/* Tax */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Tax</span>
                <div className="form__form-group-field ">
                  <FormikModernSelect options={VAT_CHARGES} name="tax" placeholder="Tax" />
                </div>
              </div>
              {/* remarks */}
              <div className="form__form-group textarea">
                <span className="form__form-group-label">Remarks</span>
                <div className="form__form-group-field col">
                  <FormikModernField name="remarks" type="text" textArea />
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

export default AddExpense;
