import React, { useState } from 'react';
import moment from 'moment';
import { FieldArray, Form, Formik } from 'formik';
import { Button, Card, CardContent, Stack } from '@mui/material';
import { useGetItemsListQuery } from 'services/private/items';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utils/helpers';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikModernField from 'shared/components/form/FormikModernField';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import Loader from 'shared/components/loader/Loader';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import { VAT_CHARGES } from 'utilities/constants';
import 'styles/form.scss';

function AddSupplierCredit() {
  const [initialValues, setInitialValues] = useState({
    // pur_order_num: lastPurOrderNum ? lastPurOrderNum + 1 : 1000,
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
  console.log(setInitialValues, 'sjdlksadjlksa');
  const itemsListResponse = useGetItemsListQuery();
  if (itemsListResponse.isLoading) {
    return <Loader />;
  }

  const itemsListOptions = itemsListResponse.data.results.map((item, index) => ({
    value: item.item_name,
    label: item.item_name,
    price: index + 1,
  }));

  return (
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
          {({
            isSubmitting,
            touched,

            // setFieldTouched,
            resetForm,
          }) => (
            <Form className="form form--horizontal mt-3 row">
              {/* Purchase */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Voucher Number</span>
                <div className="form__form-group-field ">
                  <div className="form__form-group-icon cursor-pointer">
                    {' '}
                    <TagIcon />
                  </div>
                  <FormikModernField name="voucher_no" type="text" placeholder="Voucher Number" />
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

              {/* Purchase Inv No */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Purchase Inv No</span>
                <div className="form__form-group-field ">
                  <FormikModernField
                    name="purchase_inv_no"
                    type="text"
                    placeholder="Purchase Invoice Number"
                  />
                </div>
              </div>

              {/* Supplier */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Supplier</span>
                <div className="form__form-group-field ">
                  <FormikModernSelect itemOptions={[]} name="supplier" placeholder="Supplier" />
                </div>
              </div>

              {/* Location */}
              <div className="form__form-group">
                <span className="form__form-group-label col-lg-3 required">Debit Acc No</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="debit_account" type="text" placeholder="Debit Account Number" />
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
                  onClick={() => resetForm()}
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

export default AddSupplierCredit;
