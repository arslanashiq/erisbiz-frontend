import React from 'react';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// services
import {
  useAddBankAccountMutation,
  useEditBankAccountMutation,
  useGetSingleBankAccountQuery,
} from 'services/private/banking';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormHeader from 'shared/components/form-header/FormHeader';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// utilities
import { bankingInitialValues } from '../utilities/initialValues';
import { bankFormValidationSchema } from '../utilities/validationSchema';
// styles
import 'styles/form/form.scss';

function AddBankAccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [addBankAccount] = useAddBankAccountMutation();
  const [editBankAccount] = useEditBankAccountMutation();
  const { initialValues } = useInitialValues(bankingInitialValues, useGetSingleBankAccountQuery);
  return (
    <Card>
      <CardContent>
        <FormHeader title="Bank Master" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={bankFormValidationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              let response = null;
              if (id) {
                response = await editBankAccount({ id, payload: values });
              } else {
                response = await addBankAccount(values);
              }
              setSubmitting(false);
              if (response.data) {
                navigate(-1);
              }
              if (response.error) {
                setErrors(response.error.data);
              }
            } catch (err) {
              if (err.response && err.response.status === 400) {
                setSubmitting(true);
                setErrors(err.response.data);
                setSubmitting(false);
              }
            }
          }}
        >
          <Form className="form form--horizontal row mt-3">
            {/* Bank Name */}
            <FormikField
              name="bank_name"
              type="text"
              placeholder="Bank Name"
              label="Bank Name"
              startIcon={<AccountBalanceIcon />}
            />
            {/* Account Number */}
            <FormikField
              name="account_number"
              type="text"
              placeholder="Bank Account Number"
              startIcon={<PersonIcon />}
              label="Account Number"
            />
            {/* Branch Name */}
            <FormikField name="branch_name" type="text" label="Branch Name" />
            {/* IBAN */}
            <FormikField
              name="IBAN"
              type="text"
              placeholder="International Bank Account Number"
              label="IBAN"
            />
            {/* Swift Code */}

            <FormikField name="swift_code" type="text" placeholder="Swift Code" label="Swift Code" />

            {/* GL Number */}
            <FormikField name="gl_number" type="text" placeholder="GL No" label="GL Number" />

            {/* notes */}

            <FormikField name="notes" type="text" textArea label="Notes" className="col-12" />

            <FormSubmitButton />
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}

export default AddBankAccountPage;
