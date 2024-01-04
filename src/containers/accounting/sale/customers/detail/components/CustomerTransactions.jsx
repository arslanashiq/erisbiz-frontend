import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router';
// services
import { useGetCustomerTransactionsQuery } from 'services/private/customers';

// shared
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';
import {
  supplierBillTransactionHeadCells,
  supplierDebitNoteTransactionHeadCells,
  supplierExpenseTransactionHeadCells,
  supplierJournalTransactionHeadCells,
  supplierOpeningBalanceTransactionHeadCells,
  supplierPaymentVoucherTransactionHeadCells,
  supplierPurchaseOrderTransactionHeadCells,
} from 'containers/accounting/purchase/suppliers/utilities/head-cells';
// utilities
// import {
//   supplierBillTransactionHeadCells,
//   supplierDebitNoteTransactionHeadCells,
//   supplierExpenseTransactionHeadCells,
//   supplierJournalTransactionHeadCells,
//   supplierOpeningBalanceTransactionHeadCells,
//   supplierPaymentVoucherTransactionHeadCells,
//   supplierPurchaseOrderTransactionHeadCells,
// } from '../../utilities/head-cells';

function CustomerTransactions() {
  const { id } = useParams();
  return (
    <Box sx={{ width: '100%', padding: '0px 20px' }}>
      <TransactionAccordionWithFilter
        title="Opening Balance"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="opening_balance"
        headCells={supplierOpeningBalanceTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Quotations"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="quotations"
        headCells={supplierPurchaseOrderTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Proforma Invoice"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="pro_invoice"
        headCells={supplierBillTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Sales Invoice"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="invoices"
        headCells={supplierJournalTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Receipt Voucher"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="payments_received"
        headCells={supplierPaymentVoucherTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Sales Credit Note"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="credit_notes"
        headCells={supplierDebitNoteTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
      <TransactionAccordionWithFilter
        title="Journals"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="journals"
        headCells={supplierExpenseTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
    </Box>
  );
}

export default CustomerTransactions;
