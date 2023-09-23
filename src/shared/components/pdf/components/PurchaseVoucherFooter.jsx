import React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { Text, View } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';

function PurchaseVoucherFooter({ orderDetail, keyName, styles }) {
  return (
    orderDetail[keyName] &&
    orderDetail[keyName].map(item => (
      <View key={uuid()} style={styles.tableRow}>
        <View style={styles.tableCol}>
          {item.invoice ? (
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>{item.invoice.invoice_id}</Text>
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
    ))
  );
}

export default PurchaseVoucherFooter;
