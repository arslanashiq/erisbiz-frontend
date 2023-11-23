import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import { useDeleteCutomerMutation, useGetCustomersListQuery } from 'services/private/customers';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities  and styles
import { getItemSearchQueryParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { customersHeadCell } from '../utilities/head-cells';

function CustomerListing() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const customersListResponse = useGetCustomersListQuery(getItemSearchQueryParams(location));
  const [deleteCustomer] = useDeleteCutomerMutation();

  const handleEdit = (data, selected) => {
    navigate(`edit/${selected[0]}`);
  };
  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot delete these customers because some of the selected customers have transactions';
    let actionButton = false;
    const haveQuotations = checkSelectedDataUsed(data, selected, 'have_quotations');
    const haveProformaInvoice = checkSelectedDataUsed(data, selected, 'have_pro_invoices');
    const haveInvoice = checkSelectedDataUsed(data, selected, 'have_invoices');
    const haveCreditNote = checkSelectedDataUsed(data, selected, 'have_credit_notes');
    if (haveQuotations.length > 0) {
      message =
        selected.length === 1
          ? 'This Customer has a quotations, please delete the quotations first.'
          : message;
    } else if (haveProformaInvoice.length > 0) {
      message =
        selected.length === 1
          ? 'This Customer has a proforma invoices, please delete the proforma invoices first.'
          : message;
    } else if (haveCreditNote.length > 0) {
      message =
        selected.length === 1
          ? 'This Customer has credit notes, please delete the credit notess first.'
          : message;
    } else if (haveInvoice.length > 0) {
      message =
        selected.length === 1 ? 'This Customer has a Invoices, please delete the Invoices first.' : message;
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

  const handleConfirmDelete = list => {
    list.forEach(id => {
      handleDeleteResponse(deleteCustomer, id, enqueueSnackbar, 'Customer Deleted Successfully');
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
        handleEdit={handleEdit}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Customer' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default CustomerListing;
