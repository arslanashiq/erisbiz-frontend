import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
// srvices
import {
  useAddReceiptVoucherMutation,
  useEditReceiptVoucherMutation,
  useGetLatestReceiptVoucherQuery,
  useGetSingleReceiptVoucherQuery,
  useGetUnpaidInvoicesAgainstCustomerMutation,
} from 'services/private/receipt-voucher';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';
import { useGetCustomersListQuery } from 'services/private/customers';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import UnPaidBillsList from 'containers/accounting/purchase/payment-voucher/add/components/UnPaidBillsList';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { PAYMENT_MODE, customerOpeningBalanceName } from 'utilities/constants';
import getSearchParamsList from 'utilities/getSearchParamsList';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import { receiptVoucherInitialValues } from '../utilities/initialValues';
import { UnPaidSaleInvoiceHeadCells } from '../utilities/head-cells';
import 'styles/form/form.scss';
import { receiptVoucherFormValidationSchema } from '../utilities/validation-schema';

function AddReceiptVoucher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customerId } = getSearchParamsList();

  const [paymentMode, setPaymentMode] = useState('');
  const [hasError, setHasError] = useState(false);

  const customerListResponse = useGetCustomersListQuery();
  const chartOfAccountsListResponse = useGetChartOfAccountListQuery();
  const latestreceiptVoucherNumber = useGetLatestReceiptVoucherQuery(
    {},
    { skip: id, refetchOnMountOrArgChange: true }
  );

  const [addReceiptVoucher] = useAddReceiptVoucherMutation();
  const [editReceiptVoucher] = useEditReceiptVoucherMutation();
  const [getUnPaidSaleInvoices] = useGetUnpaidInvoicesAgainstCustomerMutation();

  const { optionsList: chartOfAccounts } = useListOptions(
    chartOfAccountsListResponse?.data?.results,
    {
      label: 'account_name',
      value: 'id',
    },
    ['account_type']
  );
  const { receivableChartOfAccount, chartOfAccountAgainstPaymentMode } = useMemo(
    () => ({
      receivableChartOfAccount: chartOfAccounts.filter(coa => coa.account_type === 'Accounts Receivable'),
      chartOfAccountAgainstPaymentMode: chartOfAccounts.filter(
        coa => coa.account_type === paymentMode?.trim()
      ),
    }),
    [chartOfAccounts, paymentMode]
  );
  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    value: 'id',
    label: 'customer_name',
  });

  const { initialValues, setInitialValues } = useInitialValues(
    receiptVoucherInitialValues,
    useGetSingleReceiptVoucherQuery,
    null,
    true,
    true
  );

  const handleChangeCustomer = useCallback(async (value, setFieldValue) => {
    try {
      const response = await getUnPaidSaleInvoices(value);
      const updatedData = [];
      response?.data?.forEach(payment => {
        if (payment.status !== 'void') {
          updatedData.push({
            ...payment,

            amount_applied: 0,
          });
        }
      });
      if (setFieldValue) setFieldValue('invoice_payments', updatedData);
      return updatedData;
    } catch (error) {
      if (setFieldValue) setFieldValue('invoice_payments', []);
      return [];
    }
  }, []);

  const handleSubmitForm = useCallback(async (values, { setErrors, resetForm }) => {
    let response = null;
    if (hasError) return;

    const updatedPayloadInvoice = [];
    values?.invoice_payments?.forEach(invoice => {
      if (invoice.amount_applied > 0) {
        if (invoice?.invoice_num === customerOpeningBalanceName) {
          updatedPayloadInvoice.push({
            ...invoice,
            sales_company: invoice.id,
          });
        } else {
          updatedPayloadInvoice.push({
            ...invoice,
          });
        }
      }
    });
    const payload = {
      ...values,
      invoice_payments: updatedPayloadInvoice,
    };

    if (payload.payment_num) {
      delete payload.payment_num;
    }
    if (id) {
      response = await editReceiptVoucher({ id, payload });
    } else {
      response = await addReceiptVoucher(payload);
    }
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    if (values.save_and_continue) {
      resetForm();
      return;
    }
    if (customerId) {
      navigate('/pages/accounting/sales/receipt-voucher', { replace: true });
      return;
    }
    navigate(-1);
  }, []);

  useEffect(() => {
    let paymentNumber = 0;
    if (!id) {
      if (latestreceiptVoucherNumber?.data?.latest_num) {
        paymentNumber = latestreceiptVoucherNumber.data.latest_num;
      }
    }
    setInitialValues(prev => ({
      ...prev,
      used_amount: 0,
      last_payment_number: paymentNumber,
      payment_num: paymentNumber,
    }));
  }, [latestreceiptVoucherNumber]);

  useEffect(() => {
    (async () => {
      if (customerId) {
        const data = await handleChangeCustomer(customerId);
        setInitialValues(prev => ({ ...prev, invoice_payments: data, account: Number(customerId) }));
      }
    })();
  }, [customerId]);

  useEffect(() => {
    if (id && initialValues?.payment_mode) {
      setPaymentMode(initialValues?.payment_mode);
    }
  }, [initialValues]);

  const updateInitialValues = useMemo(() => {
    const updatedData = { ...initialValues };
    if (id && updatedData?.invoice_payments.length > 0) {
      updatedData.invoice_payments = updatedData?.invoice_payments.map(payment => ({
        ...payment,
        invoice_formatted_number: payment?.invoice?.invoice_formatted_number,
        amount_due: payment.amount_due + payment.amount_applied,
      }));
    }

    return updatedData;
  }, [initialValues]);

  return (
    <SectionLoader options={[latestreceiptVoucherNumber.isLoading, customerListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Receipt Voucher" />
          <Formik
            enableReinitialize
            initialValues={updateInitialValues}
            validationSchema={receiptVoucherFormValidationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ values, setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikField
                  name="payment_num"
                  disabled
                  //  placeholder="Payment Number"
                  startIcon={<TagIcon />}
                  label="Payment Number"
                />
                <FormikDatePicker
                  name="payment_date"
                  type="text"
                  //  placeholder="Date"
                  label="Date"
                  startIcon={<CalendarMonthIcon />}
                />
                <FormikSelect
                  options={customersOptions}
                  disabled={Boolean(customerId)}
                  name="account"
                  //  placeholder="Customer"
                  label="Customer"
                  onChange={value => handleChangeCustomer(value, setFieldValue)}
                  isRequired
                />

                {/* <FormikField
                  name="last_payment_number"
                  disabled
                  //  placeholder="Last Payment Number"
                  label="Last Payment"
                  startIcon={<TagIcon />}
                /> */}
                <FormikField
                  name="total"
                  type="number"
                  //  placeholder="Amount"
                  onChange={value => {
                    setFieldValue('unused_amount', value - values.used_amount);
                  }}
                  label="Amount"
                  isRequired
                />

                <FormikField
                  name="reference_num"
                  type="text"
                  // placeholder="Reference"
                  label="Reference"
                />
                <FormikSelect
                  name="payment_mode"
                  //  placeholder="Payment Mode"
                  label="Payment Mode"
                  options={PAYMENT_MODE}
                  onChange={value => {
                    setFieldValue('chart_of_account', '');
                    setPaymentMode(value);
                  }}
                  isRequired
                />

                <FormikSelect
                  name="chart_of_account"
                  //  placeholder="Deposit To"
                  label="Deposit To"
                  disabled={!paymentMode}
                  options={chartOfAccountAgainstPaymentMode}
                  isRequired
                />
                <FormikSelect
                  name="debit_account"
                  //  placeholder="Deposit To"
                  label="Receivable Account"
                  options={receivableChartOfAccount}
                  isRequired
                />

                <FieldArray
                  name="invoice_payments"
                  render={props => (
                    <UnPaidBillsList
                      setHasError={setHasError}
                      headCells={UnPaidSaleInvoiceHeadCells}
                      {...props}
                    />
                  )}
                />

                <FormikField
                  name="remarks"
                  textArea
                  //  placeholder="Remarks"
                  label="Remarks"
                  className="col-12"
                />

                <FormSubmitButton />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddReceiptVoucher;
