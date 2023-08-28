import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Svg, Polygon } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 5,
    width: '40%',
  },
  totalItem: {
    fontSize: 9,
    maxWidth: 200,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: [[3, 10]],
    textAlign: 'right',
    fontWeight: 600,
    fontSize: 9,
  },
  headerColumn: {
    flex: 1,
    textAlign: 'left',
  },
  valueColumn: {
    flex: 1,
    textAlign: 'right',
  },
  business: {
    fontSize: 9,
    marginTop: -15,
  },
  totalAmountContainer: {
    marginTop: 8,
    width: '60%',
  },
  totalAmount: {
    flexDirection: 'row',
    fontSize: 9,
    fontWeight: 'bold',
  },
  head: {
    width: '40%',
  },
  value: {
    width: '60%',
  },
  polygon: {
    display: 'flex',
    flexDirection: 'row',
    height: 20,
    marginTop: 5,
  },
});

function TotalDetails({
  subTotal,
  vatTotal,
  grandTotal,
  otherAmount,
  paymentAmount,
  creditApplied,
  amountDue,
  currencySymbol,
  bcyGrandTotal,
  bcyGrandTotalInWords,
  subTotalName,
  isEmpLogo,
}) {
  const bgColor = isEmpLogo ? '#48b2e8' : '#F7E18B';
  return (
    <View style={styles.mainContainer}>
      <View style={styles.totalAmountContainer}>
        {!!bcyGrandTotalInWords && (
          <View>
            {currencySymbol !== 'AED' && (
              <View style={styles.totalAmount}>
                <Text style={styles.head}>Total Amount (In AED):</Text>
                <Text style={styles.value}>AED {bcyGrandTotal}</Text>
              </View>
            )}
            <View style={styles.totalAmount}>
              <Text style={styles.head}>Total Amount in words:</Text>
              <Text style={styles.value}>AED {bcyGrandTotalInWords}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.totalsContainer}>
        <View style={styles.totalItem}>
          <View style={{ width: '94%' }}>
            <View style={[styles.row, { paddingBottom: 0 }]}>
              <View style={styles.headerColumn}>
                <Text>{subTotalName}</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text>
                  {currencySymbol}
                  {subTotal}
                </Text>
              </View>
            </View>
          </View>
          {!!vatTotal && (
            <View style={{ width: '94%' }}>
              <View style={[styles.row, { paddingBottom: 0 }]}>
                <View style={styles.headerColumn}>
                  <Text>VAT Total</Text>
                </View>
                <View style={styles.valueColumn}>
                  <Text>
                    {currencySymbol}
                    {vatTotal}
                  </Text>
                </View>
              </View>
            </View>
          )}
          {!!otherAmount && (
            <View style={{ width: '94%' }}>
              <View style={[styles.row, { paddingBottom: 0 }]}>
                <View style={styles.headerColumn}>
                  <Text>Rounding</Text>
                </View>
                <View style={styles.valueColumn}>
                  <Text>{otherAmount}</Text>
                </View>
              </View>
            </View>
          )}
          <View style={{ width: '94%', paddingBottom: 0 }}>
            <View style={[styles.row, { paddingBottom: 0 }]}>
              <View style={styles.headerColumn}>
                <Text>Total</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text>
                  {currencySymbol}
                  {grandTotal}
                </Text>
              </View>
            </View>
          </View>
          {!!paymentAmount && (
            <View style={{ width: '94%' }}>
              <View style={[styles.row, { paddingBottom: 0 }]}>
                <View style={styles.headerColumn}>
                  <Text>Payment Made</Text>
                </View>
                <View style={styles.valueColumn}>
                  <Text style={{ color: '#FF0000' }}>(-) {paymentAmount}</Text>
                </View>
              </View>
            </View>
          )}
          {!!creditApplied && (
            <View style={{ width: '94%' }}>
              <View style={[styles.row, { paddingBottom: 0 }]}>
                <View style={styles.headerColumn}>
                  <Text>Credit Applied</Text>
                </View>
                <View style={styles.valueColumn}>
                  <Text style={{ color: '#FF0000' }}>(-) {creditApplied}</Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.polygon}>
            <View
              style={[
                styles.row,
                {
                  backgroundColor: bgColor,
                  width: '94%',
                  alignItems: 'center',
                },
              ]}
            >
              <View style={[styles.headerColumn]}>
                <Text>Balance Due</Text>
              </View>
              <View style={[styles.valueColumn]}>
                <Text>
                  {currencySymbol}
                  {amountDue}
                </Text>
              </View>
            </View>
            <View style={{ width: '6%' }}>
              <Svg width="100%" height="100%">
                <Polygon points="0,0 10,10 0,20" fill={bgColor} stroke={bgColor} strokeWidth={0} />
              </Svg>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

TotalDetails.propTypes = {
  subTotal: PropTypes.string.isRequired,
  grandTotal: PropTypes.string.isRequired,
  otherAmount: PropTypes.string.isRequired,
  paymentAmount: PropTypes.string.isRequired,
  creditApplied: PropTypes.string.isRequired,
  amountDue: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  bcyGrandTotal: PropTypes.string.isRequired,
  bcyGrandTotalInWords: PropTypes.string.isRequired,
  vatTotal: PropTypes.string,
  subTotalName: PropTypes.string,
  isEmpLogo: PropTypes.bool,
};

TotalDetails.defaultProps = {
  vatTotal: null,
  subTotalName: 'Sub Total',
  isEmpLogo: false,
};

export default TotalDetails;
