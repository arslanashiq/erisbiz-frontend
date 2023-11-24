import React from 'react';
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';
import {
  useGetItemBillQuery,
  useGetItemCreditNoteQuery,
  useGetItemDebitNoteQuery,
  useGetItemInvoiceQuery,
  useGetItemPerformaInvoiceQuery,
  useGetItemPurchaseOrderQuery,
  useGetItemQuotationQuery,
} from 'services/private/items';
import {
  itemBillTransactionHeadCells,
  itemCreditNoteTransactionHeadCells,
  itemDebitNoteTransactionHeadCells,
  itemInvoiceTransactionHeadCells,
  itemPerformaInvoiceTransactionHeadCells,
  itemPurchaseOrderTransactionHeadCells,
  itemQuotationTransactionHeadCells,
} from '../../utilities/head-cells';
import {
  billFilters,
  creditNoteFilters,
  debitNoteFilters,
  invoiceFilters,
  proformaInvoiceFilterList,
  purchaseOrderFilters,
  quotationFilterList,
} from '../../utilities/filters';

function ItemTransactionsTab() {
  return (
    <>
      <TransactionAccordionWithFilter
        title="Purchase Order"
        fetchData={useGetItemPurchaseOrderQuery}
        headCells={itemPurchaseOrderTransactionHeadCells}
        FiltersList={purchaseOrderFilters}
      />
      <TransactionAccordionWithFilter
        title="Purchase Invoice"
        fetchData={useGetItemBillQuery}
        headCells={itemBillTransactionHeadCells}
        FiltersList={billFilters}
      />
      <TransactionAccordionWithFilter
        title="Purchase Debit Note"
        fetchData={useGetItemDebitNoteQuery}
        headCells={itemDebitNoteTransactionHeadCells}
        FiltersList={debitNoteFilters}
      />
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
        title="Sale Invoice"
        fetchData={useGetItemInvoiceQuery}
        headCells={itemInvoiceTransactionHeadCells}
        FiltersList={invoiceFilters}
      />
      <TransactionAccordionWithFilter
        title="Sale Credit Note"
        fetchData={useGetItemCreditNoteQuery}
        headCells={itemCreditNoteTransactionHeadCells}
        FiltersList={creditNoteFilters}
      />
    </>
  );
}

export default ItemTransactionsTab;
