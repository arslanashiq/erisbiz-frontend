import React from 'react';
import PropTypes from 'prop-types';
import PDFHeader from './PDFHeader';
import MainComponent from './MainComponent';
import Items from './Items';
import TotalDetails from './TotalDetails';

function PdfDoc({ orderInfo, orderDetail, keyName }) {
  return (
    <MainComponent subject={orderInfo.type} title={orderInfo.type}>
      <PDFHeader orderInfo={orderInfo} orderDetail={orderDetail} />
      <Items orderDetail={orderDetail} subTotalName="Grand Total" keyName={keyName} />
      <TotalDetails
        grandTotal={100}
        amountTotal={101}
        vatTotal={102}
        currency="AED"
        currencySymbol="AED"
        subTotalName="Grand Total"
      />
    </MainComponent>
  );
}
PdfDoc.propTypes = {
  keyName: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
  orderDetail: PropTypes.object.isRequired,
};

export default PdfDoc;
