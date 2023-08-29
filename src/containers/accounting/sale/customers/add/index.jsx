import React, { useState } from 'react';
import moment from 'moment';
import { FieldArray, Form, Formik } from 'formik';
import { Box, Card, CardContent } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormTabs from 'shared/components/tabs/FormTabs';
import { CheckBoxField } from 'shared/components/form/CheckBox';
import FormikSelect from 'shared/components/form/FormikSelect';
import ContactInfo from 'shared/components/form/ContactInfo';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import CreditTermsRadioButtons from 'containers/accounting/purchase/suppliers/add/components/CreditTermsRadioButtons';
import { customerFormTabsList } from '../utilities/constant';
import 'styles/form/form.scss';

function AddCustomer() {
  const [activeTab, setActiveTab] = useState(customerFormTabsList[0]);
  const [initialValues, setInitialValues] = useState({
    customer_contact: [],
    supplier_name: '',
    website: '',
    notes: '',
    bank_name: '',
    contact_person: '',
    email: '',
    reference_num: '',
    account_number: '',
    IBAN: '',
    swift_code: '',
    mobile_num: '',
    bank_branch: '',
    bank_country: '',
    limit: 1,
    tax_treatment: '',
    trn: '',
    source_of_supply: '',
    currency: 'AED',
    currency_id: '',
    opening_balance: 0,
    is_credit: 'true',
    opening_balance_date: moment().format('YYYY-MM-DD'),
    exchange_rate: 1,
    payment_terms: 'Net 0',
    bill_addr_street_one: '',
    bill_addr_country: '',
    bill_addr_city: '',
    bill_addr_state: '',
    bill_addr_zipcode: '',
    ship_addr_street_one: '',
    ship_addr_country: '',
    ship_addr_city: '',
    ship_addr_state: '',
    ship_addr_zipcode: '',
    remarks: '',
    supplier_contacts: [],
    vat_number: '',
    comments_on_transactions: '',
    address_line1: '',
    address_line2: '',
    latitude: '',
    longitude: '',
    city: '',
    set_credit_limit: false,
    set_credit_terms: false,
    days_after_invoice: 0,
    is_import_agent: false,
    is_reverse_charge: false,
  });
  const handleCopyValue = () => {};
  console.log(setInitialValues, 'setSupplierFormInitialValues');
  return (
    <Card>
      <CardContent>
        <FormHeader title="Customer Master" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          // onSubmit={async values => {
          // }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="form form--horizontal row pt-3">
              {/* supplier name */}
              <FormikField
                name="customer_name"
                type="text"
                placeholder="Customer Name"
                startIcon={<PersonOutlineIcon />}
                label="Customer Name"
              />
              {/* email */}
              <FormikField
                name="email"
                type="text"
                placeholder="Email"
                startIcon={<AlternateEmailIcon />}
                label="Email"
              />

              {/* Contact Person */}

              <FormikField
                name="contact_person"
                type="text"
                placeholder="Contact Person"
                startIcon={<SettingsPhoneIcon />}
                label="Contact Person"
              />

              {/* contact  */}

              <FormikField
                name="mobile_num"
                type="text"
                placeholder="Contact"
                startIcon={<LocalPhoneIcon />}
                label="Contact"
              />

              {/* VAT */}
              <FormikField
                name="vat"
                type="text"
                placeholder="VAT Registration Number"
                label="VAT Reg No"
              />

              {/* Refrence */}
              <FormikField name="reference_num" type="text" placeholder="Refrence" label="Reference" />

              <FormTabs
                className="mt-2 mb-2"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabsList={customerFormTabsList}
              />

              {/* Communication Tab */}
              {activeTab === customerFormTabsList[0] && (
                <div className="row form form--horizontal">
                  <div className="col-md-6">
                    <div className="form-label">
                      <span>Invoice Address</span>
                    </div>
                    {/* Address Line 1 */}
                    <FormikField
                      name="address_line1"
                      type="text"
                      placeholder="Address Line 1"
                      label="Address Line 1"
                      className="col-12"
                    />

                    {/* Address Line 2 */}

                    <FormikField
                      name="address_line2"
                      type="text"
                      placeholder="Address Line 2"
                      label="Address Line 2"
                      className="col-12"
                    />
                    {/* PO Box */}
                    <FormikField
                      name="Po Box"
                      type="text"
                      placeholder="PO Box"
                      label="PO Box"
                      className="col-12"
                    />

                    {/* Country */}
                    <FormikSelect
                      options={[]}
                      name="country"
                      placeholder="Country"
                      label="Country"
                      className="col-12"
                    />

                    {/* CIty */}
                    <FormikField
                      name="city"
                      type="text"
                      placeholder="City"
                      label="City"
                      className="col-12"
                    />

                    {/* Map */}
                    <div className="form__form-group row">
                      <span className="form__form-group-label col-lg-2">Map</span>

                      <FormikField name="longitude" placeholder="Longitude" className="col" />
                      <FormikField name="latitude" placeholder="Latitude" className="col" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-label">
                      <span>Delivery Address</span>
                      <Box
                        style={{ fontSize: 10, cursor: 'pointer' }}
                        onClick={() => handleCopyValue(values, setFieldValue)}
                      >
                        <ContentCopyIcon sx={{ fontSize: 10 }} />
                        Copy Invoice Address
                      </Box>
                    </div>
                    {/* Address Line 1 */}
                    <FormikField
                      name="address_line1"
                      type="text"
                      placeholder="Address Line 1"
                      label="Address Line 1"
                      className="col-12"
                    />

                    {/* Address Line 2 */}

                    <FormikField
                      name="address_line2"
                      type="text"
                      placeholder="Address Line 2"
                      label="Address Line 2"
                      className="col-12"
                    />
                    {/* PO Box */}
                    <FormikField
                      name="Po Box"
                      type="text"
                      placeholder="PO Box"
                      label="PO Box"
                      className="col-12"
                    />

                    {/* Country */}
                    <FormikSelect
                      options={[]}
                      name="country"
                      placeholder="Country"
                      label="Country"
                      className="col-12"
                    />

                    {/* CIty */}
                    <FormikField
                      name="city"
                      type="text"
                      placeholder="City"
                      label="City"
                      className="col-12"
                    />

                    {/* Map */}
                    <div className="form__form-group row">
                      <span className="form__form-group-label col-lg-2">Map</span>

                      <FormikField name="longitude" placeholder="Longitude" className="col" />
                      <FormikField name="latitude" placeholder="Latitude" className="col" />
                    </div>
                  </div>
                </div>
              )}
              {/* Payment And Delivery */}
              {activeTab === customerFormTabsList[1] && (
                <div className="row form form--horizontal">
                  <div className="col-md-6">
                    {/* Opening Balance */}
                    <FormikField
                      name="ob_amount"
                      type="number"
                      placeholder="Opening Balance Payee"
                      label="OB Amount"
                      className="col-12"
                    />
                    {/* Delivery Terms */}
                    <FormikField
                      name="currency"
                      type="text"
                      textArea
                      placeholder="Currency"
                      label="Delivery Terms"
                      className="col-12"
                    />
                  </div>
                  <div className="col-md-6">
                    {/* credit Limit */}
                    <div className="form__form-group">
                      <div className="form__form-group-label col-lg-2" />
                      <div className="form__form-group-field">
                        <CheckBoxField
                          name="credit_limit"
                          label="Set Credit Limit($)"
                          onChange={() => {
                            setFieldValue('set_credit_limit', 0);
                          }}
                        />
                      </div>
                      <FormikField
                        disabled={!values.credit_limit}
                        name="set_credit_limit"
                        type="number"
                        placeholder="0.0"
                      />
                    </div>
                    {/* credit terms */}
                    <div className="form__form-group">
                      <div className="form__form-group-label col-lg-2" />
                      <div className="form__form-group-field">
                        <CheckBoxField name="credit_terms" label="Set Credit Terms" />
                      </div>
                    </div>
                    {/* Set Credit Terms */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2" />

                      <div
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
                            setFieldValue('days_after_invoice', '');
                            setFieldValue('set_credit_terms', value);
                          }}
                          values={values}
                          touched={touched}
                          errors={errors}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* COntact Info */}
              {activeTab === customerFormTabsList[2] && (
                <FieldArray name="customer_contact" component={ContactInfo} />
              )}
              {/* Comments and Notes */}
              {activeTab === customerFormTabsList[3] && (
                <div className="row form form--horizontal">
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
                </div>
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
