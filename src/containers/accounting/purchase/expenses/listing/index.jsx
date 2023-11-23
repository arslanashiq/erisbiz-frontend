import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import { useDeleteExpenseMutation, useGetExpensesListQuery } from 'services/private/expenses';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utlities and styles
import ListingOtherOptions from 'utilities/other-options-listing';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { expensesHeadCells } from '../utilities/head-cells';

function ExpensesListing() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const expensesResponse = useGetExpensesListQuery(getsearchQueryOffsetAndLimitParams(location));
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      handleDeleteResponse(deleteExpense, id, enqueueSnackbar, 'Expense Deleted Successfully');
    });
  };
  const handleEdit = (_, selected) => {
    navigate(`edit/${selected[0]}`);
  };
  return (
    <SectionLoader options={[expensesResponse.isLoading]}>
      <Helmet>
        <title>Expenses - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={expensesResponse?.data?.results}
        totalDataCount={expensesResponse?.data?.count}
        TableHeading="Expenses "
        showCheckbox
        headCells={expensesHeadCells}
        handleEdit={handleEdit}
        otherOptions={ListingOtherOptions({ addButtonLabel: ' New Expense' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default ExpensesListing;
