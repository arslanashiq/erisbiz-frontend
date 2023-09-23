import React, { useMemo } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// services
import { useGetBankAccountsListQuery } from 'services/private/banking';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import 'styles/form/form.scss';

function AddJournalVoucher() {
  const bankAccountResponse = useGetBankAccountsListQuery();
  const { optionsList: bankAccountOptions } = useListOptions(
    bankAccountResponse?.data?.results,
    {
      value: 'chart_of_account',
      label: 'bank_account_name',
    },
    ['swift_code', 'bank_name', 'account_number', 'IBAN']
  );

  const quotationItemsList = useMemo(
    () => [
      {
        name: 'chart_of_account',
        placeholder: 'Account',
        isSelect: true,
        options: bankAccountOptions || [],
        width: '35%',
      },

      {
        name: 'description',
        placeholder: 'Description',
        type: 'number',
      },
      {
        name: 'debit',
        placeholder: 'Debit',
        type: 'number',
      },
      {
        name: 'credit',
        placeholder: 'Credit',
        type: 'number',
      },
    ],
    [bankAccountOptions]
  );

  return (
    <SectionLoader options={[bankAccountResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Journal Voucher" />
          <Formik
            enableReinitialize
            initialValues={{ journal_item: [{}, {}] }}
            // validationSchema={bankFormValidationSchema}
            // onSubmit={async (values, { setErrors }) => {}}
          >
            <Form className="form form--horizontal mt-3 row">
              <FormikField
                name="reference_num"
                type="text"
                disabled
                placeholder="Reference Number"
                startIcon={<TagIcon />}
                label="Reference NO "
              />

              <FormikDatePicker
                name="date"
                type="text"
                placeholder="Date"
                label="Date"
                startIcon={<CalendarMonthIcon />}
              />

              <FormikField name="journal_num" type="text" placeholder="Journal Number" label="Journal No" />
              <FormikField
                name="last_journal_num"
                type="text"
                placeholder="Last Journal Number"
                label="Last Journal No"
              />

              <FormikSelect options={[]} name="currency" placeholder="Currency" label="Currency" />
              <FormikField name="note" placeholder="Note" label="Note" />

              <FieldArray
                name="journal_item"
                render={props => <PurchaseItem inputList={quotationItemsList} {...props} />}
              />

              {/* Remarks */}
              <FormikField
                name="remarks"
                textArea
                placeholder="Remarks"
                label="Remarks"
                className="col-12 mt-4"
              />
              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddJournalVoucher;
