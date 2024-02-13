import React from 'react';
// import printJS from 'print-js';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import StyledDialog from 'styles/mui/component/StyledDialog';
// import { pdf } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import PDFCustomReport from '../components/PDFCustomReport';

function ReportsPdfPrintModal({
  isPrintModalOpen,
  setIsPrintModalOpen,
  reportTitle,
  tableHeader,
  tableBody,
  tableFooter,
  isMultiReport,
  modifiedTableHead,
  timeInterval,
}) {
  const { company, email } = useSelector(state => state.user);
  const { name: companyName, logo: companyLogo, trade_license_number: TRN } = company;

  const handleClose = () => {
    setIsPrintModalOpen(false);
  };

  // const handlePrint = async () => {
  //   const doc = component;
  //   const asPdf = pdf();
  //   asPdf.updateContainer(doc);
  //   const blob = await asPdf.toBlob();
  //   const blobURL = URL.createObjectURL(blob);
  //   printJS(blobURL);
  // };
  return (
    <div className="order-detail-wrapper">
      <StyledDialog
        maxWidth={false}
        open={isPrintModalOpen}
        onClose={handleClose}
        className="theme-light modal-dialog--custom-max-width"
      >
        <Stack spacing={2} sx={{ width: 900 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 1 }}>
            <Stack direction="row" className="text-left">
              <Typography variant="h5">Privew</Typography>
            </Stack>
            <Stack>
              <Stack direction="row" spacing={2}>
                {/* <Button color="primary" onClick={() => handlePrint()}>
                  Print
                </Button> */}
                <Button color="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ padding: 2 }}>
          <PDFCustomReport
            tableHeader={tableHeader}
            reportTitle={reportTitle}
            companyName={companyName}
            companyLogo={companyLogo}
            company={company}
            email={email}
            TRN={TRN}
            timeInterval={timeInterval}
            isMultiReport={isMultiReport}
            tableBody={tableBody}
            modifiedTableHead={modifiedTableHead}
            tableFooter={tableFooter}
          />
        </Stack>
      </StyledDialog>
    </div>
  );
}

ReportsPdfPrintModal.propTypes = {
  timeInterval: PropTypes.string,
  isPrintModalOpen: PropTypes.bool,
  setIsPrintModalOpen: PropTypes.func,
  reportTitle: PropTypes.string,
  tableHeader: PropTypes.array,
  tableBody: PropTypes.array,
  tableFooter: PropTypes.array,
  isMultiReport: PropTypes.bool,
  modifiedTableHead: PropTypes.array,
};
ReportsPdfPrintModal.defaultProps = {
  isPrintModalOpen: false,
  setIsPrintModalOpen: () => {},
  reportTitle: '',
  tableHeader: [],
  tableBody: [],
  tableFooter: [],
  isMultiReport: false,
  modifiedTableHead: [],
  timeInterval: '',
};

export default ReportsPdfPrintModal;
