import React from 'react';
import PropTypes from 'prop-types';
// components
import SupplierOverviewAccordionWrapper from './SupplierOverviewAccordionWrapper';

function SupplierAddress({ address }) {
  return (
    <SupplierOverviewAccordionWrapper title="Address">
      {address.map(item => (
        <div key={item.label} className="row justify-content-center align-items-center mb-3">
          <div className="col-5">
            <h5 className="supplier-overview-title">{item.label}</h5>
          </div>
          <div className="col-7">
            <p className="supplier-overview-value">{item.value}</p>
          </div>
        </div>
      ))}
    </SupplierOverviewAccordionWrapper>
  );
}
SupplierAddress.propTypes = {
  address: PropTypes.array,
};
SupplierAddress.defaultProps = {
  address: [],
};

export default SupplierAddress;
