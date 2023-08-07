import React from 'react';
import { Helmet } from 'react-helmet';
import AddIcon from '@mui/icons-material/Add';
import MuiTable from 'shared/components/table/MuiTable';
import { purchaseOrderHeadCells } from 'utilities/tableHeadCells';
import { useLocation, useNavigate } from 'react-router';
import { useGetPurchaseOrdersListQuery } from 'services/private/purchase-orders';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';

function PurchaseOrderListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const purchaseOrdersResponse = useGetPurchaseOrdersListQuery(getsearchQueryOffsetAndLimitParams(location));
  return (
    <>
      <Helmet>
        <title>Purchase Order - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {/* {resp.isSuccess && resp?.data?.results?.length > 0 && ( */}
      <MuiTable
        data={purchaseOrdersResponse?.data?.results}
        totalDataCount={purchaseOrdersResponse?.data?.count}
        TableHeading="Purchase Orders"
        showCheckbox
        headCells={purchaseOrderHeadCells}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Purchase Order
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

export default PurchaseOrderListing;
