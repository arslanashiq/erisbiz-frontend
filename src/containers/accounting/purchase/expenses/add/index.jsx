import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import { Button, Card, CardContent, Stack } from '@mui/material';
import { useAddBankAccountMutation, useGetSingleBankAccountQuery } from 'services/private/banking';
import FormikField from 'shared/components/form/FormikField';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import { VAT_CHARGES } from 'utilities/constants';
import 'styles/form/form.scss';

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

              <FormikField
                name="expense_account"
                type="text"
                placeholder="Expense Account"
                startIcon={<TagIcon />}
                label="Expense Account"
              />

              {/* date */}

              <FormikDatePicker
                name="date"
                type="text"
                placeholder="Date"
                label="Date"
                startIcon={<CalendarMonthIcon />}
              />
              {/* AMount */}

              <FormikField
                name="amount"
                type="text"
                placeholder="Amount"
                label="Amount"
                startIcon={<PersonIcon />}
              />

              {/* Paid Through */}
              <FormikField name="paid_through" type="text" placeholder="Paid Through" label="Paid Through" />

              {/* Supplier */}
              <FormikSelect options={[]} name="supplier" placeholder="Supplier" label="Supplier" />

              {/* Tax */}

              <FormikSelect options={VAT_CHARGES} name="tax" placeholder="Tax" label="Tax" />

              {/* remarks */}
              <FormikField name="remarks" type="text" textArea label="Remarks" className="col-12" />

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
