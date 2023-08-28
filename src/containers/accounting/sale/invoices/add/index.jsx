/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import moment from 'moment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
import { VAT_CHARGES } from 'utilities/constants';
import FormHeader from 'shared/components/form-header/FormHeader';
// import { useGetLatestPurchaseOrderNumberQuery } from 'services/private/purchase-orders';
import 'styles/form.scss';
import { useAddPurchaseOrderMutation } from 'services/private/purchase-orders';
import {
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utils/helpers';
import { useGetCustomersListQuery } from 'services/private/customers';

function AddInvoice() {
  const itemsListResponse = useGetItemsListQuery();
  const customerListResponse = useGetCustomersListQuery();
  const [initialValues, setInitialValues] = useState({
    date: moment().format('YYYY-MM-DD'),
    location: '',
    customer_id: '',
    exchange_rate: 1,
    attachment: '',
    remarks: '',
    currency: 'AED',
    pur_order_items: [
      {
        service_type: 'Apple',
        currency: 1,
        num_units: 0,
        num_nights: 0,
        unit_price_ex_vat: 0,
        gross_amount: 0,
        discount: 0,
        vat_amount: 0,
        net_amount: 0,
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
  const [addPurchaseOrder] = useAddPurchaseOrderMutation();
  console.log(setInitialValues);

  if (itemsListResponse.isLoading) {
    return <Loader />;
  }

  const customersOptions = customerListResponse?.data?.results?.map(supplier => ({
    value: `${supplier.id}`,
    label: supplier.contact_person,
  }));
  const itemsListOptions = itemsListResponse?.data?.results?.map((item, index) => ({
    value: item.item_name,
    label: item.item_name,
    price: index + 1,
    type: item.item_type,
  }));

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

  return (
    <Card>
      <CardContent>
        <FormHeader title="Sale Invoice" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          // validationSchema={bankFormValidationSchema}
          onSubmit={async values => {
            await addPurchaseOrder(values);
          }}
        >
          {({
            isSubmitting,
            touched,
            setFieldValue,
            // setFieldTouched,
            resetForm,
          }) => (
            <Form className="form form--horizontal mt-3 row">
              {/* Purchase */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Performa Invoice</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    <TagIcon />
                  </div>
                  <FormikModernField
                    name="quotation_number"
                    type="text"
                    disabled
                    placeholder="Performa Invoice"
                  />
                </div>
              </div>
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

              {/* Sale Person */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Sale Person</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="sale_person" type="text" disabled placeholder="Sale Person" />
                </div>
              </div>

              {/* Customer */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Customer</span>
                <div className="form__form-group-field ">
                  <FormikModernSelect options={customersOptions} name="customer_id" placeholder="Customer" />
                </div>
              </div>
              {/* Location */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Location</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <LocationOnIcon />
                  </div>
                  <FormikModernField name="location" type="text" placeholder="Location" />
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

export default AddInvoice;
