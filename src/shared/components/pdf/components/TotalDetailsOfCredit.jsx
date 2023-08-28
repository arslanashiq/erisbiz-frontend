import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Polygon, Svg } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  totalsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  totalItem: {
    fontSize: 9,
    maxWidth: 400,
    width: '38%',
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 10,
    marginBottom: 4,
    textAlign: 'right',
    fontWeight: 600,
    fontSize: 9,
  },
  lastRow: {
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 10,
    textAlign: 'right',
    fontWeight: 600,
    fontSize: 9,
    backgroundColor: '#F7E18B',
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerColumn: {
    flex: 1,
    textAlign: 'right',
  },
  valueColumn: {
    flex: 1,
    textAlign: 'right',
  },
});

// Total Details
const TotalDetails = ({
  subTotal,
  vatTotal,
  otherAmount,
  grandTotal,
  creditsRemaining,
  creditsUsed,
  refundedAmount,
  currencySymbol,
}) => {
  return (
    <View style={styles.totalsContainer}>
      <View style={styles.totalItem}>
        <View style={{ width: '94%' }}>
          <View style={styles.row}>
            <View style={styles.headerColumn}>
              <Text>Sub Total:</Text>
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
            <View style={styles.row}>
              <View style={styles.headerColumn}>
                <Text>VAT Total:</Text>
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
            <View style={styles.row}>
              <View style={styles.headerColumn}>
                <Text>Rounding:</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text>{otherAmount}</Text>
              </View>
            </View>
          </View>
        )}
        <View style={{ width: '94%' }}>
          <View style={styles.row}>
            <View style={styles.headerColumn}>
              <Text>Total:</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text>
                {currencySymbol}
                {grandTotal}
              </Text>
            </View>
          </View>
        </View>
        {refundedAmount !== '0.00' && (
          <View style={{ width: '94%' }}>
            <View style={styles.row}>
              <View style={styles.headerColumn}>
                <Text>Refund:</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text style={{ color: '#FF0000' }}>(-) {refundedAmount}</Text>
              </View>
            </View>
          </View>
        )}
        {creditsUsed !== '0.00' && (
          <View style={{ width: '94%' }}>
            <View style={styles.row}>
              <View style={styles.headerColumn}>
                <Text>Credits Used:</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text style={{ color: '#FF0000' }}>(-) {creditsUsed}</Text>
              </View>
            </View>
          </View>
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 20,
          }}
        >
          <View style={styles.lastRow}>
            <View style={styles.headerColumn}>
              <Text>Credits Remaining:</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text>
                {currencySymbol}
                {creditsRemaining}
              </Text>
            </View>
          </View>
          <View style={{ width: '6%' }}>
            <Svg width="100%" height="100%">
              <Polygon
                points="0,0 10,10 0,20"
                fill="#F7E18B"
                stroke="#F7E18B"
                strokeWidth={0}
              />
            </Svg>
          </View>
        </View>
      </View>
    </View>
  );
};

TotalDetails.propTypes = {
  creditsRemaining: PropTypes.string.isRequired,
  creditsUsed: PropTypes.string.isRequired,
  refundedAmount: PropTypes.string.isRequired,
  grandTotal: PropTypes.string.isRequired,
  subTotal: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  otherAmount: PropTypes.string,
  vatTotal: PropTypes.string,
};

TotalDetails.defaultProps = {
  otherAmount: null,
  vatTotal: null,
};

export default TotalDetails;
