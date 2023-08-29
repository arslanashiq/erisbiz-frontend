import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import FormikField from 'shared/components/form/FormikField';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import { useGetItemsListQuery } from 'services/private/items';
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import 'styles/form/form.scss';
import {
  useAddPurchaseOrderMutation,
  useEditPurchaseOrderMutation,
  useGetLatestPurchaseOrderNumberQuery,
} from 'services/private/purchase-orders';
import {
  handleCalculateTotalAmount,
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
import FormikFileField from 'shared/components/form/FormikFileField';
import usePurchaseOrderInitialValues from '../utilities/custom-hooks/usePurchaseOrderInitialValues';

function AddPurchaseOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemsListResponse = useGetItemsListQuery();
  const supplierListResponse = useGetSuppliersListQuery();

  const [addPurchaseOrder] = useAddPurchaseOrderMutation();
  const [editPurchaseOrder] = useEditPurchaseOrderMutation();
  const latestPurchaseOrder = useGetLatestPurchaseOrderNumberQuery();
  const suppliersOptions = supplierListResponse?.data?.results?.map(supplier => ({
    value: `${supplier.id}`,
    label: supplier.supplier_name,
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
    [itemsListOptions]
  );

  const handleAddDocument = (setFieldValue, file = null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFieldValue('pur_order_docs[0].doc_file', reader.result);
        setFieldValue('pur_order_docs[0].doc_type', file.type);
        setFieldValue('pur_order_docs[0].doc_name', file.name);
        setFieldValue('pur_order_docs[0].doc_size_bytes', file.size);
      };
    } else {
      setFieldValue('pur_order_docs[0].doc_file', '');
      setFieldValue('pur_order_docs[0].doc_type', '');
      setFieldValue('pur_order_docs[0].doc_name', '');
      setFieldValue('pur_order_docs[0].doc_size_bytes', '');
    }
  };
  const { initialValues, setInitialValues } = usePurchaseOrderInitialValues(id);
  useEffect(() => {
    if (!id) {
      setInitialValues({
        ...initialValues,
        pur_order_num: latestPurchaseOrder?.data?.latest_num ? latestPurchaseOrder.data.latest_num + 1 : 1,
      });
    }
  }, [latestPurchaseOrder]);

  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Purchase Order" />
          <Formik
            enableReinitialize
            initialValues={{
              ...initialValues,
            }}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
              let response = null;
              const calculatedValue = handleCalculateTotalAmount(values.pur_order_items);
              const purchaseOrderItems = values.pur_order_items.map(item => ({
                service_type: item.name && item.name.length > 0 ? item.name : item.item,
                currency: 1,
                num_units: item.units,
                num_nights: item.quantity,
                unit_price_ex_vat: item.price,
                gross_amount: item.total,
                discount: item.discount,
                vat_amount: item.vat_amount.toFixed(2) ? item.vat_amount.toFixed(2) : item.vat_amount,
                vat_rate: item.vat_rate,
                net_amount: item.net_amount,
              }));

              const payload = {
                ...values,
                pur_order_items: [...purchaseOrderItems],
                without_change_amount_total: calculatedValue.without_change_amount_total,
                without_change_vat_total: calculatedValue.without_change_vat_total,
                without_change_grand_total: calculatedValue.without_change_grand_total,
                without_change_discount_total: calculatedValue.without_change_discount_total,
              };
              if (id) {
                response = await editPurchaseOrder({ id, payload });
              } else {
                response = await addPurchaseOrder(payload);
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
                  name="pur_order_num"
                  placeholder="Purchase Order Number"
                  disabled
                  label="Po Number"
                  startIcon={<TagIcon />}
                />
                {/* date */}

                <FormikDatePicker
                  name="date"
                  type="text"
                  placeholder="Date"
                  displayFormat="yyyy-MM-dd"
                  label="Date"
                  startIcon={<CalendarMonthIcon />}
                />

                {/* Supplier */}

                <FormikSelect
                  options={suppliersOptions}
                  name="supplier_id"
                  placeholder="Supplier"
                  label="Supplier"
                />

                {/* Reference Number */}

                <FormikField name="reference_num" type="text" placeholder="Reference Number" label="Ref No" />

                {/* Attackment */}

                <FormikFileField
                  name="attachment"
                  type="file"
                  placeholder="Attachment"
                  onChange={files => {
                    if (files.length > 0) {
                      handleAddDocument(setFieldValue, files[0]);
                    } else {
                      handleAddDocument(setFieldValue);
                    }
                  }}
                  startIcon={<AttachFileIcon />}
                  label="Attachment"
                />
                {/* Location */}
                <FormikField name="location" type="text" placeholder="Location" label="Location" />

                {/* Item detail */}
                <div className="form__form-group w-100">
                  <FieldArray
                    name="pur_order_items"
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

export default AddPurchaseOrder;
