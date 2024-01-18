import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import LogoAndCompanyInfo from 'shared/components/pdf/components/LogoAndCompanyInfo';
import palette from 'styles/mui/theme/palette';
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

const boldFont = {
  fontFamily: 'Lato Bold',
};

const primaryColor = {
  color: palette.primary.main,
};

function PDFHeader({
  orderInfo,
  companyName,
  companyLogo,
  companyDetail,
  companyEmail,
  companyTRN,
  reportTitle,
  timeInterval,
}) {
  return (
    <View>
      <View style={styles.container}>
        <LogoAndCompanyInfo
          companyName={companyName}
          companyLogo={companyLogo}
          companyDetail={companyDetail}
          companyEmail={companyEmail}
          companyTRN={companyTRN}
        />
      </View>

      {orderInfo && <InvoiceInfoDetail orderInfo={orderInfo} />}
      {reportTitle && (
        <View
          style={{
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              textAlign: 'center',

              fontSize: 20,
              ...boldFont,
              ...primaryColor,
            }}
          >
            {reportTitle}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              ...boldFont,
              ...primaryColor,
            }}
          >
            {timeInterval}
          </Text>
        </View>
      )}
    </View>
  );
}

PDFHeader.propTypes = {
  orderInfo: PropTypes.object,
  companyName: PropTypes.string,
  companyLogo: PropTypes.string,
  companyDetail: PropTypes.object,
  companyEmail: PropTypes.string,
  companyTRN: PropTypes.string,
  reportTitle: PropTypes.string,
  timeInterval: PropTypes.string,
};
PDFHeader.defaultProps = {
  orderInfo: null,
  companyLogo: '',
  companyName: '',
  companyDetail: {},
  companyEmail: '',
  companyTRN: '',
  reportTitle: '',
  timeInterval: '',
  // orderDetail: PropTypes.object.isRequired,
};

export default PDFHeader;
