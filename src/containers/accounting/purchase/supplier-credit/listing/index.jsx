import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import {
  useDeleteSupplierCreditsMutation,
  useGetSupplierCreditsListQuery,
} from 'services/private/supplier-credit';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import ListingOtherOptions from 'utilities/other-options-listing';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { supplierCreditHeadCells } from '../utilities/head-cells';

function SupplierCreditListing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const supplierCreditResponse = useGetSupplierCreditsListQuery(getsearchQueryOffsetAndLimitParams(location));

  const [deleteSupplierCredit] = useDeleteSupplierCreditsMutation();

  const handleEdit = useCallback((data, selected, openInfoPopup, setOpenInfoPopup) => {
    const filterResult = data.filter(row => row.id === selected[0]);
    if (filterResult[0].is_applied) {
      setOpenInfoPopup({
        ...openInfoPopup,
        status: true,
        message: 'This Debit Note is used in bills or refunded',
        actionButton: false,
      });
      return;
    }
    navigate(`edit/${selected[0]}`);
  }, []);
  const handleDelete = useCallback((data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'Can not delete Debit Notes because some of the selected debit notes are applied to bill or refunded';
    let actionButton = false;
    const isApplied = checkSelectedDataUsed(data, selected, 'is_applied');
    if (isApplied.length > 0) {
      message = selected.length === 1 ? 'This Debit Note is applied to bill or refunded' : message;
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
  }, []);
  const handleConfirmDelete = useCallback(list => {
    list.forEach(id => {
      handleDeleteResponse(deleteSupplierCredit, id, enqueueSnackbar, 'Debit Note Deleted Successfully');
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Purchase Debit Notes - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={supplierCreditResponse?.data?.results}
        totalDataCount={supplierCreditResponse?.data?.count}
        TableHeading="Purchase Debit Notes"
        showCheckbox
        handleEdit={handleEdit}
        headCells={supplierCreditHeadCells}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Debit Note' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default SupplierCreditListing;
