import React from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';

// srvices
import { useGetSingleReceiptVoucherQuery } from 'services/private/receipt-voucher';
import { useGetCustomersListQuery } from 'services/private/customers';
import { useGetBankAccountsListQuery } from 'services/private/banking';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import UnPaidBillsList from 'containers/accounting/purchase/payment-voucher/add/components/UnPaidBillsList';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { PAYMENT_MODE } from 'utilities/constants';
import 'styles/form/form.scss';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import { receiptVoucherInitialValues } from '../utilities/initialValues';

function AddReceiptVoucher() {
  const customerListResponse = useGetCustomersListQuery();
  const bankAccountListResponse = useGetBankAccountsListQuery();

  const { optionsList: customersOptions } = useListOptions(customerListResponse?.data?.results, {
    value: 'id',
    label: 'customer_name',
  });

  const { optionsList: bankAccountOptions } = useListOptions(bankAccountListResponse?.data?.results, {
    value: 'chart_of_account',
    label: 'bank_account_name',
  });
  const { initialValues } = useInitialValues(receiptVoucherInitialValues, useGetSingleReceiptVoucherQuery);

  return (
    <SectionLoader>
      <Card>
        <CardContent>
          <FormHeader title="Receipt Voucher" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
          >
            <Form className="form form--horizontal mt-3 row">
              <FormikSelect
                options={customersOptions}
                name="customer"
                placeholder="Customer"
                label="Customer"
              />

              <FormikDatePicker
                name="date"
                type="text"
                placeholder="Date"
                label="Date"
                startIcon={<CalendarMonthIcon />}
              />

              <FormikField
                name="payment_number"
                type="number"
                placeholder="Payment Number"
                label="Payment Number"
              />
              <FormikField
                name="last_payment_number"
                type="number"
                disabled
                placeholder="Last Payment Number"
                label="Last Payment"
              />
              <FormikField
                name="amount"
                type="number"
                placeholder="Amount"
                label="Amount"
                startIcon={<TagIcon />}
              />

              <FormikField name="reference_num" type="text" placeholder="Reference" label="Reference" />
              <FormikSelect
                name="payment_mode"
                placeholder="Payment Mode"
                label="Payment Mode"
                options={PAYMENT_MODE}
              />

              <FormikSelect
                name="chart_of_account_id"
                placeholder="Deposit To"
                label="Deposit To"
                options={bankAccountOptions}
              />

              {/* Item detail */}
              <FieldArray name="bill_payments" render={props => <UnPaidBillsList {...props} />} />

              {/* Remarks */}
              <FormikField name="remarks" textArea placeholder="Remarks" label="Remarks" className="col-12" />

              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddReceiptVoucher;
