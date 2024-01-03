/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import {
  COMPANY_ADDRESS,
  COMPANY_COUNTRY,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_OFFICE_ADDRESS,
  COMPANY_PHONE,
  COMPANY_TRN,
} from 'utilities/constants';
import palette from 'styles/mui/theme/palette';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  logo: {
    maxWidth: 160,
    maxHeight: 80,
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
            {companyName || COMPANY_NAME}
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
            {renderCompanyInfoData('Email', companyEmail || COMPANY_EMAIL, {}, {}, { maxWidth: 170 })}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {renderCompanyInfoData(
              'Phone',
              companyDetail.phone || COMPANY_PHONE,
              {
                width: 145,
              },
              {},
              { maxWidth: 90 }
            )}
            {renderCompanyInfoData(
              'Address',
              companyDetail.location || COMPANY_ADDRESS,
              {},
              {},
              { maxWidth: 170 }
            )}
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
