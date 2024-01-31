import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import OrderHeader from 'shared/components/order-document/OrderHeader';
import { Grid, Stack, Typography } from '@mui/material';

function CustomReportsDetailHeader({ reportTitle, filterInfo }) {
  const { email, company } = useSelector(state => state.user);
  const { name: companyName, logo: companyLogo, trade_license_number: companyTRN } = company;

  return (
    <>
      <OrderHeader
        companyLogo={companyLogo}
        companyName={companyName}
        companyTRN={companyTRN}
        email={email}
        company={company}
      />
      <Grid item xs={12} mb={5}>
        <Stack alignItems="center" width="100%">
          <Typography color="primary" sx={{ fontWeight: 700, fontSize: 25 }}>
            {reportTitle}
          </Typography>
          <Typography color="primary" sx={{ fontSize: 13 }}>
            {filterInfo}
          </Typography>
        </Stack>
      </Grid>
    </>
  );
}
CustomReportsDetailHeader.propTypes = {
  reportTitle: PropTypes.string,
  filterInfo: PropTypes.string,
};
CustomReportsDetailHeader.defaultProps = {
  reportTitle: '',
  filterInfo: '',
};

export default CustomReportsDetailHeader;
