import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import MuiTable from 'shared/components/table/MuiTable';
import {
  useDeletePerformaInvoiceMutation,
  useGetPerformaInvoicesListQuery,
} from 'services/private/performa-invoices';
import { getItemSearchQueryParams } from 'utilities/filters';
import { performaInvoiceHeadCell } from '../utils/head-cells';

function PerformaInvoiceListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const performaInvoicesListResponse = useGetPerformaInvoicesListQuery(getItemSearchQueryParams(location));
  const [deletePerformaInvoice] = useDeletePerformaInvoiceMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  };
  const deleteSinglePerformaInvoice = async id => {
    const deleteItemResp = await deletePerformaInvoice(id);
    if (deleteItemResp.data) {
      enqueueSnackbar('Performa Invoice Deleted Successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    }
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSinglePerformaInvoice(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Performa Invoice - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={performaInvoicesListResponse?.data?.results}
        totalDataCount={performaInvoicesListResponse?.data?.count}
        TableHeading="Performa Invoice"
        headCells={performaInvoiceHeadCell}
        showCheckbox
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                Add New Performa Invoice
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

export default PerformaInvoiceListing;
