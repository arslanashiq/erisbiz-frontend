import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
// services
import { useDeleteCreditNoteMutation, useGetCreditNotesListQuery } from 'services/private/credit-notes';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import { addButtonIconStyle } from 'styles/common/common-styles';
import { creditNoteHeadCells } from '../utilities/head-cells';

function CreditNotesListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
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
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={addButtonIconStyle} />
                New Credit Note
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

export default CreditNotesListing;
