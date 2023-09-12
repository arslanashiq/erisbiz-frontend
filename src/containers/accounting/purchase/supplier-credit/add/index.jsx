import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TagIcon from '@mui/icons-material/Tag';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// services
import { useGetItemsListQuery } from 'services/private/items';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useGetBankAccountsListQuery } from 'services/private/banking';
import {
  useAddSupplierCreditsMutation,
  useEditSupplierCreditsMutation,
  useGetSingleSupplierCreditsQuery,
} from 'services/private/debit-note';
import { useGetPaymentVouchersListQuery } from 'services/private/payment-voucher';
import { useGetPurchaseInvoceMutation } from 'services/private/purchase-invoice';
// shared
import {
  handleCalculateTotalAmount,
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// utilities
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import { supplierCreditsInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';

function AddSupplierCredit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchaseInvoiceListOptions, setPurchaseInvoiceListOptions] = useState([]);
  const [supplierCreditInitialValues, setSupplierCreditInitialValues] = useState(
    supplierCreditsInitialValues
  );
  const itemsListResponse = useGetItemsListQuery();
  const suppliersListResponse = useGetSuppliersListQuery();
  const bankAccountsListsponse = useGetBankAccountsListQuery();
  const paymentVouchersListQuery = useGetPaymentVouchersListQuery();
  const [getPurchaseInvoice] = useGetPurchaseInvoceMutation();
  const [addSupplierCredit] = useAddSupplierCreditsMutation();
  const [editSupplierCredit] = useEditSupplierCreditsMutation();

  const itemsListOptions = itemsListResponse?.data?.results?.map((item, index) => ({
    value: item.item_name,
    label: item.item_name,
    price: index + 1,
  }));
  const suppliersListOptions = suppliersListResponse?.data?.results?.map(supplier => ({
    value: supplier.id.toString(),
    label: supplier.supplier_name,
    credit_account: supplier.account_default,
  }));
  const bankAccountOptions = bankAccountsListsponse?.data?.results?.map(account => ({
    value: `${account.chart_of_account}`,
    label: account.bank_account_name,
    chart_of_account: account.chart_of_account,
  }));
  const paymentVoucherOptions = paymentVouchersListQuery?.data?.results?.map(voucher => ({
    value: `${voucher.id}`,
    label: voucher.id,
    data: voucher,
  }));
  const purchaseItemsInputList = useMemo(
    () => [
      {
        name: 'service_type',
        placeholder: 'Item',
        isSelect: true,
        options: itemsListOptions || [],
        width: '15%',
        onChange: handleChangeItem,
      },
      {
        name: 'num_nights',
        placeholder: 'Quanitiy',
        type: 'number',
        onChange: handleChangeQuantity,
      },
      {
        name: 'unit_price_ex_vat',
        placeholder: 'Unit Price',
        type: 'number',
        disabled: true,
      },
      {
        name: 'gross_amount',
        placeholder: 'Gross Total',
        type: 'number',
        disabled: true,
      },
      {
        name: 'discount',
        placeholder: 'Discount',
        type: 'number',
        onChange: handleChangeDiscount,
      },
      {
        name: 'vat_rate',
        placeholder: 'VAT',
        isSelect: true,
        options: VAT_CHARGES,
        width: '15%',
        onChange: hanldeVATChange,
      },
      {
        name: 'net_amount',
        placeholder: 'Net Amount',
        type: 'number',
        disabled: true,
      },
    ],
    [itemsListOptions]
  );

  const { initialValues } = useInitialValues(supplierCreditsInitialValues, useGetSingleSupplierCreditsQuery);

  const handleChangeVoucher = (voucherId, setFieldValue) => {
    const selectedVoucher = paymentVoucherOptions.filter(voucher => voucher.value === voucherId)[0];
    if (!selectedVoucher) return;
    if (setFieldValue) setFieldValue('supplier_id', selectedVoucher.data.supplier_id.toString());
    const billValues = selectedVoucher.data.bill_payments.map(bill => ({
      value: bill.bill.id.toString(),
      label: bill.bill.bill_num,
    }));
    setPurchaseInvoiceListOptions([...billValues]);
  };
  const handleChangePurchaseInvoice = async (value, setFieldValue) => {
    const purchaseInvoice = await getPurchaseInvoice(value);
    if (setFieldValue) setFieldValue('supplier_credit_items', [...purchaseInvoice.data.bill_items]);
  };

  useEffect(() => {
    if (paymentVoucherOptions) {
      handleChangeVoucher(initialValues.voucher_number);
    }
    setSupplierCreditInitialValues({ ...initialValues });
  }, [initialValues, paymentVoucherOptions]);

  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Purchase Debit Notes" />
          <Formik
            enableReinitialize
            initialValues={supplierCreditInitialValues}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
              const supplierCreditTtems = values.supplier_credit_items.map(item => ({
                ...item,
                chart_of_account_id: values.debit_account_number,
              }));
              let response = null;
              const payload = {
                ...values,
                supplier_credit_items: supplierCreditTtems,
                currency: 'AED',
                status: 'open',
                ...handleCalculateTotalAmount(values.supplier_credit_items),
              };
              if (id) {
                response = await editSupplierCredit({ id, payload });
              } else {
                response = await addSupplierCredit(payload);
              }
              setSubmitting(false);
              if (response.data) {
                resetForm(initialValues);
                navigate(-1);
              }
              if (response.error) {
                setErrors(response.error.data);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                {/* Purchase */}

                <FormikSelect
                  name="voucher_number"
                  placeholder="Voucher Number"
                  label="Voucher Number"
                  options={paymentVoucherOptions}
                  startIcon={<TagIcon />}
                  onChange={value => handleChangeVoucher(value, setFieldValue)}
                />
                {/* date */}

                <FormikDatePicker
                  name="supplier_credit_date"
                  type="text"
                  placeholder="Date"
                  startIcon={<CalendarMonthIcon />}
                  label="Date"
                />
                {/* Supplier */}
                <FormikSelect
                  options={suppliersListOptions}
                  name="supplier_id"
                  placeholder="Supplier"
                  label="Supplier"
                  disabled
                />

                {/* Purchase Inv No */}
                <FormikSelect
                  name="bill_id"
                  options={purchaseInvoiceListOptions}
                  placeholder="Purchase Invoice Number"
                  label="Purchase Inv No"
                  onChange={value => handleChangePurchaseInvoice(value, setFieldValue)}
                />

                {/* Location */}
                <FormikSelect
                  name="debit_account_number"
                  options={bankAccountOptions}
                  placeholder="Debit Account Number"
                  label="Debit Acc No"
                  className="col-12"
                  // onChange={value => handleChangeDebitAccount(value, setFieldValue)}
                />

                {/* Item detail */}
                <div className="form__form-group w-100">
                  <FieldArray
                    name="supplier_credit_items"
                    render={props => (
                      <PurchaseItem
                        name="supplier_credit_items"
                        inputList={purchaseItemsInputList}
                        newList={NEW_PURCHASE_ITEM_OBJECT}
                        {...props}
                      />
                    )}
                  />
                </div>

                {/* Remarks */}
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

export default AddSupplierCredit;
