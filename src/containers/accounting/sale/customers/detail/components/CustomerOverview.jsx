import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { useGetCustomerUnusedAmountQuery } from 'services/private/customers';
import { supplierUnusedCreditHeadCells } from 'containers/accounting/purchase/suppliers/utilities/head-cells';
import SupplierOverviewCard from 'containers/accounting/purchase/suppliers/detail/components/SupplierOverviewCard';
import SupplierOverviewCharts from 'containers/accounting/purchase/suppliers/detail/components/SupplierOverviewCharts';
import SupplierOverviewPayables from 'containers/accounting/purchase/suppliers/detail/components/SupplierOverviewPayables';
// import SupplierOverviewTimeline from 'containers/accounting/purchase/suppliers/detail/components/SupplierOverviewTimeline';
import useCustomerDetail from '../custom-hooks/useCustomerDetail';
// components

function CustomerOverview({
  // basicInfo,
  // supplierIncome,
  activityLogDuration,
  customerDetail,
  handleClickMenu,
  // customerActivity,
  setOpenApplyToBillModal,
  setSelectedUnusedCreditObject,
  customerIncome,
}) {
  const { id } = useParams();
  const currencySymbol = useMemo(
    () => (customerDetail?.currency_symbol ? customerDetail?.currency_symbol : 'AED'),
    []
  );
  return (
    <Box className="container-fluid w-100">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5} xl={4}>
          <SupplierOverviewCard
            addNewContactLink={`/pages/accounting/sales/customers/${id}/contact/add`}
            supplierDetail={customerDetail}
            useDetailHook={useCustomerDetail}
          />
        </Grid>
        <Grid item xs={12} lg={7} xl={8}>
          <SupplierOverviewPayables
            payableTitle="Outstanding Receivables"
            currencySymbol={currencySymbol}
            supplierDetail={customerDetail}
            headCells={supplierUnusedCreditHeadCells}
            usegetUnUsedCreditQuery={useGetCustomerUnusedAmountQuery}
            setOpenApplyToBillModal={setOpenApplyToBillModal}
            setSelectedUnusedCreditObject={setSelectedUnusedCreditObject}
            customButtonText="Apply To Invoice"
          />
          <SupplierOverviewCharts
            currencySymbol={currencySymbol}
            supplierDetail={customerDetail}
            activityLogDuration={activityLogDuration}
            handleClickMenu={handleClickMenu}
            supplierIncome={customerIncome}
          />
          {/* <SupplierOverviewTimeline supplierActivity={customerActivity} /> */}
        </Grid>
      </Grid>
    </Box>
  );
}
CustomerOverview.propTypes = {
  // supplierIncome: PropTypes.array,
  activityLogDuration: PropTypes.string,
  customerDetail: PropTypes.object,
  // basicInfo: PropTypes.object,
  handleClickMenu: PropTypes.func,
  // customerActivity: PropTypes.array,
  setOpenApplyToBillModal: PropTypes.func,
  setSelectedUnusedCreditObject: PropTypes.func,
  customerIncome: PropTypes.array,
};
CustomerOverview.defaultProps = {
  customerDetail: null,
  activityLogDuration: '',
  // supplierIncome: [],
  // basicInfo: {},
  handleClickMenu: () => {},
  // customerActivity: [],
  setOpenApplyToBillModal: () => {},
  setSelectedUnusedCreditObject: () => {},
  customerIncome: [],
};
export default CustomerOverview;
