import React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { Text, View } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';

function ReceiptVoucherFooter({ orderDetail, keyName, styles }) {
  return (
    orderDetail[keyName] &&
    orderDetail[keyName].map(item => (
      <View key={uuid()} style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>
            {moment(item?.invoice?.date).format('YYYY-MM-DD')}
          </Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>{item?.invoice?.invoice_id}</Text>
        </View>
        <View style={styles.tableCol}>
          {item?.invoice?.grand_total && (
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>
              {formatAmount(item.invoice.grand_total)}
            </Text>
          )}
        </View>
        <View style={styles.tableCol}>
          {item?.invoice?.amount_due && (
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>
              {formatAmount(item.invoice.amount_due)}
            </Text>
          )}
        </View>
        <View style={styles.tableCol}>
          {item?.amount_applied && (
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>
              {formatAmount(item.amount_applied)}
            </Text>
          )}
        </View>
      </View>
    ))
  );
}

export default ReceiptVoucherFooter;
