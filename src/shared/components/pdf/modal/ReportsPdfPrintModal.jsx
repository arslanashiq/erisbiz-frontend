/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import StyledDialog from 'styles/mui/component/StyledDialog';
import { PDFViewer } from '@react-pdf/renderer';
import MainComponent from '../components/MainComponent';
import LogoAndCompanyInfo from '../components/LogoAndCompanyInfo';

function ReportsPdfPrintModal({ isPrintModalOpen, setIsPrintModalOpen, tableHeader }) {
  const handleClose = () => {
    setIsPrintModalOpen(false);
  };
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
                <Button color="primary">Print</Button>
                <Button color="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ padding: 2 }}>
          <PDFViewer style={{ height: '75vh', width: '100%' }}>
            <MainComponent subject="Test" title="Test">
              <LogoAndCompanyInfo />
            </MainComponent>
          </PDFViewer>
        </Stack>
      </StyledDialog>
    </div>
  );
}

ReportsPdfPrintModal.propTypes = {
  isPrintModalOpen: PropTypes.bool,
  setIsPrintModalOpen: PropTypes.func,
  tableHeader: PropTypes.array,
};
ReportsPdfPrintModal.defaultProps = {
  isPrintModalOpen: false,
  setIsPrintModalOpen: () => {},
  tableHeader: [],
};

export default ReportsPdfPrintModal;
