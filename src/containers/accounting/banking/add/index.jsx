import React, { useCallback } from 'react';
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
import FormikWrapper from 'containers/common/form/FormikWrapper';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { getAccountTypesOptions } from 'utilities/get-account-type-options';
import { bankingInitialValues } from '../utilities/initialValues';
import { bankFormValidationSchema } from '../utilities/validationSchema';

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

  const handleSubmitForm = useCallback(async (values, { setErrors, resetForm }) => {
    try {
      let response = null;
      if (id) {
        response = await editBankAccount({ id, payload: values });
      } else {
        response = await addBankAccount(values);
      }

      if (response.error) {
        setErrors(response.error.data);
        return;
      }
      if (values.save_and_continue) {
        resetForm();
        return;
      }
      navigate(-1);
    } catch (err) {
      if (err?.response?.status === 400) {
        setErrors(err.response.data);
      }
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <FormHeader title="Bank Master" />
        <FormikWrapper
          initialValues={initialValues}
          validationSchema={bankFormValidationSchema}
          onSubmit={handleSubmitForm}
        >
          <FormikField
            name="bank_name"
            type="text"
            label="Bank Name"
            isRequired
            startIcon={<AccountBalanceIcon />}
          />
          <FormikField
            name="account_number"
            type="text"
            startIcon={<PersonIcon />}
            label="Account Number"
            isRequired
          />
          <FormikField name="branch_name" type="text" label="Branch Name" isRequired />
          <FormikField name="IBAN" type="text" label="IBAN" isRequired />

          <FormikField name="swift_code" isRequired type="text" label="Swift Code" />

          <FormikSelect
            options={accountsWithTypeAssets}
            name="gl_number"
            type="text"
            isRequired
            label="GL Account"
            isGrouped
          />

          <FormikField name="notes" type="text" textArea label="Notes" className="col-12" />

          <FormSubmitButton />
        </FormikWrapper>
      </CardContent>
    </Card>
  );
}

export default AddBankAccountPage;
