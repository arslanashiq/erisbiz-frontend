import React from 'react';
import PropTypes from 'prop-types';
import SupplierOverviewAccordionWrapper from './SupplierOverviewAccordionWrapper';

function SupplierOtherInfo({ otherInfo }) {
  return (
    <SupplierOverviewAccordionWrapper title="Other Details">
      <div className="row supplier-overview-wrapper">
        {otherInfo.map(key => (
          <>
            <div className="col-5 mb-3">
              <h5 className="supplier-overview-title">{key.label}</h5>
            </div>
            <div className="col-7  mb-3">
              <p className={`supplier-overview-value ${key.className}`}>{key.value}</p>
            </div>
          </>
        ))}
      </div>
    </SupplierOverviewAccordionWrapper>
  );
}
SupplierOtherInfo.propTypes = {
  otherInfo: PropTypes.array.isRequired,
};

export default SupplierOtherInfo;
