import React, { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate, useParams } from 'react-router';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
// services
import {
  useDeleteExpenseMutation,
  useGetExpenseJournalsQuery,
  useGetSingleExpenseQuery,
} from 'services/private/expenses';
// shared
import InfoPopup from 'shared/modals/InfoPopup';
import FilePopup from 'shared/modals/filePopup';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import JournalTable from 'shared/components/accordion/JournalTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { iconButtonStyle } from 'utilities/mui-styles';
import ExpenseDetailInfo from './components/ExpenseDetailInfo';

function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openFilesModal, setOpenFilesModal] = useState({
    open: false,
    files: [],
  });
  const [openPopup, setOpenPopup] = useState({
    open: false,
    infoDescription: 'Are you sure you want to delete this expense',
  });
  const expenseDetail = useGetSingleExpenseQuery(id);
  const expenseJournals = useGetExpenseJournalsQuery(id);
  const [deleteExpense] = useDeleteExpenseMutation();
  const ExpenseActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/expenses/edit/${id}`);
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
  const handleOpenFilesModal = () => {
    setOpenFilesModal({ ...openFilesModal, open: true, files: [] });
  };
  const handleCloseFilesModal = () => {
    setOpenFilesModal({ ...openFilesModal, open: false });
  };
  const handleDeleteExpenase = async () => {
    await deleteExpense(id);
    enqueueSnackbar('Expense Deleted', { variant: 'success' });
    navigate('/pages/accounting/purchase/expenses');
  };

  return (
    <SectionLoader options={[expenseDetail.isLoading, expenseJournals.isLoading]}>
      <InfoPopup
        open={openPopup.open}
        showActionButton
        handleClose={handleClose}
        infoDescription={openPopup.infoDescription}
        handleYes={handleDeleteExpenase}
      />
      <FilePopup
        open={openFilesModal.open}
        handleClose={handleCloseFilesModal}
        // handleUploadFile={handleUploadDocfile}
        // handleDeleteFile={handleDeleteDocfile}
        files={[]}
      />

      <Stack direction="row" className="w-100 mt-1 mb-3 d-print-none" justifyContent="space-between">
        <Typography className="page-title">
          {expenseDetail.data && expenseDetail.data.expense_account.account_name}
        </Typography>
        <Stack spacing={2} direction="row">
          <Tooltip title="Download" placement="top" arrow>
            <Button>
              <CloudDownloadIcon sx={iconButtonStyle} />
            </Button>
          </Tooltip>
          <Tooltip title="Print" placement="top" arrow>
            <Button
              onClick={() => {
                window.print();
              }}
            >
              <PrintIcon sx={iconButtonStyle} />
            </Button>
          </Tooltip>
          <Tooltip title="Attach File" placement="top" arrow>
            <Button onClick={handleOpenFilesModal}>
              <AttachFileIcon sx={iconButtonStyle} />
            </Button>
          </Tooltip>
          <ActionMenu actionsList={ExpenseActionList} />

          <Button>Back</Button>
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: 'white', padding: '20px 30px' }}>
        <ExpenseDetailInfo expense={expenseDetail?.data} />
        {expenseJournals?.data?.expense_journal_items && (
          <Stack sx={{ marginTop: 5 }} className="d-print-none">
            <JournalTable journalItems={expenseJournals?.data?.expense_journal_items} />
          </Stack>
        )}
      </Stack>
    </SectionLoader>
  );
}

export default ExpenseDetail;
