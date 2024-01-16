import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from '@react-pdf/renderer';
import palette from 'styles/mui/theme/palette';
import formatAmount, { handleGetAmountInWords } from 'utilities/formatAmount';

export const boldFont = {
  fontFamily: 'Lato Bold',
};

export const primaryColor = {
  color: palette.primary.main,
};
function TotalDetails({
  grandTotal,
  amountTotal,
  vatTotal,
  currencySymbol,
  discountTotal,
  orderInfo,
  orderDetail,
}) {
  const getTotalAmount = () => {
    let amount = orderDetail.without_change_grand_total;
    if (orderDetail?.refunded_amount) amount -= orderDetail.refunded_amount;
    if (orderDetail?.payment_amount) amount -= orderDetail.payment_amount;
    if (orderDetail?.credits_used) amount -= orderDetail.credits_used;
    if (orderDetail?.credit_applied) amount -= orderDetail.credit_applied;

    return amount;
  };
  const renderAmount = (title, value, titleStyle, valueStyle) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10',
        marginBottom: 3,
      }}
    >
      <Text
        style={{
          fontSize: 13,
          minWidth: 130,
          ...primaryColor,
          ...boldFont,
          ...titleStyle,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 10, ...titleStyle, ...valueStyle }}>{formatAmount(value)}</Text>
    </View>
  );
  const renderBankDetail = (title, value, titleStyle) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          minWidth: 180,
          ...primaryColor,
          ...titleStyle,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          ...primaryColor,
          ...titleStyle,
        }}
      >
        {value}
      </Text>
    </View>
  );
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          margin: '25 0',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ minWidth: 230, maxWidth: 230 }}>
          <Text style={{ ...primaryColor, ...boldFont, fontSize: 13 }}>Total Amount in Words</Text>
          <Text style={{ ...primaryColor, fontSize: 11, marginTop: 20 }}>
            {currencySymbol} - {handleGetAmountInWords(grandTotal)}
          </Text>
        </View>

        <View style={{ minWidth: 230, maxWidth: 230 }}>
          {renderAmount('Sub Total', amountTotal)}
          {renderAmount('Total Discount', discountTotal)}
          {renderAmount('VAT Amount', vatTotal)}
          {/* refunded */}
          {orderDetail?.refunded_amount > 0 &&
            renderAmount('Refunded', `(-)${orderDetail.refunded_amount}`, {}, { color: 'red' })}
          {/* credit used */}
          {orderDetail?.credits_used > 0 &&
            renderAmount('Credits Used', `(-)${orderDetail.credits_used}`, {}, { color: 'red' })}
          {/* credit applied */}
          {orderDetail?.credit_applied > 0 &&
            renderAmount('Credit Applied', `(-)${orderDetail.credit_applied}`, {}, { color: 'red' })}
          {/* payment made */}
          {orderDetail?.payment_amount > 0 &&
            renderAmount('Payment Made', `(-)${orderDetail.payment_amount}`, {}, { color: 'red' })}

          <View style={{ backgroundColor: palette.primary.main, padding: '3 0' }}>
            {renderAmount('Net Total', getTotalAmount(), { color: 'white' })}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ minWidth: 230, maxWidth: 230 }}>
          {orderInfo?.bankDetail?.bank_name && (
            <>
              <Text
                style={{
                  ...primaryColor,
                  ...boldFont,
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                Bank Details:
              </Text>
              {renderBankDetail('Bank Name', orderInfo?.bankDetail?.bank_name)}
              {renderBankDetail('Account Holder Name', orderInfo?.bankDetail?.account_holder_name)}
              {renderBankDetail('Account Number / IBAN', orderInfo?.bankDetail?.IBAN)}
              {renderBankDetail('Swift Code', orderInfo?.bankDetail?.swift_code)}
            </>
          )}
        </View>

        <Image src={orderInfo?.QRCode || '/qr.png'} style={{ width: 100, objectFit: 'fill' }} alt="qr code" />
      </View>
    </View>
  );
}

TotalDetails.propTypes = {
  grandTotal: PropTypes.number.isRequired,
  orderInfo: PropTypes.object.isRequired,
  amountTotal: PropTypes.number.isRequired,
  vatTotal: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  discountTotal: PropTypes.number,
  orderDetail: PropTypes.object,
};

TotalDetails.defaultProps = {
  discountTotal: 0,
  orderDetail: {},
};

export default TotalDetails;
