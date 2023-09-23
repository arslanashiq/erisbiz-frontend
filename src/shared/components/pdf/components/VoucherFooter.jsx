import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import PurchaseVoucherFooter from './PurchaseVoucherFooter';
import ReceiptVoucherFooter from './ReceiptVoucherFooter';

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

function VoucherFooter({ orderInfo, orderDetail, keyName }) {
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
        {orderInfo.showSaleSectionFooter ? (
          <ReceiptVoucherFooter orderDetail={orderDetail} keyName={keyName} styles={styles} />
        ) : (
          <PurchaseVoucherFooter orderDetail={orderDetail} keyName={keyName} styles={styles} />
        )}

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
  orderInfo: PropTypes.object.isRequired,
};

export default VoucherFooter;
