/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { iconButtonStyle } from 'utilities/mui-styles';
import ReportsPdfPrintModal from 'shared/components/pdf/modal/ReportsPdfPrintModal';
import { useNavigate } from 'react-router';

function ReportsHeader({ tableHeader }) {
  const navigate = useNavigate();
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  return (
    <>
      <ReportsPdfPrintModal
        isPrintModalOpen={isPrintModalOpen}
        setIsPrintModalOpen={setIsPrintModalOpen}
        tableHeader={tableHeader}
      />
      <Stack direction="row" justifyContent="space-between">
        <Typography>Reports</Typography>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Print" placement="top" arrow>
            <Button onClick={() => setIsPrintModalOpen(true)}>
              <PrintIcon sx={iconButtonStyle} />
            </Button>
          </Tooltip>
          <Tooltip title="Print" placement="top" arrow>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </Tooltip>
        </Stack>
      </Stack>
    </>
  );
}
ReportsHeader.propTypes = {
  tableHeader: PropTypes.array,
  //   tableBody: PropTypes.array,
  //   tableFooter: PropTypes.array,
};
ReportsHeader.defaultProps = {
  tableHeader: [],
  //   tableBody: [],
  //   tableFooter: [[]],
};

export default ReportsHeader;
