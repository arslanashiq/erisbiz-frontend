import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import { useDeleteSaleInvoiceMutation, useGetSaleInvoicesListQuery } from 'services/private/sale-invoice';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import { DEFAULT_PARAMS } from 'utilities/constants';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { invoiceHeadCell } from '../utilities/head-cells';

function ProfomaInvoiceListing() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const invoicesListResponse = useGetSaleInvoicesListQuery(location.search || DEFAULT_PARAMS);

  const [deleteinvoice] = useDeleteSaleInvoiceMutation();

  const handleDelete = useCallback((data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'Are you sure you want to delete?';
    let actionButton = true;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.uuid || item.id)) {
        selectedData.push(item);
      }
    });
    const canDelete = selectedData.some(item => item.status === 'draft');
    if (!canDelete) {
      message =
        selectedData.length === 1
          ? 'Cannot delete  this Sale Invoice because its status is not draft'
          : 'You cannot delete this Sale Invoice because some of the selected Sale Invoices are void or  have payments or status is not draft';
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
      handleDeleteResponse(deleteinvoice, id, enqueueSnackbar, 'Sale Invoice Deleted Successfully');
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Invoice - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={invoicesListResponse?.data?.results}
        totalDataCount={invoicesListResponse?.data?.count}
        TableHeading="Sales Invoice"
        headCells={invoiceHeadCell}
        showCheckbox
        editableStatusList={['draft', 'due']}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Sales Invoice' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default ProfomaInvoiceListing;
