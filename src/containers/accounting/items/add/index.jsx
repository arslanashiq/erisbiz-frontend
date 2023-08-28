import React from 'react';
import { Form, Formik } from 'formik';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Loader from 'shared/components/loader/Loader';
import { useNavigate, useParams } from 'react-router';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { useGetBrandsListQuery } from 'services/private/brands';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikFileInput from 'shared/components/form/FormikFileInput';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useGetBankAccountsListQuery } from 'services/private/banking';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { ITEM_STATUS_OOPTIONS, ITEM_TYPES } from 'utilities/constants';
import FormikModernField from 'shared/components/form/FormikModernField';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAddItemMutation, useEditItemMutation, useGetSingleItemQuery } from 'services/private/items';
import { Button, Card, CardContent, IconButton, Stack, Tooltip } from '@mui/material';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import { itemsInitialValues } from '../utils/constants';
import 'styles/form.scss';

function AddItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const bankApiResponse = useGetBankAccountsListQuery();
  const supplierApiResponse = useGetSuppliersListQuery();
  const brandsApiResponse = useGetBrandsListQuery();
  const { initialValues } = useInitialValues(itemsInitialValues, useGetSingleItemQuery, 'item_image');
  const [addItem] = useAddItemMutation();
  const [editItem] = useEditItemMutation();
  const suppliersOptions = supplierApiResponse?.data?.results?.map(supplier => ({
    value: `${supplier.id}`,
    label: supplier.supplier_name,
  }));
  const bankOptions = bankApiResponse?.data?.results?.map(bank => ({
    value: `${bank.chart_of_account}`,
    label: bank.IBAN,
  }));
  const brandsOptions = brandsApiResponse?.data?.results?.map(brand => ({
    value: `${brand.uid}`,
    label: brand.brand_name,
  }));
  if (bankApiResponse.isLoading || supplierApiResponse.isLoading || brandsApiResponse.isLoading) {
    return <Loader />;
  }

  return (
    <Card>
      <CardContent>
        <FormHeader title="Item Master" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          // validationSchema={itemFormValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
              let response = null;
              const formData = new FormData();
              Object.keys(initialValues).forEach(key => {
                formData.append(key, values[key]);
              });
              formData.append('item_image', values.item_image);
              formData.append('sale_account', values.account_no);
              formData.append('cost_account', values.account_no);
              formData.append('inventory_coa', values.account_no);
              const postData = { item_image: values.item_image };

              if (id) {
                response = await editItem({ id, formData, postData });
              } else {
                response = await addItem(formData);
              }
              setSubmitting(false);
              if (response.data) {
                resetForm(initialValues);
                navigate(-1);
              }
              if (response.error) {
                setErrors(response.error.data);
              }
            } catch (err) {
              if (err.response && err.response.status === 400) {
                setSubmitting(true);
                setErrors(err.response.data);
                setSubmitting(false);
              }
            }
          }}
        >
          {({ isSubmitting, touched, resetForm }) => (
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

                  <FormikModernSelect name="item_type" type="text" options={ITEM_TYPES} />
                </div>
              </div>
              {/* Item Status */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">item Status</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <CheckCircleOutlineIcon />
                  </div>
                  <FormikModernSelect name="is_active" type="text" options={ITEM_STATUS_OOPTIONS} />
                </div>
              </div>

              {/* Account Number */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Account Number</span>
                <div className="form__form-group-field">
                  <FormikModernSelect name="account_no" options={bankOptions} placeholder="Account Number" />
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
                  <FormikModernField name="recorder" type="text" placeholder="Recorder" />
                </div>
              </div>

              {/* description */}
              <div className="form__form-group">
                <span className="form__form-group-label col-lg-3">Description</span>
                <div className="form__form-group-field ">
                  <FormikModernField name="description" textArea />
                </div>
              </div>
              {/* item image */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3">Item Image</span>
                <div className="form__form-group-field">
                  <FormikFileInput name="item_image" type="file" accept="image/*" />
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
                    <FormikModernSelect
                      name="supplier"
                      options={suppliersOptions}
                      placeholder="Select Supplier"
                    />
                  </div>
                </div>
                {/* Brand */}
                <div className="form__form-group col-12">
                  <span className="form__form-group-label col-lg-3 required">Brand</span>
                  <div className="form__form-group-field ">
                    <FormikModernSelect placeholder="Select Brand" name="brand" options={brandsOptions} />

                    <Tooltip title="Add Brand" placement="top" arrow>
                      <Stack
                        className="form__form-group-icon-button"
                        onClick={() => {
                          navigate('/pages/accounting/brands/add');
                        }}
                      >
                        <IconButton>
                          <AddBoxIcon />
                        </IconButton>
                      </Stack>
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
                  onClick={() => resetForm(initialValues)}
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
