import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// services
import { useGetItemsListQuery } from 'services/private/items';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import {
  useAddPurchaseOrderMutation,
  useEditPurchaseOrderMutation,
  useGetLatestPurchaseOrderNumberQuery,
  useGetSinglePurchaseOrderQuery,
} from 'services/private/purchase-orders';
// shared
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import FormikField from 'shared/components/form/FormikField';
import FormHeader from 'shared/components/form-header/FormHeader';
import {
  handleCalculateTotalAmount,
  handleChangeCostPrice,
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  handleChangeUnitPrice,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
import FormikFileField from 'shared/components/form/FormikFileField';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import SectionLoader from 'containers/common/loaders/SectionLoader';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import { purchaseOrderInitialValues } from '../utilities/initialValues';
// styles
import 'styles/form/form.scss';
import { purchaseOrderFormValidationSchema } from '../utilities/validation-schema';

function AddPurchaseOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const itemsListResponse = useGetItemsListQuery();
  const supplierListResponse = useGetSuppliersListQuery();
  const latestPurchaseOrder = useGetLatestPurchaseOrderNumberQuery({}, { skip: id });

  const [addPurchaseOrder] = useAddPurchaseOrderMutation();
  const [editPurchaseOrder] = useEditPurchaseOrderMutation();

  const { initialValues, setInitialValues } = useInitialValues(
    purchaseOrderInitialValues,
    useGetSinglePurchaseOrderQuery,
    null,
    true
  );
  const { optionsList: suppliersOptions } = useListOptions(supplierListResponse?.data?.results, {
    value: 'id',
    label: 'supplier_name',
  });
  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price', 'item_type', 'cost_price', 'weighted_cost_price']
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
        placeholder: 'Quantity',
        type: 'number',
        onChange: handleChangeQuantity,
      },
      {
        name: 'cost_price',
        placeholder: 'Cost Price',
        type: 'number',
        onChange: handleChangeCostPrice,
      },
      {
        name: 'unit_price_ex_vat',
        placeholder: 'Unit Price',
        type: 'number',
        onChange: handleChangeUnitPrice,
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

  useEffect(() => {
    if (!id) {
      setInitialValues({
        ...initialValues,
        pur_order_num: latestPurchaseOrder?.data?.latest_num ? latestPurchaseOrder.data.latest_num : 1000,
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
            initialValues={initialValues}
            validationSchema={purchaseOrderFormValidationSchema}
            onSubmit={async (values, { setErrors, resetForm }) => {
              let response = null;
              const payload = {
                ...values,
                pur_order_docs: values.filesList,
                ...handleCalculateTotalAmount(values.pur_order_items),
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
                response = await editPurchaseOrder({ id, payload: formData });
              } else {
                response = await addPurchaseOrder(formData);
              }
              if (response.data) {
                resetForm(initialValues);
                navigate(-1);
              }
              if (response.error) {
                setErrors(response.error.data);
              }
            }}
          >
            <Form className="form form--horizontal mt-3 row">
              <FormikField
                name="pur_order_num"
                placeholder="Purchase Order Number"
                disabled
                label="Po Number"
                startIcon={<TagIcon />}
              />

              <FormikDatePicker
                name="date"
                type="text"
                placeholder="Date"
                displayFormat="yyyy-MM-dd"
                label="Date"
                startIcon={<CalendarMonthIcon />}
              />

              <FormikSelect
                options={suppliersOptions}
                name="supplier_id"
                placeholder="Supplier"
                label="Supplier"
                isRequired
              />

              <FormikField name="reference_num" type="text" placeholder="Reference Number" label="Ref No" />

              <FormikFileField
                name="pur_order_docs"
                type="file"
                placeholder="Attachment"
                startIcon={<AttachFileIcon />}
                label="Attachment"
              />
              <FormikField name="location" type="text" placeholder="Location" label="Location" />

              <div className="form__form-group w-100">
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
              </div>

              <FormikField name="remarks" textArea placeholder="Remarks" label="Remarks" className="col-12" />

              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddPurchaseOrder;
