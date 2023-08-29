import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import MuiTable from 'shared/components/table/MuiTable';
import { useGetCreditNotesListQuery } from 'services/private/credit-notes';
import { useDeleteQuotationMutation } from 'services/private/quotations';
import { getItemSearchQueryParams } from 'utilities/filters';
import { quotationsHeadCell } from '../../quotations/utilities/head-cells';

function CreditNotesListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const creditNotesListResponse = useGetCreditNotesListQuery(getItemSearchQueryParams(location));
  const [deleteQuotation] = useDeleteQuotationMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  };
  const deleteSingleQuotation = async id => {
    const deleteItemResp = await deleteQuotation(id);
    if (deleteItemResp.data) {
      enqueueSnackbar('Quotation Deleted Successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    }
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleQuotation(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Quotations - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={creditNotesListResponse?.data?.results}
        totalDataCount={creditNotesListResponse?.data?.count}
        TableHeading="Credit Notes"
        headCells={quotationsHeadCell}
        showCheckbox
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                Add New Quotation{' '}
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
