import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import {
  useDeletePerformaInvoiceMutation,
  useGetPerformaInvoicesListQuery,
} from 'services/private/performa-invoices';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import { getItemSearchQueryParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import { performaInvoiceHeadCell } from '../utilities/head-cells';

function PerformaInvoiceListing() {
  const { enqueueSnackbar } = useSnackbar();
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
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Proforma Invoice' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default PerformaInvoiceListing;
