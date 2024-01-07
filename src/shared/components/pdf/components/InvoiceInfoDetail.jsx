import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';
import palette from 'styles/mui/theme/palette';
// import { palette, boldFont, primaryColor } from './utlilities/constant';

const boldFont = {
  fontFamily: 'Lato Bold',
};

const primaryColor = {
  color: palette.primary.main,
};
function InvoiceInfoDetail({ orderInfo }) {
  const renderInvoiceInfo = (title, value) => {
    if (value) {
      return (
        <View
          style={{
            flexDirection: 'row',
            maxWidth: 180,
            marginBottom: 2,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              ...boldFont,
              ...primaryColor,
              minWidth: 100,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 11,
            }}
          >
            {value}
          </Text>
        </View>
      );
    }
    return '';
  };

  const customerInfo = useMemo(() => orderInfo.invoiceToDetail || {}, [orderInfo]);
  return (
    <View style={{ marginTop: 40 }}>
      {orderInfo && (
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: palette.primary.main,
            }}
          >
            <Text
              style={{
                fontSize: 35,
                ...boldFont,
                ...primaryColor,
              }}
            >
              {orderInfo.type}
            </Text>
          </View>
          <View
            style={{
              marginTop: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 15,
                  ...boldFont,
                  ...primaryColor,
                }}
              >
                Invoice To
              </Text>
              <View style={{ marginTop: 4 }}>
                {renderInvoiceInfo('TRN', customerInfo.trn)}
                {renderInvoiceInfo('Attention To', customerInfo.attention_to)}
                {renderInvoiceInfo('Supplier', customerInfo.supplier_name)}
                {renderInvoiceInfo('Customer', customerInfo.customer_name)}
                {renderInvoiceInfo('Address', customerInfo.address)}
                {renderInvoiceInfo('City', customerInfo.city)}
                {renderInvoiceInfo('PO Box #', customerInfo.po_box)}
                {renderInvoiceInfo('Country', customerInfo.country)}
              </View>
            </View>
            <View style={{ width: 265 }}>
              <Text
                style={{
                  fontSize: 15,
                  ...boldFont,
                  ...primaryColor,
                }}
              >
                Information
              </Text>
              <View style={{ marginTop: 4 }}>
                {renderInvoiceInfo(`${orderInfo.type} #`, orderInfo.formated_order_number)}
                {renderInvoiceInfo('Date', orderInfo.date)}
                {renderInvoiceInfo('Sale Person', orderInfo.sale_person)}
                {renderInvoiceInfo('Currency', orderInfo.currency_symbol)}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

InvoiceInfoDetail.propTypes = {
  orderInfo: PropTypes.object.isRequired,
};
export default InvoiceInfoDetail;
