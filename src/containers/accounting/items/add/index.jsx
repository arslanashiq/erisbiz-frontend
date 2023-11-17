import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import CategoryIcon from '@mui/icons-material/Category';
import { Box, Card, CardContent } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// services
import { useGetBrandsListQuery } from 'services/private/brands';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useAddItemMutation, useEditItemMutation, useGetSingleItemQuery } from 'services/private/items';
import { useGetChartOfAccountListOfAssetsAndExpenseQuery } from 'services/private/chart-of-account';
// shared
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';
import FormikImageInput from 'shared/components/form/FormikImageInput';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import SectionLoader from 'containers/common/loaders/SectionLoader';
// custom-hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { ITEM_STATUS_OOPTIONS, ITEM_TYPES } from 'utilities/constants';
import { getAccountTypesOptions } from 'utilities/get-account-type-options';
import { itemsInitialValues } from '../utilities/constants';
import { itemFormValidationSchema } from '../utilities/validationSchema';
// styles
import 'styles/form/form.scss';

function AddItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { initialValues, queryResponse } = useInitialValues(
    itemsInitialValues,
    useGetSingleItemQuery,
    'item_image'
  );

  const [itemType, setItemType] = useState(id ? queryResponse?.itemType : initialValues?.item_type);

  const [addItem] = useAddItemMutation();
  const [editItem] = useEditItemMutation();
  const supplierApiResponse = useGetSuppliersListQuery();
  const brandsApiResponse = useGetBrandsListQuery();
  const chartOfAccountListResponse = useGetChartOfAccountListOfAssetsAndExpenseQuery(
    `?item_type=${itemType}`
  );
  // options
  const { optionsList: suppliersOptions } = useListOptions(supplierApiResponse?.data?.results, {
    value: 'id',
    label: 'supplier_name',
  });
  const { optionsList: bankOptions } = useListOptions(
    chartOfAccountListResponse?.data?.results,
    {
      value: 'id',
      label: 'account_name',
    },
    ['account_type']
  );
  const sortedChartOfAccount = getAccountTypesOptions(bankOptions, 2, 'account_type');
  const { optionsList: brandsOptions } = useListOptions(brandsApiResponse?.data?.results, {
    value: 'uid',
    label: 'brand_name',
  });

  return (
    <SectionLoader
      options={[
        chartOfAccountListResponse.isLoading,
        supplierApiResponse.isLoading,
        brandsApiResponse.isLoading,
      ]}
    >
      <Card>
        <CardContent>
          <FormHeader title="Item Master" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={itemFormValidationSchema}
            onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
              try {
                let response = null;
                const payload = new FormData();
                Object.keys(initialValues).forEach(key => {
                  payload.append(key, values[key]);
                });
                payload.append('sale_account', values.account_no);
                payload.append('cost_account', values.account_no);
                payload.append('inventory_coa', values.account_no);

                if (id) {
                  response = await editItem({ id, payload });
                } else {
                  response = await addItem(payload);
                }
                if (response.data) {
                  resetForm(initialValues);
                  navigate(-1);
                }
                if (response.error) {
                  setErrors(response.error.data);
                }
              } catch (err) {
                if (err?.response?.status === 400) {
                  setSubmitting(true);
                  setErrors(err.response.data);
                  setSubmitting(false);
                }
              }
            }}
          >
            <Form className="form form--horizontal row pt-3">
              {/* item name */}
              <FormikField
                type="text"
                name="item_name"
                placeholder="Item Name"
                label="Item Name"
                isRequired
                startIcon={<ShoppingBasketIcon />}
              />
              {/* sku/HS code */}
              <FormikField
                name="sku_hs_code"
                placeholder="SKU/HS Code"
                type="number"
                startIcon={<ContactPhoneIcon />}
                label="SKU/HS Code"
              />

              {/* Item Type */}
              <FormikSelect
                name="item_type"
                type="text"
                options={ITEM_TYPES}
                startIcon={<CategoryIcon />}
                label="Item Type"
                isRequired
                onChange={value => {
                  setItemType(value);
                }}
              />
              {/* Item Status */}
              <FormikSelect
                name="is_active"
                type="text"
                options={ITEM_STATUS_OOPTIONS}
                startIcon={<CheckCircleOutlineIcon />}
                label="Status"
                isRequired
              />
              {/* Sale price */}
              <FormikField
                type="number"
                isRequired
                name="sale_price"
                placeholder="Sale Price"
                label="Sale Price"
              />
              {/* cost Price */}
              <FormikField
                type="number"
                isRequired
                name="cost_price"
                placeholder="Cost Price"
                label="Cost Price"
              />

              {/* Account Number */}
              <FormikSelect
                name="account_no"
                options={sortedChartOfAccount}
                placeholder="GL Number"
                label="GL Number"
                isRequired
                isGrouped
              />

              {/* Bar Code */}
              <FormikField name="bar_code" placeholder="Bar Code" label="Bar Code" />

              {/* Unit */}
              <FormikField name="unit" label="Unit" />

              {/* Recoder */}
              <FormikField name="recorder" type="text" placeholder="Recorder" label="Recorder" />

              {/* description */}
              <FormikField name="description" textArea label="Description" className="col-12" />

              {/* item image */}
              <FormikImageInput name="item_image" type="file" accept="image/*" label="Item Image" />

              {/* Part Number,Supplier,Brand */}
              <Box className="form__form-group col-md-6 row pe-0">
                {/* Part Number */}
                <FormikField
                  name="part_number"
                  type="number"
                  placeholder="Part Number"
                  label="Part Number"
                  className="col-12"
                />
                {/* Supplier */}

                <FormikSelect
                  name="supplier"
                  options={suppliersOptions}
                  placeholder="Select Supplier"
                  className="col-12"
                  label="Supplier"
                  isRequired
                />
                {/* Brand */}

                <FormikSelect
                  placeholder="Select Brand"
                  name="brand"
                  options={brandsOptions}
                  label="Brand"
                  className="col-12"
                  isRequired
                />
              </Box>

              {/* ============================================================================================ */}

              <ErrorFocus />
              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddItemPage;
