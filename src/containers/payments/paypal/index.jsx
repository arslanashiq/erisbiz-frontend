import React, { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import { loadScript } from '@paypal/paypal-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// utilities and components
import getSearchParamsList from 'utilities/getSearchParamsList';
import { plansList } from '../utilities/payment-plans';
import Checkout from './components/Checkout';

const initialValues = {
  'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: 'USD',
  // intent: 'capture',
  // vault: true,
};
loadScript(initialValues)
  .then(() => {
    // console.log(paypal);
  })
  .catch(() => {
    // console.error('failed to load the PayPal JS SDK script', err);
  });

function PayPalPaymentPage() {
  const { plan_id: planId } = getSearchParamsList();

  const selectedPlan = useMemo(() => plansList.find(plan => plan.planId === planId), [planId]);
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <PayPalScriptProvider options={initialValues}>
        <Stack direction="row">
          <Checkout plan={selectedPlan} />
        </Stack>
      </PayPalScriptProvider>
    </Box>
  );
}

export default PayPalPaymentPage;
