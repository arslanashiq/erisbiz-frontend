import React from 'react';
import { Box } from '@mui/material';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

function AccountSummary({ basicInfo, personLink, accountSummaryList }) {
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

        {accountSummaryList.map(summary => (
          <Box key={uuid()} className="row  ps-2">
            <Box className="col-sm-6">
              <p>{summary.label}</p>
            </Box>
            <Box className="col-sm-6 text-right">
              <p>{summary.value}</p>
            </Box>
          </Box>
        ))}

        <Box className="row border-top  ps-2">
          <Box className="col-sm-6">
            <p>Balance Due</p>
          </Box>
          <Box className="col-sm-6 text-right">
            <p>{` ${basicInfo.totalBalanceDue || 0}`}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
AccountSummary.propTypes = {
  basicInfo: PropTypes.object,
  personLink: PropTypes.string,
  accountSummaryList: PropTypes.array,
};
AccountSummary.defaultProps = {
  basicInfo: {},
  personLink: '',
  accountSummaryList: [],
};
export default AccountSummary;
