import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { DEFAULT_IMG } from 'utilities/constants';

function CustomerDetailOverview({ customer }) {
  const invoiceAddress = useMemo(
    () => [
      {
        title: 'Address 1',
        value: customer.invoice_address_line1,
      },
      {
        title: 'Address 2',
        value: customer.invoice_address_line2,
      },
      {
        title: 'Country',
        value: customer.invoice_country_name,
      },
      {
        title: 'City',
        value: customer.invoice_city,
      },
      {
        title: 'Po Box',
        value: customer.invoice_po_box,
      },
    ],
    [customer]
  );
  const deliveryAddress = useMemo(
    () => [
      {
        title: 'Address 1',
        value: customer.delivery_address_line1,
      },
      {
        title: 'Address 2',
        value: customer.delivery_address_line2,
      },
      {
        title: 'Country',
        value: customer.delivery_country_name,
      },
      {
        title: 'City',
        value: customer.delivery_city,
      },
      {
        title: 'Po Box',
        value: customer.delivery_po_box,
      },
    ],
    [customer]
  );
  return (
    <Box className="grey-bg p-3">
      <Grid container>
        <Grid container item xs={12} lg={6}>
          <Grid item xs={12} lg={4}>
            <Avatar sx={{ height: 100, width: 100 }} src={DEFAULT_IMG} />
          </Grid>
          <Grid item xs={12} lg={8} className="mt-4 mt-lg-0">
            <p className="customer__name">{customer?.customer_name}</p>
            {customer?.email && <p className="customer__contact">{customer.email}</p>}
            {customer?.phone && (
              <p className="customer__contact" dir="ltr">
                {customer.phone}
              </p>
            )}
            {customer?.website && (
              <p className="customer__contact" dir="ltr">
                <a target="blank" href={`https://${customer.website}`}>
                  {customer.website}
                </a>
              </p>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} className="px-4">
          <Grid item xs={12} className="mb-3">
            <h5 className="font-14 font-weight-bold">Other Details</h5>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6} className="clr-grey mb-2">
              <Typography variant="h5" className="font-14">
                {customer.contact_person}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {customer.contact}
            </Grid>
            <Grid item xs={6} className="clr-grey">
              <Typography variant="h5" className="font-14">
                VAT Registration
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {customer.vat_reg_no}
            </Grid>
          </Grid>
          {customer?.trn && (
            <Grid container item xs={12} className="mb-3">
              <Grid item xs={12} lg={4} className="clr-grey">
                TRN
              </Grid>
              <Grid item xs={12} lg={6}>
                {customer.trn}
              </Grid>
            </Grid>
          )}
          {customer?.place_of_supply && (
            <Grid container item xs={12} className="mb-3">
              <Grid item xs={12} lg={4} className="clr-grey">
                Place of Supply
              </Grid>
              <Grid item xs={12} lg={6}>
                {customer.place_of_supply}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Box className="mt-5">
        <h5 className="font-weight-bold">Address Information</h5>
      </Box>
      <Grid container className="mt-2 mb-4">
        <Grid container item xs={12} lg={6}>
          <Grid item xs={12} mb={2} className="border-bottom">
            <h5 className="font-14 font-weight-bold">Invoice Address</h5>
          </Grid>
          {invoiceAddress.map(invoice => (
            <Grid container item xs={12} key={uuid()} mb={2}>
              <Grid item xs={6} className="clr-grey">
                <Typography variant="h5" className="font-14">
                  {invoice.title}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {invoice.value}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid item xs={12} mb={2} className="border-bottom">
            <h5 className="font-14 font-weight-bold">Delivery Address</h5>
          </Grid>
          {deliveryAddress.map(delivery => (
            <Grid container item xs={12} key={uuid()} mb={2}>
              <Grid item xs={6} className="clr-grey">
                <Typography variant="h5" className="font-14">
                  {delivery.title}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {delivery.value}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
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
