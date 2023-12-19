import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray } from 'formik';
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
  handleGetItemWithRemainingStock,
  // handleChangeCostPrice,
  handleChangeUnitPrice,
} from 'shared/components/purchase-item/utilities/helpers';
import FormikWrapper from 'containers/common/form/FormikWrapper';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';
import FormikFileField from 'shared/components/form/FormikFileField';
// utilitis and styles
import useListOptions from 'custom-hooks/useListOptions';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { PurchaseItemInputList } from 'utilities/purchase-item-input-list';
import { quotationsInitialValues } from '../utilities/initialValues';
import { quotationFormValidationSchema } from '../utilities/validation-schema';
import 'styles/form/form.scss';

function AddQuotation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quotationId } = getSearchParamsList();

  const customerListResponse = useGetCustomersListQuery();
  const itemsListResponse = useGetItemsListQuery({ is_active: 'True' });
  const salePersonListResponse = useGetActiveSalePersonListQuery();
  const latastQuotationNumberResponse = useGetLatestQuatitonNumberQuery('', { skip: id });

  const [addQuotation] = useAddQuotationMutation();
  const [editQuotation] = useEditQuotationMutation();

  const { initialValues, setInitialValues, queryResponse } = useInitialValues(
    quotationsInitialValues,
    useGetSingleQuotationQuery,
    null,
    true,
    false,
    quotationId
  );

  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    value: 'id',
    label: 'customer_name',
  });

  const { optionsList: salePersonListOptions } = useListOptions(salePersonListResponse?.data?.results, {
    value: 'id',
    label: 'sales_person_name',
  });

  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price', 'item_type', 'cost_price', 'remaining_stock', 'weighted_cost_price']
  );

  const quotationItemsList = useMemo(
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

  const handleSubmitForm = useCallback(async (values, { setErrors }) => {
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
    if (quotationId) {
      navigate(`/pages/accounting/sales/quotations/${response.data.uuid}/detail`, {
        replace: true,
      });
      return;
    }
    navigate(-1);
  }, []);

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
          <FormikWrapper
            initialValues={{
              ...initialValues,
              quotation_items: handleGetItemWithRemainingStock(
                initialValues?.quotation_items,
                itemsListOptions
              ),
            }}
            validationSchema={quotationFormValidationSchema}
            onSubmit={handleSubmitForm}
          >
            <FormikField
              name="quotation_formatted_number"
              type="text"
              disabled
              placeholder="Quotation Number"
              startIcon={<TagIcon />}
              label="Quotation Number"
            />

            <FormikDatePicker
              name="date"
              type="text"
              placeholder="Date"
              label="Date"
              startIcon={<CalendarMonthIcon />}
            />

            <FormikSelect
              options={customersOptions}
              name="customers"
              placeholder="Customer"
              label="Customer"
              isRequired
            />
            <FormikFileField
              placeholder="Attachment"
              label="Attachment"
              name="quotation_docs"
              startIcon={<AttachFileIcon />}
            />
            <FormikSelect
              name="sales_person"
              options={salePersonListOptions}
              type="text"
              placeholder="Sales Person"
              label="Sales Person"
              isRequired
            />

            <FormikField
              name="location"
              type="text"
              placeholder="Location"
              className="col"
              label="Location"
            />

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

            <FormikField name="remarks" textArea placeholder="Remarks" label="Remarks" className="col-12" />
            <FormSubmitButton />
          </FormikWrapper>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddQuotation;
