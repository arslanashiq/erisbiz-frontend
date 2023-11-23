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
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { performaInvoiceHeadCell } from '../utilities/head-cells';

function PerformaInvoiceListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const performaInvoicesListResponse = useGetPerformaInvoicesListQuery(getItemSearchQueryParams(location));

  const [deletePerformaInvoice] = useDeletePerformaInvoiceMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'Are you sure you want to delete?';
    let actionButton = true;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.uuid || item.id)) {
        selectedData.push(item);
      }
    });
    const cantDelete = selectedData.some(item => item.status === 'invoiced');
    if (cantDelete) {
      message =
        selectedData.length === 1
          ? 'This Profoma Invoice is used in sale invoice delete them first'
          : 'You cannot delete this Profoma Invoice because some of the selected Profoma Invoice are used in sale invoice';
      actionButton = false;
    }
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };

  const handleConfirmDelete = list => {
    list.forEach(id => {
      handleDeleteResponse(
        deletePerformaInvoice,
        id,
        enqueueSnackbar,
        'Proforma Invoice Deleted Successfully'
      );
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
        editableStatusList={['draft']}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Proforma Invoice' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default PerformaInvoiceListing;
