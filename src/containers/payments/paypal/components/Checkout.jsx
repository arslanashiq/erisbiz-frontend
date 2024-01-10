/* eslint-disable quote-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { useSendPaymentStatusMutation } from 'services/private/paypal';
import { useSnackbar } from 'notistack';

function Checkout() {
  const [{ isPending }] = usePayPalScriptReducer();
  const [sendPaymentStatus] = useSendPaymentStatusMutation();
  const { enqueueSnackbar } = useSnackbar();
  const handleCreatePaypalOrder = async (data, actions) => {
    const createOrder = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '84',
            currency_code: 'USD',
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        billing_preference: 'NO_BILLING',
      },
      intent: 'CAPTURE',
    });
    console.log(createOrder, 'createOrder');
    return createOrder;
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

  return (
    <SectionLoader options={[isPending]}>
      <div className="checkout">
        <PayPalButtons
          fundingSource="paypal"
          // createOrder={handleCreatePaypalOrder}
          createSubscription={(_, actions) =>
            actions.subscription.create({ plan_id: 'P-7BT90076842067520MWOV33Y' })
          }
          onApprove={handleOnApprove}
        />
      </div>
    </SectionLoader>
  );
}

export default Checkout;
