import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';

const BORDER_COLOR = '#08517e';
const BORDER_STYLE = 'solid';
const COL_WIDTH = 30;

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: BORDER_STYLE,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 15,
    color: '#000000',
    fontStyle: 'light',
    fontWeight: 200,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',

    borderLeft: '1px solid #08517e',
    borderRight: '1px solid #08517e',
    backgroundColor: '#FAFAFA',
  },
  tableColHeader: {
    width: `${COL_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: `${COL_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderRight: 0.5,
    borderTopWidth: 0.5,
    padding: 2,
    borderColor: BORDER_COLOR,
    borderBottomWidth: 1,
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

function JournalVoucher({ orderInfo, orderDetail, keyName }) {
  return (
    <View style={{ marginTop: 20 }}>
      <View>
        <Text style={{ fontSize: 15, color: '#000000', fontWeight: '600' }}>Payment for</Text>
      </View>
      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: '#08517e' }]}>
          {orderInfo.headCells.map(cell => (
            <View key={uuid()} style={[styles.tableColHeader, { textAlign: 'center' }]}>
              <Text style={styles.tableCellHeader}>{cell.label}</Text>
            </View>
          ))}
        </View>
        {orderDetail[keyName] &&
          orderDetail[keyName].map(item => (
            <View key={uuid()} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, { textAlign: 'center' }]}>{item.account_name}</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, { textAlign: 'center' }]}>
                  {orderDetail.currency_symbol} {formatAmount(item.debit || 0)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, { textAlign: 'center' }]}>
                  {orderDetail.currency_symbol} {formatAmount(item.credit || 0)}
                </Text>
              </View>
            </View>
          ))}
        <View key={uuid()} style={styles.tableRow}>
          <View style={{ ...styles.tableCol, textAlign: 'end' }}>
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>Total</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>
              {orderDetail.currency_symbol} {orderDetail.total}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>
              {orderDetail.currency_symbol} {orderDetail.total}
            </Text>
          </View>
        </View>

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

JournalVoucher.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyName: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
};

export default JournalVoucher;
