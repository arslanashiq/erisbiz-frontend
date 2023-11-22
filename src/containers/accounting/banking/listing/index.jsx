import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import {
  useChangeBankAccountStatusMutation,
  useDeleteBankMutation,
  useGetBankAccountsListQuery,
} from 'services/private/banking';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import ListingOtherOptions from 'utilities/other-options-listing';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { BankingHeadCells } from '../utilities/head-cells';

function BankListing() {
  const { enqueueSnackbar } = useSnackbar(0);
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
  const handleConfirmDelete = list => {
    list.forEach(id => {
      handleDeleteResponse(deletBank, id, enqueueSnackbar);
    });
  };
  return (
    <SectionLoader options={[bankAccountListResponse.isLoading]}>
      <Helmet>
        <title>Banking - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={bankAccountListResponse?.isSuccess ? bankAccountListResponse?.data?.results : []}
        totalDataCount={bankAccountListResponse?.data?.count}
        TableHeading="Banking"
        headCells={BankingHeadCells}
        actionButtonKey="is_active"
        handleTableBodyActionButton={handleChangeBankAccountStatus}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Bank Account' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default BankListing;
