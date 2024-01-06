import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import palette from 'styles/mui/theme/palette';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  logo: {
    maxWidth: 200,
    maxHeight: 80,
    objectFit: 'contain',
  },

  subtitle: {
    fontSize: 10,
    alignSelf: 'flex-start',
  },

  companyInfoContainer: {
    paddingLeft: 60,
  },
});

const boldFont = {
  fontFamily: 'Lato Bold',
};

const primaryColor = {
  color: palette.primary.main,
};
function LogoAndCompanyInfo({ companyName, companyLogo, companyDetail, companyEmail, companyTRN }) {
  const renderCompanyInfoData = (title, value, containerStyle = {}, titleStyle = {}, valueStyles = {}) => (
    <View style={{ flexDirection: 'row', ...containerStyle }}>
      <Text
        style={{
          ...styles.subtitle,
          ...boldFont,
          ...primaryColor,
          ...titleStyle,
        }}
      >
        {title} :{' '}
      </Text>
      <Text style={{ ...styles.subtitle, overflow: 'hidden', ...valueStyles }}>{value}</Text>
    </View>
  );
  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        src={{
          uri: companyLogo || '/logo.png',
          method: 'GET',
          headers: { 'Cache-Control': 'no-cache' },
          body: '',
        }}
        alt="Image"
      />
      <View style={styles.companyInfoContainer}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: palette.primary.main,
          }}
        >
          <Text
            style={{
              ...styles.subtitle,
              fontSize: 16,
              ...boldFont,
              ...primaryColor,
            }}
          >
            {companyName}
          </Text>
        </View>
        <View
          style={{
            ...styles.content,
          }}
        >
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              width: 350,
            }}
          >
            {companyTRN &&
              renderCompanyInfoData(
                'TRN',
                companyTRN,
                {
                  width: 145,
                },
                {},
                { maxWidth: 90 }
              )}
            {companyEmail && renderCompanyInfoData('Email', companyEmail, {}, {}, { maxWidth: 170 })}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {companyDetail.phone &&
              renderCompanyInfoData(
                'Phone',
                companyDetail.phone,
                {
                  width: 145,
                },
                {},
                { maxWidth: 90 }
              )}
            {companyDetail.location &&
              renderCompanyInfoData('Address', companyDetail.location, {}, {}, { maxWidth: 170 })}
          </View>
        </View>
      </View>
    </View>
  );
}
LogoAndCompanyInfo.propTypes = {
  companyName: PropTypes.string,
  companyLogo: PropTypes.string,
  companyDetail: PropTypes.object,
  companyEmail: PropTypes.string,
  companyTRN: PropTypes.string,
};
LogoAndCompanyInfo.defaultProps = {
  companyName: '',
  companyLogo: '',
  companyDetail: {},
  companyEmail: '',
  companyTRN: '',
};
export default LogoAndCompanyInfo;
