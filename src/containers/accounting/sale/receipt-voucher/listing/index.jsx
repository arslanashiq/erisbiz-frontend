import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
// services
import { useGetReceiptVoucherListQuery } from 'services/private/receipt-voucher';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { receiptVoucherHeadCells } from '../utilities/head-cells';

function ReceiptVoucher() {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptVouchersResponse = useGetReceiptVoucherListQuery(location.search);
  return (
    <SectionLoader options={[receiptVouchersResponse.isLoading]}>
      <Helmet>
        <title>Receipt Voucher - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>

      <MuiTable
        data={receiptVouchersResponse?.data?.results}
        totalDataCount={receiptVouchersResponse?.data?.count}
        TableHeading="Purchase Orders"
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
        // handleDelete={handleDelete}
        // handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default ReceiptVoucher;
