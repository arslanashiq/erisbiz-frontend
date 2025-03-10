import React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { Text, View } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';
import { DATE_FORMAT } from 'utilities/constants';

function ReceiptVoucherFooter({ orderDetail, keyName, styles }) {
  return (
    orderDetail[keyName] &&
    orderDetail[keyName].map(item => (
      <View key={uuid()} style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>
            {moment(item?.invoice?.date).format(DATE_FORMAT)}
          </Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={[styles.tableCell, { textAlign: 'center' }]}>
            {item?.invoice?.invoice_formatted_number}
          </Text>
        </View>
        <View style={styles.tableCol}>
          {item?.invoice?.grand_total && (
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>
              {formatAmount(item.invoice.grand_total)}
            </Text>
          )}
        </View>
        <View style={styles.tableCol}>
          {item?.invoice?.amount_due >= 0 && (
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>
              {formatAmount(item.invoice.amount_due) || 0.0}
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
