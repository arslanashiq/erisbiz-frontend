import React, { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import TagIcon from '@mui/icons-material/Tag';
import { FieldArray } from 'formik';
import { Card, CardContent } from '@mui/material';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// services
import {
  useAddJournalVoucherMutation,
  useEditJournalVoucherMutation,
  useGetLatestJournalVoucherQuery,
  useGetSingleJournalVoucherQuery,
} from 'services/private/journal-voucher';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormHeader from 'shared/components/form-header/FormHeader';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
// containers
import FormikWrapper from 'containers/common/form/FormikWrapper';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
import { journalVoucherInitialValues } from '../utilities/initialValues';
import { journalVoucherValidationSchema } from '../utilities/validationSchema';

function AddJournalVoucher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const bankAccountResponse = useGetChartOfAccountListQuery();
  const latestJournalVoucher = useGetLatestJournalVoucherQuery();

  const [addJournalVoucher] = useAddJournalVoucherMutation();
  const [editJournalVoucher] = useEditJournalVoucherMutation();

  const { optionsList: bankAccountOptions } = useListOptions(bankAccountResponse?.data?.results, {
    value: 'id',
    label: 'account_name',
  });

  const { initialValues } = useInitialValues(
    journalVoucherInitialValues,
    useGetSingleJournalVoucherQuery,
    null,
    true,
    true
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
  const updatedJournalInitialValues = useMemo(() => {
    let newData = { ...initialValues };
    if (!id) {
      if (latestJournalVoucher?.data?.latest_num) {
        newData = {
          ...newData,
          journal_num: latestJournalVoucher.data.latest_num + 1,
          last_journal_num: latestJournalVoucher.data.latest_num,
        };
      } else {
        newData = {
          ...newData,
          journal_num: 1000,
          last_journal_num: '',
        };
      }
    }
    if (initialValues.journal_num > 1000 && !initialValues.last_journal_num) {
      newData = { ...newData, last_journal_num: initialValues.journal_num - 1 };
    }
    return newData;
  }, [initialValues, latestJournalVoucher]);

  const handleSubmitForm = useCallback(async (values, { setErrors, resetForm }) => {
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
    if (values.save_and_continue) {
      resetForm();
      return;
    }
    navigate(-1);
  }, []);

  return (
    <SectionLoader options={[latestJournalVoucher.isLoading, bankAccountResponse.isLoading]}>
      <Card>
        <CardContent>
          <FormHeader title="Journal Voucher" />
          <FormikWrapper
            initialValues={updatedJournalInitialValues}
            validationSchema={journalVoucherValidationSchema}
            onSubmit={handleSubmitForm}
          >
            <FormikField
              name="reference_num"
              type="text"
              //  placeholder="Reference Number"
              startIcon={<TagIcon />}
              label="Reference NO "
              isRequired
            />

            <FormikDatePicker
              name="journal_date"
              type="text"
              //  placeholder="Date"
              label="Date"
              startIcon={<CalendarMonthIcon />}
            />

            <FormikField
              disabled
              name="journal_num"
              type="text"
              //  placeholder="Journal Number"
              label="Journal No"
            />
            <FormikField
              disabled
              name="last_journal_num"
              type="text"
              //  placeholder="Last Journal Number"
              label="Last Journal No"
            />

            <FormikField
              name="notes"
              //  placeholder="Note"
              label="Note"
              className="col-12"
            />

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
                  minRequiredItems={2}
                  showItemsAmount={false}
                  {...props}
                />
              )}
            />

            <FormikField
              name="remarks"
              textArea
              //  placeholder="Remarks"
              label="Remarks"
              className="col-12 mt-4"
            />
            <FormSubmitButton />
          </FormikWrapper>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default AddJournalVoucher;
