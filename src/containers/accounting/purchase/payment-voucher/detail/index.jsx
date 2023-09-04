import React, { useMemo, useState } from 'react';
import { Button, Card, CardContent, Grid, Stack, Tooltip, Typography } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import PrintIcon from '@mui/icons-material/Print';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useNavigate, useParams } from 'react-router';
import {
  useGetPaymentVoucherJournalsQuery,
  useGetSinglePaymentVoucherQuery,
} from 'services/private/payment-voucher';
import { iconButtonStyle } from 'utilities/mui-styles';
import usePdfView from 'shared/components/pdf/custom-hooks/usePdfView';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import PdfPrintModal from 'shared/components/pdf/modal/PdfPrintModal';
import JournalTable from './components/JournalTable';

const keyValue = 'bill_payments';
function PaymentVoucherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const PaymentVoucherDetailResponse = useGetSinglePaymentVoucherQuery(id);
  const paymenyVoucherJournalResponse = useGetPaymentVoucherJournalsQuery(id);
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
  const { handleDownload } = usePdfView(orderInfo, PaymentVoucherDetailResponse.data, keyValue, false, false);
  const handleOpenPdfPrintModal = () => {
    setIsPrintModalOpen(true);
  };
  console.log(paymenyVoucherJournalResponse, 'paymenyVoucherJournalResponse');
  return (
    <SectionLoader
      options={[PaymentVoucherDetailResponse.isLoading, paymenyVoucherJournalResponse.isLoading]}
    >
      <PdfPrintModal
        isPrintModalOpen={isPrintModalOpen}
        setIsPrintModalOpen={setIsPrintModalOpen}
        orderInfo={orderInfo}
        orderDetail={PaymentVoucherDetailResponse.data}
        keyValue={keyValue}
        showItemsTable={false}
        showVoucherTable={false}
      />
      <Stack spacing={2} direction="row">
        <Stack direction="row" className="w-100 mt-1 mb-3" justifyContent="space-between">
          <Typography variant="h6">
            Payment Made: #{PaymentVoucherDetailResponse?.data?.payment_num}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Tooltip title="Download" placement="top" arrow>
              <Button>
                <CloudDownloadIcon sx={iconButtonStyle} onClick={handleDownload} />
              </Button>
            </Tooltip>
            <Tooltip title="Print" placement="top" arrow>
              <Button onClick={handleOpenPdfPrintModal}>
                <PrintIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
            <Tooltip title="Attach File" placement="top" arrow>
              <Button>
                <AttachFileIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
            <ActionMenu actionsList={[]} />

            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          </Stack>
        </Stack>
      </Stack>
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

          <Grid style={{ maxWidth: 850, margin: '20px auto' }} md={12}>
            <Grid container className="mt-5">
              <Grid item xs={12}>
                <Typography>Payment History</Typography>
              </Grid>
              <Grid item xs={12} sm={12} style={{ fontSize: 14 }}>
                <Grid ite xs={12} style={{ width: '95%', margin: '0 auto' }}>
                  <Grid container className="p-2 border-top-bottom">
                    <Grid item xs={3}>
                      <Typography>Date</Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <Typography>Description</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className="p-2">
                    <Grid item sm={3}>
                      <Typography>{PaymentVoucherDetailResponse?.data?.payment_date}</Typography>
                    </Grid>
                    <Grid item sm={9}>
                      {PaymentVoucherDetailResponse?.data?.bill_numbers ? (
                        <Typography>
                          Payment of amount {PaymentVoucherDetailResponse?.data?.currency_symbol}
                          {PaymentVoucherDetailResponse?.data?.amount_received} paid and applied for{' '}
                          {PaymentVoucherDetailResponse?.data?.bill_numbers} by{' '}
                          {PaymentVoucherDetailResponse?.data?.created_by_employee_name}
                        </Typography>
                      ) : (
                        <Typography>
                          Payment of amount {PaymentVoucherDetailResponse?.data?.currency_symbol}
                          {PaymentVoucherDetailResponse?.data?.amount_received} paid by{' '}
                          {PaymentVoucherDetailResponse?.data?.created_by_employee_name}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              {paymenyVoucherJournalResponse?.data?.map(journalItems => (
                <JournalTable journalItems={journalItems?.payment_made_journal_items} />
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PaymentVoucherDetail;
