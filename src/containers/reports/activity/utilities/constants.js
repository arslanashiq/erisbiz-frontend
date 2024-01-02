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
  PurchasePaymentRefund: 'Purchase Payment Refund',
};

export const formattedNumber = {
  // PurOrder:
  PurOrder: 'pur_order_num',
  Bill: 'bill_num',
  PaymentMade: 'payment_formatted_number',
  SupplierCredit: 'supplier_credit_formatted_number',
  // sale
  Quotation: 'quotation_formatted_number',
  ProInvoice: 'pro_invoice_formatted_number',
  Invoice: 'invoice_formatted_number',
  PaymentReceived: 'payment_num',
  CreditNote: 'credit_note_formatted_number',
};

export const converToDecimal = {
  // items mater
  cost_price: true,
  sale_price: true,
  // order items
  amount_ex_vat: true,
  discount: true,
  gross_amount: true,
  net_amount: true,
  unit_price_ex_vat: true,
  // complete sale and purchase module
  without_change_amount_total: true,
  without_change_vat_total: true,
  without_change_discount_total: true,
  without_change_grand_total: true,
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
  bill: 'bill_num',
  invoice: 'invoice_formatted_number',
  customer_info: 'customer_name',
};

// invalid keys
export const inValidKeys = [
  'Discount',
  'Created At',
  'Created By',
  'Currency',
  'Id',
  'uuid',
  'uid',
  'Updated At',
  'Updated By',
  'Company',
  'Exchange Rate',
  'Optional Data',
  'Currency Symbol',
  'Currency Code',
  'Show Stamp',
  'Aed Amount',
  'Amount Total',
  'Bcy Amount Total',
  'Bcy Discount',
  'Bcy Grand Total',
  'Bcy Vat Total',
  'Convert To Aed',
  'Currency Id',
  'Is Currency',
  'Requestor Signature Show',
  'filesList',
  'Supplier Type',
  'Customer Type',
  'Amount Total Aed',
  'Supplier Id',
];
export const invalidKeysModuleWise = {
  BankAccount: ['Chart Of Account', 'Bank Branch Address', 'Description'],
  Category: ['Category Num'],
  Brand: ['Brand Num'],
  Item: [
    'Cost Account',
    'Cost Account Label',
    'Current Value',
    'Dynamic Opening Stock',
    'Dynamic Opening Stock Per Unit',
    'Inventory Coa',
    'Inventory Coa Label',
    'Is Digital Service',
    'Is Item Used',
    'Is Tracking Inventory',
    'Item Cost Amount Prefix',
    'Item Sale Amount Prefix',
    'Opening Stock Per Unit',
    'Sale Account',
    'Sale Account Label',
    'Committed Stock',
    'Forecast Stock',
    'Is Type Editable',
    'Remaining Stock',
    'Weighted Cost Price',
  ],
  Supplier: [
    'Is Credit',
    'Opening Balance',
    'Opening Balance Date',
    'Payment Terms',
    'Transaction Num',
    'Have Bills',
    'Have Debit Notes',
    'Have Expenses',
    'Have Pur Orders',
    'Is Active',
    'Is Balance Used',
    'Supplier Type',
  ],
  PurOrder: [
    'Pur Order Suffix',
    'Supplier Id',
    'Exchange Rate Of Purorder Currency',
    'Grand Total',
    'Supplier Name',
    'pur_order_num',
  ],
  Bill: [
    'invoice_num',
    'Amount Total Aed',
    'Convert To Aed',
    'discount',
    'Grand Total',
    'Grand Total Aed',
    'bill_num',
    'Pur Order Suffix',
    'Requestor Signature Show',
    'Show Stamp',
    'Sub Total',
    'Vat Total',
    'Vat Total Aed',
    'Amount Due Bill Currency',
    // 'Bcy Amount Total',
    'Bcy Amount Total Bill Currency',
    'Bcy Grand Total Bill Currency',
    'Bcy Vat Total',
    'Bcy Vat Total Bill Currency',
    'Credit Applied',
    'Currency Id',
    'Credit Applied Bill Currency',
    'Payment Amount Bill Currency',
    'Payment Terms',
    'Purchase Order',
    'Pur Order Id',
    'Supplier Id',
    'Supplier Type',
  ],
  PaymentMade: [
    'payment_formatted_number',
    'Chart Of Account Id',
    'Used Amount',
    'Bcy Total',
    'Bcy Unused Amount',
    'Bills',
    'Chart Of Account',
    'Have Debit Note',
    'Is Payment Applied',
    'Over Paid',
    'Over Payment',
    'Refund Payment',
    'Supplier Id',
    'Supplier Name',
  ],
  SupplierCredit: [
    // 'Bcy Amount Total',
    'supplier_credit_formatted_number',
    'Bcy Amount Total Debit Currency',

    'Bcy Grand Total Debit Currency',
    'Bcy Vat Total',
    'Bcy Vat Total Debit Currency',
    'Bill',
    'Bill Id',
    'Credits Remaining Debitnote Currency',
    'Credits Used',
    'Credits Used Debitnote Currency',
    'Customer Type Suffix',
    'Exchange Rate Of Suppliercredit Currency',
    'Is Applied',
    'Is Currency',
    'Is Issue',
    'Is Tax Inclusive',
    'Refunded Amount',
    'Refunded Amount Debitnote Currency',
    'Supplier Credit Num',
    'Supplier Credit Prefix',
    'Grand Total',
  ],
  Expense: ['Expense Account Id', 'Tax Rate Id', 'Tax Rate Perc', 'Type', 'paid_through_account_id'],
  SalesCompany: [
    'Have Credit Notes',
    'Have Quotations',
    'Have Quotations',
    'Have Invoices',
    'Have Pro Invoices',
  ],
  Quotation: ['quotation_formatted_number', 'Aed Conversion Rate', 'Amount Total Aed', 'Customer Info'],
  ProInvoice: [
    'pro_invoice_formatted_number',
    'Customer Info',
    'Exchange Rate Of Proinvoice Currency',
    'Grand Total',
    'Grand Total Aed',
    'Operation Status',
    'Pro Invoice Num',
    'Pro Invoice Prefix',
    'Quotation',
    'Vat Total Aed',
    'Vat Total',
  ],
  Invoice: [
    'invoice_formatted_number',
    'Amount Due',
    'Bcy Vat Total Invoice Currency',
    'Bcy Grand Total Invoice Currency',
    'Amount Due Invoice Currency',
    'Bcy Amount Total Invoice Currency',
    'Credit Applied',
    'Credit Applied Invoice Currency',
    'Customer Info',
    'Exchange Rate Of Invoice Currency',
    'Grand Total',
    'Invoice Prefix',
    'Other Amount',
    'Payment Amount Invoice Currency',
    'Sales Person Id',
    'Vat Total',
  ],
  PaymentReceived: [
    'PaymentReceived',
    'Chart Of Account',
    'Last Payment Number',
    'Account Id',
    'Bank Charges',
    'Bcy Bank Charges',
    'Bcy Total',
    'Bcy Unused Amount',
    'Chart Of Account Id',
    'Customer Info',
    'Have Credit Note',
    'Invoices',
    'Is Payment Applied',
    'Over Paid',
    'Over Payment',
    'Refund Payment',
  ],
  CreditNote: [
    'CreditNote',
    'Invoice',
    'Bcy Amount Total Credit Currency',
    'Bcy Grand Total Credit Currency',
    'Bcy Vat Total Credit Currency',
    'Credit Note Num',
    'Credit Note Prefix',
    'Credits Remaining',
    'Credits Remaining Creditnote Currency',
    'Credits Used',
    'Credits Used Creditnote Currency',
    'Exchange Rate Of Creditnote Currency',
    'Invoice Id',
    'Invoice Num',
    'Invoice Num With Suffix',
    'Invoice Prefix',
    'Is Applied',
    'Is Issue',
    'Is Tax Inclusive',
    'Other Amount',
    'Refunded Amount',
    'Sales Company Name',
    'Refunded Amount Creditnote Currency',
    'Vat Total',
  ],

  ChartOfAccount: [
    'Chart of Acocunt Type',
    'Is Active',
    'Is Credit',
    'Is System Account',
    'Is User Created',
    'Is Watchlisted',
    'Opening Balance',
  ],
  Journal: ['Last Journal Num', 'Journal Formatted Number', 'Is Deleted'],
};

