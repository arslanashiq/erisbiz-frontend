import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
// services
import {
  useDeletePurchaseOrderMutation,
  useGetPurchaseOrdersListQuery,
} from 'services/private/purchase-orders';
// shared
import MuiTable from 'shared/components/table/MuiTable';
import PersonlizedFilter from 'shared/components/personalized-filters/PersonlizedFilter';
// utilities
import { purchaseOrderHeadCells } from '../utilities/head-cells';
import { purchaseOrderFilterInitialValues, purchaseOrderFiltersOptionsList } from '../utilities/constants';

function PurchaseOrderListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const purchaseOrdersResponse = useGetPurchaseOrdersListQuery(location.search);
  const [deletePurchaseOrder] = useDeletePurchaseOrderMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these items because some of the selected items is used in transactions';
    let actionButton = false;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });

    const cantDelete = selectedData.some(item => item.status === 'closed');
    if (!cantDelete) {
      message = 'Are you sure you want to delete?';
      actionButton = true;
    }

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };
  const deleteSingleItem = async id => {
    await deletePurchaseOrder(id);
    // if (deleteItemResp.data) {
    enqueueSnackbar('Item Deleted Successfully', { variant: 'success' });
    // } else {
    //   enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    // }
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleItem(id);
    });
  };
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
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
        filterButton={(
          <PersonlizedFilter
            filterInitialValues={purchaseOrderFilterInitialValues}
            filtersList={purchaseOrderFiltersOptionsList}
          />
        )}
      />
      {/* )} */}
    </>
  );
}

export default PurchaseOrderListing;
