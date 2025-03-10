import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Stack } from '@mui/material';
// services
import {
  useDeleteExpenseMutation,
  useDeleteExpensesDocumentMutation,
  useGetExpenseJournalsQuery,
  useGetSingleExpenseQuery,
  useUploadExpensesDocumentMutation,
} from 'services/private/expenses';
// shared
import JournalTable from 'shared/components/accordion/JournalTable';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// components
import ExpenseDetailInfo from './components/ExpenseDetailInfo';

function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'Are you sure you want to delete this expense?',
    showActionButton: true,
  });
  const expenseDetail = useGetSingleExpenseQuery(id);
  const expenseJournals = useGetExpenseJournalsQuery(id);

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
          setOpenInfoPopup({ ...openInfoPopup, open: true });
        },
      },
    ],
    []
  );
  return (
    <SectionLoader options={[expenseDetail.isLoading, expenseJournals.isLoading]}>
      <DetailPageHeader
        title={expenseDetail.data ? `Expense : ${expenseDetail.data.expense_formatted_number}` : ''}
        filesList={expenseDetail?.data?.expense_docs}
        orderDetail={expenseDetail?.data}
        actionsList={ExpenseActionList}
        useDeleteItemMutation={useDeleteExpenseMutation}
        useUploadDocumentFileMutation={useUploadExpensesDocumentMutation}
        useDeleteDocumentFileMutation={useDeleteExpensesDocumentMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        handlePrint={() => {
          window.print();
        }}
        navigateAfterDelete="/pages/accounting/purchase/expenses"
      />
      <Stack sx={{ backgroundColor: 'white', padding: '20px 30px' }}>
        <ExpenseDetailInfo expense={expenseDetail?.data} />
        {expenseJournals?.data?.expense_journal_items && (
          <Stack sx={{ marginTop: 5 }} className="no-print">
            <JournalTable journalItems={expenseJournals?.data?.expense_journal_items} />
          </Stack>
        )}
      </Stack>
    </SectionLoader>
  );
}

export default ExpenseDetail;
