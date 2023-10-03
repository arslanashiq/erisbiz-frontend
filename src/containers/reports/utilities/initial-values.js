import moment from 'moment';

export const PayableReportFilterInitialValues = {
  start_date: moment().startOf('year').format('YYYY-MM-DD'),
  end_date: moment().format('YYYY-MM-DD'),
};

export const test = '';
