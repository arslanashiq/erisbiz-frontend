import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import palette from 'styles/mui/theme/palette';

export const renderCompanyHeaderRow = headerRowData => (
  <Grid container spacing={5}>
    {headerRowData.map(
      column => column.value && (
      <Grid key={`${column.title} ${column.value}`} item xs={column.columns}>
        <Typography noWrap={column.noWrap} sx={{ fontSize: 14, color: 'black' }}>
          <strong style={{ color: palette.primary.main }}>{column.title}: </strong>
          {column.value}
        </Typography>
      </Grid>
      )
    )}
  </Grid>
);
function OrderHeader({ companyLogo, companyName, companyTRN, email, company }) {
  return (
    <Grid item container minHeight={180} justifyContent="space-between">
      <Grid item xs={4} lg={4}>
        <img
          // src="/logo.png"
          src={companyLogo}
          alt=""
          style={{ maxHeight: 150, maxWidth: 250 }}
        />
      </Grid>
      <Grid item xs={7} justifyContent="space-around" mt={2} mb={7}>
        <Typography color="primary" sx={{ fontWeight: 'bold', fontSize: 18 }}>
          {companyName}
        </Typography>
        <Divider sx={{ height: '2px', backgroundColor: palette.primary.main, marginBottom: 1 }} />
        {renderCompanyHeaderRow([
          { title: 'TRN', value: companyTRN, noWrap: true, columns: email ? 5 : 12 },
          { title: 'Email', value: email, noWrap: true, columns: companyTRN ? 7 : 12 },
        ])}
        {renderCompanyHeaderRow([
          { title: 'Phone', value: company.phone, noWrap: true, columns: company.location ? 5 : 12 },
          { title: 'Address', value: company.location, columns: company.phone ? 7 : 12 },
        ])}
      </Grid>
    </Grid>
  );
}

OrderHeader.propTypes = {
  companyLogo: PropTypes.string,
  companyName: PropTypes.string,
  companyTRN: PropTypes.string,
  email: PropTypes.string,
  company: PropTypes.object,
};
OrderHeader.defaultProps = {
  companyLogo: '',
  companyName: '',
  companyTRN: '',
  email: '',
  company: {},
};

export default OrderHeader;
