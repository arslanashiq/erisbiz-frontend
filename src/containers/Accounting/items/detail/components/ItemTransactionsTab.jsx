import React from 'react';
import {
  useGetItemBillQuery,
  useGetItemCreditNoteQuery,
  useGetItemDebitNoteQuery,
  useGetItemInvoiceQuery,
  useGetItemPerformaInvoiceQuery,
  useGetItemPurchaseOrderQuery,
  useGetItemQuotationQuery,
} from 'services/private/items';
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';
import {
  itemBillTransactionHeadCells,
  itemCreditNoteTransactionHeadCells,
  itemDebitNoteTransactionHeadCells,
  itemInvoiceTransactionHeadCells,
  itemPerformaInvoiceTransactionHeadCells,
  itemPurchaseOrderTransactionHeadCells,
  itemQuotationTransactionHeadCells,
} from '../../utils/head-cells';
import {
  billFilters,
  creditNoteFilters,
  debitNoteFilters,
  invoiceFilters,
  proformaInvoiceFilterList,
  purchaseOrderFilters,
  quotationFilterList,
} from '../../utils/filters';

function ItemTransactionsTab() {
  return (
    <>
      <TransactionAccordionWithFilter
        title="Quotation"
        fetchData={useGetItemQuotationQuery}
        headCells={itemQuotationTransactionHeadCells}
        FiltersList={quotationFilterList}
        addNewRoute="/pages/accounting/sales/quotations/add"
      />
      <TransactionAccordionWithFilter
        title="Proforma Invoice"
        fetchData={useGetItemPerformaInvoiceQuery}
        headCells={itemPerformaInvoiceTransactionHeadCells}
        FiltersList={proformaInvoiceFilterList}
      />
      <TransactionAccordionWithFilter
        title="Invoice"
        fetchData={useGetItemInvoiceQuery}
        headCells={itemInvoiceTransactionHeadCells}
        FiltersList={invoiceFilters}
      />
      <TransactionAccordionWithFilter
        title="Credit Note"
        fetchData={useGetItemCreditNoteQuery}
        headCells={itemCreditNoteTransactionHeadCells}
        FiltersList={creditNoteFilters}
      />
      <TransactionAccordionWithFilter
        title="Purchase Order"
        fetchData={useGetItemPurchaseOrderQuery}
        headCells={itemPurchaseOrderTransactionHeadCells}
        FiltersList={purchaseOrderFilters}
      />
      <TransactionAccordionWithFilter
        title="Bill"
        fetchData={useGetItemBillQuery}
        headCells={itemBillTransactionHeadCells}
        FiltersList={billFilters}
      />
      <TransactionAccordionWithFilter
        title="Debit Note"
        fetchData={useGetItemDebitNoteQuery}
        headCells={itemDebitNoteTransactionHeadCells}
        FiltersList={debitNoteFilters}
      />
    </>
  );
}

export default ItemTransactionsTab;
