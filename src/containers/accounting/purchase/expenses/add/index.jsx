import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import { Card, CardContent } from '@mui/material';
// services
import {
  useAddExpenseMutation,
  useEditExpenseMutation,
  useGetSingleExpenseQuery,
} from 'services/private/expenses';
import { useGetBankAccountsListQuery } from 'services/private/banking';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormHeader from 'shared/components/form-header/FormHeader';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { VAT_CHARGES } from 'utilities/constants';
import { expensesInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';
import { expensesFormValidationSchema } from '../utilities/validation-schema';

function AddExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const bankAccountsLIstResponse = useGetBankAccountsListQuery();
  const supplierListResponse = useGetSuppliersListQuery();
  const [addExpense] = useAddExpenseMutation();
  const [editExpense] = useEditExpenseMutation();

  const { initialValues, setInitialValues } = useInitialValues(
    expensesInitialValues,
    useGetSingleExpenseQuery
  );
  const { optionsList: bankOptions } = useListOptions(bankAccountsLIstResponse?.data?.results, {
    label: 'bank_account_name',
    value: 'chart_of_account',
  });
  const { optionsList: suppliersOptions } = useListOptions(supplierListResponse?.data?.results, {
    label: 'supplier_name',
    value: 'id',
  });

  useEffect(() => {
    if (typeof initialValues.tax_rate_id === 'string') {
      setInitialValues({ ...initialValues, tax_rate_id: Number(initialValues.tax_rate_id) });
    }
  }, [initialValues]);
  return (
    <Card>
      <CardContent>
        <FormHeader title="Expenses" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={expensesFormValidationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              let response = null;
              const selectedTax = VAT_CHARGES.filter(tax => tax.value === values.tax_rate_id)[0];
              const totalAmount =
                values.total_without_tax + (values.total_without_tax / 100) * selectedTax.percent;
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
              navigate(-1);
            } catch (err) {
              if (err?.response?.status === 400) {
                setSubmitting(true);
                setErrors(err.response.data);
                setSubmitting(false);
              }
            }
          }}
        >
          <Form className="form form--horizontal row mt-3">
            {/* Bank Name */}

            <FormikSelect
              name="expense_account_id"
              type="text"
              placeholder="Expense Account"
              startIcon={<TagIcon />}
              label="Expense Account"
              options={bankOptions}
              isRequired
            />

            {/* date */}

            <FormikDatePicker
              name="expense_date"
              type="text"
              placeholder="Date"
              label="Date"
              startIcon={<CalendarMonthIcon />}
            />
            {/* AMount */}

            <FormikField
              name="total_without_tax"
              type="number"
              placeholder="Amount"
              label="Amount"
              startIcon={<PersonIcon />}
              isRequired
            />

            {/* Paid Through */}
            <FormikSelect
              name="paid_through_account_id"
              type="text"
              placeholder="Paid Through"
              label="Paid Through"
              options={bankOptions}
              isRequired
            />

            {/* Supplier */}
            <FormikSelect
              options={suppliersOptions}
              name="supplier_id"
              placeholder="Supplier"
              label="Supplier"
              isRequired
            />

            {/* Tax */}

            <FormikSelect isRequired options={VAT_CHARGES} name="tax_rate_id" placeholder="Tax" label="Tax" />

            {/* Reference */}

            <FormikField name="reference_num" placeholder="Reference" label="Reference" className="col-12" />

            {/* remarks */}
            <FormikField name="notes" type="text" textArea label="Remarks" className="col-12" />

            <FormSubmitButton />
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}

export default AddExpense;
