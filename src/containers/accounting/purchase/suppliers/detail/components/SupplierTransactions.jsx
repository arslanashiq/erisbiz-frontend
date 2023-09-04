import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router';
// services
import { useGetSupplierTransactionsQuery } from 'services/private/suppliers';
// shared
import TransactionAccordionWithFilter from 'shared/components/accordion/TransactionAccordionWithFilter';
// utilities
import { supplierBillTransactionHeadCells } from '../../utilities/head-cells';

function SupplierTransactions() {
  const { id } = useParams();
  return (
    <Box sx={{ width: '100%', padding: '0px 20px' }}>
      <TransactionAccordionWithFilter
        title="Bill"
        fetchData={useGetSupplierTransactionsQuery}
        keyName="bills"
        headCells={supplierBillTransactionHeadCells}
        //   FiltersList={quotationFilterList}
        addNewRoute={`/pages/accounting/purchase/purchase-invoice/add?supplier_id=${id}`}
      />
    </Box>
  );
}

export default SupplierTransactions;
