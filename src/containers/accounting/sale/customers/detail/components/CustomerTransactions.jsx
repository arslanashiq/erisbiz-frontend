import React from 'react';
import { Box } from '@mui/material';
// services
import { useGetCustomerTransactionsQuery } from 'services/private/customers';

// shared
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';

// utilities
import { supplierOpeningBalanceTransactionHeadCells } from 'containers/accounting/purchase/suppliers/utilities/head-cells';
import {
  customerCreditNoteInvoiceHeadCells,
  customerQuotationsHeadCells,
  customerSalesInvoiceHeadCells,
  customerJournalsHeadCells,
  customerReceiptVoucherInvoiceHeadCells,
} from '../../utilities/head-cells';

function CustomerTransactions() {
  return (
    <Box sx={{ width: '100%', padding: '0px 20px' }}>
      <TransactionAccordionWithFilter
        title="Opening Balance"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="opening_balance"
        headCells={supplierOpeningBalanceTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        // addNewRoute="/pages/accounting/purchase/purchase-invoice/add"
      />
      <TransactionAccordionWithFilter
        title="Quotations"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="quotations_customers"
        headCells={customerQuotationsHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/sales/quotations/add"
      />

      <TransactionAccordionWithFilter
        title="Sales Invoice"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="invoice_company"
        headCells={customerSalesInvoiceHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/sales/sale-invoice/add"
      />
      <TransactionAccordionWithFilter
        title="Receipt Voucher"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="payments_received"
        headCells={customerReceiptVoucherInvoiceHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/sales/receipt-voucher/add"
      />
      <TransactionAccordionWithFilter
        title="Sales Credit Note"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="credit_note_company"
        headCells={customerCreditNoteInvoiceHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/sales/credit-notes/add"
      />
      <TransactionAccordionWithFilter
        title="Journals"
        fetchData={useGetCustomerTransactionsQuery}
        keyName="journals"
        headCells={customerJournalsHeadCells}
        //   FiltersList={quotationFilterList}
        // addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
    </Box>
  );
}

export default CustomerTransactions;
