import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import { useDeleteBrandMutation, useGetBrandsListQuery } from 'services/private/brands';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles
import { getItemSearchQueryParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { handleBulkDelete } from 'utilities/delete-action-handler';
import { brandsHeadCells } from '../utilities/head-cells';

function BrandsListing() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const location = useLocation();
  const brandsListResponse = useGetBrandsListQuery(getItemSearchQueryParams(location));
  const [deleteSingleBrand] = useDeleteBrandMutation();

  const handleDelete = useCallback((data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these brands because some of the selected brands is used in items';
    let actionButton = false;
    const isUsed = checkSelectedDataUsed(data, selected, 'is_item_used');
    if (isUsed.length > 0) {
      message =
        selected.length === 1
          ? 'You cannot delete these brands because some of the selected brands is used in items'
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
  }, []);
  const handleConfirmDelete = useCallback(list => {
    handleBulkDelete(list, deleteSingleBrand, enqueueSnackbar, 'Brand Deleted Successfully');
  }, []);

  return (
    <SectionLoader options={[brandsListResponse.isLoading]}>
      <Helmet>
        <title>Brands - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={brandsListResponse?.isSuccess ? brandsListResponse?.data?.results : []}
        totalDataCount={brandsListResponse?.data?.count || 0}
        TableHeading="Brands"
        handleEdit={(_, selected) => {
          navigate(`edit/${selected[0]}`);
        }}
        headCells={brandsHeadCells}
        showCheckbox
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Brand' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default BrandsListing;
