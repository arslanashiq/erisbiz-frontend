import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';
import groupItems from 'utilities/groupArrayOfItems';
// import palette from 'styles/mui/theme/palette';

const BORDER_COLOR = 'lightgray';
const BORDER_STYLE = '1px solid lightgray';
const COL1_WIDTH = 25;
const COLN_WIDTH = (100 - COL1_WIDTH - 6) / 6;
const boldFont = {
  fontFamily: 'Lato Bold',
};

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    // borderStyle: BORDER_STYLE, removed style as  applying conditionaly
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
    border: '1px solid #c7b671',
    fontWeight: 600,
    fontSize: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 0.6,
  },
  tableCol1Header: {
    width: `${COL1_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tableColHeader: {
    width: `${COLN_WIDTH}'%`,
    borderLeft: BORDER_STYLE,
    borderLeftWidth: 0.5,
    borderTopWidth: 0,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tableColHeaderNoBorder: {
    width: `${COLN_WIDTH}'%`,
    borderTopWidth: 0,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tableColHalfHeader: {
    borderLeft: BORDER_STYLE,
    borderLeftWidth: 0.5,
    borderTopWidth: 0,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: `${COLN_WIDTH / 2}'%`,
  },
  tableGrandTotal: {
    width: '100%',
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    padding: 3,
    flexShrink: 1,
  },
  tableCol1: {
    width: `${COL1_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    paddingTop: 3,
    flexShrink: 1,
  },
  tableCol: {
    width: `${COLN_WIDTH}'%`,
    borderLeft: BORDER_STYLE,
    borderLeftWidth: 0.5,
    borderTopWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 3,
  },

  tableColNoBorder: {
    width: `${COLN_WIDTH}'%`,
    borderTopWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 3,
  },
  tableCell: {
    margin: 5,
    fontSize: 9,
  },
  tableCellDescription: {
    fontSize: 8,
    marginLeft: 5,
    // color: '#727272',
  },
});
function addStr(str, index, stringToAdd) {
  return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}
const wrapValue = value => (!/\s/g.test(value) ? addStr(value, 10, ' ') : value);

const renderItems = (item, itemNumber) => (
  <View key={item.id} style={styles.tableRow}>
    <View style={{ ...styles.tableCol, width: '6%', borderRight: BORDER_STYLE }}>
      <Text style={styles.tableCell}>{itemNumber}</Text>
    </View>
    <View style={styles.tableCol1Header}>
      <Text style={styles.tableCell}>{wrapValue(item.service_type)}</Text>
    </View>

    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{item.num_nights}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{formatAmount(item.unit_price_ex_vat)}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{formatAmount(item.gross_amount)}</Text>
    </View>
    <View style={[styles.tableCol, { width: `${COLN_WIDTH}'%` }]}>
      <Text style={styles.tableCell}>{formatAmount(item.discount)}</Text>
    </View>
    <View style={[styles.tableCol, { width: `${COLN_WIDTH}'%` }]}>
      <Text style={styles.tableCell}>{formatAmount(item.vat_amount)}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{formatAmount(item.net_amount)}</Text>
    </View>
  </View>
);

function Items({ orderDetail, keyName }) {
  const headingsBgColor = '#08517e';
  // const subTotalBgColor = '#f7e18b';
  // const subTotalTxtColor = '#FFFFFF';
  const quotationItems = groupItems(orderDetail[keyName]);
  return (
    <View style={[styles.table, { border: BORDER_STYLE }]}>
      <View style={[styles.tableRow, { backgroundColor: headingsBgColor, color: '#fff' }]}>
        <View style={{ ...styles.tableColHeader, width: '6%' }}>
          <Text style={{ ...styles.tableCell, ...boldFont }}>Sr.#</Text>
        </View>
        <View style={styles.tableCol1Header}>
          <Text style={{ ...styles.tableCell, ...boldFont }}>Item</Text>
        </View>

        <View style={styles.tableColHeader}>
          <Text style={{ ...styles.tableCell, ...boldFont }}>Quantity</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={{ ...styles.tableCell, ...boldFont }}>Unit Price</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={{ ...styles.tableCell, ...boldFont }}>Amount</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={{ ...styles.tableCell, ...boldFont }}>Discount</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={{ ...styles.tableCell, ...boldFont }}>VAT</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={{ ...styles.tableCell, ...boldFont }}>Net Amount</Text>
        </View>
      </View>
      {/* Added to group listed services. */}
      {quotationItems &&
        quotationItems.map(service => (
          <View key={service.service_type} style={{ backgroundColor: '#f7f4f4b6' }}>
            {service.items.map((item, index) => renderItems(item, index + 1))}
          </View>
        ))}
    </View>
  );
}
Items.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyName: PropTypes.string.isRequired,
};

export default Items;
