import React, { useEffect, useState } from 'react';
import printJS from 'print-js';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { pdf } from '@react-pdf/renderer';
import useGetQRCode from 'shared/custom-hooks/useGetQRCode';
import PdfDoc from '../components/PdfDoc';

function usePdfView(
  orderInfo,
  orderDetail,
  keyValue,
  options,
  statementInfo = {},
  statementTransactions = []
) {
  const { company, email } = useSelector(state => state.user);
  const {
    name: companyName,
    logo: companyLogo,
    trade_license_number: TRN,
    currency_detail: { currency_symbol: currencySymbol },
  } = company;
  const [data, setData] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [component, setComponent] = useState(null);

  const { qrCode } = useGetQRCode(orderInfo, orderDetail);
  const handlePrint = async () => {
    setActionLoading(true);
    const doc = component;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const blobURL = URL.createObjectURL(blob);
    printJS(blobURL);
    setActionLoading(false);
  };
  const handleDownload = async () => {
    setActionLoading(true);

    const doc = component;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const fileName = orderInfo.formated_order_number;
    saveAs(blob, fileName);
    setActionLoading(false);
  };
  useEffect(() => {
    setData({ ...data, orderInfo: { ...orderInfo }, orderDetail: { ...orderDetail }, keyValue });
    if (orderDetail) {
      if (options) {
        setComponent(
          <PdfDoc
            orderInfo={{ ...orderInfo, QRCode: qrCode }}
            orderDetail={orderDetail}
            keyName={keyValue}
            showItemsTable={options.showItemsTable}
            showVoucherTable={options.showVoucherTable}
            showJournalVoucher={options.showJournalVoucher}
            companyDetail={company}
            companyEmail={email}
            companyName={companyName}
            companyLogo={companyLogo}
            companyTRN={TRN}
            showStatement={options.showStatement}
            statementInfo={statementInfo}
            statementTransactions={statementTransactions}
            currencySymbol={currencySymbol}
          />
        );
      }
    }
  }, [qrCode, orderInfo, orderDetail, keyValue, companyName, companyLogo]);

  return {
    actionLoading,
    handlePrint,
    handleDownload,
    data,
    setData,
    component,
  };
}

export default usePdfView;
