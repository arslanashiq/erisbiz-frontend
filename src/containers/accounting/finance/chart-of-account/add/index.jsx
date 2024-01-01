import React, { useMemo } from 'react';
import { Form, Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Box, Card, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
// services
import {
  useAddChartOfAccountMutation,
  useEditaddChartOfAccountMutation,
  useGetChartOfAccountListQuery,
  useGetChartOfAccountTypesQuery,
  useGetSingleChartOfAccountQuery,
} from 'services/private/chart-of-account';
// import { useGetBankAccountsListQuery } from 'services/private/banking';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import { CheckBoxField } from 'shared/components/form/CheckBox';
import FormHeader from 'shared/components/form-header/FormHeader';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { getAccountTypesOptions } from 'utilities/get-account-type-options';
import { chartOfAccountInitialValues } from '../utilities/initial-values';
// styles
import 'styles/form/form.scss';
import { chartOfAccountFormValidationSchema } from '../utilities/validation-schema';

function AddChartOfAccount() {
  const navigate = useNavigate();
  const { id } = useParams();

  const accountTypesResponse = useGetChartOfAccountTypesQuery();
  const chartOfAccountResponse = useGetChartOfAccountListQuery();

  const [addChartOfAccount] = useAddChartOfAccountMutation();
  const [editChartOfAccount] = useEditaddChartOfAccountMutation();

  const { optionsList: accountTypeListOption } = useListOptions(
    accountTypesResponse?.data?.results,
    {
      label: 'account_type_formatted',
      value: 'id',
    },
    ['account_group']
  );
  const sortedAccountType = getAccountTypesOptions(accountTypeListOption);

  const { initialValues } = useInitialValues(
    chartOfAccountInitialValues,
    useGetSingleChartOfAccountQuery,
    null,
    true,
    true
  );
  const { optionsList: chartOfAccountOptions } = useListOptions(chartOfAccountResponse?.data?.results, {
    value: 'id',
    label: 'account_name',
  });

  const updatedInitialValues = useMemo(() => {
    if (id && accountTypeListOption) {
      const selectedAccountType = accountTypeListOption?.filter(
        accountType => accountType.label === initialValues?.account_type_coa
      );
      return { ...initialValues, account_type: selectedAccountType[0]?.value || '' };
    }
    return initialValues;
  }, [initialValues, accountTypeListOption, id]);
  return (
    <SectionLoader options={[]}>
      <Helmet>
        <title>Chart Of Account - ErisBiz</title>
        <meta name="description" content="CRM - Luxury Explorers" />
      </Helmet>
      <Card>
        <CardContent>
          <FormHeader title="Chart Of Account" />
          <Formik
            enableReinitialize
            initialValues={updatedInitialValues}
            validationSchema={chartOfAccountFormValidationSchema}
            onSubmit={async (values, { setErrors }) => {
              let response = null;
              if (id) {
                response = await editChartOfAccount({ id, payload: values });
              } else {
                response = await addChartOfAccount(values);
              }
              if (response.error) {
                setErrors(response.error.data);
                return;
              }
              navigate(-1);
            }}
          >
            {({ values }) => (
              <Form className="form form--horizontal row mt-3">
                <FormikField
                  name="account_name"
                  type="text"
                  // placeholder="Account Name"
                  label="Account Name"
                  isRequired
                />
                <FormikSelect
                  options={sortedAccountType}
                  name="account_type"
                  type="text"
                  // placeholder="Account Type"
                  label="Account Type"
                  isGrouped
                  isRequired
                />

                <FormikField name="description" type="text" textArea label="Description" className="col-12" />
                <Box className={`d-flex col-md-6 align-items-center ${values.is_parent ? '' : 'mt-3 mb-3'}`}>
                  <CheckBoxField name="is_parent" label="Make this a sub-account" startLabel="  " />
                  {values.is_parent && (
                    <FormikSelect
                      options={chartOfAccountOptions}
                      name="parent_account"
                      type="text"
                      // placeholder="Parent Account"
                      className="w-100"
                    />
                  )}
                </Box>

                <FormSubmitButton />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddChartOfAccount;
