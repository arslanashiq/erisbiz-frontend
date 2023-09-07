/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import printJS from 'print-js';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import PdfDoc from '../components/PdfDoc';

function usePdfView(orderInfo, orderDetail, keyValue, options) {
  const [data, setData] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [component, setComponent] = useState(null);
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
            orderInfo={orderInfo}
            orderDetail={orderDetail}
            keyName={keyValue}
            showItemsTable={options.showItemsTable}
            showVoucherTable={options.showVoucherTable}
          />
        );
      }
    }
  }, [orderInfo, orderDetail, keyValue]);

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
