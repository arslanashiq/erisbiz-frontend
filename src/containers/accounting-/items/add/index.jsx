/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { itemStatusOptions, itemTypes } from 'utilities/constants';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button, Card, CardContent, IconButton, Stack, Tooltip } from '@mui/material';
import FormikModernField from 'shared/components/form/FormikModernField';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import GroupedOptionsFormikSelect from 'shared/components/form/GroupedOptionsFormikSelect';
import 'styles/form.scss';
import { useNavigate, useParams } from 'react-router';
import { useGetBankAccountsListQuery } from 'services/private/banking';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useAddItemMutation, useEditItemMutation, useGetSingleItemQuery } from 'services/private/items';
import copyFetchedValues from 'utilities/copyFetchedValues';
import FormHeader from 'shared/components/form-header/FormHeader';
import Loader from 'shared/components/loader/Loader';
import { useGetBrandsListQuery } from 'services/private/brands';

function AddItemPage() {
  const [itemFormInitialValues, setItemFormInitialValues] = useState({
    item_name: '',
    sku_hs_code: '',
    sale_price: '',
    cost_price: '',
    item_type: 'Goods',
    is_active: 'true',
    account_no: '',
    bar_code: '',
    unit: 'kg',
    recorder: '',
    // item_image: '',
    part_number: '',
    supplier: '',
    brand: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const bankApiResponse = useGetBankAccountsListQuery();
  const supplierApiResponse = useGetSuppliersListQuery();
  const brandsApiResponse = useGetBrandsListQuery();
  const itemDetailResponse = id ? useGetSingleItemQuery(id) : '';

  const [addItem] = useAddItemMutation();
  const [editItem] = useEditItemMutation();
  const suppliersOptions = supplierApiResponse?.data?.results?.map(supplier => ({
    value: `${supplier.id}`,
    label: supplier.supplier_name,
  }));
  const bankOptions = bankApiResponse?.data?.results?.map(bank => ({
    value: `${bank.id}`,
    label: bank.IBAN,
  }));
  const brandsOptions = brandsApiResponse?.data?.results?.map(brand => ({
    value: `${brand.uid}`,
    label: brand.brand_name,
  }));
  useEffect(() => {
    if (id && itemDetailResponse.isSuccess) {
      setItemFormInitialValues({
        ...itemFormInitialValues,
        ...copyFetchedValues(itemFormInitialValues, itemDetailResponse.data),
        item_type: itemDetailResponse.data.item_type.toString(),
        is_active: itemDetailResponse.data.is_active.toString(),
      });
    }
  }, [itemDetailResponse]);
  if (bankApiResponse.isLoading || supplierApiResponse.isLoading || brandsApiResponse.isLoading) {
    return <Loader />;
  }

  return (
    <Card>
      <CardContent>
        <FormHeader title="Item Master" />
        <Formik
          enableReinitialize
          initialValues={itemFormInitialValues}
          // validationSchema={itemFormValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
              let response = null;
              if (id) {
                const payload = { ...values, id };
                await editItem({ id, payload });
              } else {
                response = await addItem(values);
              }
              if (response.data) {
                setSubmitting(false);
                resetForm(itemFormInitialValues);
                navigate(-1);
              }
              if (response.error) {
                setSubmitting(false);
                setErrors(response.error.data);
              }
            } catch (err) {
              if (err.response && err.response.status === 400) {
                setSubmitting(true);
                setErrors(err.response.data);
                setSubmitting(false);
              } else {
                // doReturnErrors(err.response.data, err.response.status);
              }
            }
          }}
        >
          {({ isSubmitting, touched, setFieldValue, setFieldTouched, resetForm, values, errors }) => (
            <Form className="form form--horizontal row pt-3">
              {/* item name */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Item Name</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <ShoppingBasketIcon />
                  </div>
                  <FormikModernField type="text" name="item_name" placeholder="Item Name" />
                </div>
              </div>
              {/* sku/HS code */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">SKU/HS Code</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <ContactPhoneIcon />
                  </div>
                  <FormikModernField name="sku_hs_code" placeholder="SKU/HS Code" />
                </div>
              </div>
              {/* Sale price */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Sale Price</span>
                <div className="form__form-group-field">
                  <FormikModernField type="number" name="sale_price" placeholder="Sale Price" />
                </div>
              </div>
              {/* cost Price */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Cost Price</span>
                <div className="form__form-group-field">
                  <FormikModernField type="number" name="cost_price" placeholder="Cost Price" />
                </div>
              </div>
              {/* Item Type */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">item Type</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <CategoryIcon />
                  </div>

                  <GroupedOptionsFormikSelect
                    name="item_type"
                    type="text"
                    itemOptions={itemTypes}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    value={values.item_type}
                    touched={touched.item_type}
                    error={errors.item_type}
                  />
                </div>
              </div>
              {/* Item Status */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">item Status</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <CheckCircleOutlineIcon />
                  </div>
                  <GroupedOptionsFormikSelect
                    name="is_active"
                    type="text"
                    itemOptions={itemStatusOptions}
                    onChange={setFieldValue}
                    value={values.is_active}
                    onBlur={setFieldTouched}
                    touched={touched.is_active}
                    error={errors.is_active}
                  />
                </div>
              </div>

              {/* Account Number */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Account Number</span>
                <div className="form__form-group-field">
                  <GroupedOptionsFormikSelect
                    name="account_no"
                    itemOptions={bankOptions}
                    placeholder="Account Number"
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    value={values.account_no}
                    touched={touched.account_no}
                    error={errors.account_no}
                  />
                </div>
              </div>

              {/* Bar Code */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Bar Code</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="bar_code" placeholder="Bar Code" />
                </div>
              </div>

              {/* Unit */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Unit</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="unit" />
                </div>
              </div>
              {/* Recoder */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Recoder</span>
                <div className="form__form-group-field ">
                  <FormikModernField
                    name="recorder"
                    type="text"
                    placeholder="Recorder"
                    value={values.recorder}
                    touched={touched.recorder}
                    error={errors.recorder}
                  />
                </div>
              </div>

              {/* description */}
              <div className="form__form-group">
                <span className="form__form-group-label col-lg-3">Description</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="sale_description" textArea />
                </div>
              </div>
              {/* item image */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3">Item Image</span>
                <div className="form__form-group-field">
                  <FormikModernField name="item_image" type="file" accept="image/*" />
                </div>
              </div>

              {/* Part Number,Supplier,Brand */}
              <div className="form__form-group col-md-6 row ">
                {/* Part Number */}
                <div className="form__form-group col-12">
                  <span className="form__form-group-label col-lg-3 required">Part Number</span>
                  <div className="form__form-group-field ">
                    <FormikModernField name="part_number" type="number" placeholder="Part Number" />
                  </div>
                </div>

                {/* Supplier */}
                <div className="col-12 form__form-group">
                  <span className="form__form-group-label col-lg-2">Supplier</span>
                  <div className="form__form-group-field ">
                    <GroupedOptionsFormikSelect
                      name="supplier"
                      itemOptions={suppliersOptions}
                      placeholder="Select Supplier"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      value={values.supplier}
                      touched={touched.supplier}
                      error={errors.supplier}
                    />
                  </div>
                </div>
                {/* Brand */}
                <div className="form__form-group col-12">
                  <span className="form__form-group-label col-lg-3 required">Brand</span>
                  <div className="form__form-group-field ">
                    <FormikModernSelect placeholder="Select Brand" name="brand" options={brandsOptions} />

                    <Tooltip title="Add Brand" placement="top" arrow>
                      <div
                        className="form__form-group-icon-button"
                        onClick={() => {
                          navigate('/pages/accounting/brands/add');
                        }}
                      >
                        <IconButton>
                          <AddBoxIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* ============================================================================================ */}

              {/* <ErrorFocus /> */}
              <Stack spacing={2} direction="row">
                <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>

                <Button
                  color="secondary"
                  onClick={() => resetForm(itemFormInitialValues)}
                  disabled={!touched || isSubmitting}
                  className="text-capitalize"
                >
                  Clear
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default AddItemPage;
