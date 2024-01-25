import * as Yup from 'yup';

// common schema
export const customDurationValidationSchema = {
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
};
export const durationValidationSchema = {
  duration: Yup.string(),
  start_date: Yup.string()
    .nullable()
    .when('duration', {
      is: 'custom',
      then: () => Yup.string().required('Start Date is required'),
    }),
  end_date: Yup.string()
    .nullable()
    .when('duration', {
      is: 'custom',
      then: () => Yup.string().required('End Date is required'),
    }),
};
export const supplierValidationSchema = { supplier_id: Yup.string() };

// payables validation schema
export const supplierBalanceFilterCustomInputsValidationSchema = Yup.object({
  ...supplierValidationSchema,
});

export const apAgingFilterCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...supplierValidationSchema,
  date_type: Yup.string(),
});

export const payablePurchaseOrderFilterCustomInputsValidationSchema = Yup.object({
  ...durationValidationSchema,
});

export const payableSummaryFilterCustomInputsValidationSchema = Yup.object({
  ...durationValidationSchema,
  ...supplierValidationSchema,
  status: Yup.string(),
});
export const payableDetailFilterCustomInputsValidationSchema = Yup.object({
  ...durationValidationSchema,
  ...supplierValidationSchema,
});
