import React from 'react';
import { Box } from '@mui/material';
// services
import { useGetSupplierTransactionsQuery } from 'services/private/suppliers';
// shared
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';
// utilities
import { quotationFilterList } from 'containers/accounting/items/utilities/filters';
import {
  supplierBillTransactionHeadCells,
  supplierDebitNoteTransactionHeadCells,
  supplierExpenseTransactionHeadCells,
  supplierJournalTransactionHeadCells,
  supplierOpeningBalanceTransactionHeadCells,
  supplierPaymentVoucherTransactionHeadCells,
  supplierPurchaseOrderTransactionHeadCells,
} from '../../utilities/head-cells';

function SupplierTransactions() {
  return (
    <Box sx={{ width: '100%', padding: '0px 20px' }}>
      <TransactionAccordionWithFilter
        title="Opening Balance"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="opening_balance"
        headCells={supplierOpeningBalanceTransactionHeadCells}
      />
      <TransactionAccordionWithFilter
        title="Purchase Order"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="pur_orders"
        headCells={supplierPurchaseOrderTransactionHeadCells}
        FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/purchase/purchase-orders/add"
      />
      <TransactionAccordionWithFilter
        title="Purchase Invoice"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="bills"
        headCells={supplierBillTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/purchase/purchase-invoice/add"
      />
      <TransactionAccordionWithFilter
        title="Journals"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="journals"
        headCells={supplierJournalTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/finance/journal-voucher/add"
      />
      <TransactionAccordionWithFilter
        title="Payment Voucher"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="payments_made"
        headCells={supplierPaymentVoucherTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/purchase/payment-voucher/add"
      />
      <TransactionAccordionWithFilter
        title="Purchase Debit Note"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="supplier_credits"
        headCells={supplierDebitNoteTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/purchase/debit-notes/add"
      />
      <TransactionAccordionWithFilter
        title="Expense"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="sales_account_expenses"
        headCells={supplierExpenseTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/purchase/expenses/add"
      />
    </Box>
  );
}

export default SupplierTransactions;
