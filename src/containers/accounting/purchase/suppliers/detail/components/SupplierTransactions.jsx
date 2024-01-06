import React from 'react';
import { Box } from '@mui/material';
// services
import { useGetSupplierTransactionsQuery } from 'services/private/suppliers';
// shared
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';
// utilities
import { handleGetSortedData } from 'utilities/get-sorted-journals';
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
  const sortedJournalsArrayForPurchase = ['Accounts Payable', 'Cost of Sales', 'Input VAT', 'Discount'];

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
        getSortedData={journalItems => {
          const journalObject = {};
          journalItems.forEach(item => {
            try {
              // if (journalObject[item.account_name]) {
              //   journalObject[item.account_name].credit += item.credit;
              //   journalObject[item.account_name].debit += item.debit;
              // } else
              if (item.credit > 0 || item.debit > 0) {
                journalObject[item.account_name] = { ...item };
              }
            } catch (error) {
              journalObject[item.account_name] = { ...item };
            }
          });

          const sortedJournals = handleGetSortedData(journalObject, sortedJournalsArrayForPurchase);
          return sortedJournals;
        }}
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
