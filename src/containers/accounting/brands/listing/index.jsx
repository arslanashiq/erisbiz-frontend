import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
// services
import { useDeleteBrandMutation, useGetBrandsListQuery } from 'services/private/brands';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles
import { addButtonIconStyle } from 'styles/common/common-styles';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { getItemSearchQueryParams } from 'utilities/filters';
import { brandsHeadCells } from '../utilities/head-cells';

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
    <SectionLoader options={[brandsListResponse.isLoading]}>
      <Helmet>
        <title>Brands - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={brandsListResponse?.isSuccess ? brandsListResponse?.data?.results : []}
        TableHeading="Brands"
        handleEdit={(_, selected) => {
          navigate(`edit/${selected[0]}`);
        }}
        headCells={brandsHeadCells}
        showCheckbox
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={addButtonIconStyle} />
                New Brand
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default BrandsListing;
