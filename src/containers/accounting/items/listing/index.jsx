import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import {
  useChangeItemStatusMutation,
  useDeleteItemMutation,
  useGetItemsListQuery,
} from 'services/private/items';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { getItemSearchQueryParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { itemsHeadCell } from '../utilities/head-cells';
// components
import ItemFilter from './components/ItemFilter';

function ItemsListing() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const itemsListResponse = useGetItemsListQuery(getItemSearchQueryParams(location));
  const [ChangeItemStatus] = useChangeItemStatusMutation();
  const [deleteItem] = useDeleteItemMutation();

  const handleChangeItemStatus = async (id, data, openInfoPopup, setOpenInfoPopup) => {
    if (data?.is_item_used) {
      setOpenInfoPopup({
        ...openInfoPopup,
        status: true,
        message: 'This item is used in transactions, please delete them first',
        actionButton: false,
      });
    }
    const chageStatusResp = await ChangeItemStatus(id);
    if (chageStatusResp.data) {
      enqueueSnackbar('Item Status Changed', { variant: 'success' });
    } else {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'success' });
    }
  };
  const handleEdit = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    const filterResult = data.filter(row => row.id === selected[0]);
    if (filterResult[0].is_item_used) {
      setOpenInfoPopup({
        ...openInfoPopup,
        status: true,
        message: 'This item is used in transactions, please delete them first',
        actionButton: false,
      });
    } else {
      navigate(`edit/${selected[0]}`);
    }
  };

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these items because some of the selected items is used in transactions';
    let actionButton = false;
    const isActive = checkSelectedDataUsed(data, selected, 'is_active');
    const isUsed = checkSelectedDataUsed(data, selected, 'is_item_used');
    if (isActive.length > 0) {
      message =
        selected.length === 1
          ? 'Active items cannot be deleted. Please inactive them first in order to delete'
          : message;
    } else if (isUsed.length > 0) {
      message =
        selected.length === 1 ? 'You cannot delete this item because it is used in transactions' : message;
    } else {
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
  const handleConfirmDelete = list => {
    list.forEach(id => {
      handleDeleteResponse(deleteItem, id, enqueueSnackbar, 'Item Deleted Successfully');
    });
  };
  return (
    <SectionLoader options={[itemsListResponse.isLoading]}>
      <Helmet>
        <title>Items - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={itemsListResponse?.data?.results}
        totalDataCount={itemsListResponse?.data?.count}
        TableHeading="Items"
        headCells={itemsHeadCell}
        actionButtonKey="is_active"
        handleTableBodyActionButton={handleChangeItemStatus}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Item' })}
        showCheckbox
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
        filterButton={<ItemFilter />}
      />
    </SectionLoader>
  );
}

export default ItemsListing;
