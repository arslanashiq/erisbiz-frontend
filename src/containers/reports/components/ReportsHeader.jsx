import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Stack, Tooltip } from '@mui/material';
// shared
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import ReportsPdfPrintModal from 'shared/components/pdf/modal/ReportsPdfPrintModal';
// utilities
import { iconButtonStyle } from 'utilities/mui-styles';

function ReportsHeader({
  tableHeader,
  tableBody,
  tableFooter,
  reportTitle,
  initialFilterValue,
  filterList,
  handleSubmitCustomDateFilter,
  handleChangeFilter,
  customFilterInitialValues,
  customFilterInputsList,
}) {
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
        tableBody={tableBody}
        tableFooter={tableFooter}
      />
      <Stack direction="row" justifyContent="space-between" className="mb-2">
        <ActionMenu
          variant="outlined"
          buttonTitle={selectedFilter.label}
          actionsList={filterList}
          handleAction={handleFilter}
          cutomInitialValues={customFilterInitialValues}
          customFilterInputs={customFilterInputsList}
          handleSubmitCustomFilter={handleSubmitCustomDateFilter}
        />
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
};

export default ReportsHeader;
