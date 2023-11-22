import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// services
import { useDeleteCutomerMutation, useGetCustomersListQuery } from 'services/private/customers';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities  and styles
import { getItemSearchQueryParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { customersHeadCell } from '../utilities/head-cells';

function CustomerListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const customersListResponse = useGetCustomersListQuery(getItemSearchQueryParams(location));
  const [deleteCustomer] = useDeleteCutomerMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot delete these customers because some of the selected customers have transactions';
    let actionButton = false;
    const haveCreditNote = checkSelectedDataUsed(data, selected, 'have_credit_notes');
    const haveInvoice = checkSelectedDataUsed(data, selected, 'have_invoices');
    const haveProformaInvoice = checkSelectedDataUsed(data, selected, 'have_pro_invoices');
    const haveQuotations = checkSelectedDataUsed(data, selected, 'have_quotations');
    if (haveCreditNote.length > 0) {
      message =
        selected.length === 1
          ? 'This account has credit notes, please delete the credit notess first.'
          : message;
    } else if (haveInvoice.length > 0) {
      message =
        selected.length === 1 ? 'This account has a Invoices, please delete the Invoices first.' : message;
    } else if (haveProformaInvoice.length > 0) {
      message =
        selected.length === 1
          ? 'This account has a proforma invoices, please delete the proforma invoices first.'
          : message;
    } else if (haveQuotations.length > 0) {
      message =
        selected.length === 1
          ? 'This account has a quotations, please delete the quotations first.'
          : message;
    } else {
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
  const deleteSingleCustomer = async id => {
    const deleteItemResp = await deleteCustomer(id);
    if (deleteItemResp.error) {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Customer Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleCustomer(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Customers - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={customersListResponse?.data?.results}
        totalDataCount={customersListResponse?.data?.count}
        TableHeading="Customers"
        headCells={customersHeadCell}
        showCheckbox
        checkStatusBeforeEdit={false}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Customer' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default CustomerListing;
