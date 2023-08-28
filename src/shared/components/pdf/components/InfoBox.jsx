import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  infobox: {
    marginTop: 10,
    backgroundColor: '#F6F6F6',
    padding: 10,
    flexDirection: 'column',
    width: 200,
  },
  row: {
    flexDirection: 'row',
    marginTop: 2,
    justifyContent: 'space-between',
  },
  infoboxText: {
    fontSize: 10,
    alignSelf: 'flex-start',
  },
  infoboxTextName: {
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  heading: {
    fontSize: 10,
    fontWeight: 600,
    marginRight: 5,
  },
});

function InfoBox({ orderInfo }) {
  return (
    <View style={styles.infobox}>
      {orderInfo.supplier && (
        <View style={styles.row}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            Supplier:
          </Text>
          <Text style={styles.infoboxTextName}> {orderInfo.supplier.supplier_name}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.infoboxText}>City</Text>
        <Text style={styles.infoboxText}>{orderInfo.supplier.city}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.infoboxText}>Country</Text>
        <Text style={styles.infoboxText}>{orderInfo.supplier.country}</Text>
      </View>
      {/* {!!trn && <Text style={styles.infoboxText}>{`TRN: ${trn}`}</Text>} */}
    </View>
  );
}

InfoBox.propTypes = {
  orderInfo: PropTypes.object.isRequired,
};

InfoBox.defaultProps = {};

export default InfoBox;
