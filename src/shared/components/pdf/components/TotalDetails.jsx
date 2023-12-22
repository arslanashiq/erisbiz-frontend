import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from '@react-pdf/renderer';
import palette from 'styles/mui/theme/palette';
import formatAmount from 'utilities/formatAmount';

export const boldFont = {
  fontFamily: 'Lato Bold',
};

export const primaryColor = {
  color: palette.primary.main,
};
function TotalDetails({ grandTotal, amountTotal, vatTotal, currencySymbol, discountTotal, orderInfo }) {
  const renderAmount = (title, value, titleStyle) => (
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
      <Text style={{ fontSize: 10, ...titleStyle }}>{formatAmount(value)}</Text>
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
            {currencySymbol} - One hundred and fourty seven only
          </Text>
        </View>

        <View style={{ minWidth: 230, maxWidth: 230 }}>
          {renderAmount('Sub Total', amountTotal + discountTotal)}
          {renderAmount('Discount', discountTotal)}
          {renderAmount('VAT Amount', vatTotal)}
          <View style={{ backgroundColor: palette.primary.main, padding: '3 0' }}>
            {renderAmount('Net Total', grandTotal, { color: 'white' })}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ minWidth: 230, maxWidth: 230 }}>
          {orderInfo.bankDetail && (
            <>
              <Text
                style={{
                  ...primaryColor,
                  ...boldFont,
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                Bank Detail
              </Text>
              {renderBankDetail('Bank Name', 'Meezan Bank')}
              {renderBankDetail('Account Holder Name', 'Muhammad Usman')}
              {renderBankDetail('Account Number / IBAN', 'PK08 MBL 02340109756334')}
              {renderBankDetail('Swift Code', '0124')}
            </>
          )}
        </View>

        <Image src="/qr.png" style={{ width: 100, objectFit: 'fill' }} alt="qr code" />
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
};

TotalDetails.defaultProps = {
  discountTotal: 0,
};

export default TotalDetails;
