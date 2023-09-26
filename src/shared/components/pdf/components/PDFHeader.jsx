import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import InfoBox from 'shared/components/pdf/components/InfoBox';
import LogoAndCompanyInfo from 'shared/components/pdf/components/LogoAndCompanyInfo';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: -30,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 2,
    justifyContent: 'space-between',
  },
  rowText: {
    fontSize: '12',
    fontWeight: 600,
  },
  rowValueText: {
    fontSize: '10',
    maxWidth: 130,
    textAlign: 'right',
  },
});

function PDFHeader({ orderInfo }) {
  return (
    <View>
      <View style={styles.container}>
        <LogoAndCompanyInfo />
        <View style={{ minWidth: 200, marginTop: 20 }}>
          <View>
            <Text
              style={{
                fontSize: '19',
                fontWeight: 900,
              }}
            >
              {orderInfo.type}
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                fontSize: '12',
                fontWeight: 600,
              }}
            >
              {orderInfo.order_number}
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
            {orderInfo.showCustomOptions ? (
              orderInfo?.box1 &&
              orderInfo.box1.map(option => (
                <View key={uuid()} style={styles.row}>
                  <Text style={styles.rowText}>{option?.label}</Text>
                  <Text style={styles.rowValueText}>{option?.value}</Text>
                </View>
              ))
            ) : (
              <>
                {orderInfo.formated_order_number && (
                  <View style={styles.row}>
                    <Text style={styles.rowText}>Order Number:</Text>
                    <Text style={styles.rowValueText}>{orderInfo.formated_order_number}</Text>
                  </View>
                )}
                {orderInfo.date && (
                  <View style={styles.row}>
                    <Text style={styles.rowText}>Date:</Text>
                    <Text style={styles.rowValueText}>{orderInfo.date}</Text>
                  </View>
                )}

                {orderInfo.location ? (
                  <View style={styles.row}>
                    <Text style={styles.rowText}>Location:</Text>
                    <Text style={styles.rowValueText}>{orderInfo.location}</Text>
                  </View>
                ) : (
                  <View />
                )}
              </>
            )}
          </View>
          <InfoBox orderInfo={orderInfo} />
        </View>
      </View>
    </View>
  );
}

PDFHeader.propTypes = {
  orderInfo: PropTypes.object.isRequired,
  // orderDetail: PropTypes.object.isRequired,
};

export default PDFHeader;
