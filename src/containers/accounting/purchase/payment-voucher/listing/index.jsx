import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import {
  useDeletePaymentVoucherMutation,
  useGetPaymentVouchersListQuery,
} from 'services/private/payment-voucher';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities  and styles
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { PaymentVoucherHeadCells } from '../utilities/head-cells';

function paymentVoucherListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const paymentVouchersListResponse = useGetPaymentVouchersListQuery(location.search);
  const [deletePaymentVoucher] = useDeletePaymentVoucherMutation();

  const handleEdit = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot Edit these items because some of the selected items have refunds';
    let actionButton = false;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });
    const isRefunded = selectedData.some(item => item.over_paid > 0 && item.over_paid !== item.over_payment);
    if (isRefunded) {
      message = selected.length === 1 ? 'Selected Voucher have Refunds' : message;
      actionButton = false;
    } else {
      navigate(`edit/${selected[0]}`);
      return;
    }

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };
  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these items because some of the selected items have refund';
    let actionButton = false;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });
    const isRefunded = selectedData.some(item => item.over_paid > 0 && item.over_paid !== item.over_payment);
    if (isRefunded) {
      message = selected.length === 1 ? 'Selected Voucher have Refunds' : message;
      actionButton = false;
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
      handleDeleteResponse(deletePaymentVoucher, id, enqueueSnackbar, 'Payment Voucher Deleted Successfully');
    });
  };
  return (
    <SectionLoader options={[paymentVouchersListResponse.isLoading]}>
      <Helmet>
        <title>Payment vouchers - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={paymentVouchersListResponse?.data?.results}
        totalDataCount={paymentVouchersListResponse?.data?.count}
        TableHeading="Payment vouchers"
        showCheckbox
        headCells={PaymentVoucherHeadCells}
        handleEdit={handleEdit}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Payment Voucher' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default paymentVoucherListing;
