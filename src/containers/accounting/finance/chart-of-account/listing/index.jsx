import SectionLoader from 'containers/common/loaders/SectionLoader';
import React from 'react';
import { Helmet } from 'react-helmet';
import AddIcon from '@mui/icons-material/Add';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';
import MuiTable from 'shared/components/table/MuiTable';
import { useLocation, useNavigate } from 'react-router';
import { chartOfAccountHeadCells } from '../utilities/head-cells';

function ChartOfAccountListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const chartOfAccountListResponse = useGetChartOfAccountListQuery(location.search);
  return (
    <SectionLoader options={[chartOfAccountListResponse.isLoading]}>
      <Helmet>
        <title>Chart Of Account - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        // showCheckbox
        data={chartOfAccountListResponse?.data?.results}
        totalDataCount={chartOfAccountListResponse?.data?.count}
        TableHeading="Chart Of Account"
        headCells={chartOfAccountHeadCells}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                Chart of Account
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        // handleDelete={handleDelete}
        // handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default ChartOfAccountListing;
