import * as Yup from 'yup';

export const supplierBalanceFilterCustomInputsValidationSchema = Yup.object({
  duration: Yup.string(),
  custom_start_date: Yup.string()
    .nullable()
    .when('duration', {
      is: 'custom',
      then: () => Yup.string().required('Start Date is required'),
    }),
  custom_end_date: Yup.string()
    .nullable()
    .when('duration', {
      is: 'custom',
      then: () => Yup.string().required('End Date is required'),
    }),
  supplier_id: Yup.string(),
});

export const apAgingFilterCustomInputsValidationSchema = Yup.object({
  duration: Yup.string(),
  custom_start_date: Yup.string()
    .nullable()
    .when('duration', {
      is: 'custom',
      then: () => Yup.string().required('Start Date is required'),
    }),
  custom_end_date: Yup.string()
    .nullable()
    .when('duration', {
      is: 'custom',
      then: () => Yup.string().required('End Date is required'),
    }),
  supplier_id: Yup.string(),
  date_type: Yup.string(),
});
