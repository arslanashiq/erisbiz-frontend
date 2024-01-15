import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { useSendPaymentStatusMutation } from 'services/private/paypal';
import { useSnackbar } from 'notistack';
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import formatAmount from 'utilities/formatAmount';
import { useNavigate } from 'react-router';

const cardHeadingFont = { fontSize: 16 };
const planSummaryStyleBox = { justifyContent: 'space-between' };
const paymentCardHeadingStyle = { fontSize: 16, fontWeight: 600 };
function Checkout({ plan }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [{ isPending }] = usePayPalScriptReducer();
  const [sendPaymentStatus] = useSendPaymentStatusMutation();

  const { email } = useSelector(state => state.user);

  const handleCreateSubscription = async (_, actions) => {
    const subscription = await actions.subscription.create({ plan_id: plan?.planId });
    return subscription;
  };

  const handleOnApprove = async (data, actions) => {
    try {
      console.log({ data, actions });
      // CHECKING CHECKOUT TYPES
      const payload = { paypal_payment_id: data.subscriptionID };
      const response = await sendPaymentStatus(payload);
      if (response?.error) {
        enqueueSnackbar(response.error, { variant: 'error' });
        return;
      }
      enqueueSnackbar(response?.data?.message || 'Payment Made', { variant: 'success' });
      navigate('/');
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <SectionLoader options={[isPending]}>
      <Card>
        <CardContent>
          <Stack sx={{ width: 400, maxHeight: 500, justifyContent: 'space-between' }}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700 }}>Order Summary</Typography>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 3 }}>
                <Avatar src="" />
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{email}</Typography>
              </Stack>
              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginTop: 2 }}>
                <Typography sx={paymentCardHeadingStyle}>{plan?.title}</Typography>
                <Typography sx={paymentCardHeadingStyle}>$ {formatAmount(Number(plan?.newPrice))}</Typography>
              </Stack>
              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginBottom: 2 }}>
                <Typography sx={cardHeadingFont}>Duration Time</Typography>
                <Typography sx={paymentCardHeadingStyle}>{plan?.duration}</Typography>
              </Stack>
              <Box sx={{ height: '1px', backgroundColor: 'silver' }} />

              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginTop: 3 }}>
                <Typography sx={cardHeadingFont}>SubTotal</Typography>
                <Typography sx={paymentCardHeadingStyle}>$ {formatAmount(Number(plan?.newPrice))}</Typography>
              </Stack>
              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginBottom: 2 }}>
                <Typography sx={cardHeadingFont}>Service Fee</Typography>
                <Typography sx={paymentCardHeadingStyle}>$ {formatAmount(0)}</Typography>
              </Stack>

              <Box sx={{ height: '1px', backgroundColor: 'silver' }} />

              <Stack direction="row" sx={{ ...planSummaryStyleBox, marginTop: 2, marginBottom: 2 }}>
                <Typography sx={paymentCardHeadingStyle}>Total</Typography>
                <Typography sx={paymentCardHeadingStyle}>$ {formatAmount(Number(plan?.newPrice))}</Typography>
              </Stack>
              <Box sx={{ height: '1px', backgroundColor: 'silver' }} />
            </Box>
            <PayPalButtons
              fundingSource="paypal"
              style={{ height: 55 }}
              onCancel={() => {}}
              onError={() => {}}
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
