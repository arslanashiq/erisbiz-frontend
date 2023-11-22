import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import { useDeleteCreditNoteMutation, useGetCreditNotesListQuery } from 'services/private/credit-notes';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import ListingOtherOptions from 'utilities/other-options-listing';
import { creditNoteHeadCells } from '../utilities/head-cells';

function CreditNotesListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const creditNotesListResponse = useGetCreditNotesListQuery(location.search);
  const [deleteCreditNote] = useDeleteCreditNoteMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  };
  const deleteSingleCreditNote = async id => {
    await deleteCreditNote(id);

    enqueueSnackbar('Credit Note Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleCreditNote(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Credit Note - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={creditNotesListResponse?.data?.results}
        totalDataCount={creditNotesListResponse?.data?.count}
        TableHeading="Credit Notes"
        headCells={creditNoteHeadCells}
        showCheckbox
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Credit Note' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default CreditNotesListing;
