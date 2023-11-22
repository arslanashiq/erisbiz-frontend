import React, { useEffect, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// serivces
import { useGetSuppliersListQuery, useGetSuppliersUpaidBillsListMutation } from 'services/private/suppliers';
import { useGetBankAccountsListQuery } from 'services/private/banking';
import {
  useAddPaymentVouchserMutation,
  useEditPaymentVouchserMutation,
  useGetSinglePaymentVoucherQuery,
} from 'services/private/payment-voucher';
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
import { PAYMENT_MODE } from 'utilities/constants';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { UnPaidBillsHeadCells } from '../utilities/head-cells';
import { PurchaseVoucherInitialValues } from '../utilities/initialValues';
// components
import UnPaidBillsList from './components/UnPaidBillsList';
// styles
import 'styles/form/form.scss';
import { paymentVoucherFormValidationSchema } from '../utilities/validation-schema';

function addPaymentVoucher() {
  const { id } = useParams();
  const { supplierId } = getSearchParamsList();
  const navigate = useNavigate();

  const [selectedSupplier, setSelectedSupplier] = useState(supplierId || null);

  const supplierListResponse = useGetSuppliersListQuery();
  const bankAccountListResponse = useGetBankAccountsListQuery();
  const [addPaymentVouchser] = useAddPaymentVouchserMutation();
  const [editPaymentVouchser] = useEditPaymentVouchserMutation();
  const [getUnpaidBills] = useGetSuppliersUpaidBillsListMutation();
  const { initialValues, setInitialValues, queryResponse } = useInitialValues(
    PurchaseVoucherInitialValues,
    useGetSinglePaymentVoucherQuery
  );

  const { optionsList: suppliersOptions } = useListOptions(supplierListResponse?.data?.results, {
    value: 'id',
    label: 'supplier_name',
  });
  const { optionsList: bankAccountOptions } = useListOptions(bankAccountListResponse?.data?.results, {
    value: 'chart_of_account',
    label: 'bank_account_name',
  });

  const handleChangeSupplier = async (selectedSupplierId, initial, setValues) => {
    if (!selectedSupplierId) return;
    const response = await getUnpaidBills(selectedSupplierId);
    const billPayment = [];
    response.data.forEach((bill, index) => {
      if (bill.bill_num === 'Supplier Opening Balance') {
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
          amount_applied: initial?.bill_payments[index]?.amount_applied || 0,
        });
      }
    });
    if (setValues) setValues('bill_payments', billPayment);
    else {
      setInitialValues({
        ...initialValues,
        used_amount: initialValues.total - initialValues.unused_amount,
        bill_payments: billPayment,
        supplier_id: Number(selectedSupplierId),
      });
    }
  };

  useEffect(() => {
    if (queryResponse?.supplier_id) {
      setSelectedSupplier(queryResponse?.supplier_id);
    }
  }, [queryResponse]);
  useEffect(() => {
    if (selectedSupplier) {
      handleChangeSupplier(selectedSupplier, initialValues);
    }
  }, [selectedSupplier]);
  return (
    <SectionLoader options={[supplierListResponse.isLoading, bankAccountListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Payment Voucher" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={paymentVoucherFormValidationSchema}
            onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
              let response = null;

              if (id) {
                response = await editPaymentVouchser({ id, payload: values });
              } else {
                response = await addPaymentVouchser(values);
              }
              setSubmitting(false);
              if (response.data) {
                resetForm();
                navigate(-1);
              }
              if (response.error) {
                setErrors(response.error.data);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikSelect
                  name="supplier_id"
                  placeholder="Supplier"
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
                  placeholder="Payment Date"
                  displayFormat="yyyy-MM-dd"
                  label="Payment Date"
                  startIcon={<CalendarMonthIcon />}
                />

                <FormikField
                  isRequired
                  name="total"
                  type="number"
                  startIcon={<AttachMoneyIcon />}
                  placeholder="Amount"
                  label="Amount"
                />

                <FormikSelect
                  name="payment_mode"
                  placeholder="Payment Mode"
                  label="Payment Mode"
                  options={PAYMENT_MODE}
                  isRequired
                />
                <FormikSelect
                  name="chart_of_account_id"
                  placeholder="Paid Through"
                  label="Paid Through"
                  isRequired
                  options={bankAccountOptions}
                />

                <FormikField name="reference_num" type="text" placeholder="Reference" label="Reference" />

                <FieldArray
                  name="bill_payments"
                  render={props => <UnPaidBillsList headCells={UnPaidBillsHeadCells} {...props} />}
                />

                <FormikField name="notes" textArea placeholder="Remarks" label="Remarks" className="col-12" />

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
