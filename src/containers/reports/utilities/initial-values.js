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

export const supplierBalanceInitialValues = {
  duration: '',
  custom_start_date: '',
  custom_end_date: '',
  supplier_id: '',
};

export const apAgingInitialValues = {
  ...supplierBalanceInitialValues,
  date_type: '',
};
