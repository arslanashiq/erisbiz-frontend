import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function CustomerAccountSummary({ currencySymbol, basicInfo, personLink }) {
  return (
    <Box className="d-flex justify-content-between">
      <Box className="d-flex align-items-center">
        <Box className="w-100">
          <p className="font-weight-bold m-0 p-0">To</p>
          <a href={personLink} className="font-weight-bold m-0 p-0">
            {basicInfo.supplierName}
          </a>
          <p className="m-0 p-0">{basicInfo.supplierAddress}</p>
          <p className="m-0 p-0">{basicInfo.supplierCity}</p>
          <p className="m-0 p-0">{basicInfo.supplierState}</p>
          <p className="m-0 p-0">{basicInfo.supplierCountry}</p>
          {basicInfo.trn && <p className="m-0 p-0 text-nowrap">TRN: {basicInfo.trn}</p>}
        </Box>
      </Box>
      <Box className="w-50">
        <Box className="bg-grey py-2 px-2">
          <strong>Account Summary</strong>
        </Box>
        {basicInfo.filterType !== 'outstanding' && (
          <Box className="row ps-2">
            <Box className="col-sm-6">
              <p>Opening Balance</p>
            </Box>
            <Box className="col-sm-6 text-right">
              <p>
                {currencySymbol}
                {` ${basicInfo.openingBalance || 0}`}
              </p>
            </Box>
          </Box>
        )}
        <Box className="row  ps-2">
          <Box className="col-sm-6">
            <p>Invoice Amount</p>
          </Box>
          <Box className="col-sm-6 text-right">
            <p>
              {currencySymbol}
              {` ${basicInfo.totalBilledAmount || 0}`}
            </p>
          </Box>
        </Box>
        <Box className="row  ps-2">
          <Box className="col-sm-6">
            <p>Amount Received</p>
          </Box>
          <Box className="col-sm-6 text-right">
            <p>
              {currencySymbol}
              {` ${basicInfo.totalPaymentAmount || 0}`}
            </p>
          </Box>
        </Box>
        <Box className="row border-top  ps-2">
          <Box className="col-sm-6">
            <p>Balance Due</p>
          </Box>
          <Box className="col-sm-6 text-right">
            <p>
              {currencySymbol}
              {` ${basicInfo.totalBalanceDue || 0}`}
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
CustomerAccountSummary.propTypes = {
  currencySymbol: PropTypes.string,
  basicInfo: PropTypes.object,
  personLink: PropTypes.string,
};
CustomerAccountSummary.defaultProps = {
  currencySymbol: 'AED',
  basicInfo: {},
  personLink: '',
};
export default CustomerAccountSummary;
