import React from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import {
  supplierOverviewPayableDividerStyle,
  supplierOverviewPayableGridStyle,
} from 'styles/mui/container/accounting/purchase/supplier/detail/components/supplier-overview-payables';

function SupplierOverviewPayables() {
  return (
    <Grid sx={supplierOverviewPayableGridStyle}>
      <Stack className="w-100" direction="row" spacing={3}>
        <Stack className="w-100">
          <h6>Outstanding Payables</h6>
          <h3>CNH0.00</h3>
        </Stack>
        <Divider
          orientation="vertical"
          variant="fullWidth"
          sx={supplierOverviewPayableDividerStyle}
          flexItem
        />
        <Stack className="w-100">
          <Stack direction="row" spacing={10} justifyContent="space-between">
            <Typography>Unused Credits</Typography>
            <Typography>CNH40.50</Typography>
          </Stack>
          <Stack direction="row" spacing={6} justifyContent="space-between">
            <Typography>Payment Due Period</Typography>
            <Typography>Net 0</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography variant="body2">Inclusive of Outstanding Opening Balance amount CNH10.00</Typography>
    </Grid>
  );
}

export default SupplierOverviewPayables;
