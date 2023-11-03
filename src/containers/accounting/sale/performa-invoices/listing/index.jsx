import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
// services
import {
  useDeletePerformaInvoiceMutation,
  useGetPerformaInvoicesListQuery,
} from 'services/private/performa-invoices';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import { addButtonIconStyle } from 'styles/common/common-styles';
import { getItemSearchQueryParams } from 'utilities/filters';
import { performaInvoiceHeadCell } from '../utilities/head-cells';

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
    deletePerformaInvoice(id);
    enqueueSnackbar('Proforma Invoice Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSinglePerformaInvoice(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Proforma Invoice - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={performaInvoicesListResponse?.data?.results}
        totalDataCount={performaInvoicesListResponse?.data?.count}
        TableHeading="Proforma Invoice"
        headCells={performaInvoiceHeadCell}
        showCheckbox
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={addButtonIconStyle} />
                Add New Proforma Invoice
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
