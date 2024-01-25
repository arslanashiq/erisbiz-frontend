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
  custom_start_date: '',
  custom_end_date: '',
};
export const duration = {
  duration: '',
  start_date: '',
  end_date: '',
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
  ...duration,
};
export const payableSummaryInitialValues = {
  ...duration,
  ...supplierIdInitialValue,
  status: ' ',
};
export const payableDetailInitialValues = {
  ...duration,
  ...supplierIdInitialValue,
};
