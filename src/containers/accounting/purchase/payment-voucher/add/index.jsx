import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// serivces
import { useGetSuppliersListQuery, useGetSuppliersUpaidBillsListMutation } from 'services/private/suppliers';
// import { useGetBankAccountsListQuery } from 'services/private/banking';
import {
  useAddPaymentVouchserMutation,
  useEditPaymentVouchserMutation,
  useGetLatestPaymentVouchersNumtQuery,
  useGetSinglePaymentVoucherQuery,
} from 'services/private/payment-voucher';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import getSearchParamsList from 'utilities/getSearchParamsList';
import { PAYMENT_MODE, supplierOpeningBalanceName } from 'utilities/constants';
import { UnPaidBillsHeadCells } from '../utilities/head-cells';
import { PurchaseVoucherInitialValues } from '../utilities/initialValues';
import { paymentVoucherFormValidationSchema } from '../utilities/validation-schema';
// components
import UnPaidBillsList from './components/UnPaidBillsList';
// styles
import 'styles/form/form.scss';

function addPaymentVoucher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { supplierId, debitAmount } = getSearchParamsList();

  const [selectedSupplier, setSelectedSupplier] = useState(supplierId || null);
  const [paymentMode, setPaymentMode] = useState('');
  const [hasError, setHasError] = useState(false);

  const supplierListResponse = useGetSuppliersListQuery();
  // const bankAccountListResponse = useGetBankAccountsListQuery({ account_type: paymentMode });
  const latestPaymentVoucherNum = useGetLatestPaymentVouchersNumtQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [addPaymentVouchser] = useAddPaymentVouchserMutation();
  const [editPaymentVouchser] = useEditPaymentVouchserMutation();
  const [getUnpaidBills] = useGetSuppliersUpaidBillsListMutation();

  const { initialValues, setInitialValues, queryResponse } = useInitialValues(
    PurchaseVoucherInitialValues,
    useGetSinglePaymentVoucherQuery
  );

  const chartOfAccountsListResponse = useGetChartOfAccountListQuery();

  const { optionsList: chartOfAccounts } = useListOptions(
    chartOfAccountsListResponse?.data?.results,
    {
      label: 'account_name',
      value: 'id',
    },
    ['account_type']
  );
  const { payableChartOfAccount, chartOfAccountAgainstPaymentMode } = useMemo(
    () => ({
      payableChartOfAccount: chartOfAccounts.filter(coa => coa.account_type === 'Accounts Payable'),
      chartOfAccountAgainstPaymentMode: chartOfAccounts.filter(
        coa => coa.account_type === paymentMode?.trim()
      ),
    }),
    [chartOfAccounts, paymentMode]
  );
  const { optionsList: suppliersOptions } = useListOptions(supplierListResponse?.data?.results, {
    value: 'id',
    label: 'supplier_name',
  });

  const handleGetUnpaidBills = async (initial, selectedSupplierId) => {
    const response = await getUnpaidBills(selectedSupplierId);
    const billPayment = [];
    response.data.forEach((bill, index) => {
      if (bill.bill_num === supplierOpeningBalanceName) {
        billPayment.push({
          bill_date: bill.bill_date,
          supplier: selectedSupplierId,
          grand_total: bill.grand_total,
          amount_due: bill.amount_due,
          amount_applied: initial?.bill_payments[index]?.amount_applied || 0,
          bill_num: bill.bill_num,
          pur_order: bill.pur_order,
        });
      } else {
        billPayment.push({
          bill_id: bill.id,
          bill_date: bill.bill_date,
          grand_total: bill.grand_total,
          amount_due: bill.amount_due,
          bill_num: bill.bill_num,
          pur_order: bill.pur_order,
          pur_order_num: bill.pur_order_num,
          amount_applied: initial?.bill_payments[index]?.amount_applied || 0,
        });
      }
    });
    return billPayment;
  };
  const handleChangeSupplier = useCallback(
    async (selectedSupplierId, initial, setValues) => {
      if (!selectedSupplierId) return;

      const billPayment = await handleGetUnpaidBills(initial, selectedSupplierId);
      if (setValues) setValues('bill_payments', billPayment);
      else {
        let amountTotal = initialValues.total;
        if (debitAmount) {
          amountTotal = Number(debitAmount);
        }
        setInitialValues({
          ...initialValues,
          used_amount: (initialValues.total - initialValues.unused_amount).toFixed(2),
          bill_payments: billPayment,
          supplier_id: Number(selectedSupplierId),
          total: amountTotal || 0,
        });
      }
    },
    [initialValues, debitAmount, selectedSupplier]
  );

  useEffect(() => {
    if (queryResponse?.supplier_id) {
      setSelectedSupplier(queryResponse?.supplier_id);
    }
  }, [queryResponse]);

  useEffect(() => {
    (async () => {
      if (selectedSupplier) {
        const billPayment = await handleGetUnpaidBills(queryResponse, selectedSupplier);
        setInitialValues({
          ...initialValues,
          bill_payments: [...initialValues.bill_payments, ...billPayment],
        });
      }
    })();
  }, [selectedSupplier]);

  useEffect(() => {
    if (id && initialValues?.payment_mode) {
      setPaymentMode(initialValues?.payment_mode);
    }
  }, [initialValues]);

  const updatedInitialValues = useMemo(() => {
    let newData = {
      ...initialValues,
    };
    const newBills = [];
    const billsPayment = [];
    newData.bill_payments.forEach(bill => {
      if (!newBills.includes(bill?.supplier?.type || bill?.bill?.bill_num || bill?.bill_num)) {
        if (bill.bill) {
          billsPayment.push({
            ...bill,
            ...bill.bill,
            amount_due: (bill.bill.amount_due || 0) + (bill.amount_applied || 0),
          });
          newBills.push(bill.bill.bill_num);
        } else if (typeof bill.supplier === 'object') {
          billsPayment.push({
            ...bill,
            bill_num: bill.supplier.type,
            grand_total: bill.supplier.grand_total,
            bill_date: bill.supplier.date,
            bill_id: bill.supplier.id,
            amount_due: (bill.supplier.amount_due || 0) + (bill.amount_applied || 0),
          });
          newBills.push(bill.supplier.type);
        } else {
          billsPayment.push({ ...bill, amount_applied: 0 });
          newBills.push(bill.bill_num);
        }
      }
    });

    if (id) {
      newData = {
        ...newData,
        bill_payments: billsPayment,
      };
    }
    if (!id) {
      newData = { ...newData, payment_formatted_number: latestPaymentVoucherNum?.data?.latest_num };
    }
    if (supplierId) {
      newData = {
        ...newData,
        supplier_id: Number(supplierId),
        payment_formatted_number: latestPaymentVoucherNum?.data?.latest_num,
      };
    }
    return newData;
  }, [id, initialValues, latestPaymentVoucherNum, supplierId]);

  return (
    <SectionLoader options={[supplierListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Payment Voucher" />
          <Formik
            enableReinitialize
            initialValues={updatedInitialValues}
            validationSchema={paymentVoucherFormValidationSchema}
            onSubmit={async (values, { setErrors, resetForm }) => {
              let response = null;
              if (hasError) return;
              const billPayments = [];
              values.bill_payments.forEach(bill => {
                if (bill.amount_applied > 0) {
                  if (bill.bill_num === supplierOpeningBalanceName) {
                    billPayments.push({
                      amount_applied: bill.amount_applied,
                      supplier: bill?.supplier?.id || bill?.supplier,
                    });
                  } else {
                    billPayments.push({
                      amount_applied: bill.amount_applied,
                      bill_id: bill?.bill?.id || bill.bill_id,
                    });
                  }
                }
              });

              const payload = {
                ...values,
                bill_payments: billPayments,
              };

              if (id) {
                response = await editPaymentVouchser({ id, payload });
              } else {
                response = await addPaymentVouchser(payload);
              }
              if (response.error) {
                setErrors(response.error.data);
                return;
              }
              if (values.save_and_continue) {
                resetForm();
                return;
              }
              if (supplierId) {
                navigate('/pages/accounting/purchase/payment-voucher', { replace: true });
                return;
              }
              navigate(-1);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikSelect
                  name="supplier_id"
                  //  placeholder="Supplier"
                  label="Supplier"
                  disabled={Boolean(supplierId)}
                  startIcon={<TagIcon />}
                  options={suppliersOptions}
                  isRequired
                  onChange={supplier => handleChangeSupplier(supplier, null, setFieldValue)}
                />

                <FormikDatePicker
                  name="payment_date"
                  type="text"
                  //  placeholder="Payment Date"
                  displayFormat="yyyy-MM-dd"
                  label="Payment Date"
                  startIcon={<CalendarMonthIcon />}
                />

                <FormikField
                  isRequired
                  name="total"
                  type="number"
                  // startIcon={<AttachMoneyIcon />}
                  //  placeholder="Amount"
                  onChange={value => {
                    setFieldValue('unused_amount', value - values.used_amount);
                  }}
                  disabled={Boolean(debitAmount)}
                  label="Amount"
                />

                <FormikSelect
                  name="payment_mode"
                  //  placeholder="Payment Mode"
                  label="Payment Mode"
                  options={PAYMENT_MODE}
                  isRequired
                  onChange={value => {
                    setFieldValue('chart_of_account_id', '');
                    setPaymentMode(value);
                  }}
                />
                <FormikSelect
                  name="chart_of_account_id"
                  //  placeholder="Paid Through"
                  label="Paid Through"
                  isRequired
                  disabled={!paymentMode}
                  options={chartOfAccountAgainstPaymentMode}
                />
                <FormikSelect
                  name="credit_account_id"
                  //  placeholder="Paid Through"
                  label="Payable Account"
                  isRequired
                  options={payableChartOfAccount}
                />
                <FormikField
                  name="reference_num"
                  type="text"
                  //  placeholder="Reference"
                  label="Reference"
                />

                <FieldArray
                  name="bill_payments"
                  render={props => (
                    <UnPaidBillsList setHasError={setHasError} headCells={UnPaidBillsHeadCells} {...props} />
                  )}
                />

                <FormikField
                  name="notes"
                  textArea
                  // placeholder="Remarks"
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

export default addPaymentVoucher;
