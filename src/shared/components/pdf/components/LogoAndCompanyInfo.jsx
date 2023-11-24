import React from 'react';
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    width: '100%',
  },
  logo: {
    width: '30%',
    height: 'auto',
    marginTop: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 10,
    alignSelf: 'flex-start',
    marginTop: 7,
    width: '70%',
    lineHeight: 0.5,
  },
});

function LogoAndCompanyInfo() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} src="/logo.png" alt="Image" />
      <Text style={styles.subtitle}>{COMPANY_NAME}</Text>
      <Text style={styles.subtitle}>{COMPANY_OFFICE_ADDRESS}</Text>
      <Text style={styles.subtitle}>{COMPANY_ADDRESS}</Text>
      <Text style={styles.subtitle}>{COMPANY_COUNTRY}</Text>
      <Text style={styles.subtitle}>{COMPANY_PHONE}</Text>
      <Text style={styles.subtitle}>{COMPANY_TRN}</Text>
      <Text style={styles.subtitle}>{COMPANY_EMAIL}</Text>
    </View>
  );
}

export default LogoAndCompanyInfo;
