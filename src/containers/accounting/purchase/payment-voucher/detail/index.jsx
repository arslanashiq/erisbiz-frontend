import React, { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardContent, Grid, Stack, Tooltip, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
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
import InfoPopup from 'shared/modals/InfoPopup';
import FilePopup from 'shared/modals/filePopup';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import JournalTable from 'shared/components/accordion/JournalTable';
import PdfPrintModal from 'shared/components/pdf/modal/PdfPrintModal';
import usePdfView from 'shared/components/pdf/custom-hooks/usePdfView';
import OrderDocument from 'shared/components/order-document/OrderDocument';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { iconButtonStyle } from 'utilities/mui-styles';
import { addDocument, deleteDocument } from 'utilities/document-action-handlers';
// components
import PaymentVoucherHistory from './components/PaymentVoucherHistory';

const keyValue = 'bill_payments';
function PaymentVoucherDetail() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [openFilesModal, setOpenFilesModal] = useState({
    open: false,
    files: [],
  });
  const [openPopup, setOpenPopup] = useState({
    open: false,
    infoDescription: 'are You sure You Want To delete This Purchase Order',
  });

  const PaymentVoucherDetailResponse = useGetSinglePaymentVoucherQuery(id);
  const paymenyVoucherJournalResponse = useGetPaymentVoucherJournalsQuery(id);
  const paymentVoucherDocumentsResponse = useGetPaymentVouchersDocumentsQuery(id);
  const [uploadDocument] = useUploadPaymentVoucherDocumentMutation();
  const [removeDocument] = useDeletePaymentVoucherDocumentMutation();
  const [deletePaymentVoucher] = useDeletePaymentVoucherMutation();
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
          setOpenPopup({ ...openPopup, open: true });
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
    []
  );
  const { handleDownload } = usePdfView(orderInfo, PaymentVoucherDetailResponse.data, keyValue, false, true);

  const handleClose = () => {
    setOpenPopup({ ...openPopup, open: false });
  };
  const handleOpenPdfPrintModal = () => {
    setIsPrintModalOpen(true);
  };
  const handleDeletePurchaseVoucher = async () => {
    await deletePaymentVoucher(id);
    enqueueSnackbar('Payment Voucher Deleted', { variant: 'success' });
    navigate('/pages/accounting/purchase/payment-voucher');
  };
  // const handleOpenFilesModal = () => {
  //   setOpenFilesModal({ ...openFilesModal, open: true, files: [] });
  // };
  const handleCloseFilesModal = () => {
    setOpenFilesModal({ ...openFilesModal, open: false });
  };
  const handleUploadDocfile = async file => {
    await addDocument(id, file, uploadDocument, enqueueSnackbar);
  };
  const handleDeleteDocfile = async file => {
    await deleteDocument(file.id, removeDocument, enqueueSnackbar);
  };
  return (
    <SectionLoader
      options={[PaymentVoucherDetailResponse.isLoading, paymenyVoucherJournalResponse.isLoading]}
    >
      <InfoPopup
        open={openPopup.open}
        showActionButton
        handleClose={handleClose}
        handleYes={handleDeletePurchaseVoucher}
      />
      <FilePopup
        open={openFilesModal.open}
        handleClose={handleCloseFilesModal}
        handleUploadFile={handleUploadDocfile}
        handleDeleteFile={handleDeleteDocfile}
        files={paymentVoucherDocumentsResponse?.data?.results}
      />
      <PdfPrintModal
        isPrintModalOpen={isPrintModalOpen}
        setIsPrintModalOpen={setIsPrintModalOpen}
        orderInfo={orderInfo}
        orderDetail={PaymentVoucherDetailResponse.data}
        keyValue={keyValue}
        showItemsTable={false}
        showVoucherTable
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
            <ActionMenu actionsList={PaymentVoucherActionList} />

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

          <Grid style={{ maxWidth: 900, margin: '20px auto' }} md={12}>
            <PaymentVoucherHistory PaymentVoucher={PaymentVoucherDetailResponse.data} />
            <Grid marginTop={4} id="Journal">
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
