import React, { useMemo, useEffect } from 'react';
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
  useAddPerformaInvoiceMutation,
  useEditPerformaInvoiceMutation,
  // useGetLatestPerformaInvoiceQuery,
  useGetSinglePerformaInvoiceQuery,
} from 'services/private/performa-invoices';
import { useGetQuotationsListQuery, useGetSingleQuotationQuery } from 'services/private/quotations';
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
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import { proformaInvoicesInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';

function AddPerformaInvoice() {
  const { id } = useParams();
  const { performaInvoice, quotationId } = getSearchParamsList();
  const navigate = useNavigate();
  const { initialValues, setInitialValues } = useInitialValues(
    proformaInvoicesInitialValues,
    useGetSinglePerformaInvoiceQuery,
    null,
    true,
    false,
    performaInvoice || null
  );
  const [addPerformaInvoice] = useAddPerformaInvoiceMutation();
  const [editPerformaInvoice] = useEditPerformaInvoiceMutation();
  const itemsListResponse = useGetItemsListQuery();
  const customerListResponse = useGetCustomersListQuery();
  const quotationsListResponse = useGetQuotationsListQuery();
  const quotationResponse = useGetSingleQuotationQuery(quotationId, { skip: !quotationId });

  const { optionsList: quotationsListOptions } = useListOptions(quotationsListResponse?.data?.results, {
    label: 'quotation_formatted_number',
    value: 'id',
  });
  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    label: 'contact_person',
    value: 'id',
  });
  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price']
  );

  const porformaInvoiceItemsList = useMemo(
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
  const handleChangeQuotationNumber = (value, setFieldValue) => {
    const selectedQuotation = quotationsListResponse.data.results.filter(quotation => quotation.id === value);
    if (selectedQuotation.length > 0) {
      setFieldValue('pro_invoice_items', selectedQuotation[0].quotation_items);
    }
  };
  useEffect(() => {
    if (quotationResponse?.data) {
      const {
        quotation_items: quotationItems,
        id: quotationID,
        customers,
        sales_person: salesPerson,
        location,
        remarks,
        quotation_docs: quotationDocs,
      } = quotationResponse.data;
      setInitialValues({
        ...initialValues,
        quotation: quotationID,
        pro_invoice_items: quotationItems,
        customer: customers,
        sales_person: salesPerson,
        pro_invoice_docs: quotationDocs,
        location,
        remarks,
      });
    }
  }, [quotationId, quotationResponse]);

  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Performa Invoice" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, { setErrors }) => {
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
                response = await editPerformaInvoice({ id, payload: formData });
              } else {
                response = await addPerformaInvoice(formData);
              }
              if (response.error) {
                setErrors(response.error.data);
                return;
              }
              navigate(-1);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                {/* Purchase */}

                <FormikSelect
                  name="quotation"
                  options={quotationsListOptions}
                  type="text"
                  disabled={Boolean(quotationId)}
                  label="Quotation #"
                  placeholder="Quotation Number"
                  startIcon={<TagIcon />}
                  onChange={value => handleChangeQuotationNumber(value, setFieldValue)}
                />
                {/* date */}

                <FormikDatePicker
                  name="pro_invoice_date"
                  type="text"
                  placeholder="Date"
                  label="Date"
                  startIcon={<CalendarMonthIcon />}
                />

                {/* Sale Person */}
                <FormikField name="sales_person" type="text" placeholder="Sale Person" label="Sale Person" />

                {/* Customer */}

                <FormikSelect
                  options={customersOptions}
                  name="customer"
                  disabled={Boolean(quotationId)}
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
                  name="pro_invoice_docs"
                  type="file"
                  placeholder="Attachment"
                  label="Attachment"
                  startIcon={<AttachFileIcon />}
                />

                {/* Item detail */}
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

                {/* Remarks */}
                <FormikField
                  name="remarks"
                  textArea
                  placeholder="Remarks"
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

export default AddPerformaInvoice;
