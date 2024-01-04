import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
// components
import SupplierOverviewAccordionWrapper from './SupplierOverviewAccordionWrapper';

function SupplierAddress({ address }) {
  return address.map(singleAddress => (
    <SupplierOverviewAccordionWrapper key={singleAddress.name} title={singleAddress.name}>
      {singleAddress.data.map(item => (
        <Box key={item.label} className="row justify-content-center align-items-center mb-3">
          <Box className="col-5">
            <h5 className="supplier-overview-title">{item.label}</h5>
          </Box>
          <Box className="col-7">
            <p className="supplier-overview-value">{item.value}</p>
          </Box>
        </Box>
      ))}
    </SupplierOverviewAccordionWrapper>
  ));
}
SupplierAddress.propTypes = {
  address: PropTypes.array,
};
SupplierAddress.defaultProps = {
  address: [],
};

export default SupplierAddress;
