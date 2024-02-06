/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import palette from 'styles/mui/theme/palette';

export const renderColumn = ({ title, value, className = 'col-6' }) => (
  <Box className={className}>
    <Typography sx={{ fontSize: 14, color: 'black', minWidth: 200 }}>
      <strong style={{ color: palette.primary.main, paddingRight: 3 }}>{title}</strong>
      {value}
    </Typography>
  </Box>
);
function OrderHeader({ companyLogo, companyName, companyTRN, email, company }) {
  const { isTRNAndEmailFitInRow, isPhoneAndLocationFitInRow } = useMemo(() => {
    let TRNAndEmail = false;
    let PhoneAndLocation = false;
    if (companyTRN && email) {
      TRNAndEmail = companyTRN.length + email.length <= 80;
    }
    if (company?.phone && company.location) {
      PhoneAndLocation = company.phone.length + company.location.length <= 45;
    }
    return {
      isTRNAndEmailFitInRow: TRNAndEmail,
      isPhoneAndLocationFitInRow: PhoneAndLocation,
    };
  }, [companyTRN, email, company]);
  return (
    <Grid item container minHeight={150} justifyContent="space-between">
      <Grid item xs={4} lg={4}>
        <img src={companyLogo} alt="" style={{ maxHeight: 145, maxWidth: 250 }} />
      </Grid>
      <Grid item xs={7} justifyContent="space-around">
        <Typography color="primary" sx={{ fontWeight: 'bold', fontSize: 18 }}>
          {companyName}
        </Typography>
        <Divider sx={{ height: '2px', backgroundColor: palette.primary.main, marginBottom: 1 }} />

        <Box className="row">
          {companyTRN &&
            renderColumn({
              title: 'TRN :',
              value: companyTRN,
              className: isTRNAndEmailFitInRow ? 'col-6' : 'col-12',
            })}
          {email &&
            renderColumn({
              title: 'Email :',
              value: email,
              className: isTRNAndEmailFitInRow ? 'col-6' : 'col-12',
            })}
          {company?.phone &&
            renderColumn({
              title: 'Phone :',
              value: company.phone,
              className: isPhoneAndLocationFitInRow ? 'col-6' : 'col-12',
            })}
          {company?.location &&
            renderColumn({
              title: 'Address :',
              value: company.location,
              className: isPhoneAndLocationFitInRow ? 'col-6' : 'col-12',
            })}
        </Box>
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
