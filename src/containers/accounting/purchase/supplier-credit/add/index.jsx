import React, { useState } from 'react';
import moment from 'moment';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useGetItemsListQuery } from 'services/private/items';
import {
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
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { VAT_CHARGES } from 'utilities/constants';
import 'styles/form/form.scss';

function AddSupplierCredit() {
  const [initialValues, setInitialValues] = useState({
    date: moment().format('YYYY-MM-DD'),
    location: '',
    supplier: '',
    refrence_number: '',
    attachment: '',
    pur_order_items: [
      {
        item: '',
        quantity: 0,
        price: 0,
        total: 0,
        discount: 0,
        vat: 0,
        net_amount: 0,
      },
    ],
    requestor_signature_show: true,
    // requestor_signature: requestorSign,
    show_stamp: true,
    // stamp: user.profile.stamp,

    // latest_pur_order_num: lastPurOrderNum != null ? lastPurOrderNum : 0,
    // pur_order_num: lastPurOrderNum ? lastPurOrderNum + 1 : 1000,
    pur_order_suffix: 'LPO',
    customer_type_suffix: '',
    currency: 'AED',
    currency_symbol: 'AED',
    currency_id: null,
    convert_to_aed: true,
    exchange_rate: 1,
    pur_order_date: moment().format('YYYY-MM-DD'),
    event: '',
    tax_treatment: '',
    trn: '',
    place_of_supply: '',
    requestor_name: '',
    period_start: '',
    period_end: '',
    notes: '',
    account_num: '',
    iban: '',
    advance_pyments: '',
    payment_notes: '',
    discount: 0,
    amount_total: 0,
    amount_total_aed: 0,
    vat_total: 0,
    vat_total_aed: 0,
    grand_total: 0,
    grand_total_aed: 0,
    sub_total: 0,
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  });
  const itemsListResponse = useGetItemsListQuery();

  const itemsListOptions = itemsListResponse?.data?.results?.map((item, index) => ({
    value: item.item_name,
    label: item.item_name,
    price: index + 1,
  }));

  console.log(setInitialValues, 'sjdlksadjlksa');
  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Debit Notes" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
            //   onSubmit={async values => {
            //   }}
          >
            <Form className="form form--horizontal mt-3 row">
              {/* Purchase */}

              <FormikField
                name="voucher_no"
                type="text"
                placeholder="Voucher Number"
                label="Voucher Number"
                startIcon={<TagIcon />}
              />
              {/* date */}

              <FormikDatePicker
                name="date"
                type="text"
                placeholder="Date"
                startIcon={<CalendarMonthIcon />}
                label="Date"
              />

              {/* Purchase Inv No */}
              <FormikField
                name="purchase_inv_no"
                type="text"
                placeholder="Purchase Invoice Number"
                label="Purchase Inv No"
              />

              {/* Supplier */}
              <FormikSelect itemOptions={[]} name="supplier" placeholder="Supplier" label="Supplier" />

              {/* Location */}
              <FormikField
                name="debit_account"
                type="text"
                placeholder="Debit Account Number"
                label="Debit Acc No"
                className="col-12"
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

export default AddSupplierCredit;
