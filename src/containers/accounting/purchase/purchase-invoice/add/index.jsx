import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// services
import { useGetItemsListQuery } from 'services/private/items';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';
import {
  useGetPurchaseOrdersListQuery,
  useGetSinglePurchaseOrderQuery,
} from 'services/private/purchase-orders';
import {
  useAddPurchaseInvoceMutation,
  useEditPurchaseInvoceMutation,
  useGetLatestPurchaseInvoiceNumberQuery,
  useGetSinglePurchaseInvoiceQuery,
} from 'services/private/purchase-invoice';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
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
import FormikFileField from 'shared/components/form/FormikFileField';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import getSearchParamsList from 'utilities/getSearchParamsList';
import { PurchaseItemInputList } from 'utilities/purchase-item-input-list';
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import { purchaseInvoiceInitialValue } from '../utilities/constant';
// styles
import 'styles/form/form.scss';
import { purchaseInvoiceFormValidationSchema } from '../utilities/validation-schema';

function AddPurchaseInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { purchaseId } = getSearchParamsList();

  const [purchaseOrdersListOptions, setPurchaseOrdersListOptions] = useState([]);

  const itemsListResponse = useGetItemsListQuery({ is_active: 'True' });
  const suppliersListResponse = useGetSuppliersListQuery();
  const chartOfAccountsListResponse = useGetChartOfAccountListQuery({ account_type: 'accounts_payable' });
  const purchaseOrdersListResponse = useGetPurchaseOrdersListQuery(id ? '' : '?status=Issued');
  const latestInvoiceNumber = useGetLatestPurchaseInvoiceNumberQuery(
    {},
    { skip: id, refetchOnMountOrArgChange: true }
  );
  const { data: purchaseOrderResponse } = useGetSinglePurchaseOrderQuery(purchaseId, { skip: !purchaseId });

  const [addPurchaseInvoice] = useAddPurchaseInvoceMutation();
  const [editPurchaseInvoice] = useEditPurchaseInvoceMutation();

  const { initialValues, setInitialValues, isLoading, queryResponse } = useInitialValues(
    purchaseInvoiceInitialValue,
    useGetSinglePurchaseInvoiceQuery,
    null
  );

  const suppliersListOptions = suppliersListResponse?.data?.results?.map(supplier => ({
    value: supplier.id,
    label: supplier.supplier_name,
    credit_account: supplier.account_default,
  }));

  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price', 'item_type', 'cost_price', 'weighted_cost_price', 'account_no']
  );
  const { optionsList: chartOfAccountOptions } = useListOptions(chartOfAccountsListResponse?.data?.results, {
    label: 'account_name',
    value: 'id',
  });

  const purchaseInvoiceInputList = useMemo(
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

  const handleGetPurchaseOrderAgainstSupplier = useCallback(
    (value, setFieldValue = () => {}) => {
      if (!value) return;
      const purchaseOrderAgainstSupplier = purchaseOrdersListResponse?.data?.results?.filter(
        purchaseOrder => Number(value) === purchaseOrder.supplier_id
      );

      setFieldValue('bill_items', [{}]);
      if (purchaseOrderAgainstSupplier) {
        setPurchaseOrdersListOptions(
          purchaseOrderAgainstSupplier?.map(purchaseOrder => ({
            label: purchaseOrder.pur_order_formatted_number,
            value: purchaseOrder.id,
            pur_order_items: purchaseOrder.pur_order_items,
          }))
        );
      }
    },
    [purchaseOrdersListResponse]
  );
  const handleChangePurchaseOrderItem = useCallback(
    (value, values, setFieldValue = null) => {
      let selecteditem = purchaseOrdersListResponse.data.results.filter(
        purchaseOrder => purchaseOrder.id === value
      )[0];
      if (selecteditem.length === 0) return [];
      selecteditem = selecteditem.pur_order_items.map(item => ({
        ...item,
        chart_of_account: values.credit_account || item.chart_of_account,
        amount_ex_vat: item?.amount_ex_vat || item.gross_amount - item.discount,
      }));
      const selectedOrderItems = [...selecteditem];
      if (setFieldValue) setFieldValue('bill_items', selectedOrderItems);
      return selectedOrderItems;
    },
    [purchaseOrdersListResponse]
  );

  const handleSubmitForm = useCallback(async (values, { setErrors, resetForm }) => {
    let response = null;
    const payload = {
      ...values,
      due_date: values.invoice_date,
      bill_docs: values.filesList || [],
      status: values.status || 'draft',
      ...handleCalculateTotalAmount(values.bill_items),
    };
    if (payload.filesList) {
      delete payload.filesList;
    }

    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (typeof payload[key] === 'object' && payload[key]?.length > 0) {
        payload[key].forEach((item, index) => {
          Object.keys(item).forEach(itemKey => {
            if (typeof item[itemKey] !== 'undefined') {
              formData.append(`${key}[${index}]${itemKey}`, item[itemKey]);
            }
          });
        });
      } else {
        formData.append(key, payload[key]);
      }
    });
    if (id) {
      response = await editPurchaseInvoice({ id, payload: formData });
    } else {
      formData.append('bill_num', values.invoice_num);
      response = await addPurchaseInvoice(formData);
    }
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    if (values.save_and_continue) {
      resetForm();
      return;
    }
    if (purchaseId) {
      navigate('/pages/accounting/purchase/purchase-invoice', { replace: true });
      return;
    }
    navigate(-1);
  }, []);

  useEffect(() => {
    let values = {};
    if (purchaseId && purchaseOrderResponse) {
      const billItems = purchaseOrderResponse?.pur_order_items?.map(item => ({
        ...item,
        chart_of_account: item?.expense_account,
      }));
      values = {
        ...values,
        supplier_id: purchaseOrderResponse?.supplier_id,
        pur_order_id: purchaseOrderResponse?.id,
        bill_docs: purchaseOrderResponse?.pur_order_docs || [],
        bill_items: billItems || [],
        location: purchaseOrderResponse?.location,
      };
      handleGetPurchaseOrderAgainstSupplier(purchaseOrderResponse?.supplier_id);
    }
    if (latestInvoiceNumber?.data) {
      values = {
        ...values,
        invoice_num: latestInvoiceNumber?.data?.latest_num,
      };
    }
    if ((purchaseId && purchaseOrderResponse) || latestInvoiceNumber?.data) {
      setInitialValues({
        ...initialValues,
        ...values,
      });
    }
  }, [purchaseOrderResponse, purchaseOrdersListResponse, latestInvoiceNumber]);

  useEffect(() => {
    if (purchaseOrdersListResponse?.data) {
      handleGetPurchaseOrderAgainstSupplier(queryResponse?.supplier_id || purchaseOrderResponse?.supplier_id);
    }
  }, [queryResponse, purchaseOrdersListResponse, purchaseOrderResponse]);

  return (
    <SectionLoader
      options={[
        itemsListResponse.isLoading,
        suppliersListResponse.isLoading,
        chartOfAccountsListResponse.isLoading,
        purchaseOrdersListResponse.isLoading,
        isLoading,
      ]}
    >
      <Card>
        <CardContent>
          <FormHeader title="Purchase Invoice" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={purchaseInvoiceFormValidationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ setFieldValue, values }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikField
                  name="invoice_num"
                  //  placeholder="Purchase Invoice"
                  label="Purchase Invoice"
                  disabled
                />
                <FormikDatePicker
                  name="invoice_date"
                  type="text"
                  //  placeholder="Date"
                  label="Date"
                  startIcon={<CalendarMonthIcon />}
                />
                <FormikSelect
                  options={suppliersListOptions}
                  name="supplier_id"
                  disabled={Boolean(purchaseId)}
                  //  placeholder="Supplier"
                  onChange={value => handleGetPurchaseOrderAgainstSupplier(value, setFieldValue)}
                  label="Supplier"
                  isRequired
                />

                <FormikSelect
                  name="pur_order_id"
                  //  placeholder="Purchase Order Number"
                  options={purchaseOrdersListOptions}
                  disabled={Boolean(purchaseId)}
                  onChange={value => handleChangePurchaseOrderItem(value, values, setFieldValue)}
                  startIcon={<TagIcon />}
                  label="PO Number"
                  isRequired
                />

                <FormikSelect
                  name="credit_account"
                  options={chartOfAccountOptions}
                  //  placeholder="Credit Account"
                  label="Payable Account"
                  isRequired
                />

                <FormikField
                  name="location"
                  type="text"
                  //  placeholder="Location"
                  label="Location"
                  startIcon={<FmdGoodIcon />}
                />

                <FormikField
                  name="supplier_invoice_num"
                  //  placeholder="Supplier Invoice Number"
                  label="Supplier Inv No"
                  isRequired
                />

                <FormikFileField
                  name="bill_docs"
                  type="file"
                  //  placeholder="Attachment"
                  label="Attachment"
                  startIcon={<AttachFileIcon />}
                />

                <div className="form__form-group w-100">
                  <FieldArray
                    name="bill_items"
                    render={props => (
                      <PurchaseItem
                        inputList={purchaseInvoiceInputList}
                        newList={NEW_PURCHASE_ITEM_OBJECT}
                        {...props}
                      />
                    )}
                  />
                </div>

                <FormikField
                  name="notes"
                  textArea
                  // placeholder="Remarks"
                  label="Remarks"
                  className="col-12"
                />

                <FormSubmitButton />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddPurchaseInvoice;
