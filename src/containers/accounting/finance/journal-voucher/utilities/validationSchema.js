import * as Yup from 'yup';

export const journalVoucherValidationSchema = Yup.object({
  journal_num: Yup.number('Must be a number').required('Required'),
  reference_num: Yup.string().required('Reference No is required'),
  journal_date: Yup.date('Required').required('Required'),
  notes: Yup.string(),
  remarks: Yup.string(),
  total: Yup.number().min(0),

  journal_items: Yup.array().of(
    Yup.object({
      chart_of_account: Yup.string().required('Account is required'),
      debit: Yup.number('Must be a number').min(0, 'Must be greater than 0').required('Required'),
      credit: Yup.number('Must be a number').min(0, 'Must be greater than 0').required('Required'),
      description: Yup.string(),
    })
  ),
});

export const test = '';
