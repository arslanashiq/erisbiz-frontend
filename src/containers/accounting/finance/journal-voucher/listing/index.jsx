import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
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
import { addButtonIconStyle } from 'styles/common/common-styles';
import { journalVoucherHeadCells } from '../utilities/head-cells';

function JournalVoucherListing() {
  const location = useLocation();
  const navigate = useNavigate();
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
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={addButtonIconStyle} />
                New Journal
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

export default JournalVoucherListing;
