import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';

export const PayableReportFilterInitialValues = {
  start_date: moment().startOf('year').format(DATE_FORMAT),
  end_date: moment().format(DATE_FORMAT),
};
export const userStatementCustomFilterInitialValues = {
  start_date: moment().startOf('year').format(DATE_FORMAT),
  end_date: moment().format(DATE_FORMAT),
};

// common initial Values
export const customDuration = {
  duration: '',
  custom_start_date: moment().format(DATE_FORMAT),
  custom_end_date: moment().format(DATE_FORMAT),
};
export const duration = {
  duration: '',
  start_date: moment().format(DATE_FORMAT),
  end_date: moment().format(DATE_FORMAT),
};
export const supplierIdInitialValue = {
  supplier_id: '',
};
export const customerIdInitialValue = {
  customer_id: '',
};
export const itemNameInitialValue = {
  item_name: '',
};
export const comparisonInitialValue = {
  comparison: '',
};
export const comparisonSpanInitialValue = {
  number_of_periods: '',
};

export const chartOfAccountNameInitialValue = {
  coa_name: '',
};
export const salesPersonInitialValue = {
  sales_person: '',
};
export const groupByInitialValue = {
  group_by: '',
};
export const entitiesInitialValue = {
  entities: [],
};
export const supplierBalanceInitialValues = {
  ...customDuration,
  ...supplierIdInitialValue,
};

// payables
export const apAgingInitialValues = {
  ...supplierBalanceInitialValues,
  date_type: '',
};
export const payablePurchaseOrderDetailInitialValues = {
  ...customDuration,
};
export const payableSummaryInitialValues = {
  ...customDuration,
  ...supplierIdInitialValue,
  status: '',
};
export const payableDetailInitialValues = {
  ...customDuration,
  ...supplierIdInitialValue,
};

// receivables

export const customerBalanceInitialValues = {
  ...customDuration,
  ...customerIdInitialValue,
};
export const arAgingSummaryInitialValues = {
  ...customerBalanceInitialValues,
  date_type: '',
};
export const receivableSummaryInitialValues = {
  ...customDuration,
  ...customerIdInitialValue,
  status: '',
};

// purchase and expenses
export const purchaseByItemInitialValues = {
  ...customDuration,
  ...comparisonInitialValue,
  ...comparisonSpanInitialValue,
  ...chartOfAccountNameInitialValue,
  ...itemNameInitialValue,
};
export const expenseDetailInitialValues = {
  ...customDuration,
  ...groupByInitialValue,
  ...entitiesInitialValue,
};

// sales

export const salesByItemInitialValues = {
  ...customDuration,
  ...itemNameInitialValue,
};
export const salesBySalePersonInitialValues = {
  ...customDuration,
  ...salesPersonInitialValue,
};
