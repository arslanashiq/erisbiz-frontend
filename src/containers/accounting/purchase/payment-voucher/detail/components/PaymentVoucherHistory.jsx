import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';

function PaymentVoucherHistory({ PaymentVoucher }) {
  return (
    <Grid container className="mt-5">
      <Grid item xs={12}>
        <Typography>Payment History</Typography>
      </Grid>
      <Grid item xs={12} sm={12} style={{ fontSize: 14 }}>
        <Grid item xs={12} style={{ width: '95%', margin: '0 auto' }}>
          <Grid container className="p-2 border-top-bottom">
            <Grid item xs={3}>
              <Typography>Date</Typography>
            </Grid>
            <Grid item sm={9}>
              <Typography>Description</Typography>
            </Grid>
          </Grid>
          <Grid container className="p-2">
            <Grid item sm={3}>
              <Typography>{PaymentVoucher?.payment_date}</Typography>
            </Grid>
            <Grid item sm={9}>
              {PaymentVoucher?.bill_numbers ? (
                <Typography>
                  Payment of amount {PaymentVoucher?.currency_symbol}
                  {PaymentVoucher?.total} paid and applied for {PaymentVoucher?.bill_numbers} by{' '}
                  {PaymentVoucher?.supplier_name}
                </Typography>
              ) : (
                <Typography>
                  Payment of amount {PaymentVoucher?.currency_symbol}
                  {PaymentVoucher?.total} paid by {PaymentVoucher?.supplier_name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
PaymentVoucherHistory.propTypes = {
  PaymentVoucher: PropTypes.object,
};
PaymentVoucherHistory.defaultProps = {
  PaymentVoucher: {},
};

export default PaymentVoucherHistory;
