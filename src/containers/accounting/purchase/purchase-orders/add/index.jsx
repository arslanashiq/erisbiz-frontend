/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import moment from 'moment';
import { Button, Card, CardContent, Stack } from '@mui/material';
import FormikModernField from 'shared/components/form/FormikModernField';
// import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import { useGetItemsListQuery } from 'services/private/items';
import Loader from 'shared/components/loader/Loader';
import { VAT_CHARGES } from 'utilities/constants';
import FormHeader from 'shared/components/form-header/FormHeader';
// import { useGetLatestPurchaseOrderNumberQuery } from 'services/private/purchase-orders';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import 'styles/form.scss';

function AddPurchaseOrder() {
  const itemsListResponse = useGetItemsListQuery();
  const supplierListResponse = useGetSuppliersListQuery();
  const [initialValues, setInitialValues] = useState({
    date: moment().format('YYYY-MM-DD'),
    location: '',
    supplier_id: '',
    reference_num: '',
    exchange_rate: 1,
    attachment: '',
    remarks: '',
    currency: 'AED',
    pur_order_items: [
      {
        service_type: 'Apple',
        currency: 78,
        num_units: 1,
        num_nights: 1,
        unit_price_ex_vat: 100,
        gross_amount: 1155,
        discount: 12,
        vat_amount: 55,
        net_amount: 15330,
      },
    ],

    pur_order_suffix: 'LPO',
    pur_order_docs: [
      {
        doc_file: '',
        doc_type: '',
        doc_name: '',
        doc_size_bytes: 0,
      },
    ],
  });
  console.log(setInitialValues);

  if (itemsListResponse.isLoading) {
    return <Loader />;
  }

  const suppliersOptions = supplierListResponse?.data?.results?.map(supplier => ({
    value: `${supplier.id}`,
    label: supplier.supplier_name,
  }));
  const itemsListOptions = itemsListResponse?.data?.results?.map((item, index) => ({
    value: item.item_name,
    label: item.item_name,
    price: index + 1,
  }));
  const handleChangeValues = (name, index, values, setFieldValue) => {
    const grossTotal = values.price * values.quantity;
    let netAmount = grossTotal + (grossTotal / 100) * VAT_CHARGES[values.vat].percent;
    if (values.discount < netAmount) {
      netAmount -= values.discount;
    }
    if (grossTotal < 0) return;
    setFieldValue(`${name}.${index}.total`, grossTotal);
    setFieldValue(`${name}.${index}.net_amount`, netAmount);
  };
  const handleChangeItem = (name, index, key, value, values, setFieldValue) => {
    const selectedItem = itemsListOptions.filter(item => item.label === value);
    setFieldValue(`${name}.${index}.price`, selectedItem[0].price);
    const newValues = {
      ...values,
      price: selectedItem[0].price,
    };

    handleChangeValues(name, index, newValues, setFieldValue);
  };
  const handleChangeQuantity = (name, index, key, value, values, setFieldValue) => {
    const newValues = { ...values, quantity: value };
    handleChangeValues(name, index, newValues, setFieldValue);
  };
  const hanldeVATChange = (name, index, key, value, values, setFieldValue) => {
    const newValues = { ...values, vat: value };
    handleChangeValues(name, index, newValues, setFieldValue);
  };
  const handleChangeDiscount = (name, index, key, value, values, setFieldValue) => {
    const newValues = { ...values, discount: value };
    handleChangeValues(name, index, newValues, setFieldValue);
  };
  return (
    <Card>
      <CardContent>
        <FormHeader title="Purchase Order" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          // validationSchema={bankFormValidationSchema}
          onSubmit={async values => {
            console.log(values, 'values');
          }}
        >
          {({
            isSubmitting,
            touched,

            // setFieldTouched,
            resetForm,
          }) => (
            <Form className="form form--horizontal mt-3 row">
              {/* Purchase */}
              {/* <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Po Number</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    {' '}
                    <TagIcon />
                  </div>
                  <FormikModernField
                    name="purchase_order_number"
                    type="text"
                    disabled
                    placeholder="Purchase Order Number"
                  />
                </div>
              </div> */}
              {/* date */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Date</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <CalendarMonthIcon />
                  </div>
                  <FormikDatePicker name="date" type="text" placeholder="Date" />
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
                  <FormikModernField name="attachment" type="file" placeholder="Attachment" />
                </div>
              </div>
              {/* Location */}
              <div className="form__form-group">
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
                      inputList={[
                        {
                          name: 'item',
                          placeholder: 'Item',
                          isSelect: true,
                          options: itemsListOptions,
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
                      ]}
                      newList={{
                        item: '',
                        quantity: 0,
                        price: 0,
                        total: 0,
                        discount: 0,
                        vat: 0,
                        net_amount: 0,
                      }}
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
