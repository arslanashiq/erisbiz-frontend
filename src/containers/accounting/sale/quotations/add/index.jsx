import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// services
import { useGetItemsListQuery } from 'services/private/items';
import { useGetCustomersListQuery } from 'services/private/customers';
import {
  useAddQuotationMutation,
  useEditQuotationMutation,
  useGetLatestQuatitonNumberQuery,
  useGetSingleQuotationQuery,
} from 'services/private/quotations';
import { useGetActiveSalePersonListQuery } from 'services/private/sale-person';
// styles && components
import FormikField from 'shared/components/form/FormikField';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
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
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import FormikFileField from 'shared/components/form/FormikFileField';
// utilitis and styles
import useListOptions from 'custom-hooks/useListOptions';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { quotationsInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';
import { quotationFormValidationSchema } from '../utilities/validation-schema';

function AddQuotation() {
  const navigate = useNavigate();
  const itemsListResponse = useGetItemsListQuery();
  const customerListResponse = useGetCustomersListQuery();
  const salePersonListResponse = useGetActiveSalePersonListQuery();

  const [addQuotation] = useAddQuotationMutation();
  const [editQuotation] = useEditQuotationMutation();
  const { id } = useParams();
  const { quotationId } = getSearchParamsList();

  const { initialValues, setInitialValues, queryResponse } = useInitialValues(
    quotationsInitialValues,
    useGetSingleQuotationQuery,
    null,
    true,
    false,
    quotationId
  );
  const latastQuotationNumberResponse = useGetLatestQuatitonNumberQuery('', { skip: id });

  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    value: 'id',
    label: 'customer_name',
  });

  const { optionsList: salePersonListOptions } = useListOptions(salePersonListResponse?.data?.results, {
    value: 'id',
    label: 'sales_person_name',
  });
  const itemsListOptions = itemsListResponse?.data?.results?.map(item => ({
    label: item?.item_name,
    value: item?.item_name,
    price: item?.sale_price,
  }));

  const quotationItemsList = useMemo(
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
  useEffect(() => {
    if (!id) {
      const latestnum = latastQuotationNumberResponse?.data?.latest_num;
      if (latestnum) {
        setInitialValues(prev => ({
          ...prev,
          quotation_formatted_number: latestnum,
        }));
      }
    }
  }, [latastQuotationNumberResponse, queryResponse]);

  return (
    <SectionLoader
      options={[
        itemsListResponse.isLoading,
        customerListResponse.isLoading,
        salePersonListResponse.isLoading,
      ]}
    >
      <Card>
        <CardContent>
          <FormHeader title="Sale Quotation" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={quotationFormValidationSchema}
            onSubmit={async (values, { setErrors }) => {
              const payload = {
                ...values,
                quotation_docs: values.filesList,
                quotation_items: handleGetFormatedItemsData(values.quotation_items),
                status: id ? values.status : 'draft',
                ...handleCalculateTotalAmount(values.quotation_items),
              };
              delete payload.quotation_num;
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
                response = await editQuotation({ id, payload: formData });
              } else {
                response = await addQuotation(formData);
              }
              if (response.error) {
                setErrors(response.error.data);
                return;
              }
              navigate(-1);
            }}
          >
            <Form className="form form--horizontal mt-3 row">
              {/* Purchase */}

              <FormikField
                name="quotation_formatted_number"
                type="text"
                disabled
                placeholder="Quotation Number"
                startIcon={<TagIcon />}
                label="Quotation Number"
              />
              {/* date */}

              <FormikDatePicker
                name="date"
                type="text"
                placeholder="Date"
                label="Date"
                startIcon={<CalendarMonthIcon />}
              />

              {/* Customer */}
              <FormikSelect
                options={customersOptions}
                name="customers"
                placeholder="Customer"
                label="Customer"
                isRequired
              />
              {/* Attackment */}
              <FormikFileField
                placeholder="Attachment"
                label="Attachment"
                name="quotation_docs"
                startIcon={<AttachFileIcon />}
              />
              {/* Sale Person */}
              <FormikSelect
                name="sales_person"
                options={salePersonListOptions}
                type="text"
                placeholder="Sale Person"
                label="Sale Person"
              />

              {/* Location */}
              <FormikField
                name="location"
                type="text"
                placeholder="Location"
                className="col"
                label="Location"
              />

              {/* Item detail */}
              <div className="form__form-group w-100">
                <FieldArray
                  name="quotation_items"
                  render={props => (
                    <PurchaseItem
                      name="quotation_items"
                      inputList={quotationItemsList}
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

export default AddQuotation;
