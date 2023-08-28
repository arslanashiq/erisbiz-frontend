import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const BORDER_COLOR = '#c7b671';
const BORDER_STYLE = 'none';
const COLN_WIDTH = 100 / 3;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: BORDER_STYLE,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol1Header: {
    width: `${COLN_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: `${COLN_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'right',
  },
  tableCol1: {
    width: `${COLN_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  tableCol: {
    width: `${COLN_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    flexDirection: 'column',
    textAlign: 'right',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
  },
  tableCell: {
    margin: 5,
    fontSize: 9,
    fontWeight: 600,
  },
  tableCellSubText: {
    margin: 5,
    fontSize: 8,
  },
});

const TaxSummary = ({
  data,
  vatTotalAed,
  amountTotalAed,
  currency,
  aedConversionRate,
  isEmpLogo,
}) => (
  <View style={styles.container}>
    <View>
      {currency === 'AED' ? (
        <Text style={{ fontSize: 12, color: '#000000' }}>Tax Summary</Text>
      ) : (
        <Text style={{ fontSize: 12, color: '#000000' }}>
          Tax Summary (1 {currency} = {aedConversionRate} AED)
        </Text>
      )}
    </View>
    <View style={styles.table}>
      <View
        style={[
          styles.tableRow,
          {
            backgroundColor: isEmpLogo ? '#48b2e8' : '#F7E18B',
            color: '#000000',
            fontWeight: 600,
          },
        ]}
      >
        <View style={styles.tableCol1Header}>
          <Text style={styles.tableCellHeader}>Tax Details</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Taxable Amount (AED)</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Tax Amount (AED)</Text>
        </View>
      </View>
      {data.map(item => (
        <View key={item.id} style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text style={[styles.tableCell, { color: '#000000' }]}>
              {item.vat_rate_name}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text
              style={[styles.tableCell, { textAlign: 'right', color: 'gray' }]}
            >
              {item.gross_amount}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text
              style={[styles.tableCell, { textAlign: 'right', color: 'gray' }]}
            >
              {item.vat_amount}
            </Text>
          </View>
        </View>
      ))}
      <View style={[styles.tableRow, { fontWeight: 600 }]}>
        <View style={[styles.tableCol1, { borderRightWidth: 0 }]}>
          <Text style={[styles.tableCell, { color: '#000000' }]}>Total</Text>
        </View>
        <View style={styles.tableCol}>
          <Text
            style={[
              styles.tableCell,
              { textAlign: 'right', color: 'gray', fontWeight: 600 },
            ]}
          >
            AED{amountTotalAed}
          </Text>
        </View>
        <View style={styles.tableCol}>
          <Text
            style={[
              styles.tableCell,
              { textAlign: 'right', color: 'gray', fontWeight: 'bold' },
            ]}
          >
            AED{vatTotalAed}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
TaxSummary.defaultProps = {
  isEmpLogo: false,
};

TaxSummary.propTypes = {
  data: PropTypes.array.isRequired,
  amountTotalAed: PropTypes.string.isRequired,
  vatTotalAed: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  isEmpLogo: PropTypes.bool,
  aedConversionRate: PropTypes.number.isRequired,
};

export default TaxSummary;
