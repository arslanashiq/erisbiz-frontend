import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
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
import { receiptVoucherHeadCells } from '../utilities/head-cells';

function ReceiptVoucher() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const receiptVouchersResponse = useGetReceiptVoucherListQuery(location.search);
  const [deleteReceiptVoucher] = useDeleteReceiptVoucherMutation();
  const deleteSingleReceiptVoucher = async id => {
    await deleteReceiptVoucher(id);
    enqueueSnackbar('Payment Voucher Deleted Successfully', { variant: 'success' });
  };
  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleReceiptVoucher(id);
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
        // handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default ReceiptVoucher;
