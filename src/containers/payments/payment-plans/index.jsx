import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PlanCard from './components/PlanCard';
import { plansList } from '../utilities/payment-plans';
import 'styles/payment-plans.scss';

export default function Pricing() {
  return (
    <Box className="plan_card_wrapper">
      <Grid container height="100%" width="100%" alignItems="center" justifyContent="center">
        <Stack textAlign="center" pt={2} pb={2}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
            Simple And Affordable Pricing
          </Typography>
          <p style={{ color: 'white' }}>Choose a plan to suit your business</p>
        </Stack>

        <Grid container spacing={7} item xs={9} lg={11} xl={9}>
          {plansList.map(plan => (
            <PlanCard key={plan.planId} plan={plan} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
