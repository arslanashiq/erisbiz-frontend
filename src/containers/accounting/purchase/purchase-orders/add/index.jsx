/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useMemo } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { Button, Card, CardContent, Stack } from '@mui/material';
import FormikModernField from 'shared/components/form/FormikModernField';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import { useGetItemsListQuery } from 'services/private/items';
import Loader from 'shared/components/loader/Loader';
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import FormHeader from 'shared/components/form-header/FormHeader';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import 'styles/form.scss';
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
} from 'shared/components/purchase-item/utils/helpers';
import { useNavigate, useParams } from 'react-router';
import usePurchaseOrderInitialValues from '../utils/custom-hooks/usePurchaseOrderInitialValues';

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

  if (itemsListResponse.isLoading) {
    return <Loader />;
  }
  return (
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
          {({
            // values,
            isSubmitting,
            touched,
            setFieldValue,
            // setFieldTouched,
            resetForm,
          }) => (
            <Form className="form form--horizontal mt-3 row">
              {/* Purchase */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Po Number</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    {' '}
                    <TagIcon />
                  </div>
                  <FormikModernField name="pur_order_num" placeholder="Purchase Order Number" disabled />
                </div>
              </div>
              {/* date */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Date</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <CalendarMonthIcon />
                  </div>
                  <FormikDatePicker name="date" type="text" placeholder="Date" displayFormat="yyyy-MM-dd" />
                </div>
              </div>

              {/* Supplier */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Supplier</span>
                <div className="form__form-group-field ">
                  <FormikModernSelect options={suppliersOptions} name="supplier_id" placeholder="Supplier" />
                </div>
              </div>

              {/* Reference Number */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Ref No</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="reference_num" type="text" placeholder="Reference Number" />
                </div>
              </div>

              {/* Attackment */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Attachment</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <AttachFileIcon />
                  </div>
                  <FormikModernField
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
                  />
                </div>
              </div>
              {/* Location */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Location</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="location" type="text" placeholder="Location" />
                </div>
              </div>

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
              <div className="form__form-group">
                <span className="form__form-group-label col-lg-3 required">Remarks</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="remarks" textArea placeholder="Remarks" />
                </div>
              </div>

              <Stack spacing={2} direction="row">
                <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
                  Save
                </Button>

                <Button
                  color="secondary"
                  onClick={() => resetForm(initialValues)}
                  disabled={!touched || isSubmitting}
                  className="text-capitalize"
                >
                  Clear
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default AddPurchaseOrder;
