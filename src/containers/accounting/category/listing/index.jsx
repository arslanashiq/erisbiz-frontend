import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import { useGetCategoryListQuery, useDeleteCategoryMutation } from 'services/private/category';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles
import { getItemSearchQueryParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { categoryHeadCells } from '../utilities/head-cells';

function CategoryListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryListResponse = useGetCategoryListQuery(getItemSearchQueryParams(location));
  const [deleteSingleCategory] = useDeleteCategoryMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these Category because some of the selected Category is used in items';
    let actionButton = false;
    const isUsed = checkSelectedDataUsed(data, selected, 'is_item_used');
    if (isUsed.length > 0) {
      message =
        selected.length === 1
          ? 'You cannot delete these Categories because some of the selected Categories is used in items'
          : message;
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
      handleDeleteResponse(deleteSingleCategory, id, enqueueSnackbar, 'Category Deleted Successfully');
    });
  };
  return (
    <SectionLoader options={[categoryListResponse.isLoading]}>
      <Helmet>
        <title>Categories - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={categoryListResponse?.isSuccess ? categoryListResponse?.data?.results : []}
        totalDataCount={categoryListResponse?.data?.count || 0}
        TableHeading="Categories"
        handleEdit={(_, selected) => {
          navigate(`edit/${selected[0]}`);
        }}
        headCells={categoryHeadCells}
        showCheckbox
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New category' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default CategoryListing;
