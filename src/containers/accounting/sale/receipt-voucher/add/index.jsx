import React, { useMemo } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// srvices
import { useGetSingleReceiptVoucherQuery } from 'services/private/receipt-voucher';
import { useGetItemsListQuery } from 'services/private/items';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikFileField from 'shared/components/form/FormikFileField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import {
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import 'styles/form/form.scss';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import { receiptVoucherInitialValues } from '../utilities/initialValues';

function AddReceiptVoucher() {
  const itemsListResponse = useGetItemsListQuery();

  const { initialValues } = useInitialValues(receiptVoucherInitialValues, useGetSingleReceiptVoucherQuery);
  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      label: 'item_name',
      value: 'item_name',
    },
    ['sale_price', 'item_type']
  );
  const ReceiptVoucherInputList = useMemo(
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
  return (
    <SectionLoader>
      <Card>
        <CardContent>
          <FormHeader title="Receipt Voucher" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
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
              <FormikSelect options={[]} name="customer_id" placeholder="Customer" label="Customer" />

              {/* Location */}

              <FormikField
                name="location"
                type="text"
                placeholder="Location"
                label="Location"
                startIcon={<FmdGoodIcon />}
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
                      inputList={ReceiptVoucherInputList}
                      newList={NEW_PURCHASE_ITEM_OBJECT}
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

export default AddReceiptVoucher;
