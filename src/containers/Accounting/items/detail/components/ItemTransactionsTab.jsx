/* eslint-disable*/
import React from 'react';
import {
  useGetItemBillQuery,
  useGetItemCreditNoteQuery,
  useGetItemInvoiceQuery,
  useGetItemPerformaInvoiceQuery,
  useGetItemPurchaseOrderQuery,
  useGetItemQuotationQuery,
} from 'services/private/items';
import {
  itemBillTransactionHeadCells,
  itemCreditNoteTransactionHeadCells,
  itemInvoiceTransactionHeadCells,
  itemPerformaInvoiceTransactionHeadCells,
  itemPurchaseOrderTransactionHeadCells,
  itemQuotationTransactionHeadCells,
} from '../../utils/head-cells';
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';
import {
  billFilters,
  creditNoteFilters,
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
    </>
  );
}

export default ItemTransactionsTab;
