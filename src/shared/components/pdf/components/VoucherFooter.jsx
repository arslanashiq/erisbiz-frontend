import React from 'react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';

// const BORDER_COLOR = "#D1CACB";
// const BORDER_STYLE = "solid";
const COL_WIDTH = 20;

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    // borderStyle: BORDER_STYLE,
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
    marginTop: 15,
    color: '#000000',
    // fontStyle: "light",
    // fontWeight: 200,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    padding: 2,
    borderBottom: '1px solid #D1CACB',
    borderLeft: '1px solid #D1CACB',
    borderRight: '1px solid #D1CACB',
    backgroundColor: '#FAFAFA',
  },
  tableColHeader: {
    width: `${COL_WIDTH}'%`,
    // borderStyle: BORDER_STYLE,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
  },
  tableCol: {
    width: `${COL_WIDTH}'%`,
    // borderStyle: BORDER_STYLE,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    // borderBottomColor: BORDER_COLOR,
    // borderBottomWidth: 1,
    flexDirection: 'column',
  },
  tableCellHeader: {
    margin: 5,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 10,
    fontWeight: 900,
    color: '#ffffff',
    // backgroundColor:"#000000",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

function VoucherFooter({ orderDetail, keyName }) {
  return (
    <View style={{ marginTop: 20 }}>
      <View>
        <Text style={{ fontSize: 15, color: '#000000', fontWeight: '600' }}>Payment for</Text>
      </View>
      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: '#08517e' }]}>
          <View style={[styles.tableColHeader, { textAlign: 'center' }]}>
            <Text style={styles.tableCellHeader}>Bill Number</Text>
          </View>
          <View style={[styles.tableColHeader, { textAlign: 'center' }]}>
            <Text style={styles.tableCellHeader}>Bill Date</Text>
          </View>
          <View style={[styles.tableColHeader, { textAlign: 'center' }]}>
            <Text style={styles.tableCellHeader}>Bill Amount</Text>
          </View>
          <View style={[styles.tableColHeader, { textAlign: 'center' }]}>
            <Text style={styles.tableCellHeader}>Payment Date</Text>
          </View>
          <View style={[styles.tableColHeader, { textAlign: 'center' }]}>
            <Text style={styles.tableCellHeader}>Payment Amount</Text>
          </View>
        </View>
        {orderDetail[keyName] &&
          orderDetail[keyName].map(item => (
            <View key={uuid()} style={styles.tableRow}>
              <View style={styles.tableCol}>
                {item.bill ? (
                  <Text style={[styles.tableCell, { textAlign: 'center' }]}>{item.bill.bill_num}</Text>
                ) : (
                  <Text style={[styles.tableCell, { textAlign: 'center' }]}>Supplier Opening Balance</Text>
                )}
              </View>
              <View style={styles.tableCol}>
                {item.bill && (
                  <Text style={[styles.tableCell, { textAlign: 'center' }]}>
                    {moment(item.bill.bill_date).format('YYYY-MM-DD')}
                  </Text>
                )}
                {item.supplier && (
                  <Text style={[styles.tableCell, { textAlign: 'center' }]}>
                    {moment(item.supplier.bill_date).format('YYYY-MM-DD')}
                  </Text>
                )}
              </View>
              <View style={styles.tableCol}>
                {item.bill && (
                  <Text style={[styles.tableCell, { textAlign: 'center' }]}>
                    {orderDetail.currency_symbol}
                    {formatAmount(item.bill.grand_total)}
                  </Text>
                )}
                {item.supplier && (
                  <Text style={[styles.tableCell, { textAlign: 'center' }]}>
                    {orderDetail.currency_symbol}
                    {formatAmount(item.supplier.grand_total)}
                  </Text>
                )}
              </View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, { textAlign: 'center' }]}>
                  {moment(item.created_at).format('YYYY-MM-DD')}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, { textAlign: 'center' }]}>
                  {orderDetail.currency_symbol}
                  {formatAmount(item.amount_applied)}
                </Text>
              </View>
            </View>
          ))}
        {!!orderDetail.notes && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 13 }}>Notes</Text>
            <Text style={{ fontSize: 10, marginTop: 5 }}>{orderDetail.notes}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

VoucherFooter.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyName: PropTypes.string.isRequired,
};

export default VoucherFooter;
