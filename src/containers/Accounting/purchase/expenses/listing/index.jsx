import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { Helmet } from 'react-helmet';
import MuiTable from 'shared/components/table/MuiTable';
import { expensesHeadCells } from 'utilities/tableHeadCells';
import { useGetExpensesListQuery } from 'services/private/expenses';

function ExpensesListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const expensesResponse = useGetExpensesListQuery(getsearchQueryOffsetAndLimitParams(location));
  return (
    <>
      <Helmet>
        <title>Expenses - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {/* {resp.isSuccess && resp?.data?.results?.length > 0 && ( */}
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
                <AddIcon sx={{ fontSize: 15 }} />
                New Expense
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
        // handleConfirmDelete={handleConfirmDelete}
      />
      {/* )} */}
    </>
  );
}

export default ExpensesListing;
