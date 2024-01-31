/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
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
  const renderCompanyInfoData = ({ title, value, containerStyle = {}, titleStyle = {}, valueStyle = {} }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        minWidth: 130,
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <Text
        style={{
          paddingRight: 4,
          ...titleStyle,
          ...styles.subtitle,
          ...boldFont,
          ...primaryColor,
        }}
      >
        {title} :
      </Text>
      <Text style={{ ...valueStyle, ...styles.subtitle }}>{value}</Text>
    </View>
  );

  const { isTRNAndEmailFitInRow, isPhoneAndLocationFitInRow } = useMemo(() => {
    let TRNAndEmail = false;
    let PhoneAndLocation = false;
    if (companyTRN && companyEmail) {
      TRNAndEmail = companyTRN.length + companyEmail.length <= 80;
    }
    if (companyDetail?.phone && companyDetail.location) {
      PhoneAndLocation = companyDetail.phone.length + companyDetail.location.length <= 45;
    }
    return {
      isTRNAndEmailFitInRow: TRNAndEmail,
      isPhoneAndLocationFitInRow: PhoneAndLocation,
    };
  }, [companyTRN, companyEmail, companyDetail]);
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
              display: 'flex',
              flexDirection: isTRNAndEmailFitInRow ? 'row' : 'column',
              width: 350,
            }}
          >
            {companyTRN && renderCompanyInfoData({ title: 'TRN', value: companyTRN })}
            {companyEmail &&
              renderCompanyInfoData({
                title: 'Email',
                value: companyEmail,
                containerStyle: isTRNAndEmailFitInRow ? {} : { marginTop: 5 },
              })}
          </View>
          <View
            style={{
              marginTop: 5,
              display: 'flex',
              flexDirection: isPhoneAndLocationFitInRow ? 'row' : 'column',
              width: 350,
            }}
          >
            {companyDetail?.phone && renderCompanyInfoData({ title: 'Phone', value: companyDetail?.phone })}
            {companyDetail?.location &&
              renderCompanyInfoData({
                title: 'Address',
                value: companyDetail?.location,
                containerStyle: isPhoneAndLocationFitInRow ? {} : { marginTop: 5 },
                titleStyle: { minWidth: 45 },
                valueStyle: isPhoneAndLocationFitInRow ? { maxWidth: 150 } : { maxWidth: 280 },
              })}
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
