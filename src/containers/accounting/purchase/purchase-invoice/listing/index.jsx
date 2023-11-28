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
    let message = 'Are you sure you want to delete?';
    let actionButton = true;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });
    const cantDelete = selectedData.some(
      item => item.status === 'void' || item.status === 'partially paid' || item.status === 'paid'
    );

    if (cantDelete) {
      message = 'You cannot delete these items because some of the selected items is used in transactions';
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
      handleDeleteResponse(deleteInvoice, id, enqueueSnackbar, 'purchase Invoice Deleted Successfully');
    });
  };

  return (
    <>
      <Helmet>
        <title>Purchase Invoices - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={purchaseInvoiceResponse?.data?.results}
        totalDataCount={purchaseInvoiceResponse?.data?.count}
        TableHeading="Purchase Invoices"
        showCheckbox
        editableStatusList={['draft', 'due']}
        headCells={purchaseInvoiceHeadCells}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Purchase Invoice' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default SupplierCreditListing;
