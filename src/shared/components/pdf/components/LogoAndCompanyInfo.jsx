import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

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
      <Text style={styles.subtitle}>Luxury Events and VIP Travel DMCC</Text>
      <Text style={styles.subtitle}>Office # 1206, JBC 4, Cluster N,</Text>
      <Text style={styles.subtitle}>Jumeirah Lake Towers, Dubai,</Text>
      <Text style={styles.subtitle}>United Arab Emirates</Text>
      <Text style={styles.subtitle}>Phone: +971 4 379 9960</Text>
      <Text style={styles.subtitle}>TRN: 100204615700003</Text>
      <Text style={styles.subtitle}>info@luxuryexplorersme.com</Text>
    </View>
  );
}

export default LogoAndCompanyInfo;
