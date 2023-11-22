import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import {
  useDeleteJournalVoucherMutation,
  useGetJournalVouchersListQuery,
} from 'services/private/journal-voucher';

// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles
import ListingOtherOptions from 'utilities/other-options-listing';
import { journalVoucherHeadCells } from '../utilities/head-cells';

function JournalVoucherListing() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const journalVoucherDetailResponse = useGetJournalVouchersListQuery(location.search);
  const [deleteJournalVoucher] = useDeleteJournalVoucherMutation();
  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
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
  };
  const deleteSingleJournalVoucher = async id => {
    await deleteJournalVoucher(id);
    enqueueSnackbar('Journal Voucher Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleJournalVoucher(id);
    });
  };
  return (
    <SectionLoader options={[journalVoucherDetailResponse.isLoading]}>
      <Helmet>
        <title>Journal Voucher - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={journalVoucherDetailResponse?.isSuccess ? journalVoucherDetailResponse?.data?.results : []}
        totalDataCount={journalVoucherDetailResponse?.data?.count}
        TableHeading="Journal Voucher"
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
