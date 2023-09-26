import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
// services
import { useGetSingleChartOfAccountQuery } from 'services/private/chart-of-account';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import {
  chartOfAccountCompleteDetailTableHeadCells,
  chartOfAccountLessDetailTableHeadCells,
} from '../utilities/head-cells';

function ChartOfAccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDetailView, setShowDetailView] = useState(false);
  const charOfAccountDetailResponse = useGetSingleChartOfAccountQuery({ id, query: location.search });
  console.log(charOfAccountDetailResponse, 'charOfAccountDetailResponse');
  return (
    <SectionLoader options={[charOfAccountDetailResponse.isLoading]}>
      <Card>
        <CardContent>
          <Box className="chart-of-account-detail-head">
            <Typography className="font-14">CLOSING BALANCE</Typography>
            <Typography color="primary" className="font-30">
              AED {charOfAccountDetailResponse?.data?.closing_balance}
            </Typography>

            <Typography className="mt-3" variant="body2">
              Description : {charOfAccountDetailResponse?.data?.description || 'N/A'}
            </Typography>
          </Box>

          <h4 className="font-weight-bold mt-4">Recent Transactions</h4>
          <MuiTable
            data={charOfAccountDetailResponse?.data?.data}
            headCells={
              showDetailView
                ? chartOfAccountCompleteDetailTableHeadCells
                : chartOfAccountLessDetailTableHeadCells
            }
          />
          {showDetailView === false && (
            <Button
              variant="text"
              onClick={() => {
                setShowDetailView(true);
                navigate(`/pages/accounting/finance/chart-of-account/${id}/detail?duration=this+month`);
              }}
            >
              Detail View
            </Button>
          )}
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ChartOfAccountDetail;
