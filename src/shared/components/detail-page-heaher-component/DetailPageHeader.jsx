import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import PrintIcon from '@mui/icons-material/Print';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
// shared
import InfoPopup from 'shared/modals/InfoPopup';
import FilePopup from 'shared/modals/filePopup';
// utilities
import { iconButtonStyle } from 'utilities/mui-styles';
import { addDocument, deleteDocument } from 'utilities/document-action-handlers';
// components
import PdfPrintModal from '../pdf/modal/PdfPrintModal';
import ActionMenu from '../action-menu/ActionMenu';
import usePdfView from '../pdf/custom-hooks/usePdfView';

function DetailPageHeader({
  title,
  filesList,
  keyValue,
  orderInfo,
  orderDetail,
  useDeleteItemMutation,
  actionsList,
  useUploadDocumentFileMutation,
  useDeleteDocumentFileMutation,
  openPopup,
  setOpenPopup,
  handlePrint,
  pdfOptions,
  navigateAfterDelete,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(0);
  const [deleteItem] = useDeleteItemMutation();
  const [uploadDocument] = useUploadDocumentFileMutation();
  const [removeDocument] = useDeleteDocumentFileMutation();
  const { actionLoading, handleDownload } = usePdfView(orderInfo, orderDetail, keyValue, pdfOptions);

  const [openFilesModal, setOpenFilesModal] = useState({
    open: false,
  });

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handleClose = () => {
    setOpenPopup({ ...openPopup, open: false });
  };

  const handleOpenFilesModal = () => {
    setOpenFilesModal({ ...openFilesModal, open: true });
  };
  const handleCloseFilesModal = () => {
    setOpenFilesModal({ ...openFilesModal, open: false });
  };
  const handleOpenPdfPrintModal = () => {
    setIsPrintModalOpen(true);
  };
  const handleDeleteItem = async () => {
    await deleteItem(id);
    enqueueSnackbar('Purchase Order Deleted', { variant: 'success' });
    navigate(navigateAfterDelete);
  };
  const handleUploadDocfile = async file => {
    await addDocument(id, file, uploadDocument, enqueueSnackbar);
  };
  const handleDeleteDocfile = async file => {
    await deleteDocument(file.id, removeDocument, enqueueSnackbar);
  };
  return (
    <Box className="d-print-none">
      <InfoPopup
        open={openPopup.open}
        showActionButton={openPopup.showActionButton}
        handleClose={handleClose}
        handleYes={openPopup?.handleAction || handleDeleteItem}
        infoDescription={openPopup.infoDescription}
      />
      {filesList && (
        <FilePopup
          open={openFilesModal.open}
          handleClose={handleCloseFilesModal}
          handleUploadFile={handleUploadDocfile}
          handleDeleteFile={handleDeleteDocfile}
          files={filesList}
        />
      )}
      {keyValue && (
        <PdfPrintModal
          isPrintModalOpen={isPrintModalOpen}
          setIsPrintModalOpen={setIsPrintModalOpen}
          orderInfo={orderInfo}
          orderDetail={orderDetail}
          keyValue={keyValue}
          pdfOptions={pdfOptions}
        />
      )}
      <Stack direction="row" className="w-100 mt-1 mb-3" justifyContent="space-between">
        <Typography variant="h6">{title}</Typography>
        <Stack spacing={2} direction="row">
          {keyValue && (
            <Tooltip title="Download" placement="top" arrow>
              <Button disabled={actionLoading} onClick={handleDownload}>
                <CloudDownloadIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
          )}
          {(pdfOptions || handlePrint) && (
            <Tooltip title="Print" placement="top" arrow>
              <Button onClick={() => (handlePrint ? handlePrint() : handleOpenPdfPrintModal())}>
                <PrintIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
          )}
          {filesList && (
            <Tooltip title="Attach File" placement="top" arrow>
              <Button onClick={handleOpenFilesModal}>
                <AttachFileIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
          )}
          {actionsList && <ActionMenu actionsList={actionsList} />}

          <Button onClick={() => navigate(-1)}>Back</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

DetailPageHeader.propTypes = {
  title: PropTypes.string,
  filesList: PropTypes.array,
  keyValue: PropTypes.string,
  orderInfo: PropTypes.object,
  orderDetail: PropTypes.object,
  useDeleteItemMutation: PropTypes.func.isRequired,
  actionsList: PropTypes.array.isRequired,
  useUploadDocumentFileMutation: PropTypes.func,
  useDeleteDocumentFileMutation: PropTypes.func,
  openPopup: PropTypes.object.isRequired,
  setOpenPopup: PropTypes.func.isRequired,
  handlePrint: PropTypes.func,
  pdfOptions: PropTypes.object,
  navigateAfterDelete: PropTypes.string,
};
DetailPageHeader.defaultProps = {
  title: '',
  filesList: null,
  keyValue: null,
  orderInfo: {},
  orderDetail: {},
  handlePrint: null,
  pdfOptions: null,
  navigateAfterDelete: '/',
  useUploadDocumentFileMutation: () => [() => {}],
  useDeleteDocumentFileMutation: () => [() => {}],
};

export default DetailPageHeader;
