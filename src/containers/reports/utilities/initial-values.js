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
  status: ' ',
};
export const payableDetailInitialValues = {
  ...customDuration,
  ...supplierIdInitialValue,
};
