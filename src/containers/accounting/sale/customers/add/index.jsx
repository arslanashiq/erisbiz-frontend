/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable indent */
import React, { useState } from 'react';
import moment from 'moment';
import { FieldArray, Form, Formik } from 'formik';
import { Button, Card, CardContent, Stack } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikModernField from 'shared/components/form/FormikModernField';
import FormTabs from 'shared/components/tabs/FormTabs';
import { CheckBoxField } from 'shared/components/form/CheckBox';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import ContactInfo from 'shared/components/form/ContactInfo';
import CreditTermsRadioButtons from 'containers/accounting/purchase/suppliers/add/components/CreditTermsRadioButtons';
import { customerFormTabsList } from '../utils/constant';
import 'styles/form.scss';

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
          {({ values, isSubmitting, errors, touched, resetForm, setFieldValue }) => (
            <Form className="form form--horizontal row pt-3">
              {/* supplier name */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Customer Name</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <PersonOutlineIcon />
                  </div>
                  <FormikModernField name="customer_name" type="text" placeholder="Customer Name" />
                </div>
              </div>
              {/* email */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3">Email</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <AlternateEmailIcon />
                  </div>
                  <FormikModernField name="email" type="text" placeholder="Email" />
                </div>
              </div>

              {/* Contact Person */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Contact Person</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <SettingsPhoneIcon />
                  </div>
                  <FormikModernField name="contact_person" type="text" placeholder="Contact Person" />
                </div>
              </div>

              {/* contact  */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3">Contact</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <LocalPhoneIcon />
                  </div>
                  <FormikModernField name="mobile_num" type="text" placeholder="Contact" />
                </div>
              </div>

              {/* website */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3">VAT Reg No</span>
                <div className="form__form-group-field">
                  <FormikModernField name="vat" type="text" placeholder="VAT Registration Number" />
                </div>
              </div>
              {/* Refrence */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Refrence</span>
                <div className="form__form-group-field">
                  <FormikModernField name="reference_num" type="text" placeholder="Refrence" />
                </div>
              </div>

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
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2">Address Line 1</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="address_line1" type="text" placeholder="Address Line 1" />
                      </div>
                    </div>

                    {/* Address Line 2 */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2">Address Line 2</span>
                      <div className="form__form-group-field">
                        <FormikModernField
                          className="d-flex align-items-center"
                          name="address_line2"
                          type="text"
                          placeholder="Address Line 2"
                        />
                      </div>
                    </div>
                    {/* PO Box */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2">PO Box</span>
                      <div className="form__form-group-field">
                        <FormikModernField
                          className="d-flex align-items-center"
                          name="Po Box"
                          type="text"
                          placeholder="PO Box"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2 required">Country</span>
                      <div className="form__form-group-field">
                        <FormikModernSelect options={[]} name="country" placeholder="Country" />
                      </div>
                    </div>
                    {/* CIty */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2 ">City</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="city" type="text" placeholder="City" />
                      </div>
                    </div>
                    {/* Map */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2 required">Map</span>
                      <div className="form__form-group row w-100">
                        <div className="form__form-group-field col">
                          <FormikModernField name="longitude" placeholder="Longitude" />
                        </div>

                        <div className="form__form-group-field col ">
                          <FormikModernField name="latitude" placeholder="Latitude" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-label">
                      <span>Delivery Address</span>
                      <span
                        style={{ fontSize: 10, cursor: 'pointer' }}
                        onClick={() => handleCopyValue(values, setFieldValue)}
                      >
                        <ContentCopyIcon sx={{ fontSize: 10 }} />
                        Copy Invoice Address
                      </span>
                    </div>
                    {/* Address Line 1 */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2">Address Line 1</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="address_line1" type="text" placeholder="Address Line 1" />
                      </div>
                    </div>

                    {/* Address Line 2 */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2">Address Line 2</span>
                      <div className="form__form-group-field">
                        <FormikModernField
                          className="d-flex align-items-center"
                          name="address_line2"
                          type="text"
                          placeholder="Address Line 2"
                        />
                      </div>
                    </div>
                    {/* PO Box */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2">PO Box</span>
                      <div className="form__form-group-field">
                        <FormikModernField
                          className="d-flex align-items-center"
                          name="Po Box"
                          type="text"
                          placeholder="PO Box"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2 required">Country</span>
                      <div className="form__form-group-field">
                        <FormikModernSelect options={[]} name="country" placeholder="Country" />
                      </div>
                    </div>
                    {/* CIty */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2 ">City</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="city" type="text" placeholder="City" />
                      </div>
                    </div>
                    {/* Map */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2 required">Map</span>
                      <div className="form__form-group row w-100">
                        <div className="form__form-group-field col">
                          <FormikModernField name="longitude" placeholder="Longitude" />
                        </div>

                        <div className="form__form-group-field col ">
                          <FormikModernField name="latitude" placeholder="Latitude" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Payment And Delivery */}
              {activeTab === customerFormTabsList[1] && (
                <div className="row form form--horizontal">
                  <div className="col-md-6">
                    {/* Opening Balance */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2">OB Amount</span>
                      <div className="form__form-group-field">
                        <FormikModernField
                          name="ob_amount"
                          type="number"
                          placeholder="Opening Balance Payee"
                        />
                      </div>
                    </div>
                    {/* Delivery Terms */}
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2">Delivery Terms</span>
                      <div className="form__form-group-field">
                        <FormikModernField
                          className="d-flex align-items-center"
                          name="currency"
                          type="text"
                          textArea
                          placeholder="Currency"
                        />
                      </div>
                    </div>
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
                      <FormikModernField
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
                        style={
                          values?.credit_terms
                            ? { pointerEvents: 'auto', opacity: 1 }
                            : {
                                pointerEvents: 'none',
                                opacity: 0.2,
                              }
                        }
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
                  <div className="form__form-group">
                    <span className="form__form-group-label col-lg-2">Comment on Transaction</span>
                    <div className="form__form-group-field">
                      <FormikModernField
                        name="comments_on_transactions"
                        type="text"
                        textArea
                        placeholder="comment"
                      />
                    </div>
                  </div>
                  {/* Notes */}
                  <div className="form__form-group">
                    <span className="form__form-group-label col-lg-2">Notes</span>
                    <div className="form__form-group-field">
                      <FormikModernField name="notes" type="text" textArea placeholder="Notes" />
                    </div>
                  </div>
                </div>
              )}

              <div className="col-lg-12 mt-4">
                <Stack spacing={2} direction="row">
                  <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
                    Save
                  </Button>
                  <Button
                    type="button"
                    disabled={!touched || isSubmitting}
                    color="secondary"
                    className="text-capitalize"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default AddCustomer;
