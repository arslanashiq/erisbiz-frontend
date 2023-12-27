import React, { useCallback } from 'react';
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
import { DEFAULT_PARAMS } from 'utilities/constants';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { purchaseInvoiceHeadCells } from '../utilities/head-cells';

function SupplierCreditListing() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const purchaseInvoiceResponse = useGetPurchaseInvoiceListQuery(
    getsearchQueryOffsetAndLimitParams(location) || DEFAULT_PARAMS
  );

  const [deleteInvoice] = useDeletePurchaseInvoceMutation();

  const handleDelete = useCallback((data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'Are you sure you want to delete?';
    let actionButton = true;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });
    const canDelete = selectedData.some(item => item.status === 'draft');

    if (!canDelete) {
      message = 'You cannot delete these Invoices because some of the selected invoices not draft';
      actionButton = false;
    }
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  }, []);
  const handleConfirmDelete = useCallback(list => {
    list.forEach(id => {
      handleDeleteResponse(deleteInvoice, id, enqueueSnackbar, 'purchase Invoice Deleted Successfully');
    });
  }, []);

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
