/* eslint-disable no-unused-vars */
import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import InfoBox from 'shared/components/pdf/components/InfoBox';
import LogoAndCompanyInfo from 'shared/components/pdf/components/LogoAndCompanyInfo';
import InvoiceInfoDetail from './InvoiceInfoDetail';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: -10,
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

function PDFHeader({ orderInfo, companyName, companyLogo }) {
  return (
    <View>
      <View style={styles.container}>
        <LogoAndCompanyInfo companyName={companyName} companyLogo={companyLogo} />
      </View>
      {orderInfo && <InvoiceInfoDetail orderInfo={orderInfo} />}
    </View>
  );
}

PDFHeader.propTypes = {
  orderInfo: PropTypes.object,
  companyName: PropTypes.string,
  companyLogo: PropTypes.string,
  // orderDetail: PropTypes.object.isRequired,
};
PDFHeader.defaultProps = {
  orderInfo: null,
  companyLogo: '',
  companyName: '',
  // orderDetail: PropTypes.object.isRequired,
};

export default PDFHeader;
