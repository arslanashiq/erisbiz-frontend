/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';
import groupItems from 'utilities/groupArrayOfItems';

const BORDER_COLOR = '#08517e';
const BORDER_STYLE = '1px solid #08517e';
const COL1_WIDTH = 25;
const COLN_WIDTH = (100 - COL1_WIDTH) / 7;

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    // borderStyle: BORDER_STYLE, removed style as  applying conditionaly
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5,
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

const renderItems = item => (
  <View key={item.id} style={styles.tableRow}>
    <View style={styles.tableCol1Header}>
      <Text style={styles.tableCell}>{wrapValue(item.service_type)}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{item.currency_symbol}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{item.num_nights}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{item.unit_price_ex_vat}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{formatAmount(item.gross_amount)}</Text>
    </View>
    <View style={[styles.tableCol, { width: `${COLN_WIDTH}'%` }]}>
      <Text style={styles.tableCell}>{item.discount}</Text>
    </View>
    <View style={[styles.tableCol, { width: `${COLN_WIDTH}'%` }]}>
      <Text style={styles.tableCell}>{item.vat_amount}</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{formatAmount(item.net_amount)}</Text>
    </View>
  </View>
);

function Items({ orderDetail, subTotalName, keyName }) {
  const headingsBgColor = '#08517e';
  // const subTotalBgColor = '#f7e18b';
  // const subTotalTxtColor = '#FFFFFF';
  const quotationItems = groupItems(orderDetail[keyName]);
  return (
    <View style={[styles.table, { border: BORDER_STYLE }]}>
      <View style={[styles.tableRow, { backgroundColor: headingsBgColor, color: '#fff' }]}>
        <View style={styles.tableCol1Header}>
          <Text style={styles.tableCell}>Item</Text>
        </View>

        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Currency</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Quantity</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Units</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Discount</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>VAT</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCell}>Gross Amount</Text>
        </View>
      </View>
      {/* Added to group listed services. */}
      {quotationItems &&
        quotationItems.map(service => (
          <View key={service.service_type}>{service.items.map(item => renderItems(item))}</View>
        ))}

      <View style={styles.tableRow}>
        <View style={styles.tableCol1Header}>
          <Text style={styles.tableCell}>{`${subTotalName} (${orderDetail.currency_symbol})`}</Text>
        </View>
        <View style={styles.tableColHeaderNoBorder}>
          <Text style={styles.tableColNoBorder} />
        </View>
        <View style={styles.tableColHeaderNoBorder}>
          <Text style={styles.tableColNoBorder} />
        </View>
        <View style={styles.tableColHeaderNoBorder}>
          <Text style={styles.tableColNoBorder} />
        </View>
        <View style={[styles.tableCol, { width: `${COLN_WIDTH}'%` }]}>
          <Text style={styles.tableCell}>{orderDetail.without_change_amount_total}</Text>
        </View>
        <View style={[styles.tableCol, { width: `${COLN_WIDTH}'%` }]}>
          <Text style={styles.tableCell}>{orderDetail.without_change_discount_total}</Text>
        </View>
        <View style={[styles.tableCol, { width: `${COLN_WIDTH}'%` }]}>
          <Text style={styles.tableCell}>{orderDetail.without_change_vat_total}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{orderDetail.without_change_grand_total}</Text>
        </View>
      </View>
    </View>
  );
}
Items.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  subTotalName: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
};
// Items.defaultProps = {

// };

export default Items;
