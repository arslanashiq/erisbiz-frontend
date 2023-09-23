import React, { useMemo } from 'react';
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
  useGetSingleSaleInvoiceQuery,
} from 'services/private/sale-invoice';
import { useGetPerformaInvoicesListQuery } from 'services/private/performa-invoices';
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
} from 'shared/components/purchase-item/utilities/helpers';
import FormikFileField from 'shared/components/form/FormikFileField';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import { saleInvoiceInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';

function AddInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const itemsListResponse = useGetItemsListQuery();
  const customerListResponse = useGetCustomersListQuery();
  const performaInvoiceListResponse = useGetPerformaInvoicesListQuery();

  const [addSaleInvoice] = useAddSaleInvoicesMutation();
  const [editSaleInvoice] = useEditSaleInvoicesMutation();

  const { initialValues } = useInitialValues(saleInvoiceInitialValues, useGetSingleSaleInvoiceQuery);
  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    value: 'id',
    label: 'customer_name',
  });
  const { optionsList: performaInvoiceOptions } = useListOptions(
    performaInvoiceListResponse?.data?.results,
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
    ['sale_price']
  );
  const saleInvoiceInputList = useMemo(
    () => [
      {
        name: 'service_type',
        placeholder: 'Item',
        isSelect: true,
        options: itemsListOptions,
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

  const handleChangePerformaInvoice = (value, setFieldValue) => {
    const selectedPerformaInvoice = performaInvoiceOptions.filter(
      performaInvoice => performaInvoice.value === value
    );
    setFieldValue('invoice_items', selectedPerformaInvoice[0].pro_invoice_items);
    setFieldValue('customer', selectedPerformaInvoice[0].customer);
    setFieldValue('quotation', selectedPerformaInvoice[0].quotation);
  };

  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Sale Invoice" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setError }) => {
              const payload = {
                ...values,
                sales_person: 33,
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

              navigate(-1);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                {/* Purchase */}

                <FormikSelect
                  options={performaInvoiceOptions}
                  name="pro_invoice"
                  type="text"
                  placeholder="Performa Invoice"
                  label="Performa Invoice"
                  startIcon={<TagIcon />}
                  onChange={value => handleChangePerformaInvoice(value, setFieldValue)}
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
                <FormikField name="sales_person" type="text" placeholder="Sale Person" label="Sale Person" />

                {/* Customer */}
                <FormikSelect
                  options={customersOptions}
                  name="customer"
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
                  name="invoice_docs"
                  type="file"
                  placeholder="Attachment"
                  label="Attachment"
                  startIcon={<AttachFileIcon />}
                />

                {/* Item detail */}
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

export default AddInvoice;
