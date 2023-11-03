import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
// components
import SupplierOverviewAccordionWrapper from './SupplierOverviewAccordionWrapper';

function SupplierOtherInfo({ otherInfo }) {
  return (
    <SupplierOverviewAccordionWrapper title="Other Details">
      <Box className="row supplier-overview-wrapper">
        {otherInfo.map(key => (
          <Box key={key.label} className="row">
            <Box className="col-5 mb-3">
              <h5 className="supplier-overview-title">{key.label}</h5>
            </Box>
            <Box className="col-7  mb-3">
              <p className={`supplier-overview-value ${key.className}`}>{key.value}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </SupplierOverviewAccordionWrapper>
  );
}
SupplierOtherInfo.propTypes = {
  otherInfo: PropTypes.array.isRequired,
};

export default SupplierOtherInfo;
