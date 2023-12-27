import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import {
  useDeleteJournalVoucherMutation,
  useGetJournalVouchersListQuery,
} from 'services/private/journal-voucher';

// shared components and styles
import { DEFAULT_PARAMS } from 'utilities/constants';
import MuiTable from 'shared/components/table/MuiTable';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { journalVoucherHeadCells } from '../utilities/head-cells';

function JournalVoucherListing() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const journalVoucherDetailResponse = useGetJournalVouchersListQuery(location.search || DEFAULT_PARAMS);

  const [deleteJournalVoucher] = useDeleteJournalVoucherMutation();

  const handleDelete = useCallback((data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot delete these items because some of the selected items is used in Proforma Invoice';
    let actionButton = false;

    message = 'Are you sure you want to delete?';
    actionButton = true;

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  }, []);

  const handleConfirmDelete = useCallback(list => {
    list.forEach(id => {
      handleDeleteResponse(deleteJournalVoucher, id, enqueueSnackbar, 'Journal Voucher Deleted Successfully');
    });
  }, []);
  return (
    <SectionLoader options={[journalVoucherDetailResponse.isLoading]}>
      <Helmet>
        <title>Journal Vouchers - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={journalVoucherDetailResponse?.isSuccess ? journalVoucherDetailResponse?.data?.results : []}
        totalDataCount={journalVoucherDetailResponse?.data?.count}
        TableHeading="Journal Vouchers"
        headCells={journalVoucherHeadCells}
        showCheckbox
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Journal' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default JournalVoucherListing;
