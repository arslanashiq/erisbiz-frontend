import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
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
import { addButtonIconStyle } from 'styles/common/common-styles';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { PaymentVoucherHeadCells } from '../utilities/head-cells';

function paymentVoucherListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const paymentVouchersListResponse = useGetPaymentVouchersListQuery(location.search);
  const [deletePaymentVoucher] = useDeletePaymentVoucherMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'You cannot delete these items because some of the selected items is used in transactions';
    let actionButton = false;
    const haveDebitNotes = checkSelectedDataUsed(data, selected, 'have_debit_note');
    if (haveDebitNotes.length > 0) {
      message = selected.length === 1 ? 'Selected Voucher have credit Notes' : message;
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
  const deleteSingleItem = async id => {
    await deletePaymentVoucher(id);
    enqueueSnackbar('Payment Voucher Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleItem(id);
    });
  };
  return (
    <SectionLoader options={[paymentVouchersListResponse.isLoading]}>
      <Helmet>
        <title>Payment Voucher - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={paymentVouchersListResponse?.data?.results}
        totalDataCount={paymentVouchersListResponse?.data?.count}
        TableHeading="Payment Voucher"
        showCheckbox
        headCells={PaymentVoucherHeadCells}
        handleEdit={(_, selected) => {
          navigate(`edit/${selected[0]}`);
        }}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={addButtonIconStyle} />
                Payment Voucher
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default paymentVoucherListing;
