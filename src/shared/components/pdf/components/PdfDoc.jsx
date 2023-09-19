import React from 'react';
import PropTypes from 'prop-types';
import Items from 'shared/components/pdf/components/Items';
import TotalDetails from 'shared/components/pdf/components/TotalDetails';
import PDFHeader from './PDFHeader';
import MainComponent from './MainComponent';
import VoucherContent from './VoucherContent';
import VoucherFooter from './VoucherFooter';

function PdfDoc({ orderInfo, orderDetail, keyName, showItemsTable, showVoucherTable }) {
  return (
    <MainComponent subject={orderInfo.type} title={orderInfo.type}>
      <PDFHeader orderInfo={orderInfo} />
      {showItemsTable && (
        <>
          <Items orderDetail={orderDetail} subTotalName="Grand Total" keyName={keyName} />
          <TotalDetails
            amountTotal={orderDetail.without_change_grand_total - orderDetail.without_change_vat_total}
            vatTotal={orderDetail.without_change_vat_total}
            grandTotal={orderDetail.without_change_grand_total}
            currency={orderDetail.currency}
            currencySymbol={orderDetail.currency_symbol}
            subTotalName="Grand Total"
          />
        </>
      )}

      {showVoucherTable && (
        <>
          <VoucherContent orderDetail={orderDetail} />
          <VoucherFooter orderDetail={orderDetail} keyName={keyName} />
        </>
      )}
    </MainComponent>
  );
}
PdfDoc.propTypes = {
  keyName: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
  orderDetail: PropTypes.object,
  showItemsTable: PropTypes.bool,
  showVoucherTable: PropTypes.bool,
};
PdfDoc.defaultProps = {
  orderDetail: {},
  showItemsTable: true,
  showVoucherTable: false,
};

export default PdfDoc;
