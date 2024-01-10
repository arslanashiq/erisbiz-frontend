import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { loadScript } from '@paypal/paypal-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// utilities and components
import getSearchParamsList from 'utilities/getSearchParamsList';
import { plansList } from '../utilities/payment-plans';
import Checkout from './components/Checkout';

const initialValues = {
  'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'subscription',
  vault: true,
};
loadScript(initialValues)
  .then(paypal => {
    console.log(paypal);
  })
  .catch(err => {
    console.error('failed to load the PayPal JS SDK script', err);
  });

function PayPalPaymentPage() {
  const { plan_id: planId } = getSearchParamsList();

  const selectedPlan = useMemo(() => plansList.find(plan => plan.plan_id === planId), [planId]);
  return (
    <Box width="100vw" height="100vh">
      <PayPalScriptProvider options={initialValues}>
        <Grid container width="100%" height="100%" justifyContent="space-between" alignItems="center">
          <Grid container item xs={12} lg={5} justifyContent="center" alignItems="center">
            <Checkout plan={selectedPlan} />
          </Grid>
        </Grid>
      </PayPalScriptProvider>
    </Box>
  );
}

export default PayPalPaymentPage;
