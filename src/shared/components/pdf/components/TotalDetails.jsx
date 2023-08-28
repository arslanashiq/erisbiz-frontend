import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Svg, Polygon } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  totalsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 5,
    width: '35%',
  },
  totalItem: {
    fontSize: 10,
    maxWidth: 400,
    width: '100%',
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: [[3, 10]],
    textAlign: 'right',
    fontWeight: 900,
    fontSize: 10,
  },
  headerColumn: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 700,
  },
  valueColumn: {
    flex: 1,
    textAlign: 'right',
  },
  termsHead: {
    fontSize: 12,
  },
  termsText: {
    fontSize: 10,
    width: '50%',
  },
  totalAmountContainer: {
    marginTop: 8,
    width: '65%',
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
});

function TotalDetails({ grandTotal, amountTotal, vatTotal, currency, currencySymbol, subTotalName }) {
  const colorScheme = '#08517e';
  return (
    <View style={styles.mainContainer}>
      <View style={styles.totalsContainer}>
        <View style={styles.totalItem}>
          <View style={{ width: '94%', paddingBottom: 0, marginTop: 10 }}>
            <View style={[styles.row, { paddingBottom: 0 }]}>
              <View style={styles.headerColumn}>
                <Text>{subTotalName}</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text>
                  {currencySymbol}
                  {amountTotal}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: '94%', marginTop: 6 }}>
            <View style={styles.row}>
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 20,
              marginTop: 6,
            }}
          >
            <View
              style={[
                styles.row,
                {
                  backgroundColor: colorScheme,
                  width: '94%',
                  alignItems: 'center',
                  color: '#fff',
                },
              ]}
            >
              <View style={[styles.headerColumn]}>
                <Text>Total ({currency})</Text>
              </View>
              <View style={[styles.valueColumn]}>
                <Text>
                  {currencySymbol}
                  {grandTotal}
                </Text>
              </View>
            </View>
            <View style={{ width: '6%' }}>
              <Svg width="100%" height="100%">
                <Polygon points="0,0 10,10 0,20" fill={colorScheme} stroke={colorScheme} strokeWidth={0} />
              </Svg>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

TotalDetails.propTypes = {
  grandTotal: PropTypes.string.isRequired,
  amountTotal: PropTypes.string.isRequired,
  vatTotal: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  subTotalName: PropTypes.string,
};

TotalDetails.defaultProps = {
  subTotalName: 'Sub Total',
};

export default TotalDetails;
