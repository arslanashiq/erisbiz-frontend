import { AgingByList } from './constants';

export const payableReportsFilterInputList = [
  {
    label: 'Start Date',
    isDate: true,
    name: 'start_date',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
  },
];
export const userStatementCustomFilterInputList = [
  {
    label: 'Start Date',
    name: 'custom_start_date',
    labelClassName: '',
    className: 'w-100 pe-2',
    isDate: true,
    fullWidth: false,
  },
  {
    label: 'End Date',
    isDate: true,
    name: 'custom_end_date',
    labelClassName: '',
    className: 'w-100',
    fullWidth: false,
  },
];

export const selectRangeInput = {
  label: 'Select Date',
  name: 'start_date',
  labelClassName: '',
  className: 'w-100',
  isRequired: true,
  isDate: true,
  fullWidth: true,
  hidden: true,
};
export const startDateInput = {
  label: 'Start Date',
  name: 'start_date',
  labelClassName: '',
  className: 'w-100',
  isDate: true,
  isRequired: true,
  fullWidth: false,
  hidden: true,
};
export const endDateInput = {
  label: 'End Date',
  name: 'end_date',
  labelClassName: '',
  className: 'w-100 ps-2',
  isDate: true,
  isRequired: true,
  fullWidth: false,
  hidden: true,
};
export const customStartDateInput = {
  label: 'Start Date',
  name: 'custom_start_date',
  labelClassName: '',
  className: 'w-100',
  isDate: true,
  isRequired: true,
  fullWidth: false,
  hidden: true,
};
export const customEndDateInput = {
  label: 'End Date',
  name: 'custom_end_date',
  labelClassName: '',
  className: 'w-100 ps-2',
  isDate: true,
  isRequired: true,
  fullWidth: false,
  hidden: true,
};

export const agingByInput = {
  label: 'Aging By',
  name: 'date_type',
  labelClassName: '',
  className: 'w-100',
  options: AgingByList,
  fullWidth: true,
};
