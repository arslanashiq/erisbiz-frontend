import React, { useState } from 'react';
import moment from 'moment';
import { FieldArray, Form, Formik } from 'formik';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useGetItemsListQuery } from 'services/private/items';
import { useAddPurchaseOrderMutation } from 'services/private/purchase-orders';
import { useGetCustomersListQuery } from 'services/private/customers';
import FormikField from 'shared/components/form/FormikField';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import FormHeader from 'shared/components/form-header/FormHeader';
import {
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { VAT_CHARGES } from 'utilities/constants';
import 'styles/form/form.scss';
import FormikFileField from 'shared/components/form/FormikFileField';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';

function AddPerformaInvoice() {
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

  console.log(setInitialValues);

  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Performa Invoice" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async values => {
              await addPurchaseOrder(values);
            }}
          >
            <Form className="form form--horizontal mt-3 row">
              {/* Purchase */}

              <FormikField
                name="quotation_number"
                type="text"
                disabled
                placeholder="Performa Invoice"
                label="Performa Invoice"
                startIcon={<TagIcon />}
              />
              {/* date */}

              <FormikDatePicker
                name="date"
                type="text"
                placeholder="Date"
                label="Date"
                startIcon={<CalendarMonthIcon />}
              />

              {/* Sale Person */}
              <FormikField
                name="sale_person"
                type="text"
                disabled
                placeholder="Sale Person"
                label="Sale Person"
              />

              {/* Customer */}

              <FormikSelect
                options={customersOptions}
                name="customer_id"
                placeholder="Customer"
                label="Customer"
              />

              {/* Location */}

              <FormikField
                name="location"
                type="text"
                placeholder="Location"
                label="Location"
                startIcon={<LocationOnIcon />}
              />

              {/* Attackment */}

              <FormikFileField
                name="attachment"
                type="file"
                placeholder="Attachment"
                label="Attachment"
                startIcon={<AttachFileIcon />}
              />

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
              <FormikField name="remarks" textArea placeholder="Remarks" label="Remarks" className="col-12" />
              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddPerformaInvoice;
