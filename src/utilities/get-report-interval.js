import moment from 'moment';
import { DATE_FILTER_REPORT } from './constants';

export const getReportInterval = (startDate, endDate) => {
  const tempStartDate = moment(startDate).format(DATE_FILTER_REPORT);
  const tempEndDate = moment(endDate).format(DATE_FILTER_REPORT);
  let interval = `From ${tempStartDate} To ${tempEndDate}`;
  if (tempStartDate === tempEndDate) {
    interval = `As of ${tempEndDate}`;
  }

  return {
    timeInterval: interval,
    startDate: tempStartDate,
    endDate: tempEndDate,
  };
};

export const test = '';
