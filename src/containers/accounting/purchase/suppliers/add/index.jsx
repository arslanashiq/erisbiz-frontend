import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import LanguageIcon from '@mui/icons-material/Language';
import { Button, Card, CardContent, Stack } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
// services
import { useGetAllCountriesListQuery } from 'services/third-party/countries';
import {
  useAddSupplierMutation,
  useEditSupplierMutation,
  useGetLatestTransactionNumberQuery,
  useGetSingleSupplierQuery,
} from 'services/private/suppliers';
import { useGetBankAccountsListQuery } from 'services/private/banking';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormTabs from 'shared/components/tabs/FormTabs';
import { CheckBoxField } from 'shared/components/form/CheckBox';
import FormikSelect from 'shared/components/form/FormikSelect';
import ContactInfo from 'shared/components/form/ContactInfo';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// custom-hooks
import useListOptions from 'custom-hooks/useListOptions';
// utils
import { supplierFormTabsList } from '../utilities/constants';
import { supplierInitialValues } from '../utilities/constant';
// components
import CreditTermsRadioButtons from './components/CreditTermsRadioButtons';
import 'styles/form/form.scss';

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
  const { optionsList: countryOptions } = useListOptions(countriesListResponse?.data?.data, {
    value: 'iso2',
    label: 'country',
  });
  const { optionsList: bankAccountOptions } = useListOptions(
    bankAccountResponse?.data?.results,
    {
      value: 'chart_of_account',
      label: 'bank_account_name',
    },
    ['swift_code', 'bank_name', 'account_number', 'IBAN']
  );

  const handleChangeBank = (setFieldValue, value) => {
    const selectedBank = bankAccountOptions.filter(account => value === account.value)[0];
    setFieldValue('swift_code', selectedBank.swift_code);
    setFieldValue('bank_name', selectedBank.bank_name);
    setFieldValue('account_number', selectedBank.account_number);
    setFieldValue('IBAN', selectedBank.IBAN);
  };
  const handleSubmitForm = async (values, { setSubmitting, setErrors }) => {
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
    if (response.data) {
      navigate(-1);
    } else {
      setErrors(response.error.data);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (supplierFormInitialValues.set_credit_limit && supplierFormInitialValues.credit_limit === false) {
      setInitialValues({ ...supplierFormInitialValues, credit_limit: true });
    }
    if (supplierFormInitialValues.set_credit_terms && supplierFormInitialValues.credit_terms === false) {
      setInitialValues({ ...supplierFormInitialValues, credit_terms: true });
    }
  }, [supplierFormInitialValues]);

  return (
    <Card>
      <CardContent>
        <FormHeader title="Supplier Master" />
        <Formik enableReinitialize initialValues={supplierFormInitialValues} onSubmit={handleSubmitForm}>
          {({ values, isSubmitting, touched, resetForm, setFieldValue, errors }) => (
            <Form className="form form--horizontal row pt-3">
              {/* supplier name */}
              <FormikField
                name="supplier_name"
                type="text"
                placeholder="Supplier Name"
                onChange={value => {
                  setFieldValue('account_payee', value);
                }}
                label="Supplier Name"
                startIcon={<PersonOutlineIcon />}
              />

              {/* Refrence */}
              <FormikField name="reference_num" type="text" placeholder="Refrence" label="Refrence" />

              {/* Contact Person */}
              <FormikField
                name="contact_person"
                type="text"
                placeholder="Contact Person"
                startIcon={<SettingsPhoneIcon />}
                label="Contact Person"
              />

              {/* website */}

              <FormikField
                name="website"
                type="text"
                placeholder="Website"
                startIcon={<LanguageIcon />}
                label="Website"
              />

              {/* contact  */}
              <FormikField name="mobile_num" type="text" placeholder="Contact" label="Contact" />

              {/* email */}

              <FormikField
                name="email"
                type="text"
                placeholder="Email"
                startIcon={<AlternateEmailIcon />}
                label="Email"
              />

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

                  <FormikField
                    name="address_line1"
                    type="text"
                    placeholder="Address Line 1"
                    label="Address Line 1"
                  />

                  {/* Credit Limit */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label  col-lg-2" />
                    <div className="row">
                      <div className="form__form-group-field col-12">
                        <CheckBoxField
                          name="credit_limit"
                          onChange={e => {
                            setFieldValue('set_credit_limit', 0);
                            setFieldValue(e?.target?.name, e?.target?.checked);
                          }}
                          label="Set Credit Limit ($)"
                        />

                        <FormikField
                          disabled={!values?.credit_limit}
                          className="col-4"
                          name="set_credit_limit"
                          type="number"
                          placeholder="0.00"
                        />
                      </div>
                      <CheckBoxField
                        name="credit_terms"
                        value={values.credit_terms}
                        onChange={e => {
                          setFieldValue(e?.target?.name, e?.target?.checked);
                        }}
                        label="Set Credit Terms"
                      />
                    </div>
                  </div>
                  {/* Address Line 2 */}

                  <FormikField
                    name="address_line2"
                    type="text"
                    placeholder="Address Line 2"
                    label="Address Line 2"
                  />
                  {/* Credit Terms */}
                  <div className="form__form-group col-md-6">
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
                          setFieldValue('days_after_invoice', 0);
                          setFieldValue('set_credit_terms', value);
                        }}
                        values={values}
                        errors={errors}
                      />
                    </div>
                  </div>
                  {/* Country */}

                  <FormikSelect
                    options={countryOptions}
                    name="country"
                    placeholder="Country"
                    label="Country"
                  />

                  {/* CIty */}
                  <FormikField name="city" type="text" placeholder="City" label="City" />
                  {/* Map */}
                  <div className="form__form-group col-md-6">
                    <span className="form__form-group-label col-lg-2 required">Map</span>
                    <div className="form__form-group-field">
                      <FormikField name="longitude" placeholder="Longitude" className="w-100 pe-2" />

                      <FormikField name="latitude" type="text" placeholder="Latitude" />
                    </div>
                  </div>
                </div>
              )}
              {/* Bank And Transfer */}
              {activeTab === supplierFormTabsList[1] && (
                <div className="row form form--horizontal">
                  {/* Account Payee */}

                  <FormikField
                    name="account_payee"
                    disabled
                    type="text"
                    placeholder="Account Payee"
                    label="Account Payee"
                  />

                  {/* Currency */}

                  <FormikField name="currency" type="text" disabled placeholder="Currency" label="Currency" />

                  <FormikSelect
                    options={bankAccountOptions}
                    name="account_default"
                    placeholder="Account Default"
                    label="Account Default"
                    onChange={value => handleChangeBank(setFieldValue, value)}
                  />

                  {/* IBAN */}

                  <FormikField name="IBAN" placeholder="IBAN" label="IBAN" />

                  {/* Bank Name and Account Name */}

                  <FormikField name="bank_name" placeholder="bank Name" label="bank Name" />

                  <FormikField
                    name="account_number"
                    type="text"
                    placeholder="Account Number"
                    label="Account Number"
                  />

                  {/* Account Detail,Vat Reverse and radio Button */}

                  <FormikField name="swift_code" type="number" placeholder="Swift Code" label="Swift Code" />

                  <FormikField
                    name="vat_number"
                    type="number"
                    placeholder="VAT Reverse Charges"
                    label="VAT Reverse Charges"
                  />
                  <div className="form__form-group col-12 align-items-center">
                    <div className="col-6" />
                    <span className="form__form-group-label col-lg-3 " />

                    <CheckBoxField
                      name="is_import_agent"
                      label="Supplier is Important Agent"
                      className="justify-content-end"
                    />
                  </div>
                  <div className="form__form-group col-12 align-items-center">
                    <div className="col-6" />
                    <span className="form__form-group-label col-lg-3 " />

                    <CheckBoxField name="is_reverse_charge" label="VAT Reverse Charges" />
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
