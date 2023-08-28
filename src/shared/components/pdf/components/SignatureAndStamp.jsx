import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  logo: {
    width: '100%',
    height: 'auto',
  },
  titleWrapper: {
    borderTop: '1px solid #000',
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
  },
});

function StampAndSignature({ stamp, signature }) {
  return (
    <View style={styles.header}>
      <View style={{ width: '17%' }}>
        <Image
          style={styles.logo}
          src={{
            uri: stamp,
            method: 'GET',
            headers: { 'Cache-Control': 'no-cache' },
            body: '',
          }}
          alt=""
        />
        <Image
          style={styles.logo}
          src={{
            uri: signature,
            method: 'GET',
            headers: { 'Cache-Control': 'no-cache' },
            body: '',
          }}
          alt=""
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Stamp & Signature</Text>
        </View>
      </View>
    </View>
  );
}

StampAndSignature.propTypes = {
  stamp: PropTypes.string,
  signature: PropTypes.string,
};

StampAndSignature.defaultProps = {
  stamp: '',
  signature: '',
};

export default StampAndSignature;
