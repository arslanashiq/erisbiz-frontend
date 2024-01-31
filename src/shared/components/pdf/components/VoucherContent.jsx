import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // borderBottom: "1px solid #eee",
    // paddingBottom: 35,
    paddingTop: 20,
  },
  heading: {
    fontSize: 12,
    // borderBottom: "1px solid #eee",
    alignSelf: 'center',
    marginBottom: 20,
    fontStyle: 'light',
    fontWeight: 200,
  },
  content: {
    flexDirection: 'row',
    marginTop: 20,
  },
  column1: {
    flexDirection: 'column',
    width: '70%',
    justifyContent: 'space-between',
  },
  column2: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: '30%',
    marginTop: 30,
  },
  info: {
    flexDirection: 'row',
  },
  infoHeader: {
    flexDirection: 'column',
    width: '45%',
  },
  infoValue: {
    flexDirection: 'column',
    // width: "65%",
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
    // borderBottom: "1px solid #eee",
  },
  headingText: {
    // color: "#999",
    color: '#000000',
    fontSize: 11,
    marginBottom: 10,
  },
  valueText: {
    fontSize: 11,
    borderBottom: '1px solid #eee',
    fontWeight: 600,
    color: '#808080',
    marginBottom: 10,
  },
  amountBox: {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#063D5F',
    width: '100%',
    padding: '28px 5px',
    alignSelf: 'flex-end',
  },
  clientName: {
    fontSize: 12,
    fontWeight: 600,
    color: '#3EA3FC',
  },
  overPaymentContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
    paddingVertical: 10,
    marginTop: 20,
    fontSize: 10,
  },
  overPaymentText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#808080',
    marginBottom: 5,
  },
});

function VoucherContent({ orderDetail }) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <View style={styles.info}>
              <View style={styles.infoHeader}>
                <Text style={styles.headingText}>Payment Date</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={styles.valueText}>{orderDetail.payment_date}</Text>
              </View>
            </View>
            {orderDetail.reference_num !== '' && (
              <View style={styles.info}>
                <View style={styles.infoHeader}>
                  <Text style={styles.headingText}>Reference Number</Text>
                </View>
                <View style={styles.infoValue}>
                  <Text style={styles.valueText}>{orderDetail.reference_num}</Text>
                </View>
              </View>
            )}
            <View style={styles.info}>
              <View style={styles.infoHeader}>
                <Text style={styles.headingText}>Payment Method</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={styles.valueText}>{orderDetail.payment_mode}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.infoHeader}>
                <Text style={styles.headingText}>Paid Through</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={styles.valueText}>{orderDetail.chart_of_account_name}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.infoHeader}>
                <Text style={{ ...styles.headingText }}>Amount Paid</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={[styles.valueText, { width: 348 }]}>{formatAmount(orderDetail.total)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.column2}>
          <View style={styles.amountBox}>
            <Text style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>Amount Paid</Text>
            <Text style={{ fontSize: 17, fontWeight: 600, color: '#FFFFFF' }}>
              {formatAmount(orderDetail.total)}
            </Text>
          </View>
        </View>
        {orderDetail.over_payment > 0 && (
          <View style={styles.overPaymentContainer}>
            <Text style={styles.overPaymentText}>Overpayment</Text>
            <Text>{formatAmount(orderDetail.over_payment)}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

VoucherContent.propTypes = {
  orderDetail: PropTypes.object,
};
VoucherContent.defaultProps = {
  orderDetail: {},
};

export default VoucherContent;
