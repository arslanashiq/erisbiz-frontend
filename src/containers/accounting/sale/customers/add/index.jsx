import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom/dist';
import { FieldArray, Form, Formik } from 'formik';
import { Box, Card, CardContent } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
// services
import {
  useAddCustomerMutation,
  useEditCustomerMutation,
  useGetSingleCustomerQuery,
} from 'services/private/customers';
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormTabs from 'shared/components/tabs/FormTabs';
import { CheckBoxField } from 'shared/components/form/CheckBox';
import FormikSelect from 'shared/components/form/FormikSelect';
import ContactInfo from 'shared/components/form/ContactInfo';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import CreditTermsRadioButtons from 'containers/accounting/purchase/suppliers/add/components/CreditTermsRadioButtons';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utlilities
import { customerFormTabsList } from '../utilities/constant';
import { customerFormInitialValues } from '../utilities/initialValues';
// styles
import 'styles/form/form.scss';
import { customerFormValidationSchema } from '../utilities/validation-schema';

function AddCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(customerFormTabsList[0]);

  const countriesResponse = useGetAllCountriesListQuery();

  const [addCustomer] = useAddCustomerMutation();
  const [editCustomer] = useEditCustomerMutation();

  const { initialValues } = useInitialValues(customerFormInitialValues, useGetSingleCustomerQuery);

  const { optionsList: countriesOption } = useListOptions(countriesResponse?.data?.data, {
    label: 'country',
    value: 'iso2',
  });

  const handleCopyValue = (values, setFieldValue) => {
    setFieldValue('delivery_address_line1', values.invoice_address_line1);
    setFieldValue('delivery_address_line2', values.invoice_address_line2);
    setFieldValue('delivery_po_box', values.invoice_po_box);
    setFieldValue('delivery_country', values.invoice_country);
    setFieldValue('delivery_city', values.invoice_city);
    setFieldValue('delivery_latitude', values.invoice_latitude);
    setFieldValue('delivery_longitude', values.invoice_longitude);
  };

  // setinitial values memeo
  const customerFormUpdatedInitialValues = useMemo(() => {
    const newData = { ...initialValues, credit_limit: false, credit_terms: false };
    if (initialValues.set_credit_limit) {
      newData.credit_limit = true;
    }
    if (initialValues.set_credit_terms) {
      newData.credit_terms = true;
    }
    return newData;
  }, [initialValues]);

  return (
    <Card>
      <CardContent>
        <FormHeader title="Customer Master" />
        <Formik
          enableReinitialize
          initialValues={customerFormUpdatedInitialValues}
          validationSchema={customerFormValidationSchema}
          onSubmit={async (values, { setErrors, resetForm }) => {
            let response = null;
            if (id) {
              response = await editCustomer({ payload: values, id });
            } else {
              response = await addCustomer(values);
            }
            if (response.error) {
              setErrors(response.error.data);
              return;
            }
            resetForm();
            navigate(-1);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="form form--horizontal row pt-3">
              <FormikField
                name="customer_name"
                type="text"
                placeholder="Customer Name"
                startIcon={<PersonOutlineIcon />}
                label="Customer Name"
                isRequired
              />
              <FormikField
                name="email"
                type="text"
                placeholder="Email"
                startIcon={<AlternateEmailIcon />}
                label="Email"
                isRequired
              />

              <FormikField
                name="contact_person"
                type="text"
                placeholder="Contact Person"
                startIcon={<SettingsPhoneIcon />}
                label="Contact Person"
              />

              <FormikField
                name="contact"
                type="text"
                placeholder="Contact"
                startIcon={<LocalPhoneIcon />}
                label="Contact"
              />

              <FormikField
                name="vat_reg_no"
                type="text"
                placeholder="VAT Registration Number"
                label="VAT Reg No"
                isRequired
              />

              <FormikField
                isRequired
                name="reference_num"
                type="text"
                placeholder="Reference"
                label="Reference"
              />

              <FormTabs
                className="mt-2 mb-2"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabsList={customerFormTabsList}
              />

              {activeTab === customerFormTabsList[0] && (
                <Box className="row form form--horizontal">
                  <Box className="col-md-6">
                    <Box className="form-label">
                      <span>Invoice Address</span>
                    </Box>
                    <FormikField
                      name="invoice_address_line1"
                      type="text"
                      placeholder="Address Line 1"
                      label="Address Line 1"
                      className="col-12"
                    />

                    <FormikField
                      name="invoice_address_line2"
                      type="text"
                      placeholder="Address Line 2"
                      label="Address Line 2"
                      className="col-12"
                    />
                    <FormikField
                      name="invoice_po_box"
                      type="text"
                      placeholder="PO Box"
                      label="PO Box"
                      className="col-12"
                    />

                    <FormikSelect
                      options={countriesOption}
                      name="invoice_country"
                      placeholder="Country"
                      label="Country"
                      className="col-12"
                      isRequired
                    />

                    <FormikField
                      name="invoice_city"
                      type="text"
                      placeholder="City"
                      label="City"
                      className="col-12"
                    />

                    <Box className="form__form-group row">
                      <span className="form__form-group-label col-lg-2">Map</span>

                      <FormikField name="invoice_longitude" placeholder="Longitude" className="col" />
                      <FormikField name="invoice_latitude" placeholder="Latitude" className="col" />
                    </Box>
                  </Box>
                  <Box className="col-md-6">
                    <Box className="form-label">
                      <span>Delivery Address</span>
                      <Box
                        style={{ fontSize: 10, cursor: 'pointer' }}
                        onClick={() => handleCopyValue(values, setFieldValue)}
                      >
                        <ContentCopyIcon sx={{ fontSize: 10 }} />
                        Copy Invoice Address
                      </Box>
                    </Box>
                    <FormikField
                      name="delivery_address_line1"
                      type="text"
                      placeholder="Address Line 1"
                      label="Address Line 1"
                      className="col-12"
                    />

                    <FormikField
                      name="delivery_address_line2"
                      type="text"
                      placeholder="Address Line 2"
                      label="Address Line 2"
                      className="col-12"
                    />
                    <FormikField
                      name="delivery_po_box"
                      type="text"
                      placeholder="PO Box"
                      label="PO Box"
                      className="col-12"
                    />

                    <FormikSelect
                      options={countriesOption}
                      name="delivery_country"
                      placeholder="Country"
                      label="Country"
                      className="col-12"
                      isRequired
                    />

                    <FormikField
                      name="delivery_city"
                      type="text"
                      placeholder="City"
                      label="City"
                      className="col-12"
                    />

                    <Box className="form__form-group row">
                      <span className="form__form-group-label col-lg-2">Map</span>

                      <FormikField name="delivery_longitude" placeholder="Longitude" className="col" />
                      <FormikField name="delivery_latitude" placeholder="Latitude" className="col" />
                    </Box>
                  </Box>
                </Box>
              )}
              {activeTab === customerFormTabsList[1] && (
                <Box className="row form form--horizontal">
                  <Box className="col-md-6">
                    <FormikField
                      name="opening_balance"
                      type="number"
                      placeholder="Opening Balance Payee"
                      label="OB Amount"
                      className="col-12"
                    />
                    <FormikField
                      name="delivery_terms"
                      type="text"
                      textArea
                      placeholder="Delivery Terms"
                      label="Delivery Terms"
                      className="col-12"
                    />
                  </Box>
                  <Box className="col-md-6">
                    <Box className="form__form-group">
                      <Box className="form__form-group-label col-lg-2" />
                      <Box className="form__form-group-field">
                        <CheckBoxField
                          name="credit_limit"
                          label="Set Credit Limit($)"
                          onChange={() => {
                            setFieldValue('set_credit_limit', 0);
                          }}
                        />
                      </Box>
                      <FormikField
                        disabled={!values.credit_limit}
                        name="set_credit_limit"
                        type="number"
                        placeholder="0.0"
                      />
                    </Box>
                    <Box className="form__form-group">
                      <Box className="form__form-group-label col-lg-2" />
                      <Box className="form__form-group-field">
                        <CheckBoxField name="credit_terms" label="Set Credit Terms" />
                      </Box>
                    </Box>
                    <Box className="form__form-group">
                      <span className="form__form-group-label col-lg-2" />

                      <Box
                        disabled={!values?.credit_terms}
                        style={{
                          pointerEvents: values?.credit_terms ? 'auto' : 'none',
                          opacity: values?.credit_terms ? 1 : 0.2,
                        }}
                        className="form__form-group-field"
                      >
                        <CreditTermsRadioButtons
                          name="set_credit_terms"
                          onChange={value => {
                            setFieldValue('days_after_invoice', 0);
                            setFieldValue('set_credit_terms', value);
                          }}
                          values={values}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              {/* COntact Info */}
              {activeTab === customerFormTabsList[2] && (
                <FieldArray name="sales_company_contact" component={ContactInfo} />
              )}
              {/* Comments and Notes */}
              {activeTab === customerFormTabsList[3] && (
                <Box className="row form form--horizontal">
                  {/* COmments */}
                  <FormikField
                    name="comments_on_transactions"
                    type="text"
                    textArea
                    placeholder="comment"
                    label="Comment on Transaction"
                    className="col-12"
                  />
                  {/* Notes */}
                  <FormikField
                    name="notes"
                    type="text"
                    textArea
                    placeholder="Notes"
                    label="Notes"
                    className="col-12"
                  />
                </Box>
              )}

              <FormSubmitButton />
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default AddCustomer;
