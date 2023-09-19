import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Grid } from '@mui/material';
// services
import {
  useDeletePaymentVoucherDocumentMutation,
  useDeletePaymentVoucherMutation,
  useGetPaymentVoucherJournalsQuery,
  useGetPaymentVouchersDocumentsQuery,
  useGetSinglePaymentVoucherQuery,
  useUploadPaymentVoucherDocumentMutation,
} from 'services/private/payment-voucher';
// shared
import JournalTable from 'shared/components/accordion/JournalTable';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';

// components
import PaymentVoucherHistory from './components/PaymentVoucherHistory';

const keyValue = 'bill_payments';
function PaymentVoucherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Payment Voucher beacuse this Voucher has debit Notes',
  });

  const PaymentVoucherDetailResponse = useGetSinglePaymentVoucherQuery(id);
  const paymenyVoucherJournalResponse = useGetPaymentVoucherJournalsQuery(id);
  const paymentVoucherDocumentsResponse = useGetPaymentVouchersDocumentsQuery(id);

  const orderInfo = useMemo(
    () => ({
      type: 'Payment Made',
      order_number: `#${PaymentVoucherDetailResponse?.data?.payment_num}`,
      formated_order_number: PaymentVoucherDetailResponse?.data?.payment_num,
      date: PaymentVoucherDetailResponse?.data?.payment_date,
      supplier: PaymentVoucherDetailResponse?.data?.supplier,
      label: 'Paid To',
    }),
    [PaymentVoucherDetailResponse]
  );
  const PaymentVoucherActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/payment-voucher/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'You cannot delete this Payment Voucher beacuse this Voucher has debit Notes';
          let showActionButton = false;
          const cantDelete = PaymentVoucherDetailResponse.data.have_debit_note;
          if (!cantDelete) {
            infoDescription = 'Are you sure you want to delete?';
            showActionButton = true;
          }
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
    [PaymentVoucherDetailResponse]
  );

  return (
    <SectionLoader
      options={[PaymentVoucherDetailResponse.isLoading, paymenyVoucherJournalResponse.isLoading]}
    >
      <DetailPageHeader
        title={`Payment Made: #${PaymentVoucherDetailResponse?.data?.payment_num}`}
        filesList={paymentVoucherDocumentsResponse?.data}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={PaymentVoucherDetailResponse?.data}
        actionsList={PaymentVoucherActionList}
        useDeleteItemMutation={useDeletePaymentVoucherMutation}
        useUploadDocumentFileMutation={useUploadPaymentVoucherDocumentMutation}
        useDeleteDocumentFileMutation={useDeletePaymentVoucherDocumentMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: false,
          showVoucherTable: true,
        }}
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={PaymentVoucherDetailResponse?.data}
            showStatus={false}
            showItemsTable={false}
            showOrderVoucher
          />

          <Grid container>
            <Grid item xs={12} style={{ maxWidth: 900, margin: '20px auto' }}>
              <PaymentVoucherHistory PaymentVoucher={PaymentVoucherDetailResponse.data} />
              <Grid marginTop={4} id="Journal">
                {paymenyVoucherJournalResponse?.data?.map(journalItems => (
                  <JournalTable key={Math.random()} journalItems={journalItems?.payment_made_journal_items} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PaymentVoucherDetail;
