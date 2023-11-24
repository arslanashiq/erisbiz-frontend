import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';
// services
import {
  useDeleteReceiptVoucherMutation,
  useGetReceiptVoucherListQuery,
} from 'services/private/receipt-voucher';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities  and styles
import SectionLoader from 'containers/common/loaders/SectionLoader';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { receiptVoucherHeadCells } from '../utilities/head-cells';

function ReceiptVoucher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const receiptVouchersResponse = useGetReceiptVoucherListQuery(location.search);
  const [deleteReceiptVoucher] = useDeleteReceiptVoucherMutation();

  const handleEdit = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot Edit these vouchers because some of the selected items have refund or applied to bill';
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });
    const isRefunded = selectedData.some(item => item.refund_payment > 0);
    if (isRefunded) {
      message = selected.length === 1 ? 'Selected Voucher have Refunds' : message;
      setOpenInfoPopup({
        ...openInfoPopup,
        status: true,
        message,
        actionButton: false,
      });
      return;
    }
    navigate(`edit/${selected[0]}`);
  };
  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot delete these vouchers because some of the selected items have refund or applied to bill';
    let actionButton = false;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.id)) {
        selectedData.push(item);
      }
    });
    const isRefunded = selectedData.some(
      item => item.over_payment > 0 && item.over_paid !== item.over_payment
    );
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
      handleDeleteResponse(deleteReceiptVoucher, id, enqueueSnackbar, 'Receipt Voucher Deleted Successfully');
    });
  };
  return (
    <SectionLoader options={[receiptVouchersResponse.isLoading]}>
      <Helmet>
        <title>Receipt Voucher - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>

      <MuiTable
        data={receiptVouchersResponse?.data?.results}
        totalDataCount={receiptVouchersResponse?.data?.count}
        TableHeading="Receipt Voucher"
        showCheckbox
        headCells={receiptVoucherHeadCells}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Receipt Voucher' })}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default ReceiptVoucher;
