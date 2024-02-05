import {
  AgingByList,
  accountTypes,
  comparisonList,
  comparisonSpanDuration,
  entities,
  filterBy,
  groupBy,
  statusList,
} from './constants';

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
  displayKey: 'duration',
  displayKeyValue: ['custom'],
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
  displayKey: 'duration',
  displayKeyValue: ['custom'],
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
  displayKey: 'duration',
  displayKeyValue: ['custom'],
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
  displayKey: 'duration',
  displayKeyValue: ['custom'],
};

export const agingByInput = {
  label: 'Aging By',
  name: 'date_type',
  labelClassName: '',
  className: 'w-100',
  options: AgingByList,
  fullWidth: true,
};
export const statusInput = {
  label: 'Status',
  name: 'status',
  labelClassName: '',
  className: 'w-100',
  options: statusList,
  fullWidth: true,
};
export const comparisonInput = {
  label: 'Comparison',
  name: 'comparison',
  labelClassName: '',
  className: 'w-100',
  options: comparisonList,
  fullWidth: true,
};

export const comparisonSpanInput = {
  label: 'No of Periods',
  name: 'number_of_periods',
  labelClassName: '',
  className: 'w-100',
  options: comparisonSpanDuration,
  isRequired: true,
  fullWidth: true,
  hidden: true,
  displayKey: 'comparison',
  displayKeyValue: ['monthly', 'yearly'],
};
export const groupByInput = {
  label: 'Group By',
  name: 'group_by',
  labelClassName: '',
  className: 'w-100',
  options: groupBy,
  fullWidth: true,
};
export const filterByInput = {
  label: 'Filter By',
  name: 'filter_by',
  labelClassName: '',
  className: 'w-100',
  options: filterBy,
  fullWidth: true,
};
export const entitiesInput = {
  label: 'Entities',
  name: 'entities',
  labelClassName: '',
  className: 'w-100',
  options: entities,
  fullWidth: true,
  isMulti: true,
};
export const accountTypeInput = {
  label: 'Account Type',
  name: 'account_type',
  labelClassName: '',
  className: 'w-100',
  options: accountTypes,
  fullWidth: true,
};
