import React from 'react';
import { Helmet } from 'react-helmet';
import MuiTable from 'shared/components/table/MuiTable';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { useGetPurchaseInvoiceListQuery } from 'services/private/purchase-invoice';
import { purchaseInvoiceHeadCells } from '../utils/head-cells';

function SupplierCreditListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const purchaseInvoiceResponse = useGetPurchaseInvoiceListQuery(
    getsearchQueryOffsetAndLimitParams(location)
  );
  return (
    <>
      <Helmet>
        <title>Purchase Invoice - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {/* {resp.isSuccess && resp?.data?.results?.length > 0 && ( */}
      <MuiTable
        data={purchaseInvoiceResponse?.data?.results}
        totalDataCount={purchaseInvoiceResponse?.data?.count}
        TableHeading="Purchase Invoice"
        showCheckbox
        headCells={purchaseInvoiceHeadCells}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Purchase Invoice
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
        // handleConfirmDelete={handleConfirmDelete}
      />
      {/* )} */}
    </>
  );
}

export default SupplierCreditListing;
