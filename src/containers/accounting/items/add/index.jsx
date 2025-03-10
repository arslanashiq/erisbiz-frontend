import React, { useCallback, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router';
import CategoryIcon from '@mui/icons-material/Category';
import { Box, Card, CardContent } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// services
import { useGetBrandsListQuery } from 'services/private/brands';
import { useGetCategoryListQuery } from 'services/private/category';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useAddItemMutation, useEditItemMutation, useGetSingleItemQuery } from 'services/private/items';
import { useGetChartOfAccountListOfAssetsAndExpenseQuery } from 'services/private/chart-of-account';
// shared
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormikImageInput from 'shared/components/form/FormikImageInput';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles and hooks
import useListOptions from 'custom-hooks/useListOptions';
import { ITEM_STATUS_OPTIONS, ITEM_TYPES, ITEM_UNIT_LIST } from 'utilities/constants';
import { getAccountTypesOptions } from 'utilities/get-account-type-options';
import { itemsInitialValues } from '../utilities/constants';
import { itemFormValidationSchema } from '../utilities/validationSchema';
import 'styles/form/form.scss';

function AddItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { initialValues } = useInitialValues(itemsInitialValues, useGetSingleItemQuery, 'item_image');

  const [itemType, setItemType] = useState(initialValues?.item_type);
  const [addItem] = useAddItemMutation();
  const [editItem] = useEditItemMutation();

  const supplierApiResponse = useGetSuppliersListQuery();
  const brandsApiResponse = useGetBrandsListQuery();
  const categoryApiResponse = useGetCategoryListQuery();
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
  const sortedChartOfAccount = getAccountTypesOptions(bankOptions, 1, 'account_type');
  const { optionsList: brandsOptions } = useListOptions(brandsApiResponse?.data?.results, {
    value: 'uid',
    label: 'brand_name',
  });
  const { optionsList: categoryOptions } = useListOptions(categoryApiResponse?.data?.results, {
    value: 'uid',
    label: 'category_name',
  });

  const handleSumbitForm = useCallback(async (values, { setSubmitting, setErrors, resetForm }) => {
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
      if (response.error) {
        setErrors(response.error.data);
        return;
      }
      if (values.save_and_continue) {
        resetForm();
        return;
      }
      navigate(-1);
    } catch (err) {
      if (err?.response?.status === 400) {
        setSubmitting(true);
        setErrors(err.response.data);
        setSubmitting(false);
      }
    }
  }, []);

  const handleAddNewData = (link, values) => {
    navigate(link, {
      state: { backUrl: location.pathname, initialValues: values },
      replace: true,
    });
  };
  const updatedInitialValues = useMemo(() => {
    let newData = { ...initialValues };
    if (location?.state?.initialValues) {
      newData = { ...newData, ...location.state.initialValues };
    }
    return newData;
  }, [location, initialValues]);

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
            initialValues={updatedInitialValues}
            validationSchema={itemFormValidationSchema}
            onSubmit={handleSumbitForm}
          >
            {({ values, setFieldValue }) => (
              <Form className="form form--horizontal row">
                <FormikField
                  type="text"
                  name="item_name"
                  //  placeholder="Item Name"
                  label="Item Name"
                  isRequired
                  startIcon={<ShoppingBasketIcon />}
                />
                <FormikField
                  name="sku_hs_code"
                  //  placeholder="SKU/HS Code"
                  type="text"
                  startIcon={<ContactPhoneIcon />}
                  label="SKU/HS Code #"
                />

                <FormikSelect
                  name="item_type"
                  type="text"
                  options={ITEM_TYPES}
                  startIcon={<CategoryIcon />}
                  label="Item Type"
                  isRequired
                  onChange={value => {
                    setItemType(value);
                    setFieldValue('opening_stock', 0);
                  }}
                />
                <FormikSelect
                  name="is_active"
                  type="text"
                  options={ITEM_STATUS_OPTIONS}
                  startIcon={<CheckCircleOutlineIcon />}
                  label="Status"
                  isRequired
                />
                <FormikField
                  type="number"
                  isRequired
                  name="cost_price"
                  //  placeholder="Cost Price"
                  label="Cost Price"
                />
                <FormikField
                  type="number"
                  isRequired
                  name="sale_price"
                  //  placeholder="Sale Price"
                  label="Sale Price"
                />

                <FormikSelect
                  name="account_no"
                  options={sortedChartOfAccount}
                  //  placeholder="GL Account"
                  label="GL Account"
                  isRequired
                  isGrouped
                />

                <FormikField
                  name="bar_code"
                  // placeholder="Bar Code"
                  label="Bar Code #"
                />

                <FormikSelect options={ITEM_UNIT_LIST} name="unit" label="Unit" />

                <FormikField
                  name="recorder"
                  type="text"
                  // placeholder="Recorder"
                  label="Recorder"
                />

                <FormikField name="description" textArea label="Description" className="col-12" />

                <Box className="form__form-group col-md-6 row pe-0">
                  <FormikImageInput
                    name="item_image"
                    type="file"
                    accept="image/*"
                    label="Item Image"
                    className="col-12"
                  />
                  <FormikField
                    name="opening_stock"
                    type="number"
                    //  placeholder="Opening Stock"
                    label="Opening Stock"
                    className="col-12"
                    disabled={values.item_type !== 'Goods'}
                  />
                </Box>

                <Box className="form__form-group col-md-6 row pe-0">
                  <FormikField
                    name="part_number"
                    type="text"
                    //  placeholder="Part Number"
                    label="Part Number #"
                    className="col-12"
                  />

                  <FormikSelect
                    name="supplier"
                    options={suppliersOptions}
                    //  placeholder="Select Supplier"
                    className="col-12"
                    label="Supplier"
                    addNewButtonAction={() => {
                      handleAddNewData('/pages/accounting/purchase/suppliers/add', values);
                    }}
                    addNewButtonLabel="Supplier"
                    isRequired={values.item_type === 'Goods'}
                  />

                  <FormikSelect
                    //  placeholder="Select Brand"
                    name="brand"
                    options={brandsOptions}
                    label="Brand"
                    className="col-12"
                    isRequired={values.item_type === 'Goods'}
                    addNewButtonAction={() => {
                      handleAddNewData('/pages/accounting/brands/add', values);
                    }}
                    addNewButtonLabel="Brands"
                  />
                  <FormikSelect
                    //  placeholder="Select Category"
                    name="category"
                    options={categoryOptions}
                    label="Category"
                    className="col-12"
                    isRequired={values.item_type === 'Goods'}
                    addNewButtonAction={() => {
                      handleAddNewData('/pages/accounting/category/add', values);
                    }}
                    addNewButtonLabel="Category"
                  />
                </Box>

                {/* ============================================================================================ */}

                <FormSubmitButton />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddItemPage;
