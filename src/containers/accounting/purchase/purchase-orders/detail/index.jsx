import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, CardContent, Stack, Tooltip, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Loader from 'shared/components/loader/Loader';
import PrintIcon from '@mui/icons-material/Print';
import {
  useChangePurchaseOrderStatusToIssuedMutation,
  useDeletePurchaseOrderMutation,
  useGetSinglePurchaseOrderQuery,
} from 'services/private/purchase-orders';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import InfoPopup from 'shared/modals/InfoPopup';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import PdfPrintModal from 'shared/components/pdf/modal/PdfPrintModal';
import { iconButtonStyle } from 'utilities/mui-styles';
import usePdfView from 'shared/components/pdf/custom-hooks/usePdfView';

const keyValue = 'pur_order_items';
function PurchaseOrderDetail() {
  const [chagePurchaseOrderStatus] = useChangePurchaseOrderStatusToIssuedMutation();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState({
    open: false,
    infoDescription: 'are You sure You Want To delete This Purchase Order',
  });
  const purchaseOrderResponse = useGetSinglePurchaseOrderQuery(id);
  const [deletePurchaseOrder] = useDeletePurchaseOrderMutation();

  const purchaseOrderActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/purchase-orders/edit/${id}`);
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
  const handleDeletePurchaseOrder = async () => {
    await deletePurchaseOrder(id);
    enqueueSnackbar('Purchase Order Deleted', { variant: 'success' });
    navigate('/pages/accounting/purchase/purchase-orders');
  };
  const handleOpenPdfPrintModal = () => {
    setIsPrintModalOpen(true);
  };
  const orderInfo = useMemo(
    () => ({
      type: 'Purchase Order',
      order_number: `#${purchaseOrderResponse?.data?.pur_order_num}`,
      formated_order_number: purchaseOrderResponse?.data?.pur_order_formatted_number,
      date: purchaseOrderResponse?.data?.date,
      supplier: purchaseOrderResponse?.data?.supplier,
      location: purchaseOrderResponse?.data?.location,
    }),
    [purchaseOrderResponse]
  );
  const { actionLoading, handleDownload } = usePdfView(orderInfo, purchaseOrderResponse.data, keyValue);
  if (purchaseOrderResponse.isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <InfoPopup
        open={openPopup.open}
        showActionButton
        handleClose={handleClose}
        handleYes={handleDeletePurchaseOrder}
      />
      <PdfPrintModal
        isPrintModalOpen={isPrintModalOpen}
        setIsPrintModalOpen={setIsPrintModalOpen}
        orderInfo={orderInfo}
        orderDetail={purchaseOrderResponse.data}
        keyValue={keyValue}
      />
      <Stack direction="row" className="w-100 mt-1 mb-3" justifyContent="space-between">
        <Typography variant="h6">Po:#{purchaseOrderResponse.data.pur_order_num}</Typography>
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
          <Tooltip title="Attach File" placement="top" arrow>
            <Button>
              <AttachFileIcon sx={iconButtonStyle} />
            </Button>
          </Tooltip>
          <ActionMenu actionsList={purchaseOrderActionList} />

          <Button>Back</Button>
        </Stack>
      </Stack>
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={purchaseOrderResponse.data}
            handleChangeStatus={chagePurchaseOrderStatus}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default PurchaseOrderDetail;
