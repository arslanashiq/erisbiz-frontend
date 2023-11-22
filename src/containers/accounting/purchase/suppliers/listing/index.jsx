import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import { useDeleteSupplierMutation, useGetSuppliersListQuery } from 'services/private/suppliers';
// shared
import MuiTable from 'shared/components/table/MuiTable';
import PersonlizedFilter from 'shared/components/personalized-filters/PersonlizedFilter';
// utilities and styles
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { supplierHeadCells } from '../utilities/head-cells';
import { supplierFilterInitialValues, supplierFiltersOptionsList } from '../utilities/constants';

function SupplierListing() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const suppliersListingResponse = useGetSuppliersListQuery(location.search);
  const [deleteSupplier] = useDeleteSupplierMutation();
  const handleEdit = (data, selected) => {
    navigate(`edit/${selected[0]}`);
  };
  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot delete these suppliers because some of the selected suppliers have transactions';
    let actionButton = false;

    const havePurchaseOrder = checkSelectedDataUsed(data, selected, 'have_pur_orders');
    const haveBills = checkSelectedDataUsed(data, selected, 'have_bills');
    const haveDebitNotes = checkSelectedDataUsed(data, selected, 'have_debit_notes');
    const haveExpense = checkSelectedDataUsed(data, selected, 'have_expenses');
    if (haveExpense.length > 0) {
      message =
        selected.length === 1 ? 'This account has expense, please delete the expenses first.' : message;
    } else if (havePurchaseOrder.length > 0) {
      message =
        selected.length === 1
          ? 'This account has a purchase order, please delete the purchase order first.'
          : message;
    } else if (haveBills.length > 0) {
      message = selected.length === 1 ? 'This account has a bill, please delete the bill first.' : message;
    } else if (haveDebitNotes.length > 0) {
      message =
        selected.length === 1
          ? 'This account has a debit note, please delete the debit note first.'
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

  const handleConfirmDelete = list => {
    list.forEach(id => {
      handleDeleteResponse(deleteSupplier, id, enqueueSnackbar, 'Supplier Deleted Successfully');
    });
  };
  return (
    <>
      <Helmet>
        <title>Supplier - ErisBiz</title>
      </Helmet>
      {/* {resp.isSuccess && resp?.data?.results?.length > 0 && ( */}
      <MuiTable
        data={suppliersListingResponse?.data?.results}
        totalDataCount={suppliersListingResponse?.data?.count}
        TableHeading="Supplier"
        showCheckbox
        headCells={supplierHeadCells}
        checkStatusBeforeEdit={false}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Supplier' })}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
        filterButton={(
          <PersonlizedFilter
            filterInitialValues={supplierFilterInitialValues}
            filtersList={supplierFiltersOptionsList}
          />
        )}
      />
      {/* )} */}
    </>
  );
}

export default SupplierListing;
