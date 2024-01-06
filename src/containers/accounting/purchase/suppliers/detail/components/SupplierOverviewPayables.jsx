import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import {
  supplierOutstandingBalanceTitleStlye,
  supplierOverviewOutstandingBalanceValueStyle,
  supplierOverviewPayableDividerStyle,
  supplierOverviewPayableGridStyle,
} from 'styles/mui/container/accounting/purchase/supplier/detail/components/supplier-overview-payables';
import formatAmount from 'utilities/formatAmount';
import UnusedCreditsDialog from 'shared/components/unused-credits-dialog/UnusedCreditsDialog';

function SupplierOverviewPayables({ currencySymbol, supplierDetail }) {
  const [openUnusedCreditDetailModal, setOpenUnusedCreditDetailModal] = useState(false);

  return (
    <Grid item xs={12} lg={12} sx={supplierOverviewPayableGridStyle}>
      <UnusedCreditsDialog
        open={openUnusedCreditDetailModal}
        handleClose={() => {
          setOpenUnusedCreditDetailModal(false);
        }}
      />
      <Stack className="w-100" direction="row" spacing={3}>
        <Stack className="w-100">
          <h6 style={supplierOutstandingBalanceTitleStlye}>Outstanding Payables</h6>
          <h4 style={{ color: '#b81d1d', fontWeight: 'bold' }}>
            {currencySymbol}
            {formatAmount(supplierDetail?.payables)}
          </h4>
        </Stack>
        <Divider
          orientation="vertical"
          variant="fullWidth"
          sx={supplierOverviewPayableDividerStyle}
          flexItem
        />
        <Stack className="w-100">
          <Stack direction="row" spacing={10} justifyContent="space-between">
            <Typography className="item-overview-title">Unused Credits</Typography>
            <Stack
              sx={{ cursor: supplierDetail?.unused_credits > 0 ? 'pointer' : 'auto' }}
              onClick={() => {
                if (supplierDetail?.unused_credits > 0) {
                  setOpenUnusedCreditDetailModal(true);
                }
              }}
            >
              <Typography sx={supplierOverviewOutstandingBalanceValueStyle}>
                {currencySymbol}
                {formatAmount(supplierDetail?.unused_credits)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={6} justifyContent="space-between">
            <Typography className="item-overview-title">Payment Due Period</Typography>
            <Typography sx={supplierOverviewOutstandingBalanceValueStyle}>
              {supplierDetail?.payment_terms}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {supplierDetail?.opening_balance > 0 && (
        <Typography sx={{ fontSize: 13 }}>
          Inclusive of Outstanding Opening Balance amount {currencySymbol}
          {formatAmount(supplierDetail.opening_balance)}
        </Typography>
      )}
    </Grid>
  );
}

SupplierOverviewPayables.propTypes = {
  supplierDetail: PropTypes.object,
  currencySymbol: PropTypes.string,
};
SupplierOverviewPayables.defaultProps = {
  supplierDetail: [],
  currencySymbol: 'AED',
};
export default SupplierOverviewPayables;
