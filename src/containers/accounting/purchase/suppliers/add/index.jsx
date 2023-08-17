/* eslint-disable indent */
import React, { useState } from 'react';
import { Button, Card, CardContent, Stack } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import LanguageIcon from '@mui/icons-material/Language';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FormHeader from 'shared/components/form-header/FormHeader';
import { FieldArray, Form, Formik } from 'formik';
import FormikModernField from 'shared/components/form/FormikModernField';
import FormTabs from 'shared/components/tabs/FormTabs';
import FormikSelect from 'shared/components/form/FormikSelect';
import { CheckBoxField } from 'shared/components/form/CheckBox';
import { supplierFormTabsList } from '../utils/constants';
import 'styles/form.scss';
import CreditLimitRadioButtons from './components/CreditLimitRadioButtons';
import ImportantAgentRadioButtons from './components/ImportantAgentRadioButtons';
import SupplierContacts from './components/SupplierContacts';

function SupplierAddPage() {
  const [supplierFormInitialValues, setSupplierFormInitialValues] = useState({
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
    item_image: '',
    part_number: '',
    supplier: '',
    brand: '',
    supplier_contacts: [],
  });
  const [activeTab, setActiveTab] = useState(supplierFormTabsList[0]);
  console.log(setSupplierFormInitialValues, 'setSupplierFormInitialValues');
  return (
    <Card>
      <CardContent>
        <FormHeader title="Supplier Master" />
        <Formik
          enableReinitialize
          initialValues={supplierFormInitialValues}
          onSubmit={async values => {
            console.log(values, 'aslkjdakdjsakdlsa');
          }}
        >
          {({ values, isSubmitting, touched, resetForm, setFieldValue, setFieldTouched, errors }) => (
            <Form className="form form--horizontal row pt-3">
              {/* supplier name */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Supplier Name</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <PersonOutlineIcon />
                  </div>
                  <FormikModernField name="supplier_name" type="text" placeholder="Supplier Name" />
                </div>
              </div>
              {/* Refrence */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3 required">Refrence</span>
                <div className="form__form-group-field">
                  <FormikModernField name="reference_num" type="text" placeholder="Refrence" />
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

              {/* website */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3">Website</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon cursor-pointer">
                    <LanguageIcon />
                  </div>
                  <FormikModernField name="website" type="text" placeholder="Website" />
                </div>
              </div>

              {/* contact  */}
              <div className="form__form-group col-md-6">
                <span className="form__form-group-label col-lg-3">contact</span>
                <div className="form__form-group-field">
                  <FormikModernField name="mobile_num" type="text" placeholder="Contact" />
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

              <FormTabs
                className="mt-2 mb-2"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabsList={supplierFormTabsList}
              />

              {/* Communication Tab */}
              {activeTab === supplierFormTabsList[0] && (
                <div className="row form form--horizontal">
                  {/* Address Line 1 */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2">Address Line 1</span>
                    <div className="form__form-group-field">
                      <FormikModernField name="address_line1" type="text" placeholder="Address Line 1" />
                    </div>
                  </div>
                  {/* Credit Limit */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label  col-lg-2" />
                    <div className="row">
                      <div className="form__form-group-field col-12">
                        <CheckBoxField
                          setFieldValue={setFieldValue}
                          name="credit_limit"
                          value={values.credit_limit}
                          onChange={e => {
                            if (e?.target?.checked === false) {
                              setFieldValue('set_credit_limit', '');
                            }
                            setFieldValue(e?.target?.name, e?.target?.checked);
                          }}
                          onBlur={setFieldTouched}
                          touched={touched.credit_limit}
                          error={errors.credit_limit}
                        />
                        <span className="px-4">Set Credit Limit($)</span>

                        <div
                          className="col-4"
                          style={{
                            padding: 0,
                            paddingLeft: 10,
                            visibility: values?.credit_limit ? 'visible' : 'hidden',
                          }}
                        >
                          <FormikModernField
                            className="w-100"
                            name="set_credit_limit"
                            type="number"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div className="form__form-group-field col-12">
                        <CheckBoxField
                          name="credit_terms"
                          value={values.credit_terms}
                          onChange={e => {
                            setFieldValue(e?.target?.name, e?.target?.checked);
                          }}
                          onBlur={setFieldTouched}
                        />
                        <span className="px-4">Set Credit Terms</span>
                      </div>
                    </div>
                  </div>
                  {/* Address Line 2 */}
                  <div className="form__form-group col-md-6">
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
                  {/* Credit Terms */}
                  <div className="form__form-group col-md-6">
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
                      <CreditLimitRadioButtons
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
                  {/* Country */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 required">Country</span>
                    <div className="form__form-group-field">
                      <FormikSelect
                        name="country"
                        itemOptions={[]}
                        placeholder="Country"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        value={values.country}
                        touched={touched.country}
                        error={errors.country}
                      />
                    </div>
                  </div>
                  {/* CIty */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 text-right">City</span>
                    <div className="form__form-group-field">
                      <FormikModernField name="city" type="text" placeholder="City" />
                    </div>
                  </div>
                  {/* Map */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 required">Map</span>
                    <div className="form__form-group-field">
                      <FormikModernField name="longitude" placeholder="Longitude" />
                    </div>
                  </div>
                  {/* Latitude */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 text-right" />
                    <div className="form__form-group-field">
                      <FormikModernField name="latitude" type="text" placeholder="Latitude" />
                    </div>
                  </div>
                </div>
              )}
              {/* Bank And Transfer */}
              {activeTab === supplierFormTabsList[1] && (
                <div className="row form form--horizontal">
                  {/* Account Payee */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2">Account Payee</span>
                    <div className="form__form-group-field">
                      <FormikModernField name="account_payee" type="text" placeholder="Account Payee" />
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2">Currency</span>
                    <div className="form__form-group-field">
                      <FormikModernField
                        className="d-flex align-items-center"
                        name="currency"
                        type="text"
                        placeholder="Currency"
                      />
                    </div>
                  </div>
                  {/* Swift Code */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 text-right">Swift Code</span>
                    <div className="form__form-group-field">
                      <FormikModernField name="swift_code" type="text" placeholder="Swift Code" />
                    </div>
                  </div>
                  {/* IBAN */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 required">IBAN</span>
                    <div className="form__form-group-field">
                      <FormikModernField name="IBAN" placeholder="IBAN" />
                    </div>
                  </div>

                  {/* Bank Name and Account Name */}
                  <div className="form__form-group col-md-6 align-items-center row p-0 m-0">
                    <div className="form__form-group ">
                      <span className="form__form-group-label col-lg-2 required">Bank Name</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="bank_name" placeholder="bank Name" />
                      </div>
                    </div>
                    <div className="form__form-group ">
                      <span className="form__form-group-label col-lg-2 text-right">Accout Name</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="Account Name" type="text" placeholder="Accout Name" />
                      </div>
                    </div>
                  </div>
                  {/* Account Detail,Vat Reverse and radio Button */}
                  <div className="form__form-group col-md-6 row p-0 m-0">
                    <span className="form__form-group-label col-lg-2" />

                    <div className="form__form-group ">
                      <span className="form__form-group-label col-lg-2">Account Detail</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="account_detail" placeholder="Account Detail" />
                      </div>
                    </div>
                    <div className="form__form-group ">
                      <span className="form__form-group-label col-lg-2">VAT Reverse Charges</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="vat_reverse_charges" placeholder="VAT Reverse Charges" />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2" />
                      <div className="form__form-group-field">
                        <ImportantAgentRadioButtons
                          setFieldValue={setFieldValue}
                          values={values.important_agent}
                          touched={touched}
                          errors={errors}
                          onChange={value => {
                            setFieldValue('important_agent', value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* COntact Info */}
              {activeTab === supplierFormTabsList[2] && (
                <FieldArray name="supplier_contacts" component={SupplierContacts} />
              )}
              {/* Comments and Notes */}
              {activeTab === supplierFormTabsList[3] && (
                <div className="row form form--horizontal">
                  {/* COmments */}
                  <div className="form__form-group">
                    <span className="form__form-group-label col-lg-2">Comment on Transaction</span>
                    <div className="form__form-group-field">
                      <FormikModernField name="comment" type="text" textArea placeholder="comment" />
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
                      resetForm(supplierFormInitialValues);
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

export default SupplierAddPage;
