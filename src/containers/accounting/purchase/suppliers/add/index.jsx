import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Stack } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import LanguageIcon from '@mui/icons-material/Language';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { FieldArray, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router';

// COMPONENTS & UTILIITES
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikModernField from 'shared/components/form/FormikModernField';
import FormTabs from 'shared/components/tabs/FormTabs';
import { CheckBoxField } from 'shared/components/form/CheckBox';
import FormikModernSelect from 'shared/components/form/FormikModernSelect';
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
import {
  useAddSupplierMutation,
  useEditSupplierMutation,
  useGetLatestTransactionNumberQuery,
  useGetSingleSupplierQuery,
} from 'services/private/suppliers';
import { useGetBankAccountsListQuery } from 'services/private/banking';
import ContactInfo from 'shared/components/form/ContactInfo';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import { supplierFormTabsList } from '../utils/constants';
import CreditTermsRadioButtons from './components/CreditTermsRadioButtons';
import 'styles/form.scss';
import { supplierInitialValues } from '../utils/constant';

function SupplierAddPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(supplierFormTabsList[0]);
  const countriesListResponse = useGetAllCountriesListQuery();
  const bankAccountResponse = useGetBankAccountsListQuery();
  const latestTransactionNumber = useGetLatestTransactionNumberQuery();

  const [addSupplier] = useAddSupplierMutation();
  const [editSupplier] = useEditSupplierMutation();
  const { initialValues: supplierFormInitialValues, setInitialValues } = useInitialValues(
    supplierInitialValues,
    useGetSingleSupplierQuery
  );

  useEffect(() => {
    if (supplierFormInitialValues.set_credit_limit) {
      setInitialValues({ ...supplierFormInitialValues, credit_limit: true });
    }
    if (supplierFormInitialValues.set_credit_terms) {
      setInitialValues({ ...supplierFormInitialValues, credit_terms: true });
    }
  }, [supplierFormInitialValues]);

  const countryOptions = countriesListResponse?.data?.data?.map(country => ({
    value: `${country.country}`,
    label: country.country,
  }));
  const bankAccountOptions = bankAccountResponse?.data?.results?.map(account => ({
    value: account.chart_of_account.toString(),
    label: account.bank_account_name,
    swift_code: account.swift_code,
    bank_name: account.bank_name,
    account_number: account.account_number,
    IBAN: account.IBAN,
  }));

  const handleChangeBank = (setFieldValue, value) => {
    const selectedBank = bankAccountOptions.filter(account => value === account.value)[0];
    setFieldValue('swift_code', selectedBank.swift_code);
    setFieldValue('bank_name', selectedBank.bank_name);
    setFieldValue('account_number', selectedBank.account_number);
    setFieldValue('IBAN', selectedBank.IBAN);
  };

  return (
    <Card>
      <CardContent>
        <FormHeader title="Supplier Master" />
        <Formik
          enableReinitialize
          initialValues={supplierFormInitialValues}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            let response = null;
            if (id) {
              response = await editSupplier({ id, payload: values });
            } else {
              const payload = {
                ...values,
                transaction_num: latestTransactionNumber.data?.latest_num
                  ? latestTransactionNumber.data.latest_num + 1
                  : 1,
              };

              response = await addSupplier(payload);
            }
            setSubmitting(false);
            if (response.data) {
              navigate(-1);
            } else {
              setErrors(response.error.data);
            }
            setSubmitting(false);
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
                  <FormikModernField
                    name="supplier_name"
                    type="text"
                    placeholder="Supplier Name"
                    onChange={value => {
                      setFieldValue('account_payee', value);
                    }}
                  />
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
                      // style={{
                      //   pointerEvents: values?.credit_terms
                      // }}
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
                  {/* Country */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 required">Country</span>
                    <div className="form__form-group-field">
                      <FormikModernSelect options={countryOptions} name="country" placeholder="Country" />
                    </div>
                  </div>
                  {/* CIty */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 ">City</span>
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
                    <span className="form__form-group-label col-lg-2" />
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
                      <FormikModernField
                        name="account_payee"
                        disabled
                        type="text"
                        placeholder="Account Payee"
                      />
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
                        disabled
                        placeholder="Currency"
                      />
                    </div>
                  </div>
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2">Account Default</span>
                    <div className="form__form-group-field">
                      <FormikModernSelect
                        options={bankAccountOptions}
                        name="account_default"
                        placeholder="Account Default"
                        onChange={value => handleChangeBank(setFieldValue, value)}
                      />
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
                      <span className="form__form-group-label col-lg-2">Accout Number</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="account_number" type="text" placeholder="Account Number" />
                      </div>
                    </div>
                  </div>
                  {/* Account Detail,Vat Reverse and radio Button */}
                  <div className="form__form-group col-md-6 row p-0 m-0">
                    <span className="form__form-group-label col-lg-2" />
                    {/* Swift Code */}
                    <div className="form__form-group ">
                      <span className="form__form-group-label col-lg-2">Swift Code</span>
                      <div className="form__form-group-field">
                        <FormikModernField name="swift_code" type="number" placeholder="Swift Code" />
                      </div>
                    </div>
                    <div className="form__form-group ">
                      <span className="form__form-group-label col-lg-2">VAT Reverse Charges</span>
                      <div className="form__form-group-field">
                        <FormikModernField
                          name="vat_number"
                          type="number"
                          placeholder="VAT Reverse Charges"
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2" />
                      <div className="form__form-group-field">
                        <CheckBoxField
                          setFieldValue={setFieldValue}
                          name="is_import_agent"
                          label="Supplier is Important Agent"
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label col-lg-2" />
                      <div className="form__form-group-field">
                        <CheckBoxField name="is_reverse_charge" label="VAT Reverse Charges" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* COntact Info */}
              {activeTab === supplierFormTabsList[2] && (
                <FieldArray name="supplier_contacts" component={ContactInfo} />
              )}
              {/* Comments and Notes */}
              {activeTab === supplierFormTabsList[3] && (
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
