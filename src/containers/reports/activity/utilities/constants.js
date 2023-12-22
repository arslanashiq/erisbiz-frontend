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