// invalid nested keys
export const invalidNestedKeys = [
  'Cost Price',
  'Created At',
  'Created By',
  'Updated At',
  'Currency',
  'Currency Code',
  'Currency Symbol',
  'Id',
  'uuid',
  'uid',
  'Vat Rate Perc',
  'Num Units',
  // 'Doc File',
  'Doc Size Bytes',
];
export const invalidNestedKeysModuleWise = {
  // purchase
  Supplier: {
    supplier_contacts: ['Supplier Id', 'Primary Contact'],
  },
  PurOrder: {
    pur_order_items: [
      'Is Item Inventory',
      'Invoice Unit Price Ex Vat',
      'Vat Rate',
      'Total Cost',
      'Profit',
      'Amount Without VAT',
      'Cost Amount Ex Vat',
      'Cost Vat Amount',
      'Invoice Num Night',
      'Invoice Num Unit',
      'Vat Amount',
      'Chart Of Account',
      'Chart Of Account Id',
      'Service Type Name',
      'Vat Total',
      'Debit Note Item Remove',
    ],
  },
  Bill: {
    bill_items: [
      'Is Item Inventory',
      'Invoice Unit Price Ex Vat',
      'Vat Rate',
      'Total Cost',
      'Profit',
      'Amount Without VAT',
      'Cost Amount Ex Vat',
      'Cost Vat Amount',
      'Invoice Num Night',
      'Invoice Num Unit',
      'Vat Amount',
      'Chart Of Account',
      'Chart Of Account Id',
      'Service Type Name',
      'Vat Total',
      'Debit Note Item Remove',
    ],
  },
  SupplierCredit: {
    supplier_credit_items: [
      'Is Item Inventory',
      'Invoice Unit Price Ex Vat',
      'Vat Rate',
      'Total Cost',
      'Profit',
      'Amount Without VAT',
      'Cost Amount Ex Vat',
      'Cost Vat Amount',
      'Invoice Num Night',
      'Invoice Num Unit',
      'Vat Amount',
      'Chart Of Account',
      'Chart Of Account Id',
      'Service Type Name',
      'Vat Total',
    ],
  },
  PaymentMade: {
    bill_payments: [
      'Bcy Grand Total',
      'bill_num',
      'Exchange Rate',
      'Is Payment Voucher',
      'Bill Id',
      'Purchase Order',
      'Bill Date',
      'Due Date',
      'Status',
      'Pur Order Suffix',
      'Pur Order',
      'Grand Total',
    ],
  },

  // sale
  Quotation: {
    quotation_items: [
      'Is Item Inventory',
      'Invoice Unit Price Ex Vat',
      'Vat Rate',
      'Total Cost',
      'Profit',
      'Amount Without VAT',
      'Cost Amount Ex Vat',
      'Cost Vat Amount',
      'Invoice Num Night',
      'Invoice Num Unit',
      'Vat Amount',
    ],
  },
  ProInvoice: {
    pro_invoice_items: [
      'Is Item Inventory',
      'Invoice Unit Price Ex Vat',
      'Vat Rate',
      'Total Cost',
      'Profit',
      'Amount Without VAT',
      'Cost Amount Ex Vat',
      'Cost Vat Amount',
      'Invoice Num Night',
      'Invoice Num Unit',
      'Vat Amount',
    ],
  },
  PaymentReceived: {
    invoice_payments: ['Invoice Id', 'Is Payment Voucher'],
  },
  CreditNote: {
    credit_note_items: [
      'Is Item Inventory',
      'Invoice Unit Price Ex Vat',
      'Vat Rate',
      'Total Cost',
      'Profit',
      'Amount Without VAT',
      'Cost Amount Ex Vat',
      'Cost Vat Amount',
      'Invoice Num Night',
      'Invoice Num Unit',
      'Vat Amount',
    ],
  },

  // finance

  Journal: {
    journal_items: ['Chart Of Account', 'transaction Num'],
  },
};

// valid keys Name
export const validKeyName = {
  vat_number: 'VAT Number',
  transaction_num: 'Transaction Number',
  set_credit_limit: 'Credit Limit',
  set_credit_terms: 'Credit Terms',
  is_import_agent: 'Important Agent',
  chart_of_account_name: 'Paid Through',
  pur_order: 'Purchase Order',
  is_reverse_charge: 'Reverse Charge',
  paid_through_account_id: 'Paid Through Account',
  sales_company: 'Customer Name',
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
  address_line1: 'Address 1',
  address_line2: 'Address 2',
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
  bill_docs: 'Purchase Invoice Documents',
  first_name: 'Name',
  account_type_coa: 'Chart of Acocunt Type',
};

// forma data List Convertor
export const formDataReplaceableKeys = [
  'pur_order_items',
  'bill_items',
  'quotation_items',
  'pro_invoice_items',
  'invoice_items',
  'filesList',
  'bill_docs',
  'pur_order_docs',
  'quotation_docs',
  'quotation_docs',
  'pro_invoice_docs',
  'pro_invoice_docs',
  'invoice_docs',
];

// images
export const imageKeyName = {
  item_image: true,
  doc_file: true,
};

// styles
export const tableCellStyle = {
  border: '1px solid silver',
};
