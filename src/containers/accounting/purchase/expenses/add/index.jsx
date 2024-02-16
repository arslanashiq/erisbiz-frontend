import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import { Card, CardContent } from '@mui/material';
// services
import {
  useAddExpenseMutation,
  useEditExpenseMutation,
  useGetLatestExpensesNumberQuery,
  useGetSingleExpenseQuery,
} from 'services/private/expenses';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormHeader from 'shared/components/form-header/FormHeader';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
// containers
import FormikWrapper from 'containers/common/form/FormikWrapper';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { getAccountTypesOptions } from 'utilities/get-account-type-options';
import { VAT_CHARGES } from 'utilities/constants';
import { expensesInitialValues } from '../utilities/initialValues';
import { expensesFormValidationSchema } from '../utilities/validation-schema';

function AddExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const chartOfAccountListResponse = useGetChartOfAccountListQuery();

  const supplierListResponse = useGetSuppliersListQuery();

  const latestExpensesNumber = useGetLatestExpensesNumberQuery(
    {},
    { skip: id, refetchOnMountOrArgChange: true }
  );

  const [addExpense] = useAddExpenseMutation();
  const [editExpense] = useEditExpenseMutation();

  const { initialValues, setInitialValues } = useInitialValues(
    expensesInitialValues,
    useGetSingleExpenseQuery
  );

  const { optionsList: chartOfAccountOptions } = useListOptions(
    chartOfAccountListResponse?.data?.results,
    {
      label: 'account_name',
      value: 'id',
    },
    ['account_type']
  );
  const { expenseChartOfAccount, chartOfAccountOptionsExcludingExpense } = useMemo(() => {
    const expenseCOA = [];
    const excludingExpenseCOA = [];
    chartOfAccountOptions.forEach(account => {
      if (account.account_type === 'Expense') {
        expenseCOA.push(account);
      } else {
        excludingExpenseCOA.push(account);
      }
    });
    return {
      expenseChartOfAccount: expenseCOA,
      chartOfAccountOptionsExcludingExpense: excludingExpenseCOA,
    };
  }, [chartOfAccountOptions]);
  const sortedChartOfAcocuntExcludingExpenseOptions = getAccountTypesOptions(
    chartOfAccountOptionsExcludingExpense,
    3,
    'account_type'
  );

  const { optionsList: suppliersOptions } = useListOptions(supplierListResponse?.data?.results, {
    label: 'supplier_name',
    value: 'id',
  });

  const updatedExpenseInitialValues = useMemo(() => {
    let newData = { ...initialValues };
    if (typeof newData.tax_rate_id === 'string') {
      newData = { ...newData, tax_rate_id: Number(initialValues.tax_rate_id) };
    }
    return newData;
  }, [initialValues]);

  const handleSumbitForm = useCallback(async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      let response = null;
      const selectedTax = VAT_CHARGES.filter(tax => tax.value === values.tax_rate_id)[0];
      const totalAmount = values.total_without_tax + (values.total_without_tax / 100) * selectedTax.percent;
      const payload = {
        ...values,
        tax_rate: selectedTax.label,
        tax_rate_perc: selectedTax.percent,
        total: totalAmount,
      };
      if (id) {
        response = await editExpense({ id, payload });
      } else {
        response = await addExpense(payload);
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
        setSubmitting(true);
        setErrors(err.response.data);
        setSubmitting(false);
      }
    }
  }, []);

  // EFFECT
  useEffect(() => {
    if (!id) {
      setInitialValues({
        ...initialValues,
        expense_formatted_number: latestExpensesNumber?.data?.latest_num
          ? latestExpensesNumber.data.latest_num
          : 1000,
      });
    }
  }, [latestExpensesNumber]);

  return (
    <Card>
      <CardContent>
        <FormHeader title="Expenses" />
        <FormikWrapper
          initialValues={updatedExpenseInitialValues}
          validationSchema={expensesFormValidationSchema}
          onSubmit={handleSumbitForm}
        >
          {/* Expense Number */}

          <FormikField
            name="expense_formatted_number"
            //  placeholder="Purchase Order Number"
            disabled
            label="Exp Number"
            startIcon={<TagIcon />}
          />

          {/* date */}

          <FormikDatePicker
            name="expense_date"
            type="text"
            //  placeholder="Date"
            label="Date"
            startIcon={<CalendarMonthIcon />}
          />

          {/* Bank Name */}

          <FormikSelect
            name="expense_account_id"
            type="text"
            //  placeholder="Expense Account"
            label="Expense Account"
            options={expenseChartOfAccount}
            isRequired
          />

          {/* AMount */}

          <FormikField
            name="total_without_tax"
            type="number"
            //  placeholder="Amount"
            label="Amount"
            startIcon={<PersonIcon />}
            isRequired
          />

          {/* Paid Through */}
          <FormikSelect
            name="paid_through_account_id"
            type="text"
            //  placeholder="Paid Through"
            label="Paid Through"
            isGrouped
            options={sortedChartOfAcocuntExcludingExpenseOptions}
            isRequired
          />

          {/* Supplier */}
          <FormikSelect
            options={suppliersOptions}
            name="supplier_id"
            //  placeholder="Supplier"
            label="Supplier"
            isRequired
          />

          {/* Tax */}

          <FormikSelect
            isRequired
            options={VAT_CHARGES}
            name="tax_rate_id"
            // placeholder="Tax"
            label="Tax"
          />

          {/* Reference */}

          <FormikField
            name="reference_num"
            //  placeholder="Reference"
            label="Reference"
          />

          {/* remarks */}
          <FormikField name="notes" type="text" textArea label="Remarks" className="col-12" />

          <FormSubmitButton />
        </FormikWrapper>
      </CardContent>
    </Card>
  );
}

export default AddExpense;
