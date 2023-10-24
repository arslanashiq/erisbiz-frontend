import React, { useEffect } from 'react';
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
import { useGetCustomersListQuery } from 'services/private/customers';
import { useGetBankAccountsListQuery } from 'services/private/banking';
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
import { PAYMENT_MODE } from 'utilities/constants';
import getSearchParamsList from 'utilities/getSearchParamsList';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import { receiptVoucherInitialValues } from '../utilities/initialValues';
import { UnPaidSaleInvoiceHeadCells } from '../utilities/head-cells';
import 'styles/form/form.scss';

function AddReceiptVoucher() {
  const { id } = useParams();
  const { customerId } = getSearchParamsList();
  const navigate = useNavigate();

  const customerListResponse = useGetCustomersListQuery();
  const bankAccountListResponse = useGetBankAccountsListQuery();
  const latestreceiptVoucherNumber = useGetLatestReceiptVoucherQuery({}, { skip: id });

  const [addReceiptVoucher] = useAddReceiptVoucherMutation();
  const [editReceiptVoucher] = useEditReceiptVoucherMutation();
  const [getUnPaidSaleInvoices] = useGetUnpaidInvoicesAgainstCustomerMutation();

  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    value: 'id',
    label: 'customer_name',
  });
  const { optionsList: bankAccountOptions } = useListOptions(bankAccountListResponse?.data?.results, {
    value: 'chart_of_account',
    label: 'bank_account_name',
  });
  const { initialValues, setInitialValues } = useInitialValues(
    receiptVoucherInitialValues,
    useGetSingleReceiptVoucherQuery,
    null,
    true,
    true
  );

  const handleChangeCustomer = async (value, setFieldValue) => {
    try {
      const response = await getUnPaidSaleInvoices(value);

      if (setFieldValue) setFieldValue('invoice_payments', response.data);
      return response.data;
    } catch (error) {
      if (setFieldValue) setFieldValue('invoice_payments', []);
      return [];
    }
  };

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
      payment_num: paymentNumber + 1,
    }));
  }, [latestreceiptVoucherNumber]);
  useEffect(() => {
    (async () => {
      const data = await handleChangeCustomer(customerId);
      setInitialValues(prev => ({ ...prev, invoice_payments: data, account: Number(customerId) }));
    })();
  }, [customerId]);
  return (
    <SectionLoader
      options={[
        latestreceiptVoucherNumber.isLoading,
        customerListResponse.isLoading,
        bankAccountListResponse.isLoading,
      ]}
    >
      <Card>
        <CardContent>
          <FormHeader title="Receipt Voucher" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, { setError }) => {
              let response = null;
              if (id) {
                response = await editReceiptVoucher({ id, payload: values });
              } else {
                response = await addReceiptVoucher(values);
              }
              if (response.error) {
                setError(response.error.data);
                return;
              }
              navigate(-1);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikSelect
                  options={customersOptions}
                  disabled={Boolean(customerId)}
                  name="account"
                  placeholder="Customer"
                  label="Customer"
                  onChange={value => handleChangeCustomer(value, setFieldValue)}
                />

                <FormikDatePicker
                  name="payment_date"
                  type="text"
                  placeholder="Date"
                  label="Date"
                  startIcon={<CalendarMonthIcon />}
                />

                <FormikField
                  name="payment_num"
                  type="number"
                  disabled
                  placeholder="Payment Number"
                  label="Payment Number"
                />
                <FormikField
                  name="last_payment_number"
                  type="number"
                  disabled
                  placeholder="Last Payment Number"
                  label="Last Payment"
                />
                <FormikField
                  name="total"
                  type="number"
                  placeholder="Amount"
                  label="Amount"
                  startIcon={<TagIcon />}
                />

                <FormikField name="reference_num" type="text" placeholder="Reference" label="Reference" />
                <FormikSelect
                  name="payment_mode"
                  placeholder="Payment Mode"
                  label="Payment Mode"
                  options={PAYMENT_MODE}
                />

                <FormikSelect
                  name="chart_of_account"
                  placeholder="Deposit To"
                  label="Deposit To"
                  options={bankAccountOptions}
                />

                <FieldArray
                  name="invoice_payments"
                  render={props => <UnPaidBillsList headCells={UnPaidSaleInvoiceHeadCells} {...props} />}
                />

                <FormikField
                  name="remarks"
                  textArea
                  placeholder="Remarks"
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
