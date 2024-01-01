import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// services
import { useGetItemsListQuery } from 'services/private/items';
import { useGetCustomersListQuery } from 'services/private/customers';
import {
  useGetSingleProformaInvoiceQuery,
  useEditProformaInvoiceMutation,
  useGetLatestProformaInvoiceQuery,
  useAddProformaInvoiceMutation,
  // useGetLatestProformaInvoiceQuery,
} from 'services/private/proforma-invoices';
import { useGetQuotationsListQuery, useGetSingleQuotationQuery } from 'services/private/quotations';
import { useGetActiveSalePersonListQuery } from 'services/private/sale-person';
// shared
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
import { proformaInvoicesInitialValues } from '../utilities/initialValues';
import { proformaInvoiceValidationSchema } from '../utilities/validation-schema';
import 'styles/form/form.scss';

function AddProfomaInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { proformaInvoice, quotationId } = getSearchParamsList();

  const [selectedCustomer, setSelectedCustomer] = useState('');

  const latestProfomaInvoice = useGetLatestProformaInvoiceQuery(
    {},
    { skip: id, refetchOnMountOrArgChange: true }
  );

  const quotationResponse = useGetSingleQuotationQuery(quotationId, { skip: !quotationId });
  const quotationsListResponse = useGetQuotationsListQuery(
    { customer: selectedCustomer, status: id ? '' : 'approved' },
    { skip: !selectedCustomer }
  );
  const itemsListResponse = useGetItemsListQuery({ is_active: 'True' }, { refetchOnMountOrArgChange: true });
  const customerListResponse = useGetCustomersListQuery();
  const salePersonListResponse = useGetActiveSalePersonListQuery();

  const { initialValues, setInitialValues, queryResponse } = useInitialValues(
    proformaInvoicesInitialValues,
    useGetSingleProformaInvoiceQuery,
    null,
    true,
    false,
    proformaInvoice || null
  );

  const [addProfomaInvoice] = useAddProformaInvoiceMutation();
  const [editProfomaInvoice] = useEditProformaInvoiceMutation();

  const { optionsList: quotationsListOptions } = useListOptions(quotationsListResponse?.data?.results, {
    label: 'quotation_formatted_number',
    value: 'id',
  });
  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    label: 'customer_name',
    value: 'id',
  });
  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price', 'item_type', 'cost_price', 'remaining_stock', 'weighted_cost_price']
  );
  const { optionsList: salePersonListOptions } = useListOptions(salePersonListResponse?.data?.results, {
    value: 'id',
    label: 'sales_person_name',
  });

  const porformaInvoiceItemsList = useMemo(
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

  const handleChangeQuotationNumber = useCallback(
    (value, setFieldValue) => {
      const selectedQuotation = quotationsListResponse.data.results.filter(
        quotation => quotation.id === value
      );
      if (selectedQuotation.length > 0) {
        const quotationItems = handleGetItemWithRemainingStock(
          selectedQuotation[0].quotation_items,
          itemsListOptions
        );

        setFieldValue('pro_invoice_items', quotationItems);
      }
    },
    [quotationsListResponse]
  );
  const handleChangeCustomer = useCallback(value => {
    setSelectedCustomer(value);
  }, []);

  const handleSubmitForm = useCallback(async (values, { setErrors }) => {
    const payload = {
      ...values,
      pro_invoice_docs: values.filesList || values.pro_invoice_docs,
      pro_invoice_items: handleGetFormatedItemsData(values.pro_invoice_items),
      ...handleCalculateTotalAmount(values.pro_invoice_items),
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
      response = await editProfomaInvoice({ id, payload: formData });
    } else {
      response = await addProfomaInvoice(formData);
    }
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    if (quotationId) {
      navigate('/pages/accounting/sales/proforma-invoice', { replace: true });
      return;
    }
    navigate(-1);
  }, []);

  // auto fill initialvalues if quotation id is given and also generate the random Pid
  useEffect(() => {
    let newData = {};
    if (quotationId && quotationResponse?.data && itemsListOptions) {
      const {
        quotation_items: quotationItems,
        id: quotationID,
        customers,
        sales_person: salesPerson,
        location,
        remarks,
        quotation_docs: quotationDocs,
      } = quotationResponse.data;
      newData = {
        ...newData,
        quotation: quotationID,
        customer: customers,
        sales_person: salesPerson,
        location,
        remarks,
        pro_invoice_docs: quotationDocs,
        pro_invoice_items: quotationItems,
      };
      handleChangeCustomer(customers);
    }
    if (latestProfomaInvoice?.data) {
      newData = { ...newData, pro_invoice_formatted_number: latestProfomaInvoice?.data?.latest_num };
    }
    setInitialValues({
      ...initialValues,
      ...newData,
    });
  }, [quotationId, quotationResponse, latestProfomaInvoice, itemsListOptions]);

  useEffect(() => {
    if (queryResponse?.customer) {
      handleChangeCustomer(queryResponse?.customer);
    }
  }, [id, queryResponse]);

  return (
    <SectionLoader
      options={[
        itemsListResponse.isLoading,
        salePersonListResponse.isLoading,
        customerListResponse.isLoading,
      ]}
    >
      <Card>
        <CardContent>
          <FormHeader title="Proforma Invoice" />
          <Formik
            enableReinitialize
            initialValues={{
              ...initialValues,
              pro_invoice_items: handleGetItemWithRemainingStock(
                initialValues?.pro_invoice_items,
                itemsListOptions,
                false
              ),
            }}
            validationSchema={proformaInvoiceValidationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikField
                  name="pro_invoice_formatted_number"
                  type="text"
               //  placeholder="Proforma Invoice Number"
                  label="Proforma Invoice"
                  startIcon={<TagIcon />}
                  disabled
                />
                <FormikDatePicker
                  name="pro_invoice_date"
                  type="text"
               //  placeholder="Date"
                  label="Date"
                  startIcon={<CalendarMonthIcon />}
                />

                <FormikSelect
                  options={customersOptions}
                  name="customer"
                  disabled={Boolean(quotationId)}
               //  placeholder="Customer"
                  label="Customer"
                  isRequired
                  onChange={handleChangeCustomer}
                />

                <FormikSelect
                  name="quotation"
                  options={quotationsListOptions}
                  type="text"
                  disabled={Boolean(quotationId)}
                  label="Quotation #"
               //  placeholder="Quotation Number"
                  startIcon={<TagIcon />}
                  isRequired
                  onChange={value => handleChangeQuotationNumber(value, setFieldValue)}
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
                  name="pro_invoice_docs"
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
                    name="pro_invoice_items"
                    render={props => (
                      <PurchaseItem
                        inputList={porformaInvoiceItemsList}
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

export default AddProfomaInvoice;
