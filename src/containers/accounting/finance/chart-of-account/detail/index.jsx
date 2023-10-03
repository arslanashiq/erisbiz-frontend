/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
// services
import { useGetSingleChartOfAccountQuery } from 'services/private/chart-of-account';
// shared
import MuiTable from 'shared/components/table/MuiTable';
import FormHeader from 'shared/components/form-header/FormHeader';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { chartOfAccountDetailTableHeadCells } from '../utilities/head-cells';

function ChartOfAccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const charOfAccountDetailResponse = useGetSingleChartOfAccountQuery(id);
  return (
    <SectionLoader options={[charOfAccountDetailResponse.isLoading]}>
      <FormHeader title={charOfAccountDetailResponse?.data?.account_name} />
      <Card>
        <CardContent>
          <Box className="chart-of-account-detail-head">
            <Typography className="fs-14">CLOSING BALANCE</Typography>
            <Typography color="primary" className="fs-30">
              AED {charOfAccountDetailResponse?.data?.closing_balance}
            </Typography>

            <Typography className="mt-3" variant="body2">
              Description : {charOfAccountDetailResponse?.data?.description || 'N/A'}
            </Typography>
          </Box>

          <h4 className="font-weight-bold mt-4">Recent Transactions</h4>
          <MuiTable
            data={charOfAccountDetailResponse?.data?.data}
            headCells={chartOfAccountDetailTableHeadCells}
          />

          <Button
            variant="text"
            onClick={() => {
              navigate(`/pages/reports/account-transaction/${id}/detail?duration=this+month`);
            }}
          >
            Detail View
          </Button>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ChartOfAccountDetail;
