import React from 'react';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// API HOOKS
import {
  useAddBankAccountMutation,
  useEditBankAccountMutation,
  useGetSingleBankAccountQuery,
} from 'services/private/banking';
import { useGetChartOfAccountTypesQuery } from 'services/private/chart-of-account';

// COMPONENTS & UTILITIES & STYLES
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormHeader from 'shared/components/form-header/FormHeader';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import useListOptions from 'custom-hooks/useListOptions';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { getAccountTypesOptions } from 'utilities/get-account-type-options';
import { bankingInitialValues } from '../utilities/initialValues';
import { bankFormValidationSchema } from '../utilities/validationSchema';
import 'styles/form/form.scss';

function AddBankAccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const accountTypesResponse = useGetChartOfAccountTypesQuery();

  const [addBankAccount] = useAddBankAccountMutation();
  const [editBankAccount] = useEditBankAccountMutation();
  const { initialValues } = useInitialValues(bankingInitialValues, useGetSingleBankAccountQuery);

  const { optionsList: accountTypeListOption } = useListOptions(
    accountTypesResponse?.data?.results,
    {
      label: 'account_type_formatted',
      value: 'id',
    },
    ['account_group']
  );

  const accountsWithTypeAssets = getAccountTypesOptions(accountTypeListOption, 0);
  return (
    <Card>
      <CardContent>
        <FormHeader title="Bank Master" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={bankFormValidationSchema}
          onSubmit={async (values, { setErrors }) => {
            try {
              let response = null;
              if (id) {
                response = await editBankAccount({ id, payload: values });
              } else {
                response = await addBankAccount(values);
              }
              if (response.data) {
                navigate(-1);
              }
              if (response.error) {
                setErrors(response.error.data);
              }
            } catch (err) {
              if (err?.response?.status === 400) {
                setErrors(err.response.data);
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
              isRequired
              startIcon={<AccountBalanceIcon />}
            />
            {/* Account Number */}
            <FormikField
              name="account_number"
              type="text"
              placeholder="Bank Account Number"
              startIcon={<PersonIcon />}
              label="Account Number"
              isRequired
            />
            {/* Branch Name */}
            <FormikField
              name="branch_name"
              type="text"
              label="Branch Name"
              placeholder="Branch Name"
              isRequired
            />
            {/* IBAN */}
            <FormikField
              name="IBAN"
              type="text"
              placeholder="International Bank Account Number"
              label="IBAN"
              isRequired
            />
            {/* Swift Code */}

            <FormikField
              name="swift_code"
              isRequired
              type="text"
              placeholder="Swift Code"
              label="Swift Code"
            />

            {/* GL Number */}
            <FormikSelect
              options={accountsWithTypeAssets}
              name="gl_number"
              type="text"
              isRequired
              placeholder="GL No"
              label="GL Number"
            />

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
