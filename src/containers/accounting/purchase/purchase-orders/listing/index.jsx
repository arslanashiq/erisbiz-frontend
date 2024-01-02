import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import {
  useDeletePurchaseOrderMutation,
  useGetPurchaseOrdersListQuery,
} from 'services/private/purchase-orders';
// shared
import MuiTable from 'shared/components/table/MuiTable';
import PersonlizedFilter from 'shared/components/personalized-filters/PersonlizedFilter';
// utilities and styles
import { DEFAULT_PARAMS } from 'utilities/constants';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { purchaseOrderHeadCells } from '../utilities/head-cells';
import { purchaseOrderFilterInitialValues, purchaseOrderFiltersOptionsList } from '../utilities/constants';

function PurchaseOrderListing() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const purchaseOrdersResponse = useGetPurchaseOrdersListQuery(location.search || DEFAULT_PARAMS);

  const [deletePurchaseOrder] = useDeletePurchaseOrderMutation();

  const handleDelete = useCallback((data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot delete these Purchase Orders because some of the selected items status is not draft';
    let actionButton = false;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });

    const canDelete = selectedData.some(item => item.status === 'draft');
    if (canDelete) {
      message = 'Are you sure you want to delete?';
      actionButton = true;
    }

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  }, []);
  const handleConfirmDelete = useCallback(list => {
    list.forEach(id => {
      handleDeleteResponse(deletePurchaseOrder, id, enqueueSnackbar, 'Purchase Order Deleted Successfully');
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Purchase Order - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={purchaseOrdersResponse?.data?.results}
        totalDataCount={purchaseOrdersResponse?.data?.count}
        TableHeading="Purchase Orders"
        showCheckbox
        headCells={purchaseOrderHeadCells}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Purchase Order' })}
        editableStatusList={['draft']}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
        filterButton={(
          <PersonlizedFilter
            filterInitialValues={purchaseOrderFilterInitialValues}
            filtersList={purchaseOrderFiltersOptionsList}
          />
        )}
      />
    </>
  );
}

export default PurchaseOrderListing;
