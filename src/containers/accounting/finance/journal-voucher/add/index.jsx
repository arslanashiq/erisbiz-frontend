import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import TagIcon from '@mui/icons-material/Tag';
import { FieldArray, Form, Formik } from 'formik';
import { Card, CardContent } from '@mui/material';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// services
import { useGetBankAccountsListQuery } from 'services/private/banking';
import {
  useAddJournalVoucherMutation,
  useEditJournalVoucherMutation,
  useGetLatestJournalVoucherQuery,
  useGetSingleJournalVoucherQuery,
} from 'services/private/journal-voucher';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormHeader from 'shared/components/form-header/FormHeader';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
import { journalVoucherInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';
import { journalVoucherValidationSchema } from '../utilities/validationSchema';

function AddJournalVoucher() {
  const navigate = useNavigate();
  const { id } = useParams();
  const bankAccountResponse = useGetBankAccountsListQuery();
  const latestJournalVoucher = useGetLatestJournalVoucherQuery();

  const [addJournalVoucher] = useAddJournalVoucherMutation();
  const [editJournalVoucher] = useEditJournalVoucherMutation();

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
        type: 'text',
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
  const { initialValues, setInitialValues } = useInitialValues(
    journalVoucherInitialValues,
    useGetSingleJournalVoucherQuery,
    null,
    true,
    true
  );

  useEffect(() => {
    if (!id) {
      if (latestJournalVoucher?.data?.latest_num) {
        setInitialValues({
          ...initialValues,
          journal_num: latestJournalVoucher.data.latest_num + 1,
          last_journal_num: latestJournalVoucher.data.latest_num,
        });
      } else {
        setInitialValues({
          ...initialValues,
          journal_num: 1,
          last_journal_num: '',
        });
      }
    }
  }, [latestJournalVoucher]);
  useEffect(() => {
    if (initialValues.journal_num > 1000 && !initialValues.last_journal_num) {
      setInitialValues({ ...initialValues, last_journal_num: initialValues.journal_num - 1 });
    }
  }, [initialValues]);

  return (
    <SectionLoader options={[latestJournalVoucher.isLoading, bankAccountResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Journal Voucher" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={journalVoucherValidationSchema}
            onSubmit={async (values, { setErrors }) => {
              let totalCreditDebit = 0;
              values.journal_items.forEach(item => {
                totalCreditDebit += item.credit;
              });
              const payload = { ...values, total: totalCreditDebit };
              let response = null;
              if (id) {
                response = await editJournalVoucher({ id, payload });
              } else {
                response = await addJournalVoucher(payload);
              }
              if (response.error) {
                setErrors(response.error.data);
                return;
              }
              navigate(-1);
            }}
          >
            <Form className="form form--horizontal mt-3 row">
              <FormikField
                name="reference_num"
                type="text"
                placeholder="Reference Number"
                startIcon={<TagIcon />}
                label="Reference NO "
              />

              <FormikDatePicker
                name="journal_date"
                type="text"
                placeholder="Date"
                label="Date"
                startIcon={<CalendarMonthIcon />}
              />

              <FormikField
                disabled
                name="journal_num"
                type="text"
                placeholder="Journal Number"
                label="Journal No"
              />
              <FormikField
                disabled
                name="last_journal_num"
                type="text"
                placeholder="Last Journal Number"
                label="Last Journal No"
              />

              <FormikField name="notes" placeholder="Note" label="Note" className="col-12" />

              <FieldArray
                name="journal_items"
                render={props => (
                  <PurchaseItem
                    inputList={quotationItemsList}
                    newList={{
                      chart_of_account: 0,
                      debit: 0,
                      credit: 0,
                      description: '',
                    }}
                    showItemsAmount={false}
                    {...props}
                  />
                )}
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
