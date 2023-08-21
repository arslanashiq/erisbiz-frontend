import React from 'react';
import PropTypes from 'prop-types';
import SupplierOverviewTimeline from './SupplierOverviewTimeline';
import SupplierOverviewCharts from './SupplierOverviewCharts';
import SupplierOverviewCard from './SupplierOverviewCard';
import SupplierOverviewPayables from './SupplierOverviewPayables';

function SupplierOverview({ supplierDetail }) {
  const graphData = [
    {
      name: 'Jan 2023',
      CNH: 0,
      amt: 0,
    },
    {
      name: 'Feb 2023',
      CNH: 0,
      amt: 0,
    },
    {
      name: 'Mar 2023',
      CNH: 0,
      amt: 0,
    },
    {
      name: 'Apr 2023',
      CNH: 0,
      amt: 0,
    },
    {
      name: 'May 2023',
      CNH: 0,
      amt: 0,
    },
    {
      name: 'Jun 2023',
      CNH: 0,
      amt: 0,
    },
    {
      name: 'Jul 2023',
      CNH: 0,
      amt: 0,
    },
    {
      name: 'Aug 2023',
      CNH: 10,
      amt: 10,
    },
  ];
  return (
    <div className="container-fluid w-100">
      <div className="row">
        <div className="col-12 col-lg-5 col-xl-4">
          <SupplierOverviewCard supplierDetail={supplierDetail} />
        </div>
        <div className="col-12 col-lg-7 col-xl-8 mt-5">
          <SupplierOverviewPayables />
          <SupplierOverviewCharts graphData={graphData} />
          <SupplierOverviewTimeline />
        </div>
      </div>
    </div>
  );
}
SupplierOverview.propTypes = {
  supplierDetail: PropTypes.object,
};
SupplierOverview.defaultProps = {
  supplierDetail: null,
};
export default SupplierOverview;
