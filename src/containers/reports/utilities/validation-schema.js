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
export const itemNameValidationSchema = { item_name: Yup.string() };
export const customerValidationSchema = { customer_id: Yup.string() };
export const accountValidationSchema = { account_name: Yup.string() };
export const accountTypeValidationSchema = { account_type: Yup.string() };
export const filterByValidationSchema = { filter_by: Yup.string() };
export const comparisonValidationSchema = { comparison: Yup.string() };
export const comparisonSpanValidationSchema = {
  number_of_periods: Yup.string()
    .when('comparison', {
      is: 'yearly',
      then: () => Yup.string().required('Number Of Period is required'),
    })
    .when('comparison', {
      is: 'monthly',
      then: () => Yup.string().required('Number Of Period is required'),
    }),
};

export const salesPersonValidationSchema = {
  sales_person: Yup.string(),
};
export const groupByValidationSchema = {
  group_by: Yup.string(),
};
export const entitiesValidationSchema = {
  entities: Yup.array(),
};

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
  ...itemNameValidationSchema,
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
export const receivableDetailCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...itemNameValidationSchema,
  ...customerValidationSchema,
});

// purchase and expenses

export const purchaseByItemCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...accountValidationSchema,
  ...comparisonValidationSchema,
  ...comparisonSpanValidationSchema,
  ...itemNameValidationSchema,
});
export const expenseDetailInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...groupByValidationSchema,
  ...entitiesValidationSchema,
});
export const expenseDetailByCategotyCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...accountTypeValidationSchema,
  ...filterByValidationSchema,
});

// sales

export const salesByItemFilterCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...itemNameValidationSchema,
});
export const salesBySalesPersonmFilterCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
  ...salesPersonValidationSchema,
});

// activity logs
export const activityLogsFilterCustomInputsValidationSchema = Yup.object({
  ...customDurationValidationSchema,
});
