import React, { useMemo } from 'react';
import { FieldArray, Formik, Form } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
// services
import { useGetItemsListQuery } from 'services/private/items';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import {
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { purchaseOrderInitialValues } from 'containers/accounting/purchase/purchase-orders/utilities/initialValues';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import 'styles/form/form.scss';

function index() {
  const itemsListResponse = useGetItemsListQuery();
  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price']
  );
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
  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Credit Note" />
          <Formik
            enableReinitialize
            initialValues={purchaseOrderInitialValues}
            // validationSchema={bankFormValidationSchema}
          >
            <Form className="form form--horizontal mt-3 row">
              <FormikField
                name="voucher_num"
                placeholder="Voucher Number"
                disabled
                label="Voucher Number"
                startIcon={<TagIcon />}
              />

              <FormikDatePicker
                name="date"
                type="text"
                placeholder="Date"
                displayFormat="yyyy-MM-dd"
                label="Date"
              />

              <FormikField
                name="voucher_num"
                placeholder="Invoice Number"
                disabled
                label="Invoice Number"
                startIcon={<TagIcon />}
              />

              <FormikSelect options={[]} name="account_num" placeholder="Account No" label="Account Number" />
              <FormikSelect
                options={[]}
                name="account_num"
                placeholder="Credit Acc N0"
                label="Account Number"
                className="co-12"
              />

              <FieldArray
                name="pur_order_items"
                render={props => (
                  <PurchaseItem
                    inputList={purchaseItemsInputList}
                    newList={NEW_PURCHASE_ITEM_OBJECT}
                    {...props}
                  />
                )}
              />

              <FormikField name="remarks" textArea placeholder="Remarks" label="Remarks" className="col-12" />

              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default index;
