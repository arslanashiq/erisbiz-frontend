import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { DEFAULT_IMG } from 'utilities/constants';

function CustomerDetailOverview({ customer }) {
  return (
    <Box className="grey-bg p-3">
      <Grid container>
        <Grid container item xs={12} lg={6}>
          <Grid item xs={12} lg={4}>
            <Avatar sx={{ height: 100, width: 100 }} src={DEFAULT_IMG} />
          </Grid>
          <Grid xs={12} lg={8} className="mt-4 mt-lg-0">
            <p className="customer__name">{customer && customer.company_name}</p>
            {customer && customer.email && <p className="customer__contact">{customer.email}</p>}
            {customer && customer.phone && (
              <p className="customer__contact" dir="ltr">
                {customer.phone}
              </p>
            )}
            {customer && customer.website && (
              <p className="customer__contact" dir="ltr">
                <a target="blank" href={`https://${customer.website}`}>
                  {customer.website}
                </a>
              </p>
            )}
          </Grid>
        </Grid>
        <Grid xs={12} lg={6} className="px-4">
          <Grid xs={12} className="mb-3">
            <h5 className="font-14 font-weight-bold">Other Details</h5>
          </Grid>
          {customer && customer.vat_treatment && (
            <Grid container item xs={12} className="mb-3">
              <Grid xs={12} lg={4} className="clr-grey">
                Tax Treatment
              </Grid>
              <Grid xs={12} lg={6}>
                {customer.vat_treatment}
              </Grid>
            </Grid>
          )}
          {customer && customer.trn && (
            <Grid container item xs={12} className="mb-3">
              <Grid xs={12} lg={4} className="clr-grey">
                TRN
              </Grid>
              <Grid xs={12} lg={6}>
                {customer.trn}
              </Grid>
            </Grid>
          )}
          {customer && customer.place_of_supply && (
            <Grid container item xs={12} className="mb-3">
              <Grid xs={12} lg={4} className="clr-grey">
                Place of Supply
              </Grid>
              <Grid xs={12} lg={6}>
                {customer.place_of_supply}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Box className="border-bottom mt-5 mb-4">
        <h5 className="font-14 font-weight-bold">Address Information</h5>
      </Box>
      {customer && (
        <>
          {customer.address && (
            <Grid container mb={3}>
              <Grid item xs={12} lg={2} className="clr-grey">
                <Typography variant="h5" className="font-14">
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                {customer.address}
              </Grid>
            </Grid>
          )}
          {customer.city && (
            <Grid container mb={3}>
              <Grid item xs={12} lg={2} className="clr-grey">
                <Typography variant="h5" className="font-14">
                  City
                </Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                {customer.city}
              </Grid>
            </Grid>
          )}
          {customer.state && (
            <Grid container mb={3}>
              <Grid item xs={12} lg={2} className="clr-grey">
                <Typography variant="h5" className="font-14">
                  State
                </Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                {customer.state}
              </Grid>
            </Grid>
          )}
          {customer.zipcode && (
            <Grid container mb={3}>
              <Grid item xs={12} lg={2} className="clr-grey">
                <Typography variant="h5" className="font-14">
                  Zipcode
                </Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                {customer.zipcode}
              </Grid>
            </Grid>
          )}
          <Grid container mb={3}>
            <Grid item xs={12} lg={2} className="clr-grey">
              <Typography variant="h5" className="font-14">
                Country
              </Typography>
            </Grid>
            <Grid item xs={12} lg={10}>
              {customer.country || '-'}
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

CustomerDetailOverview.propTypes = {
  customer: PropTypes.object,
};
CustomerDetailOverview.defaultProps = {
  customer: {},
};
export default CustomerDetailOverview;
