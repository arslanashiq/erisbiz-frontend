export const activityLogsModuleName = {
  BankAccount: 'Bank Master',
  Item: 'Item Master',
  // purchase Module
  Supplier: 'Supplier Master',
  PurOrder: 'Purchase Order',
  Bill: 'Purchase Invoice',
  SupplierCredit: 'Purchase Debit Note',
  PaymentMade: 'Payment Voucher',
  // Sale
  SalesCompany: 'Customer Master',
  ProInvoice: 'Proforma Invoice',
  Invoice: 'Sale Invoice',
  PaymentReceived: 'Receipt Voucher',
  CreditNote: 'Sale Credit Note',

  // finance
  ChartOfAccount: 'Chart Of Account',
  Journal: 'Jounral Voucher',
};

export const getModuleName = name => {
  if (activityLogsModuleName[name]) {
    return activityLogsModuleName[name];
  }
  return name;
};

export const validObjectKeysNames = {
  expense_account: 'account_name',
  paid_through_account: 'account_name',
  supplier: 'supplier_name',
  // customer_info: 'customer_name',
};

export const inValidKeys = [
  'uid',
  'uuid',
  'customer_info',
  'invoice',
  'id',
  'created_by',
  'created_at',
  'created_by_employee_name',
  'currency',
  'updated_at',
  'updated_by',
  'brand_num',
  'cost_account',
  'inventory_coa',
  'sale_account',
  'cost_account_label',
  'sale_account_label',
  'inventory_coa_label',
  'item_sale_amount_prefix',
  'item_cost_amount_prefix',
  'is_active',
  'is_digital_service',
  'is_item_used',
  'is_tracking_inventory',
  'opening_stock_per_unit',
  'current_value',
  'dynamic_opening_stock',
  'dynamic_opening_stock_per_unit',
  'limit',
  // 'opening_balance',
  'is_credit',
  'transaction_num',
  'exchange_rate',
  'credit_limit',
  'credit_terms',
  'chart_of_account',
  'company',
  'category_num',
  'category_num',
  'category_order_formatted_number',
  'brand_order_formatted_number',
  'is_type_editable',
  'weighted_cost_price',
  'remaining_stock',
  'committed_stock',
  'forecast_stock',
  'supplier_id',
  'Opening Balance Date',
  'Payment Terms',
  'Currency Id',
  'Currency Symbol',
  'Have Pur Orders',
  'Have Bills',
  'Have Debit Notes',
  'Have Expenses',
  'Supplier Type',
  'Payables',
  'Is Balance Used',
  'Pur Order Id',
  'Requestor Signature Show',
  'Show Stamp',
  'Convert To Aed',
  'Discount',
  'Amount Total',
  'Amount Total Aed',
  'Vat Total',
  'Pur Order Suffix',
  'Vat Total Aed',
  'Grand Total',
  'Grand Total Aed',
  'Sub Total',
  'Chart Of Account Id',
  'Tax Rate Id',
  'Tax Rate Perc',
  'Bcy Total',
  'Bcy Tax Rate Perc',
  'Bcy Total Without Tax',
  'Is Billable',
  'Is Personal',
  'Have Quotations',
  'Have Pro Invoices',
  'Have Invoices',
  'Have Credit Notes',
  'Quotation Prefix',
  'Quotation Num',
  'Aed Conversion Rate',
  'Operation Status',
  'Exchange Rate Of Quotation Currency',
  'Exchange Rate Of Proinvoice Currency',
  'Bcy Amount Total',
  'Bcy Vat Total',
  'Bcy Grand Total',
  'Credit Applied',
  'Credit Applied Invoice Currency',
  'Payment Amount Invoice Currency',
  'Bcy Amount Total Invoice Currency',
  'Bcy Vat Total Invoice Currency',
  'Bcy Grand Total Invoice Currency',
  'Invoice Prefix',
  'Exchange Rate Of Invoice Currency',
  'Aed Amount',
  'Other Amount',
  'Last Payment Number',
  'Bcy Bank Charges',
  'Bcy Unused Amount',
  'Chart Of Account Name',
  'Over Payment',
  'Refund Payment',
  'Have Credit Note',
  'Is Payment Applied',
  'Over Paid',
  'Account Id',
  'Credit Note Records',
  'Invoice Num With Suffix',
  'Credits Remaining Creditnote Currency',
  'Refunded Amount Creditnote Currency',
  'Credits Used Creditnote Currency',
  'Bcy Amount Total Credit Currency',
  'Bcy Vat Total Credit Currency',
  'Bcy Grand Total Credit Currency',
  'Credit Note Prefix',
  'Exchange Rate Of Creditnote Currency',
  'Is Currency',
  'Is Issue',
  'Is Tax Inclusive',
  'Is Applied',
  'Is System Account',
  'Is User Created',
  'Is Watchlisted',
  'Last Journal Num',
  'Journal Notes',
  'Journal Formatted Number',
  'Is Deleted',
  'Supplier Date',
  'Bcy Discount',
  'Exchange Rate Of Purorder Currency',
  'Payment Amount Bill Currency',
  'Credit Applied Bill Currency',
  'Bcy Amount Total Bill Currency',
  'Bcy Vat Total Bill Currency',
  'optional_data',
  'Bcy Grand Total Bill Currency',
  'Customer Type Suffix',
  'bill_id',
  'Credits Remaining Debitnote Currency',
  'Refunded Amount Debitnote Currency',
  'Credits Used Debitnote Currency',
  'Bcy Amount Total Debit Currency',
  'Bcy Vat Total Debit Currency',
  'Bcy Grand Total Debit Currency',
  'Currency Code',
  'Exchange Rate Of Suppliercredit Currency',
  'G Recaptcha Response',
  'Pur Order',
  'invoice_docs',
  'expense_account_id',
  'paid_through_account_id',
  'Amount Due Invoice Currency',
  'account_code',
  // skip data testing
];
export const invalidNestedKeys = [
  'num_units',
  'Invoice Num Night',
  'Invoice Num Unit',
  'Invoice Unit Price Ex Vat',
  'Is Item Inventory',
  'Cost Price',
  'Created At',
  'Created By',
  'Id',
  'Primary Contact',
  'Supplier Id',
  'Updated At',
  'Vat Rate Perc',
  'Debit Note Item Remove',
  'currency',
  'Currency Code',
  'Currency Symbol',
  'Service Type Name',
  'VAT Rate',
  'Vat Amount',
  'Cost Amount Ex Vat',
  'Cost Vat Amount',
  'Profit',
  'Total Cost',
  'filesList',
  'amount_ex_vat',
  'chart_of_account',
  'transaction_num',
  'Bill Num Unit',
  'Invoice Num Nights',
  'Chart Of Account Id',
];
export const validKeyName = {
  set_credit_limit: 'Credit Limit',
  set_credit_terms: 'Credit Terms',
  is_import_agent: 'Important Agent',
  is_reverse_charge: 'Reverse Charge',
  account_no: 'GL Number',
  gl_number: 'GL Number',
  item_image: 'Image',
  mobile_num: 'Mobile #',
  reference_num: 'Reference #',
  supplier_invoice_num: 'Supplier Invoice #',
  invoice_num: 'Invoice #',
  without_change_amount_total: 'Gross Total',
  without_change_discount_total: 'Discount',
  without_change_vat_total: 'VAT Amount',
  without_change_grand_total: 'Total',
  bill_num: 'Bill #',
  total_without_tax: 'Net Amount',
  // expense_account_id: 'Expense Account',
  // paid_through_account_id: 'Paid Through',
  vat_reg_no: 'VAT Registration #',
  quotation_formatted_number: 'Quotation Number',
  pro_invoice_formatted_number: 'Proforma Invoice Formatted #',
  pro_invoice_date: 'Proforma Invoice Date',
  pro_invoice: 'Proforma Invoice',
  account: 'Customer',
  payment_num: 'Payment #',
  account_num: 'Debit Account #',
  credit_account_num: 'Credit Account #',
  is_parent: 'Contain Parent Account',
  parent_account: 'Parent Account',
  account_number: 'Account #',
  pur_order_num: 'Purchase Order #',
  pur_order_docs: 'Purchase Order Documents',
  pur_order_formatted_number: 'Purchase Order #',
  debit_account_number: 'Debit Account #',
  supplier_credit_num: 'Supplier Credit #',
  amount_ex_vat: 'Amount Without VAT',
  unit_price_ex_vat: 'Unit Price',
  num_nights: 'Quantity',
  service_type: 'Item Name',
  vat_rate_name: 'VAT Rate',
  invoice_items: 'Sale Invoice Items',
  pro_invoice_items: 'Proforma Invoice Items',
  pur_order_items: 'Purchase Order Items',
  bill_items: 'Purchase Invoice Items',
  first_name: 'Name',
  account_type_coa: 'Chart of Acocunt Type',
};
export const formDataReplaceableKeys = [
  'pur_order_items',
  'bill_items',
  'quotation_items',
  'pro_invoice_items',
  'invoice_items',
];

export const imageKeyName = {
  item_image: true,
};

// styles
export const tableCellStyle = {
  border: '1px solid silver',
};
