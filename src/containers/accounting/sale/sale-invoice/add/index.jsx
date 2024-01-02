import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TagIcon from '@mui/icons-material/Tag';
import { FieldArray, Form, Formik } from 'formik';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Card, CardContent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// services
import { useGetItemsListQuery } from 'services/private/items';
import { useGetCustomersListQuery } from 'services/private/customers';
import {
  useAddSaleInvoicesMutation,
  useEditSaleInvoicesMutation,
  useGetLatestSaleInvoiceQuery,
  useGetSingleSaleInvoiceQuery,
} from 'services/private/sale-invoice';
import {
  useGetProformaInvoicesListQuery,
  useGetSingleProformaInvoiceQuery,
} from 'services/private/proforma-invoices';
import { useGetActiveSalePersonListQuery } from 'services/private/sale-person';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import FormHeader from 'shared/components/form-header/FormHeader';
import {
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
  handleCalculateTotalAmount,
  handleGetFormatedItemsData,
  handleGetItemWithRemainingStock,
  // handleChangeCostPrice,
  handleChangeUnitPrice,
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
import { saleInvoiceInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';
import { saleInvoiceValidationSchema } from '../utilities/validation-schema';

function AddInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { proformaInvoice } = getSearchParamsList();

  const [selectedCustomer, setSelectedCustomer] = useState(proformaInvoice);

  const itemsListResponse = useGetItemsListQuery({ is_active: 'True' }, { refetchOnMountOrArgChange: true });
  const salePersonListResponse = useGetActiveSalePersonListQuery();
  const latestSaleInvoiceResponse = useGetLatestSaleInvoiceQuery(
    {},
    { skip: id, refetchOnMountOrArgChange: true }
  );
  const customerListResponse = useGetCustomersListQuery();

  const [addSaleInvoice] = useAddSaleInvoicesMutation();
  const [editSaleInvoice] = useEditSaleInvoicesMutation();

  const proformaInvoiceListResponse = useGetProformaInvoicesListQuery(
    { customer: selectedCustomer },
    { skip: !selectedCustomer }
  );
  const proformaInvoiceResponse = useGetSingleProformaInvoiceQuery(proformaInvoice, {
    skip: !proformaInvoice,
  });

  const { initialValues, setInitialValues, queryResponse, isLoading } = useInitialValues(
    saleInvoiceInitialValues,
    useGetSingleSaleInvoiceQuery,
    null,
    true
  );

  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    value: 'id',
    label: 'customer_name',
  });
  const { optionsList: salePersonListOptions } = useListOptions(salePersonListResponse?.data?.results, {
    value: 'id',
    label: 'sales_person_name',
  });
  const { optionsList: proformaInvoiceOptions } = useListOptions(
    proformaInvoiceListResponse?.data?.results,
    {
      value: 'id',
      label: 'pro_invoice_formatted_number',
    },
    ['pro_invoice_items', 'customer', 'quotation']
  );
  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price', 'item_type', 'cost_price', 'remaining_stock', 'weighted_cost_price', 'account_no']
  );
  const saleInvoiceInputList = useMemo(
    () => [
      { ...PurchaseItemInputList.service_type, options: itemsListOptions || [], onChange: handleChangeItem },
      { ...PurchaseItemInputList.remaining_stock, disabled: true },
      { ...PurchaseItemInputList.num_nights, onChange: handleChangeQuantity },
      { ...PurchaseItemInputList.unit_price_ex_vat, onChange: handleChangeUnitPrice },
      { ...PurchaseItemInputList.gross_amount },
      { ...PurchaseItemInputList.discount, onChange: handleChangeDiscount },
      { ...PurchaseItemInputList.vat_rate, options: VAT_CHARGES || [], onChange: hanldeVATChange },
      { ...PurchaseItemInputList.net_amount, options: itemsListOptions || [], onChange: handleChangeItem },
    ],

    [itemsListOptions]
  );
  const handleGetStatus = useCallback(() => {
    if (proformaInvoice) {
      return false;
    }
    if (id) {
      return false;
    }

    return false;
  }, [proformaInvoice, id]);

  const handleChangeProfomaInvoice = useCallback(
    (value, setFieldValue) => {
      const selectedProfomaInvoice = proformaInvoiceOptions.filter(perInv => perInv.value === value);
      setFieldValue(
        'invoice_items',
        handleGetItemWithRemainingStock(
          selectedProfomaInvoice[0].pro_invoice_items,
          itemsListOptions,
          handleGetStatus()
        )
      );
      setFieldValue('customer', selectedProfomaInvoice[0].customer);
      setFieldValue('quotation', selectedProfomaInvoice[0].quotation);
    },
    [proformaInvoiceOptions]
  );
  const handleChangeCustomer = useCallback(value => {
    setSelectedCustomer(value);
  }, []);

  const handleSubmitForm = useCallback(async (values, { setError }) => {
    const payload = {
      ...values,
      invoice_docs: values.filesList,
      invoice_items: handleGetFormatedItemsData(values.invoice_items),
      ...handleCalculateTotalAmount(values.invoice_items),
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
    let response = null;
    if (id) {
      response = await editSaleInvoice({ id, payload: formData });
    } else {
      response = await addSaleInvoice(formData);
    }
    if (response.error) {
      setError(response.error.data);
      return;
    }
    if (proformaInvoice) {
      navigate('/pages/accounting/sales/sale-invoice', { replace: true });
      return;
    }

    navigate(-1);
  }, []);
  useEffect(() => {
    let newData = {};
    if (proformaInvoiceResponse?.data) {
      const proInv = proformaInvoiceResponse.data;
      newData = {
        ...newData,
        pro_invoice: proInv.id,
        invoice_items: proInv.pro_invoice_items,
        customer: proInv.customer,
        sales_person: proInv.sales_person,
        date: proInv.pro_invoice_date,
        location: proInv.location,
        invoice_docs: proInv.pro_invoice_docs,
        quotation: proInv.quotation,
        remarks: proInv.remarks,
      };
      handleChangeCustomer(proInv.customer);
    }
    if (latestSaleInvoiceResponse?.data) {
      newData = {
        ...newData,
        invoice_formatted_number: latestSaleInvoiceResponse?.data?.latest_num,
      };
    }
    setInitialValues({
      ...initialValues,
      ...newData,
    });
  }, [proformaInvoiceResponse, latestSaleInvoiceResponse]);

  useEffect(() => {
    if (queryResponse?.customer) {
      handleChangeCustomer(queryResponse.customer);
    }
  }, [queryResponse]);

  return (
    <SectionLoader options={[itemsListResponse.isLoading, isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Sales Invoice" />
          <Formik
            enableReinitialize
            initialValues={{
              ...initialValues,
              invoice_items: handleGetItemWithRemainingStock(
                initialValues?.invoice_items,
                itemsListOptions,
                handleGetStatus()
              ),
            }}
            validationSchema={saleInvoiceValidationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikField
                  name="invoice_formatted_number"
                  type="text"
                  //  placeholder="Sales Invoice Number"
                  label="Sales Invoice"
                  startIcon={<TagIcon />}
                  disabled
                />

                <FormikDatePicker
                  name="date"
                  type="text"
                  //  placeholder="Date"
                  label="Date"
                  startIcon={<CalendarMonthIcon />}
                />
                <FormikSelect
                  options={customersOptions}
                  name="customer"
                  //  placeholder="Customer"
                  disabled={Boolean(proformaInvoice)}
                  label="Customer"
                  isRequired
                  onChange={handleChangeCustomer}
                />

                <FormikSelect
                  options={proformaInvoiceOptions}
                  name="pro_invoice"
                  type="text"
                  disabled={Boolean(proformaInvoice)}
                  //  placeholder="Proforma Invoice"
                  label="Proforma Invoice"
                  startIcon={<TagIcon />}
                  isRequired
                  onChange={value => handleChangeProfomaInvoice(value, setFieldValue)}
                />
                <FormikSelect
                  options={salePersonListOptions}
                  name="sales_person"
                  type="text"
                  //  placeholder="Sales Person"
                  label="Sales Person"
                  isRequired
                />
                <FormikFileField
                  name="invoice_docs"
                  type="file"
                  //  placeholder="Attachment"
                  label="Attachment"
                  startIcon={<AttachFileIcon />}
                />

                <FormikField
                  name="location"
                  type="text"
                  //  placeholder="Location"
                  label="Location"
                  startIcon={<LocationOnIcon />}
                />

                <div className="form__form-group w-100">
                  <FieldArray
                    name="invoice_items"
                    render={props => (
                      <PurchaseItem
                        inputList={saleInvoiceInputList}
                        newList={NEW_PURCHASE_ITEM_OBJECT}
                        {...props}
                      />
                    )}
                  />
                </div>

                <FormikField
                  name="remarks"
                  textArea
                  //  placeholder="Remarks"
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

export default AddInvoice;
