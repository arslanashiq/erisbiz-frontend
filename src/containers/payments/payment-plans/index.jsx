import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import PlanCard from './components/PlanCard';
import { plansList } from '../utilities/payment-plans';

export default function Pricing() {
  return (
    <Box className="main__wrapper">
      <Grid container height="100%" width="100%" alignItems="center" justifyContent="center">
        <Grid container spacing={5} item xs={10} lg={10} xl={8}>
          {plansList.map(plan => (
            <PlanCard key={plan.plan_id} plan={plan} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
