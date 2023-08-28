import React from 'react';
import PropTypes from 'prop-types';
import SupplierOverviewTimeline from './SupplierOverviewTimeline';
import SupplierOverviewCharts from './SupplierOverviewCharts';
import SupplierOverviewCard from './SupplierOverviewCard';
// import SupplierOverviewPayables from './SupplierOverviewPayables';

function SupplierOverview({
  supplierIncome,
  activityLogDuration,
  supplierDetail,
  supplierActivity,
  handleClickMenu,
}) {
  return (
    <div className="container-fluid w-100">
      <div className="row">
        <div className="col-12 col-lg-5 col-xl-4">
          <SupplierOverviewCard supplierDetail={supplierDetail} />
        </div>
        <div className="col-12 col-lg-7 col-xl-8 mt-5">
          {/* <SupplierOverviewPayables /> */}
          <SupplierOverviewCharts
            supplierDetail={supplierDetail}
            activityLogDuration={activityLogDuration}
            supplierIncome={supplierIncome}
            handleClickMenu={handleClickMenu}
          />
          <SupplierOverviewTimeline supplierActivity={supplierActivity} />
        </div>
      </div>
    </div>
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
