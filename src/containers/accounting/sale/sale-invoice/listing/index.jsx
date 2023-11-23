import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import { useDeleteSaleInvoiceMutation, useGetSaleInvoicesListQuery } from 'services/private/sale-invoice';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import ListingOtherOptions from 'utilities/other-options-listing';
import { invoiceHeadCell } from '../utilities/head-cells';

function PerformaInvoiceListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const invoicesListResponse = useGetSaleInvoicesListQuery(location.search);
  const [deleteinvoice] = useDeleteSaleInvoiceMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'Are you sure you want to delete?';
    let actionButton = true;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.uuid || item.id)) {
        selectedData.push(item);
      }
    });
    const cantDelete = selectedData.some(
      item => item.status === 'void' || item.status === 'partially paid' || item.status === 'paid'
    );
    if (cantDelete) {
      message =
        selectedData.length === 1
          ? 'This Sale Invoice has Payments delete them first'
          : 'You cannot delete this Sale Invoice because some of the selected Sale Invoices are void or  have payments ';
      actionButton = false;
    }
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };
  const deleteSingleInvoice = async id => {
    await deleteinvoice(id);
    enqueueSnackbar('Proforma Invoice Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleInvoice(id);
    });
  };
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

export default PerformaInvoiceListing;
