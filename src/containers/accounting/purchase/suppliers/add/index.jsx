import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
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
// import { useGetBankAccountsListQuery } from 'services/private/banking';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormTabs from 'shared/components/tabs/FormTabs';
import { CheckBoxField } from 'shared/components/form/CheckBox';
import FormikSelect from 'shared/components/form/FormikSelect';
import ContactInfo from 'shared/components/form/ContactInfo';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
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
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(supplierFormTabsList[0]);

  const countriesListResponse = useGetAllCountriesListQuery();
  // const bankAccountResponse = useGetBankAccountsListQuery();
  const latestTransactionNumber = useGetLatestTransactionNumberQuery({}, { refetchOnMountOrArgChange: true });

  const [addSupplier] = useAddSupplierMutation();
  const [editSupplier] = useEditSupplierMutation();

  const { initialValues: supplierFormInitialValues } = useInitialValues(
    supplierInitialValues,
    useGetSingleSupplierQuery,
    null,
    true
  );
  const { optionsList: countryOptions } = useListOptions(countriesListResponse?.data?.data, {
    value: 'iso2',
    label: 'country',
  });
  // const { optionsList: bankAccountOptions } = useListOptions(
  //   bankAccountResponse?.data?.results,
  //   {
  //     value: 'chart_of_account',
  //     label: 'bank_account_name',
  //   },
  //   ['swift_code', 'bank_name', 'account_number', 'IBAN']
  // );

  // const handleChangeBank = (setFieldValue, value) => {
  //   const selectedBank = bankAccountOptions.filter(account => value === account.value)[0];
  //   setFieldValue('swift_code', selectedBank.swift_code);
  //   setFieldValue('bank_name', selectedBank.bank_name);
  //   setFieldValue('account_number', selectedBank.account_number);
  //   setFieldValue('IBAN', selectedBank.IBAN);
  // };
  const handleSubmitForm = useCallback(
    async (values, { setSubmitting, setErrors }) => {
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
      if (response.erorr) {
        setErrors(response.error.data);
        return;
      }
      if (location?.state?.backUrl) {
        navigate(location.state.backUrl, { state: { initialValues: { supplier: response.data.id } } });
        return;
      }

      navigate(-1);

      setSubmitting(false);
    },
    [latestTransactionNumber]
  );

  const updatedSupplierInitialValues = useMemo(() => {
    let updatedValues = supplierFormInitialValues;
    if (supplierFormInitialValues?.set_credit_limit > 0) {
      updatedValues = { ...updatedValues, credit_limit: true };
    }
    if (supplierFormInitialValues?.set_credit_terms) {
      updatedValues = { ...updatedValues, credit_terms: true };
    }

    return updatedValues;
  }, [id, supplierFormInitialValues]);
  return (
    <Card>
      <CardContent>
        <FormHeader title="Supplier Master" />
        <Formik
          enableReinitialize
          validationSchema={supplierFormValidationSchema}
          initialValues={updatedSupplierInitialValues}
          onSubmit={handleSubmitForm}
        >
          {({ values, setFieldValue }) => (
            <Form className="form form--horizontal row">
              <FormikField
                name="supplier_name"
                type="text"
                isRequired
                //  placeholder="Supplier Name"
                label="Supplier Name"
                startIcon={<PersonOutlineIcon />}
              />

              <FormikField
                name="contact_person"
                type="text"
                //  placeholder="Contact Person"
                label="Contact Person"
                startIcon={<PersonOutlineIcon />}
              />

              <FormikField
                name="website"
                type="text"
                //  placeholder="Website"
                startIcon={<LanguageIcon />}
                label="Website"
              />

              <FormikField
                name="email"
                type="text"
                //  placeholder="Email"
                startIcon={<AlternateEmailIcon />}
                label="Email"
                isRequired
              />
              <FormikField
                name="mobile_num"
                type="text"
                startIcon={<SettingsPhoneIcon />}
                //  placeholder="Contact"
                label="Contact"
              />

              <FormikField
                name="reference_num"
                type="text"
                //  placeholder="VAT Reg No"
                label="VAT Reg No"
              />

              <FormTabs
                className="mt-3 mb-4"
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
                      //  placeholder="Address 1"
                      label="Address 1"
                      className="col-12"
                    />

                    <FormikField
                      className="col-12"
                      name="address_line2"
                      type="text"
                      //  placeholder="Address 2"
                      label="Address 2"
                    />

                    <FormikSelect
                      className="col-12"
                      options={countryOptions}
                      name="country"
                      //  placeholder="Country"
                      label="Country"
                    />

                    <FormikField
                      name="city"
                      type="text"
                      //  placeholder="City"
                      label="City"
                      className="col-12"
                    />
                    <Box className="form__form-group col-12 mb-0">
                      <span className="form__form-group-label col-lg-2">Map</span>
                      <Box className="form__form-group-field">
                        <FormikField
                          name="longitude"
                          //  placeholder="Longitude"
                          className="col pe-2"
                        />

                        <FormikField
                          name="latitude"
                          type="text"
                          // placeholder="Latitude"
                          className="col"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-md-6 row ">
                    <FormikField name="opening_balance" className="col-6" label="Opening Balance" />
                    <FormikSelect
                      name="is_credit"
                      options={[
                        { label: 'Credit', value: true },
                        { label: 'Debit', value: false },
                      ]}
                      className="col-3"
                    />
                    <FormikDatePicker name="opening_balance_date" className="col-3" />

                    <Box sx={{ minHeight: '212px' }}>
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
                              label="Set Credit Limit"
                            />

                            <FormikField
                              disabled={!values?.credit_limit}
                              className="col-4"
                              name="set_credit_limit"
                              type="number"
                              //  placeholder="0.00"
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
                </Box>
              )}
              {activeTab === supplierFormTabsList[1] && (
                <Box className="row form form--horizontal">
                  <Box className="col-6">
                    <FormikField
                      className="col-12"
                      name="bank_name"
                      //  placeholder="Bank Name"
                      label="Bank Name"
                    />
                    <FormikField
                      name="branch_name"
                      type="text"
                      //  placeholder="Account Number"
                      label="Branch Name"
                      className="col-12"
                    />

                    <FormikField
                      name="swift_code"
                      type="number"
                      //  placeholder="Swift Code"
                      label="Swift Code"
                      className="col-12"
                    />

                    {values.is_reverse_charge && (
                      <FormikField
                        name="vat_number"
                        disabled={!values.is_reverse_charge}
                        type="number"
                        //  placeholder="VAT Reverse Charges"
                        label="VAT Reverse Charges"
                        className="col-12"
                      />
                    )}
                  </Box>
                  <Box className="col-6">
                    <FormikField
                      name="account_number"
                      type="number"
                      //  placeholder="Account Number"
                      label="Account Number"
                      className="col-12"
                    />
                    <FormikField
                      name="IBAN"
                      //  placeholder="IBAN"
                      label="IBAN"
                      className="col-12"
                    />
                    <FormikField
                      name="account_payee"
                      type="text"
                      //  placeholder="Account Payee"
                      label="Account Payee"
                      className="col-12"
                    />
                    {/* <FormikSelect
                      options={bankAccountOptions}
                      name="account_default"
                      isRequired
                      //  placeholder="Account Default"
                      label="Account Default"
                      // onChange={value => handleChangeBank(setFieldValue, value)}
                      className="col-12"
                    /> */}

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

                      <CheckBoxField
                        onChange={() => {
                          setFieldValue('vat_number', '');
                        }}
                        name="is_reverse_charge"
                        label="VAT Reverse Charges"
                      />
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
                    //  placeholder="Comment"
                    label="Comment on Transaction"
                    className="col-12"
                  />
                  <FormikField
                    name="notes"
                    type="text"
                    textArea
                    //  placeholder="Notes"
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
