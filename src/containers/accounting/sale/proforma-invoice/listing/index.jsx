import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import {
  useDeleteProformaInvoiceMutation,
  useGetProformaInvoicesListQuery,
} from 'services/private/proforma-invoices';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import { getItemSearchQueryParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { proformaInvoiceHeadCell } from '../utilities/head-cells';

function ProfomaInvoiceListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const proformaInvoicesListResponse = useGetProformaInvoicesListQuery(getItemSearchQueryParams(location));

  const [deleteProfomaInvoice] = useDeleteProformaInvoiceMutation();

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
        deleteProfomaInvoice,
        id,
        enqueueSnackbar,
        'Proforma Invoice Deleted Successfully'
      );
    });
  };
  return (
    <>
      <Helmet>
        <title>Proforma Invoices - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        TableHeading="Proforma Invoices"
        data={proformaInvoicesListResponse?.data?.results}
        totalDataCount={proformaInvoicesListResponse?.data?.count}
        headCells={proformaInvoiceHeadCell}
        showCheckbox
        editableStatusList={['draft', 'approved']}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Proforma Invoice' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default ProfomaInvoiceListing;
