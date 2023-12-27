import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import { useDeleteCreditNoteMutation, useGetCreditNotesListQuery } from 'services/private/credit-notes';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import { DEFAULT_PARAMS } from 'utilities/constants';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { creditNoteHeadCells } from '../utilities/head-cells';

function CreditNotesListing() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const creditNotesListResponse = useGetCreditNotesListQuery(location.search || DEFAULT_PARAMS);

  const [deleteCreditNote] = useDeleteCreditNoteMutation();

  const handleDelete = useCallback((data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  }, []);

  const handleConfirmDelete = useCallback(list => {
    list.forEach(id => {
      handleDeleteResponse(deleteCreditNote, id, enqueueSnackbar, 'Credit Note Deleted Successfully');
    });
  }, []);
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
