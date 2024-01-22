import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router';
// components
import { useGetSupplierUnusedCreditDetailsQuery } from 'services/private/suppliers';

// import SupplierOverviewTimeline from './SupplierOverviewTimeline';
import SupplierOverviewCharts from './SupplierOverviewCharts';
import SupplierOverviewCard from './SupplierOverviewCard';
import SupplierOverviewPayables from './SupplierOverviewPayables';
import useSupplierDetail from '../../utilities/custom-hooks/useSupplierDetail';
import { supplierUnusedCreditHeadCells } from '../../utilities/head-cells';

function SupplierOverview({
  basicInfo,
  supplierIncome,
  activityLogDuration,
  supplierDetail,
  // supplierActivity,
  handleClickMenu,
  setOpenApplyToBillModal,
  setSelectedUnusedCreditObject,
}) {
  const { id } = useParams();
  const currencySymbol = useSelector(state => state?.user?.company?.currency_detail?.currency_symbol);
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
            payableTitle="Outstanding Payables"
            currencySymbol={currencySymbol}
            supplierDetail={supplierDetail}
            basicInfo={basicInfo}
            headCells={supplierUnusedCreditHeadCells}
            usegetUnUsedCreditQuery={useGetSupplierUnusedCreditDetailsQuery}
            setOpenApplyToBillModal={setOpenApplyToBillModal}
            setSelectedUnusedCreditObject={setSelectedUnusedCreditObject}
          />
          <SupplierOverviewCharts
            currencySymbol={currencySymbol}
            supplierDetail={supplierDetail}
            activityLogDuration={activityLogDuration}
            supplierIncome={supplierIncome}
            handleClickMenu={handleClickMenu}
          />
          {/* <SupplierOverviewTimeline supplierActivity={supplierActivity} /> */}
        </Grid>
      </Grid>
    </Box>
  );
}
SupplierOverview.propTypes = {
  supplierIncome: PropTypes.array,
  activityLogDuration: PropTypes.string,
  supplierDetail: PropTypes.object,
  // supplierActivity: PropTypes.array,
  handleClickMenu: PropTypes.func,
  basicInfo: PropTypes.object,
  setOpenApplyToBillModal: PropTypes.func,
  setSelectedUnusedCreditObject: PropTypes.func,
};
SupplierOverview.defaultProps = {
  supplierDetail: null,
  activityLogDuration: '',
  // supplierActivity: [],
  handleClickMenu: () => {},
  supplierIncome: [],
  basicInfo: {},
  setOpenApplyToBillModal: () => {},
  setSelectedUnusedCreditObject: () => {},
};
export default SupplierOverview;
