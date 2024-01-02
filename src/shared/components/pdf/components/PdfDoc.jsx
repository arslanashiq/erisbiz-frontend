import React from 'react';
import PropTypes from 'prop-types';
import Items from 'shared/components/pdf/components/Items';
import TotalDetails from 'shared/components/pdf/components/TotalDetails';
import { Text, View } from '@react-pdf/renderer';
import palette from 'styles/mui/theme/palette';
import PDFHeader from './PDFHeader';
import MainComponent from './MainComponent';
import VoucherContent from './VoucherContent';
import VoucherFooter from './VoucherFooter';
import JournalVoucher from './JournalVoucher';

function PdfDoc({
  orderInfo,
  orderDetail,
  keyName,
  showItemsTable,
  showVoucherTable,
  showJournalVoucher,
  companyName,
  companyLogo,
  companyDetail,
  companyEmail,
  companyTRN,
}) {
  return (
    <MainComponent subject={orderInfo.type} title={orderInfo.type}>
      <PDFHeader
        orderInfo={orderInfo}
        companyName={companyName}
        companyLogo={companyLogo}
        companyDetail={companyDetail}
        companyEmail={companyEmail}
        companyTRN={companyTRN}
      />
      {showItemsTable && (
        <>
          <Items orderDetail={orderDetail} subTotalName="Sub Total" keyName={keyName} />
          <TotalDetails
            orderDetail={orderDetail}
            orderInfo={orderInfo}
            amountTotal={orderDetail.without_change_grand_total - orderDetail.without_change_vat_total}
            vatTotal={orderDetail.without_change_vat_total}
            grandTotal={orderDetail.without_change_grand_total}
            discountTotal={orderDetail.without_change_discount_total}
            currencySymbol={orderDetail.currency_symbol}
            subTotalName="Sub Total"
          />
        </>
      )}

      {showVoucherTable && (
        <>
          <VoucherContent orderDetail={orderDetail} />
          <VoucherFooter orderInfo={orderInfo} orderDetail={orderDetail} keyName={keyName} />
        </>
      )}
      {showJournalVoucher && (
        <JournalVoucher orderInfo={orderInfo} orderDetail={orderDetail} keyName={keyName} />
      )}
      <View style={{ width: '100%', justifyContent: 'end', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ color: palette.primary.main, fontSize: 10 }}>
          This document has been generated electronically and does not necessitate a physical stamp or
          signature
        </Text>
      </View>
    </MainComponent>
  );
}
PdfDoc.propTypes = {
  keyName: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
  orderDetail: PropTypes.object,
  showItemsTable: PropTypes.bool,
  showVoucherTable: PropTypes.bool,
  showJournalVoucher: PropTypes.bool,
  companyName: PropTypes.string,
  companyLogo: PropTypes.string,
  companyDetail: PropTypes.object,
  companyEmail: PropTypes.string,
  companyTRN: PropTypes.string,
};
PdfDoc.defaultProps = {
  orderDetail: {},
  showItemsTable: true,
  showVoucherTable: false,
  showJournalVoucher: false,
  companyLogo: '',
  companyName: '',
  companyDetail: {},
  companyEmail: '',
  companyTRN: '',
};

export default PdfDoc;
