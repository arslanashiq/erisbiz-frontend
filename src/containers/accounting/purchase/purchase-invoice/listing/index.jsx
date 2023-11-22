import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import {
  useDeletePurchaseInvoceMutation,
  useGetPurchaseInvoiceListQuery,
} from 'services/private/purchase-invoice';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilitues and styles
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { purchaseInvoiceHeadCells } from '../utilities/head-cells';

function SupplierCreditListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const purchaseInvoiceResponse = useGetPurchaseInvoiceListQuery(
    getsearchQueryOffsetAndLimitParams(location)
  );
  const [deleteInvoice] = useDeletePurchaseInvoceMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these items because some of the selected items is used in transactions';
    let actionButton = false;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });
    const cantDelete = selectedData.some(item => item.status === 'partially paid' || item.status === 'void');

    if (!cantDelete) {
      message = 'Are you sure you want to delete?';
      actionButton = true;
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
      handleDeleteResponse(deleteInvoice, id, enqueueSnackbar);
    });
  };

  return (
    <>
      <Helmet>
        <title>Purchase Invoice - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={purchaseInvoiceResponse?.data?.results}
        totalDataCount={purchaseInvoiceResponse?.data?.count}
        TableHeading="Purchase Invoice"
        showCheckbox
        headCells={purchaseInvoiceHeadCells}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Purchase Invoice' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default SupplierCreditListing;
