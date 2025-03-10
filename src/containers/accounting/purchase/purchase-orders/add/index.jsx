import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray } from 'formik';
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
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import {
  handleCalculateTotalAmount,
  // handleChangeCostPrice,
  handleChangeDiscount,
  handleChangePurchaseItem,
  handleChangeQuantity,
  handleChangeUnitPrice,
  hanldeVATChange,
} from 'shared/components/purchase-item/utilities/helpers';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import FormikFileField from 'shared/components/form/FormikFileField';
// containers
import FormikWrapper from 'containers/common/form/FormikWrapper';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import { PurchaseItemInputList } from 'utilities/purchase-item-input-list';
import { purchaseOrderInitialValues } from '../utilities/initialValues';
// styles
import { purchaseOrderFormValidationSchema } from '../utilities/validation-schema';

function AddPurchaseOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const itemsListResponse = useGetItemsListQuery({ is_active: 'True' });
  const supplierListResponse = useGetSuppliersListQuery();
  const latestPurchaseOrder = useGetLatestPurchaseOrderNumberQuery(
    {},
    { skip: id, refetchOnMountOrArgChange: true }
  );

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
    ['sale_price', 'item_type', 'cost_price', 'weighted_cost_price', 'account_no']
  );
  const purchaseOrderInputList = useMemo(
    () => [
      {
        ...PurchaseItemInputList.service_type,
        options: itemsListOptions || [],
        onChange: handleChangePurchaseItem,
      },
      { ...PurchaseItemInputList.num_nights, onChange: handleChangeQuantity },
      { ...PurchaseItemInputList.unit_price_ex_vat, onChange: handleChangeUnitPrice },
      { ...PurchaseItemInputList.gross_amount },
      { ...PurchaseItemInputList.discount, onChange: handleChangeDiscount },
      { ...PurchaseItemInputList.vat_rate, options: VAT_CHARGES || [], onChange: hanldeVATChange },
      {
        ...PurchaseItemInputList.net_amount,
        options: itemsListOptions || [],
        onChange: handleChangePurchaseItem,
      },
    ],
    [itemsListOptions]
  );

  const handleSubmitForm = useCallback(async (values, { setErrors, resetForm }) => {
    let response = null;
    const payload = {
      ...values,
      pur_order_docs: values.filesList,
      ...handleCalculateTotalAmount(values.pur_order_items),
    };
    if (payload.filesList) {
      delete payload.filesList;
    }
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
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    if (values.save_and_continue) {
      resetForm();
      return;
    }
    navigate(-1);
  }, []);

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
          <FormikWrapper
            initialValues={initialValues}
            validationSchema={purchaseOrderFormValidationSchema}
            onSubmit={handleSubmitForm}
          >
            <FormikField
              name="pur_order_num"
              //  placeholder="Purchase Order Number"
              disabled
              label="PO Number"
              startIcon={<TagIcon />}
            />

            <FormikDatePicker
              name="date"
              type="text"
              //  placeholder="Date"
              displayFormat="yyyy-MM-dd"
              label="Date"
              startIcon={<CalendarMonthIcon />}
            />

            <FormikSelect
              options={suppliersOptions}
              name="supplier_id"
              //  placeholder="Supplier"
              label="Supplier"
              isRequired
            />

            <FormikField
              name="reference_num"
              type="text"
              // placeholder="Reference Number"
              label="Ref No"
            />

            <FormikFileField
              name="pur_order_docs"
              type="file"
              //  placeholder="Attachment"
              startIcon={<AttachFileIcon />}
              label="Attachment"
            />
            <FormikField
              name="location"
              type="text"
              // placeholder="Location"
              label="Location"
            />

            <div className="form__form-group w-100">
              <FieldArray
                name="pur_order_items"
                render={props => (
                  <PurchaseItem
                    hideCostPriceOnGoods
                    inputList={purchaseOrderInputList}
                    newList={NEW_PURCHASE_ITEM_OBJECT}
                    {...props}
                  />
                )}
              />
            </div>

            <FormikField
              name="remarks"
              textArea
              // placeholder="Remarks"
              label="Remarks"
              className="col-12"
            />

            <FormSubmitButton />
          </FormikWrapper>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default memo(AddPurchaseOrder);
