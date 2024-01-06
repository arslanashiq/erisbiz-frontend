import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
// components
import { useParams } from 'react-router';
import SupplierOverviewTimeline from './SupplierOverviewTimeline';
import SupplierOverviewCharts from './SupplierOverviewCharts';
import SupplierOverviewCard from './SupplierOverviewCard';
import SupplierOverviewPayables from './SupplierOverviewPayables';
import useSupplierDetail from '../../utilities/custom-hooks/useSupplierDetail';

function SupplierOverview({
  basicInfo,
  supplierIncome,
  activityLogDuration,
  supplierDetail,
  supplierActivity,
  handleClickMenu,
}) {
  const { id } = useParams();
  const currencySymbol = useMemo(
    () => (supplierDetail?.currency_symbol ? supplierDetail?.currency_symbol : 'AED'),
    [supplierDetail]
  );
  return (
    <Box className="container-fluid w-100">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5} xl={4}>
          <SupplierOverviewCard
            currencySymbol={currencySymbol}
            supplierDetail={supplierDetail}
            useDetailHook={useSupplierDetail}
            addNewContactLink={`/pages/accounting/purchase/suppliers/${id}/contact/add`}
          />
        </Grid>
        <Grid item xs={12} lg={7} xl={8}>
          <SupplierOverviewPayables
            currencySymbol={currencySymbol}
            supplierDetail={supplierDetail}
            basicInfo={basicInfo}
          />
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
  basicInfo: PropTypes.object,
};
SupplierOverview.defaultProps = {
  supplierDetail: null,
  activityLogDuration: '',
  supplierActivity: [],
  handleClickMenu: () => {},
  supplierIncome: [],
  basicInfo: {},
};
export default SupplierOverview;
