import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useGetItemsListQuery } from 'services/private/items';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useGetPurchaseOrdersListQuery } from 'services/private/purchase-orders';
import {
  useAddPurchaseInvoceMutation,
  useEditPurchaseInvoceMutation,
  useGetSinglePurchaseInvoiceQuery,
} from 'services/private/purchase-invoice';
import {
  handleCalculateTotalAmount,
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
import { useGetBankAccountsListQuery } from 'services/private/banking';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import 'styles/form/form.scss';

function AddPurchaseInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    supplier_id: '',
    pur_order_formatted_number: '',
    due_date: moment().format('YYYY-MM-DD'),
    credit_account: '',
    location: '',
    attachment: '',
    supplier_invoice_num: '',
    invoice_num: '',
    bill_items: [
      {
        num_units: 0,
        num_nights: 0,
        unit_price_ex_vat: 0,
        gross_amount: 0,
        discount: 0,
        vat_amount: 0,
        net_amount: 0,
        account_code: '',
        service_type: '',
        currency: 1,
      },
    ],
    notes: '',

    // extra
    currency: 'AED',
  });
  const [purchaseOrdersListOptions, setPurchaseOrdersListOptions] = useState([]);

  const suppliersListResponse = useGetSuppliersListQuery();
  const purchaseOrdersListResponse = useGetPurchaseOrdersListQuery();
  const itemsListResponse = useGetItemsListQuery();
  const bankAccountsListsponse = useGetBankAccountsListQuery();
  const [addPurchaseInvoice] = useAddPurchaseInvoceMutation();
  const [editPurchaseInvoice] = useEditPurchaseInvoceMutation();
  const suppliersListOptions = suppliersListResponse?.data?.results?.map(supplier => ({
    value: supplier.id,
    label: supplier.supplier_name,
    credit_account: supplier.account_default,
  }));
  const itemsListOptions = itemsListResponse?.data?.results?.map(item => ({
    value: item.item_name,
    label: item.item_name,
    price: item.sale_price,
    type: item.item_type,
  }));
  const purchaseItemsInputList = useMemo(
    () => [
      {
        name: 'item',
        placeholder: 'Item',
        isSelect: true,
        options: itemsListOptions || [],
        width: '15%',
        onChange: handleChangeItem,
      },
      {
        name: 'quantity',
        placeholder: 'Quanitiy',
        type: 'number',
        onChange: handleChangeQuantity,
      },
      {
        name: 'price',
        placeholder: 'Unit Price',
        type: 'number',
        disabled: true,
      },
      {
        name: 'total',
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
        name: 'vat',
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
    [suppliersListResponse, purchaseOrdersListResponse, itemsListResponse]
  );
  const bankAccountOptions = bankAccountsListsponse?.data?.results?.map(account => ({
    value: account.chart_of_account,
    label: account.bank_account_name,
  }));
  const handleGetPurchaseOrderAgainstSupplier = (value, setFieldValue = () => {}) => {
    if (!value) return;
    const purchaseOrderAgainstSupplier = purchaseOrdersListResponse.data.results.filter(
      purchaseOrder => value === purchaseOrder.supplier_id
    );
    setFieldValue('bill_items', [
      {
        item: '',
        quantity: '',
        units: '',
        price: '',
        total: '',
        discount: '',
        vat: '',
        net_amount: '',
        vat_amount: '',
        service_type: '',
        vat_rate: '',
      },
    ]);
    setFieldValue('pur_order', '');

    setPurchaseOrdersListOptions(
      purchaseOrderAgainstSupplier.map(purchaseOrder => ({
        label: purchaseOrder.pur_order_formatted_number,
        value: purchaseOrder.id,
        pur_order_items: purchaseOrder.pur_order_items,
      }))
    );
  };
  const handlegetAttachment = (files, setFieldValue) => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setFieldValue('attachment_file', reader.result);
      };
    }
  };
  const handleChangePurchaseOrderItem = (value, setFieldValue = () => {}) => {
    const selecteditem = purchaseOrdersListResponse.data.results.filter(
      purchaseOrder => purchaseOrder.id === value
    )[0];
    if (!selecteditem) return [];
    const selectedOrderItems = selecteditem.pur_order_items.map(item => ({
      item: item.service_type,
      quantity: item.num_nights,
      units: item.num_nights,
      price: item.unit_price_ex_vat,
      total: item.gross_amount,
      discount: item.discount,
      vat: item.vat_rate && VAT_CHARGES[item.vat_rate]?.value ? VAT_CHARGES[item.vat_rate].value : '0',
      net_amount: item.net_amount,
      vat_amount: item.vat_amount,
      service_type: item.service_type,
      vat_rate: item.vat_rate,
    }));
    setFieldValue('bill_items', selectedOrderItems);
    return selectedOrderItems;
  };

  if (id) {
    const purchaseInvoiceDetail = useGetSinglePurchaseInvoiceQuery(id);
    useEffect(() => {
      if (
        purchaseInvoiceDetail.data &&
        purchaseOrdersListResponse.data &&
        suppliersListResponse.data &&
        itemsListResponse.data
      ) {
        const purchaseOrderItems = handleChangePurchaseOrderItem(purchaseInvoiceDetail.data.pur_order);
        setInitialValues({
          ...purchaseInvoiceDetail.data,
          attachment: null,
          credit_account: purchaseInvoiceDetail.data.credit_account,
          pur_order: purchaseInvoiceDetail.data.pur_order,
          bill_items: purchaseOrderItems || [{}],
        });
        handleGetPurchaseOrderAgainstSupplier(purchaseInvoiceDetail.data.supplier_id);
      }
    }, [purchaseInvoiceDetail, suppliersListResponse, purchaseOrdersListResponse, itemsListResponse]);
  }

  return (
    <SectionLoader
      options={[
        suppliersListResponse.isLoading,
        purchaseOrdersListResponse.isLoading,
        itemsListResponse.isLoading,
      ]}
    >
      <Card>
        <CardContent>
          <FormHeader title="Purchase Invoice" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
              const purchaseOrderItems = values.bill_items.map(item => ({
                service_type: item.name && item.name.length > 0 ? item.name : item.item,
                currency: 1,
                num_units: item.quantity,
                num_nights: item.quantity,
                unit_price_ex_vat: item.price,
                gross_amount: item.total,
                discount: item.discount || 0,
                vat_amount: item.vat_amount.toFixed(2) ? item.vat_amount.toFixed(2) : item.vat_amount,
                vat_rate: item.vat_rate,
                net_amount: item.net_amount,
              }));
              let response = null;
              if (id) {
                const payload = {
                  ...values,
                  bill_items: purchaseOrderItems,
                  bill_date: values.due_date,
                  invoice_date: values.due_date,
                  bill_notes: [],
                  attachment: values.attachment_file,
                  ...handleCalculateTotalAmount(values.bill_items),
                };
                response = await editPurchaseInvoice({ id, payload });
              } else {
                const payload = {
                  ...values,
                  bill_items: purchaseOrderItems,
                  bill_date: values.due_date,
                  invoice_date: values.due_date,
                  bill_notes: [],
                  bill_num: `#${values.invoice_num}`,
                  attachment: values.attachment_file,
                  ...handleCalculateTotalAmount(values.bill_items),
                };
                response = await addPurchaseInvoice(payload);
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
                {/* Supplier */}

                <FormikSelect
                  options={suppliersListOptions}
                  name="supplier_id"
                  placeholder="Supplier"
                  onChange={value => handleGetPurchaseOrderAgainstSupplier(value, setFieldValue)}
                  label="Supplier"
                />
                {/* Purchase */}

                <FormikSelect
                  name="pur_order"
                  placeholder="Purchase Order Number"
                  options={purchaseOrdersListOptions}
                  onChange={value => handleChangePurchaseOrderItem(value, setFieldValue)}
                  startIcon={<TagIcon />}
                  label="Supplier"
                />
                {/* due date */}

                <FormikDatePicker
                  name="due_date"
                  type="text"
                  placeholder="Date"
                  label="Date"
                  startIcon={<CalendarMonthIcon />}
                />
                {/* Credit Acount */}

                <FormikSelect
                  name="credit_account"
                  options={bankAccountOptions}
                  placeholder="Credit Account"
                  label="Credit Account"
                />

                {/* Location */}

                <FormikField
                  name="location"
                  type="text"
                  placeholder="Location"
                  label="Location"
                  startIcon={<FmdGoodIcon />}
                />

                {/* Attachment */}

                <FormikField
                  name="attachment"
                  type="file"
                  placeholder="Attachment"
                  onChange={files => handlegetAttachment(files, setFieldValue)}
                  label="Attachment"
                  startIcon={<AttachFileIcon />}
                />
                {/* Supplier Inv Number */}
                <FormikField
                  name="supplier_invoice_num"
                  type="number"
                  placeholder="Supplier Invoice Number"
                  label="Supplier Inv No"
                />

                {/* Supplier Invoice */}

                <FormikField
                  name="invoice_num"
                  type="number"
                  placeholder="Supplier Invo"
                  label="Supplier Invo"
                />

                {/* Item detail */}
                <div className="form__form-group w-100">
                  <FieldArray
                    name="bill_items"
                    render={props => (
                      <PurchaseItem
                        name="pur_order_items"
                        inputList={purchaseItemsInputList}
                        newList={NEW_PURCHASE_ITEM_OBJECT}
                        {...props}
                      />
                    )}
                  />
                </div>

                {/* Remarks */}
                <FormikField
                  name="notes"
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

export default AddPurchaseInvoice;
