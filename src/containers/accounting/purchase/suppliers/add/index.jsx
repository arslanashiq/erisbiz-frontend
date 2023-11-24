import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldArray, Form, Formik } from 'formik';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Card, CardContent } from '@mui/material';
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
// utils ,components and hooks
import useListOptions from 'custom-hooks/useListOptions';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import { supplierFormTabsList } from '../utilities/constants';
import { supplierInitialValues } from '../utilities/constant';
import CreditTermsRadioButtons from './components/CreditTermsRadioButtons';
import { supplierFormValidationSchema } from '../utilities/custom-hooks/validation-schema';
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
    useGetSingleSupplierQuery,
    null,
    true
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
        <Formik
          enableReinitialize
          validationSchema={supplierFormValidationSchema}
          initialValues={supplierFormInitialValues}
          onSubmit={handleSubmitForm}
        >
          {({ values, setFieldValue }) => (
            <Form className="form form--horizontal row pt-3">
              <FormikField
                name="supplier_name"
                type="text"
                isRequired
                placeholder="Supplier Name"
                onChange={value => {
                  setFieldValue('account_payee', value);
                }}
                label="Supplier Name"
                startIcon={<PersonOutlineIcon />}
              />

              <FormikField
                name="contact_person"
                type="text"
                placeholder="Contact Person"
                startIcon={<SettingsPhoneIcon />}
                label="Contact Person"
              />

              <FormikField
                name="website"
                type="text"
                placeholder="Website"
                startIcon={<LanguageIcon />}
                label="Website"
              />

              <FormikField
                name="email"
                type="text"
                placeholder="Email"
                startIcon={<AlternateEmailIcon />}
                label="Email"
                isRequired
              />
              <FormikField name="mobile_num" type="text" placeholder="Contact" label="Contact" />

              <FormikField name="reference_num" type="text" placeholder="Reference" label="Reference" />

              <FormTabs
                className="mt-2 mb-2"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabsList={supplierFormTabsList}
              />

              {activeTab === supplierFormTabsList[0] && (
                <Box className="row form form--horizontal">
                  <Box className="col-md-6">
                    <FormikField
                      name="address_line1"
                      type="text"
                      placeholder="Address Line 1"
                      label="Address Line 1"
                      className="col-12"
                    />

                    <FormikField
                      className="col-12"
                      name="address_line2"
                      type="text"
                      placeholder="Address Line 2"
                      label="Address Line 2"
                    />

                    <FormikSelect
                      className="col-12"
                      options={countryOptions}
                      name="country"
                      placeholder="Country"
                      label="Country"
                    />

                    <FormikField name="city" type="text" placeholder="City" label="City" className="col-12" />
                    <Box className="form__form-group col-12">
                      <span className="form__form-group-label col-lg-2 required">Map</span>
                      <Box className="form__form-group-field">
                        <FormikField name="longitude" placeholder="Longitude" className="col pe-2" />

                        <FormikField name="latitude" type="text" placeholder="Latitude" className="col" />
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-md-6">
                    <Box className="form__form-group col-12">
                      <span className="form__form-group-label  col-lg-2" />
                      <Box className="row w-100 p-0">
                        <Box className="form__form-group-field col-12">
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
                        </Box>
                        <CheckBoxField
                          name="credit_terms"
                          value={values.credit_terms}
                          onChange={e => {
                            setFieldValue(e?.target?.name, e?.target?.checked);
                            setFieldValue('set_credit_terms', '');
                            setFieldValue('days_after_invoice', 0);
                          }}
                          label="Set Credit Terms"
                        />
                      </Box>
                    </Box>
                    <Box className="form__form-group p-0 w-100">
                      <span className="form__form-group-label col-lg-2" />
                      <Box
                        disabled={!values?.credit_terms}
                        style={{
                          pointerEvents: values?.credit_terms ? 'auto' : 'none',
                          opacity: values?.credit_terms ? 1 : 0.2,
                        }}
                        className="form__form-group-field w-100"
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
              {activeTab === supplierFormTabsList[1] && (
                <Box className="row form form--horizontal">
                  <Box className="col-6">
                    <FormikField
                      name="account_payee"
                      disabled
                      type="text"
                      placeholder="Account Payee"
                      label="Account Payee"
                      className="col-12"
                    />
                    <FormikField name="IBAN" placeholder="IBAN" label="IBAN" disabled className="col-12" />
                    <FormikField
                      name="account_number"
                      type="text"
                      placeholder="Account Number"
                      label="Account Number"
                      disabled
                      className="col-12"
                    />
                    <FormikField
                      name="vat_number"
                      type="number"
                      placeholder="VAT Reverse Charges"
                      label="VAT Reverse Charges"
                      className="col-12"
                    />
                  </Box>
                  <Box className="col-6">
                    <FormikSelect
                      options={bankAccountOptions}
                      name="account_default"
                      isRequired
                      placeholder="Account Default"
                      label="Account Default"
                      onChange={value => handleChangeBank(setFieldValue, value)}
                      className="col-12"
                    />

                    <FormikField
                      className="col-12"
                      name="bank_name"
                      placeholder="Bank Name"
                      label="Bank Name"
                      disabled
                    />
                    <FormikField
                      name="swift_code"
                      type="number"
                      placeholder="Swift Code"
                      label="Swift Code"
                      disabled
                      className="col-12"
                    />
                    <Box className="form__form-group align-items-center">
                      <span className="form__form-group-label col-lg-3 " />

                      <CheckBoxField
                        name="is_import_agent"
                        label="Supplier is Important Agent"
                        className="justify-content-end"
                      />
                    </Box>
                    <Box className="form__form-group align-items-center">
                      <span className="form__form-group-label col-lg-3 " />

                      <CheckBoxField name="is_reverse_charge" label="VAT Reverse Charges" />
                    </Box>
                  </Box>
                </Box>
              )}
              {activeTab === supplierFormTabsList[2] && (
                <FieldArray name="supplier_contacts" component={ContactInfo} />
              )}
              {activeTab === supplierFormTabsList[3] && (
                <Box className="row form form--horizontal">
                  <FormikField
                    name="comments_on_transactions"
                    type="text"
                    textArea
                    placeholder="comment"
                    label="Comment on Transaction"
                    className="col-12"
                  />
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

export default SupplierAddPage;
