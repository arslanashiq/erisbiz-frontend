import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// services
import { useGetItemsListQuery } from 'services/private/items';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useGetPurchaseOrdersListQuery } from 'services/private/purchase-orders';
import {
  useAddPurchaseInvoceMutation,
  useEditPurchaseInvoceMutation,
  useGetSinglePurchaseInvoiceQuery,
} from 'services/private/purchase-invoice';
import { useGetBankAccountsListQuery } from 'services/private/banking';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import {
  handleCalculateTotalAmount,
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
import FormikFileField from 'shared/components/form/FormikFileField';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// utilities
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import { purchaseInvoiceInitialValue } from '../utilities/constant';
// styles
import 'styles/form/form.scss';

function AddPurchaseInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [purchaseOrdersListOptions, setPurchaseOrdersListOptions] = useState([]);

  const suppliersListResponse = useGetSuppliersListQuery();
  const purchaseOrdersListResponse = useGetPurchaseOrdersListQuery();
  const itemsListResponse = useGetItemsListQuery();
  const bankAccountsListsponse = useGetBankAccountsListQuery();
  const [addPurchaseInvoice] = useAddPurchaseInvoceMutation();
  const [editPurchaseInvoice] = useEditPurchaseInvoceMutation();
  const {
    initialValues,
    setInitialValues,
    queryResponse: purchaseInvoiceDetail,
  } = useInitialValues(purchaseInvoiceInitialValue, useGetSinglePurchaseInvoiceQuery, null, false);
  const suppliersListOptions = suppliersListResponse?.data?.results?.map(supplier => ({
    value: supplier.id.toString(),
    label: supplier.supplier_name,
    credit_account: supplier.account_default,
  }));
  const itemsListOptions = itemsListResponse?.data?.results?.map(item => ({
    value: item.item_name,
    label: item.item_name,
    price: item.sale_price,
    type: item.item_type,
  }));
  const bankAccountOptions = bankAccountsListsponse?.data?.results?.map(account => ({
    value: account.chart_of_account,
    label: account.bank_account_name,
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
  const handleGetPurchaseOrderAgainstSupplier = (value, setFieldValue = () => {}) => {
    if (!value) return;
    const purchaseOrderAgainstSupplier = purchaseOrdersListResponse.data.results.filter(
      purchaseOrder => Number(value) === purchaseOrder.supplier_id
    );
    setFieldValue('bill_items', [{}]);

    setPurchaseOrdersListOptions(
      purchaseOrderAgainstSupplier.map(purchaseOrder => ({
        label: purchaseOrder.pur_order_formatted_number,
        value: purchaseOrder.id,
        pur_order_items: purchaseOrder.pur_order_items,
      }))
    );
  };
  const handleChangePurchaseOrderItem = (value, setFieldValue = () => {}) => {
    const selecteditem = purchaseOrdersListResponse.data.results.filter(
      purchaseOrder => purchaseOrder.id === value
    )[0];
    if (!selecteditem) return [];
    const selectedOrderItems = [...selecteditem.pur_order_items];
    setFieldValue('bill_items', selectedOrderItems);
    return selectedOrderItems;
  };
  useEffect(() => {
    if (
      purchaseInvoiceDetail?.data &&
      purchaseOrdersListResponse?.data &&
      suppliersListResponse?.data &&
      itemsListResponse?.data
    ) {
      const purchaseOrderItems = handleChangePurchaseOrderItem(purchaseInvoiceDetail.data.pur_order);
      setInitialValues({
        ...initialValues,
        credit_account: purchaseInvoiceDetail.data.credit_account,
        pur_order: purchaseInvoiceDetail.data.pur_order,
        bill_items: purchaseOrderItems || [{}],
      });
      handleGetPurchaseOrderAgainstSupplier(purchaseInvoiceDetail.data.supplier_id);
    }
  }, [purchaseInvoiceDetail, suppliersListResponse, purchaseOrdersListResponse, itemsListResponse]);

  console.log(initialValues, 'kjadlksadksadlkjsa');
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
              let response = null;
              const payload = {
                ...values,
                invoice_date: values.due_date,
                bill_notes: [values.notes],
                bill_docs: [...values.filesList],
                ...handleCalculateTotalAmount(values.bill_items),
              };
              const formData = new FormData();
              Object.keys(payload).forEach(key => {
                if (typeof payload[key] === 'object' && payload[key]?.length > 0) {
                  payload[key].forEach((item, index) => {
                    Object.keys(item).forEach(itemKey => {
                      formData.append(`${key}[${index}]${itemKey}`, item[itemKey]);
                    });
                  });
                } else {
                  formData.append(key, payload[key]);
                }
              });
              if (id) {
                response = await editPurchaseInvoice({ id, payload: formData });
              } else {
                formData.append('bill_num', `#${values.invoice_num}`);
                response = await addPurchaseInvoice(formData);
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
                  label="PO Number"
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

                <FormikFileField
                  name="bill_docs"
                  type="file"
                  placeholder="Attachment"
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

export default AddPurchaseInvoice;
