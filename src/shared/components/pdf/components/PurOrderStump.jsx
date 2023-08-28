import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  mainWrapper: {
    paddingTop: 30,
  },
  signleStampMainWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    padding: 30,
  },
  stampsMainWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  stampContentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px 0px',
  },
  contentHeadingStyle: {
    fontSize: '12',
    fontWeight: 600,
  },
  contentValueStyle: {
    paddingLeft: 5,
    fontSize: 10,
  },
  stampWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // stampWrapper1: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'flex-end',
  //   alignSelf: 'flex-end',
  // },
  logo: {
    width: '100px',
    height: '100px',
  },
  titleWrapper: {
    borderTop: '1px solid #000',
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    paddingTop: 5,
  },
});

function StampAndSignature({
  stamp,
  signature,
  requestorName,
  date,
  requestorSignShow,
  showStamp,
}) {
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.stampContentWrapper}>
        <Text style={styles.contentHeadingStyle}>Requestor Name:</Text>
        <Text style={styles.contentValueStyle}>{requestorName}</Text>
      </View>
      <View style={styles.stampContentWrapper}>
        <Text style={styles.contentHeadingStyle}>Request Date:</Text>
        <Text style={styles.contentValueStyle}>{date}</Text>
      </View>
      <View
        style={
          requestorSignShow
            ? styles.stampsMainWrapper
            : styles.signleStampMainWrapper
        }
      >
        {requestorSignShow && (
          <View style={styles.stampWrapper}>
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
            <View>
              <Text style={styles.title}>Requestor Signature</Text>
            </View>
          </View>
        )}
        {showStamp && (
          <View style={styles.stampWrapper}>
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
            <View>
              <Text style={styles.title}>Stamp & Signature</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

StampAndSignature.propTypes = {
  stamp: PropTypes.string,
  signature: PropTypes.string,
  requestorName: PropTypes.string,
  date: PropTypes.string.isRequired,
  requestorSignShow: PropTypes.bool.isRequired,
  showStamp: PropTypes.bool.isRequired,
};

StampAndSignature.defaultProps = {
  stamp: '',
  signature: '',
  requestorName: '',
};

export default StampAndSignature;
