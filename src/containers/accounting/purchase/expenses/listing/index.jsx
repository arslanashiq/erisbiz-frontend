import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
// services
import { useDeleteExpenseMutation, useGetExpensesListQuery } from 'services/private/expenses';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utlities and styles
import { addButtonIconStyle } from 'styles/common/common-styles';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { expensesHeadCells } from '../utilities/head-cells';

function ExpensesListing() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const expensesResponse = useGetExpensesListQuery(getsearchQueryOffsetAndLimitParams(location));
  const [deleteExpense] = useDeleteExpenseMutation();

  const deleteSingleExpense = async id => {
    await deleteExpense(id);
    enqueueSnackbar('Item Deleted Successfully', { variant: 'success' });
  };
  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these items because some of the selected items is used in transactions';
    let actionButton = false;

    message = 'Are you sure you want to delete?';
    actionButton = true;

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleExpense(id);
    });
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
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={addButtonIconStyle} />
                New Expense
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default ExpensesListing;
