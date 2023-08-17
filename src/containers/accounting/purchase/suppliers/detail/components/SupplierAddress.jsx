import React from 'react';
import PropTypes from 'prop-types';
import SupplierOverviewAccordionWrapper from './SupplierOverviewAccordionWrapper';

function SupplierAddress({ address }) {
  return (
    <SupplierOverviewAccordionWrapper title="Address">
      <div className="row">
        <p className="item-overview-value">{address}</p>
      </div>
    </SupplierOverviewAccordionWrapper>
  );
}
SupplierAddress.propTypes = {
  address: PropTypes.string.isRequired,
};

export default SupplierAddress;
