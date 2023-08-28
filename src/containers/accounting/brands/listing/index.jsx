import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
import MuiTable from 'shared/components/table/MuiTable';
import AddIcon from '@mui/icons-material/Add';
import { useDeleteBrandMutation, useGetBrandsListQuery } from 'services/private/brands';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { getItemSearchQueryParams } from 'utilities/filters';
import { brandsHeadCells } from '../utils/head-cells';

function BrandsListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const brandsListResponse = useGetBrandsListQuery(getItemSearchQueryParams(location));
  const [deleteSingleBrand] = useDeleteBrandMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
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
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleBrand(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Brands - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {/* {resp.isSuccess && resp?.data?.results?.length > 0 && ( */}
      <MuiTable
        data={brandsListResponse?.data?.results}
        TableHeading="Brands"
        headCells={brandsHeadCells}
        showCheckbox
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Brand
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
      {/* )} */}
    </>
  );
}

export default BrandsListing;
