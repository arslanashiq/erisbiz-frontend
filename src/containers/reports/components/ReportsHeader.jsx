import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, Stack, Tooltip } from '@mui/material';
// shared
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import ReportsPdfPrintModal from 'shared/components/pdf/modal/ReportsPdfPrintModal';
// utilities
import { iconButtonStyle } from 'utilities/mui-styles';

function ReportsHeader({
  tableHeader,
  timeInterval,
  tableBody,
  tableFooter,
  reportTitle,
  initialFilterValue,
  filterList,
  handleSubmitCustomDateFilter,
  handleChangeFilter,
  customFilterInitialValues,
  customFilterInputsList,
  handleDownloadExcelSheet,
  isMultiReport,
  modifiedTableHead,
  options,
}) {
  const { showFilter, showPrint } = options;
  const navigate = useNavigate();
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(initialFilterValue);

  const handleFilter = (selecteAction, handleCloseMenu) => {
    if (selecteAction.value !== '') {
      handleCloseMenu();
    }
    setSelectedFilter(selecteAction);
    handleChangeFilter(selecteAction);
  };
  return (
    <>
      <ReportsPdfPrintModal
        isPrintModalOpen={isPrintModalOpen}
        setIsPrintModalOpen={setIsPrintModalOpen}
        reportTitle={reportTitle}
        tableHeader={tableHeader}
        timeInterval={timeInterval}
        tableBody={tableBody}
        tableFooter={tableFooter}
        isMultiReport={isMultiReport}
        modifiedTableHead={modifiedTableHead}
      />
      <Stack direction="row" justifyContent="space-between" className="mb-2">
        <Stack>
          {showFilter && (
            <ActionMenu
              variant="outlined"
              buttonTitle={selectedFilter.label}
              actionsList={filterList}
              handleAction={handleFilter}
              cutomInitialValues={customFilterInitialValues}
              customFilterInputs={customFilterInputsList}
              handleSubmitCustomFilter={handleSubmitCustomDateFilter}
            />
          )}
        </Stack>
        <Stack direction="row" spacing={2}>
          {handleDownloadExcelSheet && (
            <Tooltip title="Download Excel Sheet" placement="top" arrow>
              <Button onClick={handleDownloadExcelSheet}>
                <DownloadIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
          )}
          {showPrint && (
            <Tooltip title="Print" placement="top" arrow>
              <Button onClick={() => setIsPrintModalOpen(true)}>
                <PrintIcon sx={iconButtonStyle} />
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Back" placement="top" arrow>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </Tooltip>
        </Stack>
      </Stack>
    </>
  );
}
ReportsHeader.propTypes = {
  reportTitle: PropTypes.string,
  tableHeader: PropTypes.array,
  tableBody: PropTypes.array,
  tableFooter: PropTypes.array,
  filterList: PropTypes.array,
  handleSubmitCustomDateFilter: PropTypes.func,
  handleChangeFilter: PropTypes.func,
  customFilterInitialValues: PropTypes.object,
  customFilterInputsList: PropTypes.array,
  initialFilterValue: PropTypes.object,
  handleDownloadExcelSheet: PropTypes.func,
  isMultiReport: PropTypes.bool,
  modifiedTableHead: PropTypes.array,
  options: PropTypes.shape({
    showFilter: PropTypes.bool,
    showPrint: PropTypes.bool,
  }),
  timeInterval: PropTypes.string,
};
ReportsHeader.defaultProps = {
  reportTitle: '',
  tableHeader: [],
  tableBody: [],
  tableFooter: [[]],
  filterList: [],
  handleSubmitCustomDateFilter: () => {},
  handleChangeFilter: () => {},
  customFilterInitialValues: {},
  customFilterInputsList: [],
  initialFilterValue: {},
  isMultiReport: false,
  modifiedTableHead: [],
  handleDownloadExcelSheet: null,
  options: {
    showFilter: true,
    showPrint: true,
  },
  timeInterval: '',
};

export default ReportsHeader;
