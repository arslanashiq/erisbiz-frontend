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
export const customerValidationSchema = { customer_id: Yup.string() };

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
  ...customDurationValidationSchema,
});

export const payableSummaryFilterCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...supplierValidationSchema,
  status: Yup.string(),
});
export const payableDetailFilterCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...supplierValidationSchema,
});

// receivables
export const customerbalanceCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...customerValidationSchema,
});
export const arAgingSummaryCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...customerValidationSchema,
  date_type: Yup.string(),
});
export const receivableSummaryCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...customerValidationSchema,
  status: Yup.string(),
});
