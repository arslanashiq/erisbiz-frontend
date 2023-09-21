import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
// services
import {
  useDeleteReceiptVoucherMutation,
  useGetReceiptVoucherListQuery,
} from 'services/private/receipt-voucher';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { receiptVoucherHeadCells } from '../utilities/head-cells';

function ReceiptVoucher() {
  const location = useLocation();
  const navigate = useNavigate();
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
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Receipt Voucher
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        // handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default ReceiptVoucher;
