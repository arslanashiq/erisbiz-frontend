/* eslint-disable quote-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { useSendPaymentStatusMutation } from 'services/private/paypal';
import { useSnackbar } from 'notistack';
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Checkout({ plan }) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [sendPaymentStatus] = useSendPaymentStatusMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateSubscription = async (_, actions) => {
    const subscription = await actions.subscription.create({ plan_id: 'P-7BT90076842067520MWOV33Y' });
    return subscription;
  };

  const handleOnApprove = async (data, actions) => {
    try {
      // CHECKING CHECKOUT TYPES
      const payload = { paypal_payment_id: data.subscriptionID };
      const response = await sendPaymentStatus(payload);
      if (response?.error) {
        enqueueSnackbar(response.error, { variant: 'error' });
        return;
      }
      enqueueSnackbar(response?.data?.message || 'Payment Made', { variant: 'success' });
    } catch (error) {
      console.log(error);
    }
  };
  const { email } = useSelector(state => state.user);
  console.log(plan);
  const planSummaryStyleBox = { justifyContent: 'space-between' };
  const planSummaryStyle = { justifyContent: 'space-between', padding: '5px 0px' };
  return (
    <SectionLoader options={[isPending]}>
      <Card>
        <CardContent>
          <Stack sx={{ width: 400, height: 300, justifyContent: 'space-between' }}>
            <Box>
              <Typography>Order Summary</Typography>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 3 }}>
                <Avatar src="" />
                <Typography>{email}</Typography>
              </Stack>
              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginTop: 2 }}>
                <Typography>{plan?.title}</Typography>
                <Typography>{plan?.price}</Typography>
              </Stack>
              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginBottom: 2 }}>
                <Typography>Delivery Time</Typography>
                <Typography>{plan?.duration}</Typography>
              </Stack>
              <Box sx={{ height: 1.1, backgroundColor: 'silver' }} />

              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginTop: 3 }}>
                <Typography>SubTotal</Typography>
                <Typography>{plan?.price}</Typography>
              </Stack>
              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginBottom: 2 }}>
                <Typography>Service Fee</Typography>
                <Typography>0</Typography>
              </Stack>
              <Box sx={{ height: 1.1, backgroundColor: 'silver' }} />
              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginBottom: 2 }}>
                <Typography>Total</Typography>
                <Typography>0</Typography>
              </Stack>
            </Box>
            <PayPalButtons
              fundingSource="paypal"
              style={{ height: 55 }}
              // createOrder={handleCreatePaypalOrder}
              createSubscription={handleCreateSubscription}
              onApprove={handleOnApprove}
            />
          </Stack>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

Checkout.propTypes = {
  plan: PropTypes.object.isRequired,
};

export default Checkout;
