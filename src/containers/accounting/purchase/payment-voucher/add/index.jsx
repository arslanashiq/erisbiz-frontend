import React, { useEffect } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
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

function addPaymentVoucher() {
  const { id } = useParams();
  const { supplierId } = getSearchParamsList();
  const navigate = useNavigate();
  const supplierListResponse = useGetSuppliersListQuery();
  const bankAccountListResponse = useGetBankAccountsListQuery();
  const [addPaymentVouchser] = useAddPaymentVouchserMutation();
  const [editPaymentVouchser] = useEditPaymentVouchserMutation();
  const [getUnpaidBills] = useGetSuppliersUpaidBillsListMutation();
  const { initialValues, setInitialValues } = useInitialValues(
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
    if (supplierId) {
      handleChangeSupplier(supplierId, initialValues);
    }
  }, [supplierId]);

  useEffect(() => {
    if (id && !supplierId) {
      if (!initialValues?.used_amount) {
        handleChangeSupplier(initialValues.supplier_id, initialValues);
      }
    }
  }, [initialValues]);

  return (
    <SectionLoader options={[supplierListResponse.isLoading, bankAccountListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Payment Voucher" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
              let response = null;
              const payload = {
                ...values,
                currency: 'AED',
              };

              if (id) {
                response = await editPaymentVouchser({ id, payload });
              } else {
                response = await addPaymentVouchser(payload);
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
                {/* Supplier */}
                <FormikSelect
                  name="supplier_id"
                  placeholder="Supplier"
                  label="Supplier"
                  disabled={Boolean(supplierId)}
                  startIcon={<TagIcon />}
                  options={suppliersOptions}
                  onChange={selectedSupplier => handleChangeSupplier(selectedSupplier, null, setFieldValue)}
                />
                {/* Payment date */}

                <FormikDatePicker
                  name="payment_date"
                  type="text"
                  placeholder="Payment Date"
                  displayFormat="yyyy-MM-dd"
                  label="Payment Date"
                  startIcon={<CalendarMonthIcon />}
                />

                {/* Amount */}
                <FormikField name="total" type="number" placeholder="Amount" label="Amount" />

                {/* Payment Mode */}
                <FormikSelect
                  name="payment_mode"
                  placeholder="Payment Mode"
                  label="Payment Mode"
                  options={PAYMENT_MODE}
                />
                {/* Paid Through */}
                <FormikSelect
                  name="chart_of_account_id"
                  placeholder="Paid Through"
                  label="Paid Through"
                  options={bankAccountOptions}
                />

                {/* Reference */}
                <FormikField name="reference_num" type="text" placeholder="Reference" label="Reference" />

                {/* Unpiad Bills */}
                <FieldArray
                  name="bill_payments"
                  render={props => <UnPaidBillsList headCells={UnPaidBillsHeadCells} {...props} />}
                />

                {/* Remarks */}
                <FormikField name="notes" textArea placeholder="Remarks" label="Remarks" className="col-12" />

                {/* submit button and reset button */}
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
