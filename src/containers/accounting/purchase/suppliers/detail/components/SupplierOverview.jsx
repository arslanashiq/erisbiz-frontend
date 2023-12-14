import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
// components
import SupplierOverviewTimeline from './SupplierOverviewTimeline';
import SupplierOverviewCharts from './SupplierOverviewCharts';
import SupplierOverviewCard from './SupplierOverviewCard';
import SupplierOverviewPayables from './SupplierOverviewPayables';

function SupplierOverview({
  supplierIncome,
  activityLogDuration,
  supplierDetail,
  supplierActivity,
  handleClickMenu,
}) {
  const currencySymbol = useMemo(
    () => (supplierDetail?.currency_symbol ? supplierDetail?.currency_symbol : 'AED'),
    []
  );
  return (
    <Box className="container-fluid w-100">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5} xl={4}>
          <SupplierOverviewCard supplierDetail={supplierDetail} />
        </Grid>
        <Grid item xs={12} lg={7} xl={8}>
          <SupplierOverviewPayables currencySymbol={currencySymbol} supplierDetail={supplierDetail} />
          <SupplierOverviewCharts
            currencySymbol={currencySymbol}
            supplierDetail={supplierDetail}
            activityLogDuration={activityLogDuration}
            supplierIncome={supplierIncome}
            handleClickMenu={handleClickMenu}
          />
          <SupplierOverviewTimeline supplierActivity={supplierActivity} />
        </Grid>
      </Grid>
    </Box>
  );
}
SupplierOverview.propTypes = {
  supplierIncome: PropTypes.array,
  activityLogDuration: PropTypes.string,
  supplierDetail: PropTypes.object,
  supplierActivity: PropTypes.array,
  handleClickMenu: PropTypes.func,
};
SupplierOverview.defaultProps = {
  supplierDetail: null,
  activityLogDuration: '',
  supplierActivity: [],
  handleClickMenu: () => {},
  supplierIncome: [],
};
export default SupplierOverview;
