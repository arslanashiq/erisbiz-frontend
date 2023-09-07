import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import StyledDialog from 'styles/mui/component/StyledDialog';
import usePdfView from '../custom-hooks/usePdfView';

function PdfPrintModal({
  isPrintModalOpen,
  setIsPrintModalOpen,
  orderInfo,
  orderDetail,
  keyValue,
  pdfOptions,
}) {
  const handleClose = () => {
    setIsPrintModalOpen(false);
  };

  const { handlePrint, component } = usePdfView(orderInfo, orderDetail, keyValue, pdfOptions);

  return (
    <div className="order-detail-wrapper">
      <StyledDialog
        maxWidth={false}
        open={isPrintModalOpen}
        onClose={handleClose}
        className="theme-light modal-dialog--custom-max-width"
      >
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 1 }}>
            <Stack direction="row" className="text-left">
              <Typography variant="h5">Privew</Typography>
            </Stack>
            <Stack>
              <Stack direction="row" spacing={2}>
                <Button color="primary" onClick={handlePrint}>
                  Print
                </Button>
                <Button color="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ padding: 2 }}>
          <PDFViewer style={{ height: '75vh', width: '100%' }}>{component}</PDFViewer>
        </Stack>
      </StyledDialog>
    </div>
  );
}

PdfPrintModal.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  isPrintModalOpen: PropTypes.bool,
  setIsPrintModalOpen: PropTypes.func,
  orderInfo: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  pdfOptions: PropTypes.object.isRequired,
};
PdfPrintModal.defaultProps = {
  isPrintModalOpen: false,
  setIsPrintModalOpen: () => {},
};

export default PdfPrintModal;
