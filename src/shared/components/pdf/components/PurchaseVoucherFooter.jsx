import React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { Text, View } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';
import { DATE_FORMAT } from 'utilities/constants';

function PurchaseVoucherFooter({ orderDetail, keyName, styles }) {
  const getName = item => {
    if (item?.bill) {
      return item?.bill?.bill_num;
    }
    return 'Opening Balance';
  };
  return (
    orderDetail[keyName] &&
    orderDetail[keyName].map(item => (
      <View key={uuid()} style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>
            {moment(item?.bill?.bill_date || item.created_at).format(DATE_FORMAT)}
          </Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>{getName(item)}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>{item?.bill?.pur_order_num || '-'}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>
            {orderDetail.currency_symbol}
            {formatAmount(item?.bill?.grand_total || item.supplier?.grand_total)}
          </Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>
            {orderDetail.currency_symbol}
            {formatAmount(item?.bill?.amount_due || item.supplier?.amount_due)}
          </Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>
            {orderDetail.currency_symbol}
            {formatAmount(item.amount_applied)}
          </Text>
        </View>
      </View>
    ))
  );
}

export default PurchaseVoucherFooter;
