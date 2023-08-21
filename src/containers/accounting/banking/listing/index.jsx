import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
import {
  useChangeBankAccountStatusMutation,
  useDeleteBankMutation,
  useGetBankAccountsListQuery,
} from 'services/private/banking';
import MuiTable from 'shared/components/table/MuiTable';
import AddIcon from '@mui/icons-material/Add';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { BankingHeadCells } from '../utils/head-cells';
import 'styles/mui.scss';

function BankListing() {
  const { enqueueSnackbar } = useSnackbar(0);
  const navigate = useNavigate();
  const location = useLocation();
  const bankAccountListResponse = useGetBankAccountsListQuery(getsearchQueryOffsetAndLimitParams(location));
  const [handleChangeBankAccountStatus] = useChangeBankAccountStatusMutation();
  const [deletBank] = useDeleteBankMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these Banks because some of the selected Banks are active';
    let actionButton = false;
    const isActive = checkSelectedDataUsed(data, selected, 'is_active');
    if (isActive.length > 0) {
      message =
        selected.length === 1
          ? 'Active Banks cannot be deleted. Please inactive them first in order to delete'
          : message;
    } else {
      message = 'Are you sure you want to delete?';
      actionButton = true;
    }

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };
  const deleteSingleBank = async id => {
    const deleteResponse = await deletBank(id);
    if (deleteResponse.data) {
      enqueueSnackbar('Bank Deleted Successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    }
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleBank(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Banking - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        showCheckbox
        data={bankAccountListResponse?.data?.results}
        totalDataCount={bankAccountListResponse?.data?.count}
        TableHeading="Banking"
        headCells={BankingHeadCells}
        actionButtonKey="is_active"
        handleTableBodyActionButton={handleChangeBankAccountStatus}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Bank Account
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default BankListing;
