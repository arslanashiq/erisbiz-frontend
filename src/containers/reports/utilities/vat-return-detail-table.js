/* eslint-disable max-len */

import { vatReturnDetailTableCellStyle } from './head-cells';

export const vatReturnDetailTable1Body = [
  {
    style: vatReturnDetailTableCellStyle,
    num: '1a',
    type: 'sales',
    place: 'Abu Dhabi',
    description_head: 'Standard rated supplies in Abu Dhabi',
    description_detail:
      'Total value of all standard rated goods and services (exclusive of VAT) sold in the Abu Dhabi in the current reporting period, and the VAT that was collected on their sale or adjustments to similar sales made in the previous reporting periods.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '1b',
    type: 'sales',
    place: 'Dubai',
    description_head: 'Standard rated supplies in Dubai',
    description_detail:
      'Total value of all standard rated goods and services (exclusive of VAT) sold in the Dubai in the current reporting period, and the VAT that was collected on their sale or adjustments to similar sales made in the previous reporting periods.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '1c',
    type: 'sales',
    place: 'Sharjah',
    description_head: 'Standard rated supplies in Sharjah',
    description_detail:
      'Total value of all standard rated goods and services (exclusive of VAT) sold in the Sharjah in the current reporting period, and the VAT that was collected on their sale or adjustments to similar sales made in the previous reporting periods.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '1d',
    type: 'sales',
    place: 'Ajman',
    description_head: 'Standard rated supplies in Ajman',
    description_detail:
      'Total value of all standard rated goods and services (exclusive of VAT) sold in the Ajman in the current reporting period, and the VAT that was collected on their sale or adjustments to similar sales made in the previous reporting periods.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '1e',
    type: 'sales',
    place: 'Al Quwain',
    description_head: 'Standard rated supplies in Al Quwain',
    description_detail:
      'Total value of all standard rated goods and services (exclusive of VAT) sold in the Al Quwain in the current reporting period, and the VAT that was collected on their sale or adjustments to similar sales made in the previous reporting periods.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '1f',
    type: 'sales',
    place: 'Al Khaimah',
    description_head: 'Standard rated supplies in Al Khaimah',
    description_detail:
      'Total value of all standard rated goods and services (exclusive of VAT) sold in the Al Khaimah in the current reporting period, and the VAT that was collected on their sale or adjustments to similar sales made in the previous reporting periods.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '1g',
    type: 'sales',
    place: 'Fujairah',
    description_head: 'Standard rated supplies in Fujairah',
    description_detail:
      'Total value of all standard rated goods and services (exclusive of VAT) sold in the Fujairah in the current reporting period, and the VAT that was collected on their sale or adjustments to similar sales made in the previous reporting periods.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '2',
    tax_id: 0,
    zero_rate_sales_date: true,
    type: 'sales',
    description_head: 'Zero rated supplies',
    description_detail:
      'Total value of all zero-rated goods and services sold in the current reporting period.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '3',
    tax_id: 2,
    tax_exempt_sales_data: true,
    type: 'sales',
    description_head: 'Exempt supplies',
    description_detail:
      'Total value of all exempted goods and services sold in the UAE in the current reporting period.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '4',
    tax_id: 1,
    description_head: 'Totals',
    total_sales_taxable: true,
    description_detail:
      'Total amount calculated based on all the boxes above, the total output tax due to the FTA, and the total adjustments applicable to that value for the tax period.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
];
export const vatReturnDetailTable2Body = [
  {
    style: vatReturnDetailTableCellStyle,
    num: '5',
    type: 'expense',
    standard_rated_expenses: true,
    tax_id: 1,
    description_head: 'Standard rated expenses',
    description_detail:
      'Total value of standard rated goods and services purchased (exclusive of VAT) in the UAE, the net VAT recoverable on their purchases, and adjustments to similar purchases made in the previous reporting periods.Total value of all standard rated goods and services.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '6',
    tax_id: 1,
    description_head: 'Totals',
    total_expense_taxable: true,
    description_detail:
      'Total value of supplies in expenses, VAT that is to be recovered based on them, and any adjustments made to those values. This box will be auto-populated based on Box 9 and 10.',
    taxable_amount: 'AED0.00',
    tax_amount: 'AED0.00',
  },
];

export const vatReturnDetailTable3Body = [
  {
    style: vatReturnDetailTableCellStyle,
    due_tax: true,
    num: '7',
    description_head: 'Total value of due tax for the period',
    description_detail:
      'Total value of the output tax calculated based on the sum of the VAT and adjustments columns in the outputs section.',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '8',
    recoverable_tax: true,
    description_head: 'Total value of recoverable tax for the period',
    description_detail:
      'Total value of the recoverable input tax calculated based on the sum of the VAT and adjustments columns in the inputs section.',
    tax_amount: 'AED0.00',
  },
  {
    style: vatReturnDetailTableCellStyle,
    num: '9',
    due_tax: true,
    description_head: 'Net VAT payable (or reclaimable) for the period',
    description_detail:
      'Net tax recoverable or payable for the current tax period. If the amount in Box 12 is greater than the amount in Box 13, you must pay the difference of these amounts. If it is lesser, you will be eligible to request a refund for the net amount of recoverable tax',
    tax_amount: 'AED0.00',
  },
];
