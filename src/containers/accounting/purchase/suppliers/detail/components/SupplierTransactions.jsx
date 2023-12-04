import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router';
// services
import { useGetSupplierTransactionsQuery } from 'services/private/suppliers';
// shared
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';
// utilities
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
  const { id } = useParams();
  return (
    <Box sx={{ width: '100%', padding: '0px 20px' }}>
      <TransactionAccordionWithFilter
        title="Opening Balance"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="opening_balance"
        headCells={supplierOpeningBalanceTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Purchase Order"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="pur_orders"
        headCells={supplierPurchaseOrderTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Purchase Invoice"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="bills"
        headCells={supplierBillTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Journals"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="journals"
        headCells={supplierJournalTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Supplier Payments"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="payments_made"
        headCells={supplierPaymentVoucherTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Debit Note"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="supplier_credits"
        headCells={supplierDebitNoteTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Expenses"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="sales_account_expenses"
        headCells={supplierExpenseTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
    </Box>
  );
}

export default SupplierTransactions;
