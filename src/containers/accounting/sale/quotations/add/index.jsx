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
} from 'shared/components/purchase-item/utilities/helpers';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import 'styles/form/form.scss';
import FormikFileField from 'shared/components/form/FormikFileField';
import { quotationsInitialValues } from '../utilities/initialValues';

function AddQuotation() {
  const navigate = useNavigate();
  const itemsListResponse = useGetItemsListQuery();
  const customerListResponse = useGetCustomersListQuery();

  const [addQuotation] = useAddQuotationMutation();
  const [editQuotation] = useEditQuotationMutation();
  const { id } = useParams();
  const latastQuotationNumberResponse = useGetLatestQuatitonNumberQuery('', { skip: id });
  const { initialValues, setInitialValues } = useInitialValues(
    quotationsInitialValues,
    useGetSingleQuotationQuery,
    null,
    true
  );
  const customersOptions = customerListResponse?.data?.results?.map(customer => ({
    value: customer.id,
    label: customer.contact_person,
  }));
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
      if (latastQuotationNumberResponse?.data?.latest_num) {
        setInitialValues({
          ...initialValues,
          quotation_num: latastQuotationNumberResponse.data.latest_num + 1,
        });
      } else {
        setInitialValues({ ...initialValues, quotation_num: 1000 });
      }
    }
  }, [latastQuotationNumberResponse]);
  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Sale Quotation" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setErrors }) => {
              const QuotaionsItems = values.quotation_items.map(item => ({
                service_type: item.service_type,
                num_units: item.num_nights,
                num_nights: item.num_nights,
                unit_price_ex_vat: item.unit_price_ex_vat,
                gross_amount: item.gross_amount,
                discount: item.discount,
                vat_amount: item.vat_amount,
                net_amount: item.net_amount,
                vat_rate: item.vat_rate,
                amount_ex_vat: item.amount_ex_vat,
              }));
              const payload = {
                ...values,
                sales_person: 33,
                quotation_docs: values.filesList,
                quotation_items: QuotaionsItems,
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
                name="quotation_num"
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

              {/* Sale Person */}
              <FormikField name="sales_person" type="text" placeholder="Sale Person" label="Sale Person" />

              {/* Customer */}
              <FormikSelect
                options={customersOptions}
                name="customers"
                placeholder="Customer"
                label="Customer"
              />

              {/* Location */}
              <FormikField
                name="location"
                type="text"
                placeholder="Location"
                className="col"
                label="Location"
              />
              {/* Attackment */}
              <FormikFileField
                placeholder="Attachment"
                name="quotation_docs"
                startIcon={<AttachFileIcon />}
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
