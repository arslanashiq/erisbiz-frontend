import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PrintIcon from '@mui/icons-material/Print';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button, Card, CardContent, Stack, Tooltip, Typography } from '@mui/material';
// services
import {
  useDeleteSupplierCreditsMutation,
  useGetSingleSupplierCreditsQuery,
} from 'services/private/debit-note';
// shared
import InfoPopup from 'shared/modals/InfoPopup';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import PdfPrintModal from 'shared/components/pdf/modal/PdfPrintModal';
import usePdfView from 'shared/components/pdf/custom-hooks/usePdfView';
import OrderDocument from 'shared/components/order-document/OrderDocument';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utlilities
import { iconButtonStyle } from 'utilities/mui-styles';
import { useSnackbar } from 'notistack';

const keyValue = 'supplier_credit_items';
function SupplierCreditDetail() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState({
    open: false,
    infoDescription: 'Are uou sure you Want To delete This Supplier Credit Note',
  });
  const supplierCreditResponse = useGetSingleSupplierCreditsQuery(id);
  const [deleteSupplierCredit] = useDeleteSupplierCreditsMutation();

  const orderInfo = useMemo(
    () => ({
      type: 'Supplier Credit',
      formated_order_number: supplierCreditResponse?.data?.supplier_credit_formatted_number || '',
      date: supplierCreditResponse?.data?.invoice_date || '',
      supplier: supplierCreditResponse?.data?.supplier || {},
      location: supplierCreditResponse?.data?.location || '',
    }),
    [supplierCreditResponse]
  );
  const purchaseInvoiceActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/debit-notes/edit/${id}`);
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
  const { actionLoading, handleDownload } = usePdfView(orderInfo, supplierCreditResponse.data, keyValue);

  const handleClose = () => {
    setOpenPopup({ ...openPopup, open: false });
  };
  const handleOpenPdfPrintModal = () => {
    setIsPrintModalOpen(true);
  };
  const handleDeleteSupplierCredit = async () => {
    await deleteSupplierCredit(id);
    enqueueSnackbar('Purchase Invoice Deleted', { variant: 'success' });
    navigate('/pages/accounting/purchase/debit-notes');
  };

  return (
    <SectionLoader options={[supplierCreditResponse.isLoading]}>
      <InfoPopup
        open={openPopup.open}
        showActionButton
        handleClose={handleClose}
        infoDescription={openPopup.infoDescription}
        handleYes={handleDeleteSupplierCredit}
      />

      <PdfPrintModal
        isPrintModalOpen={isPrintModalOpen}
        setIsPrintModalOpen={setIsPrintModalOpen}
        orderInfo={orderInfo}
        orderDetail={supplierCreditResponse.data}
        keyValue={keyValue}
      />
      <Stack direction="row" className="w-100 mt-1 mb-3" justifyContent="space-between">
        <Typography variant="h6">
          Purchase Debit Note:{supplierCreditResponse?.data?.supplier_credit_formatted_number}
        </Typography>
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

          <ActionMenu actionsList={purchaseInvoiceActionList} />
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Stack>
      </Stack>
      <Card>
        <CardContent>
          <OrderDocument
            keyValue={keyValue}
            orderInfo={orderInfo}
            orderDetail={supplierCreditResponse.data}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default SupplierCreditDetail;
