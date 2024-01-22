import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';

function useGetQRCode(orderInfo, orderDetail) {
  const [qrCode, setQRCode] = useState('');

  const getAmount = value => {
    if (value > 0) {
      return value;
    }
    return 0;
  };

  const getQRCodeData = (string, title, data) => {
    let newString = string;
    if (typeof data !== 'undefined') {
      newString += `${title} : ${data},\n`;
    }
    return newString;
  };
  useEffect(() => {
    if (
      orderInfo &&
      orderInfo &&
      Object.keys(orderInfo)?.length > 0 &&
      Object.keys(orderDetail)?.length > 0
    ) {
      let payloadString = '';
      payloadString = getQRCodeData(payloadString, 'Name', orderInfo?.type);
      payloadString = getQRCodeData(payloadString, 'Formatted Number', orderInfo?.formated_order_number);
      payloadString = getQRCodeData(payloadString, 'Date', moment(orderInfo?.date).format(DATE_FORMAT));
      payloadString = getQRCodeData(payloadString, 'Supplier', orderInfo?.invoiceToDetail?.supplier_name);
      payloadString = getQRCodeData(payloadString, 'Customer', orderInfo?.invoiceToDetail?.customer_name);

      if (orderDetail?.without_change_grand_total >= 0) {
        payloadString = getQRCodeData(
          payloadString,
          'Total Amount',
          getAmount(orderDetail?.without_change_grand_total)
        );

        if (orderDetail.amount_due >= 0) {
          payloadString = getQRCodeData(
            payloadString,
            'Payment Made',
            getAmount(orderDetail?.without_change_grand_total) - getAmount(orderDetail.amount_due)
          );
        }
      }
      if (orderDetail.credits_used >= 0) {
        payloadString = getQRCodeData(payloadString, 'Amount Used', getAmount(orderDetail.credits_used));
      }
      if (orderDetail.total >= 0) {
        payloadString = getQRCodeData(payloadString, 'Payment Amount', getAmount(orderDetail.total));
        payloadString = getQRCodeData(
          payloadString,
          'Unused Amount',
          getAmount(orderDetail.unused_amount) - getAmount(orderDetail.refund_payment)
        );
      }

      payloadString = getQRCodeData(payloadString, 'Status', orderDetail?.status);

      QRCode.toDataURL(
        payloadString,

        {
          errorCorrectionLevel: 'H',
        }
      ).then(url => setQRCode(url));
    }
  }, [orderDetail, orderInfo]);
  return { qrCode };
}

export default useGetQRCode;
