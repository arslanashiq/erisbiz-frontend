import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
// services
import {
  useDeleteSupplierCreditsMutation,
  useGetSupplierCreditsListQuery,
} from 'services/private/debit-note';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { supplierCreditHeadCells } from '../utilities/head-cells';

function SupplierCreditListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const supplierCreditResponse = useGetSupplierCreditsListQuery(getsearchQueryOffsetAndLimitParams(location));
  const [deleteSupplierCredit] = useDeleteSupplierCreditsMutation();

  const deleteSingleSupplierCredit = async id => {
    await deleteSupplierCredit(id);
    enqueueSnackbar('Supplier Credit Deleted Successfully', { variant: 'success' });
  };
  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    const message = 'Are you sure you want to delete?';
    const actionButton = true;

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleSupplierCredit(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Purchase Debit Notes - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {/* {resp.isSuccess && resp?.data?.results?.length > 0 && ( */}
      <MuiTable
        data={supplierCreditResponse?.data?.results}
        totalDataCount={supplierCreditResponse?.data?.count}
        TableHeading="Purchase Debit Notes"
        showCheckbox
        headCells={supplierCreditHeadCells}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Debit Note
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
      {/* )} */}
    </>
  );
}

export default SupplierCreditListing;
