import { Card, CardContent } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  useDeleteReceiptVoucherDocumentsMutation,
  useAddReceiptVoucherDocumentsMutation,
  useGetSingleReceiptVoucherQuery,
  useGetReceiptVoucherDocumentsQuery,
  useDeleteReceiptVoucherMutation,
} from 'services/private/receipt-voucher';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { UnPaidSaleInvoiceHeadCells } from '../utilities/head-cells';

const keyValue = 'invoice_payments';
function ReceiptVoucherDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Payment Voucher beacuse this Voucher has debit Notes',
  });
  const receiptVoucherResponse = useGetSingleReceiptVoucherQuery(id);
  const receiptVoucherDocumentsList = useGetReceiptVoucherDocumentsQuery(id);
  const orderInfo = useMemo(
    () => ({
      type: 'PAYMENT RECEIPT',
      order_number: `#${receiptVoucherResponse?.data?.payment_num}`,
      formated_order_number: receiptVoucherResponse?.data?.payment_num,
      date: receiptVoucherResponse?.data?.payment_date,
      box2: [
        {
          label: 'Paid By',
          value: receiptVoucherResponse?.data?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: receiptVoucherResponse?.data?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: receiptVoucherResponse?.data?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: receiptVoucherResponse?.data?.customer_info?.invoice_address_line1,
        },
      ],
      headCells: UnPaidSaleInvoiceHeadCells,
      showCustomOptions: true,
      showSaleSectionFooter: true,
    }),
    [receiptVoucherResponse]
  );
  const PaymentVoucherActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/receipt-voucher/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          const infoDescription = 'Are you sure you want to delete?';
          const showActionButton = true;

          setOpenInfoPopup({ ...openInfoPopup, open: true, infoDescription, showActionButton });
        },
      },
      {
        label: 'View Journal',
        handleClick: () => {
          const Journal = document.getElementById('Journal');
          Journal.scrollIntoView({ behavior: 'smooth' });
        },
      },
    ],
    [receiptVoucherResponse]
  );
  return (
    <SectionLoader options={[receiptVoucherResponse.isLoading, receiptVoucherDocumentsList.isLoading]}>
      <DetailPageHeader
        title={`Receipt Voucher: #${receiptVoucherResponse?.data?.payment_num}`}
        filesList={receiptVoucherDocumentsList?.data}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={receiptVoucherResponse?.data}
        actionsList={PaymentVoucherActionList}
        useDeleteItemMutation={useDeleteReceiptVoucherMutation}
        useUploadDocumentFileMutation={useAddReceiptVoucherDocumentsMutation}
        useDeleteDocumentFileMutation={useDeleteReceiptVoucherDocumentsMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: false,
          showVoucherTable: true,
        }}
        navigateAfterDelete="/pages/accounting/sales/receipt-voucher"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={receiptVoucherResponse?.data}
            showStatus={false}
            showItemsTable={false}
            showOrderVoucher
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ReceiptVoucherDetail;
