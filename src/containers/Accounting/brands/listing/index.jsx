import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import MuiTable from 'shared/components/table/MuiTable';
import AddIcon from '@mui/icons-material/Add';
import { useGetBrandsListQuery } from 'services/private/brands';
import { brandsHeadCells } from '../utils/head-cells';

function BrandsListing() {
  const navigate = useNavigate();
  const brandsListResponse = useGetBrandsListQuery();
  return (
    <>
      <Helmet>
        <title>Banking - ErisBiz</title>
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
      />
      {/* )} */}
    </>
  );
}

export default BrandsListing;
