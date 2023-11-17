import React, { useEffect, useMemo } from 'react';
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
  useGetLatestSupplierCreditNumberQuery,
  useGetSingleSupplierCreditsQuery,
} from 'services/private/debit-note';
import {
  useGetPurchaseInvoceMutation,
  useGetPurchaseInvoiceListQuery,
  useGetSinglePurchaseInvoiceQuery,
} from 'services/private/purchase-invoice';
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
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import getSearchParamsList from 'utilities/getSearchParamsList';
import { VAT_CHARGES } from 'utilities/constants';
import { supplierCreditsInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';
import { supplierCreditFormValidationSchema } from '../utilities/validation-schema';

function AddSupplierCredit() {
  const { id } = useParams();
  const { purchaseId } = getSearchParamsList();
  const navigate = useNavigate();
  const itemsListResponse = useGetItemsListQuery();
  const suppliersListResponse = useGetSuppliersListQuery();
  const bankAccountsListsponse = useGetBankAccountsListQuery();
  const purchaseInvoiceListResponse = useGetPurchaseInvoiceListQuery();
  const singlePurchaseInvoiceresponse = useGetSinglePurchaseInvoiceQuery(purchaseId, { skip: !purchaseId });
  const latestDebitNoteNumberResponse = useGetLatestSupplierCreditNumberQuery({}, { skip: id });
  const [getPurchaseInvoice] = useGetPurchaseInvoceMutation();
  const [addSupplierCredit] = useAddSupplierCreditsMutation();
  const [editSupplierCredit] = useEditSupplierCreditsMutation();

  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price', 'item_type', 'cost_price']
  );
  const { optionsList: bankAccountOptions } = useListOptions(
    bankAccountsListsponse?.data?.results,
    {
      label: 'bank_account_name',
      value: 'chart_of_account',
    },
    ['chart_of_account']
  );

  const suppliersListOptions = suppliersListResponse?.data?.results?.map(supplier => ({
    value: supplier.id,
    label: supplier.supplier_name,
    credit_account: supplier.account_default,
  }));

  const paymentInvoiceOptions = purchaseInvoiceListResponse?.data?.results?.map(invoice => ({
    value: invoice.id,
    label: invoice.bill_formated_number,
    data: invoice,
  }));

  const purchaseItemsInputList = useMemo(
    () => [
      {
        name: 'service_type',
        placeholder: 'Item',
        isSelect: true,
        options: itemsListOptions || [],
        width: '15%',
        disabled: true,
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
        name: 'cost_price',
        placeholder: 'Cost Price',
        type: 'number',
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
        disabled: true,
        onChange: handleChangeDiscount,
      },
      {
        name: 'vat_rate',
        placeholder: 'VAT',
        isSelect: true,
        options: VAT_CHARGES,
        width: '15%',
        disabled: true,
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

  const { initialValues, setInitialValues } = useInitialValues(
    supplierCreditsInitialValues,
    useGetSingleSupplierCreditsQuery
  );

  const handleChangePurchaseInvoice = async (value, setFieldValue) => {
    if (!value) return;
    const purchaseInvoice = await getPurchaseInvoice(value);
    if (setFieldValue) {
      if (setFieldValue) {
        setFieldValue('supplier_id', purchaseInvoice.data.supplier_id);
        const selectedInvoiceItemsList = purchaseInvoice.data.bill_items.map(invoiceItems => ({
          ...invoiceItems,
          invoice_num_nights: invoiceItems.num_nights,
        }));
        setFieldValue('supplier_credit_items', selectedInvoiceItemsList);
      }
    }
  };

  useEffect(() => {
    if (singlePurchaseInvoiceresponse?.data) {
      const { supplier_id: supplierId, bill_items: billItems } = singlePurchaseInvoiceresponse.data;
      setInitialValues({
        ...initialValues,
        bill_id: Number(purchaseId),
        supplier_credit_items: billItems,
        supplier_id: supplierId,
      });
    }
  }, [singlePurchaseInvoiceresponse, paymentInvoiceOptions]);

  useEffect(() => {
    if (latestDebitNoteNumberResponse?.data?.latest_num) {
      setInitialValues({
        ...initialValues,
        supplier_credit_formatted_number: latestDebitNoteNumberResponse?.data?.latest_num,
      });
    }
  }, [latestDebitNoteNumberResponse]);

  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Purchase Debit Notes" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={supplierCreditFormValidationSchema}
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

                <FormikField
                  name="supplier_credit_formatted_number"
                  placeholder="Debit Note"
                  label="Debit Note"
                  startIcon={<TagIcon />}
                  disabled
                />
                {/* Purchase Inv No */}
                <FormikSelect
                  name="bill_id"
                  options={paymentInvoiceOptions || []}
                  disabled={Boolean(purchaseId)}
                  placeholder="Purchase Invoice Number"
                  label="Purchase Inv No"
                  isRequired
                  onChange={value => handleChangePurchaseInvoice(value, setFieldValue)}
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
                  isRequired
                />

                {/* debit account number */}
                <FormikSelect
                  name="debit_account_number"
                  options={bankAccountOptions}
                  placeholder="Debit Account Number"
                  label="Debit Acc No"
                  isRequired
                  className="col-12"
                  // onChange={value => handleChangeDebitAccount(value, setFieldValue)}
                />

                {/* Item detail */}
                <div className="form__form-group w-100">
                  <FieldArray
                    render={props => (
                      <PurchaseItem
                        {...props}
                        name="supplier_credit_items"
                        inputList={purchaseItemsInputList}
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
