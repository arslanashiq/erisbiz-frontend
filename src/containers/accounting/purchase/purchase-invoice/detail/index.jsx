import React, { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Card, CardContent, Stack, Tooltip, Typography } from '@mui/material';
import { useChangePurchaseOrderStatusToIssuedMutation } from 'services/private/purchase-orders';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import {
  useDeletePurchaseInvoceMutation,
  useGetSinglePurchaseInvoiceQuery,
} from 'services/private/purchase-invoice';
import InfoPopup from 'shared/modals/InfoPopup';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import usePdfView from 'shared/components/pdf/custom-hooks/usePdfView';
import { iconButtonStyle } from 'utilities/mui-styles';
import PdfPrintModal from 'shared/components/pdf/modal/PdfPrintModal';
import SectionLoader from 'containers/common/loaders/SectionLoader';

const keyValue = 'bill_items';
function PurchaseInvoiceDetail() {
  const [chagePurchaseOrderStatus] = useChangePurchaseOrderStatusToIssuedMutation();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState({
    open: false,
    infoDescription: 'are You sure You Want To delete This Purchase Order',
  });
  const purchaseInvoiceResponse = useGetSinglePurchaseInvoiceQuery(id);
  const [deletePurchaseinvoice] = useDeletePurchaseInvoceMutation();
  const orderInfo = useMemo(
    () => ({
      type: 'Bill Invoice',
      order_number: purchaseInvoiceResponse?.data?.bill_num,
      formated_order_number: purchaseInvoiceResponse?.data?.bill_formated_number,
      date: purchaseInvoiceResponse?.data?.invoice_date,
      supplier: purchaseInvoiceResponse?.data?.supplier,
      location: purchaseInvoiceResponse?.data?.location,
    }),
    [purchaseInvoiceResponse]
  );
  const { actionLoading, handleDownload } = usePdfView(orderInfo, purchaseInvoiceResponse.data, keyValue);
  const purchaseInvoiceActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/purchase-invoice/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          setOpenPopup({ ...openPopup, open: true });
        },
      },
    ],
    []
  );
  const handleClose = () => {
    setOpenPopup({ ...openPopup, open: false });
  };
  const handleDeletePurchaseInvoice = async () => {
    await deletePurchaseinvoice(id);
    enqueueSnackbar('Purchase Invoice Deleted', { variant: 'success' });
    navigate('/pages/accounting/purchase/purchase-invoice');
  };
  const handleOpenPdfPrintModal = () => {
    setIsPrintModalOpen(true);
  };

  return (
    <SectionLoader options={[purchaseInvoiceResponse.isLoading]}>
      <div>
        <InfoPopup
          open={openPopup.open}
          showActionButton
          handleClose={handleClose}
          handleYes={handleDeletePurchaseInvoice}
        />
        <PdfPrintModal
          isPrintModalOpen={isPrintModalOpen}
          setIsPrintModalOpen={setIsPrintModalOpen}
          orderInfo={orderInfo}
          orderDetail={purchaseInvoiceResponse.data}
          keyValue={keyValue}
        />
        <Stack direction="row" className="w-100 mt-1 mb-3" justifyContent="space-between">
          <Typography variant="h6">Bill:{purchaseInvoiceResponse.data.bill_num}</Typography>
          <Stack spacing={2} direction="row">
            <Tooltip title="Download" placement="top" arrow>
              <Button disabled={actionLoading} onClick={handleDownload}>
                <CloudDownloadIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
            <Tooltip title="Print" placement="top" arrow>
              <Button onClick={handleOpenPdfPrintModal}>
                <PrintIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
            <Button>
              <AttachFileIcon sx={{ height: 19, width: 19 }} />
            </Button>
            <ActionMenu actionsList={purchaseInvoiceActionList} />
            <Button>Back</Button>
          </Stack>
        </Stack>
        <Card>
          <CardContent>
            <OrderDocument
              keyValue={keyValue}
              orderInfo={orderInfo}
              orderDetail={purchaseInvoiceResponse.data}
              handleChangeStatus={chagePurchaseOrderStatus}
            />
          </CardContent>
        </Card>
      </div>
    </SectionLoader>
  );
}

export default PurchaseInvoiceDetail;
