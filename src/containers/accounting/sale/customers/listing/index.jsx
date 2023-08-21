import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import MuiTable from 'shared/components/table/MuiTable';
import { useDeleteCutomerMutation, useGetCustomersListQuery } from 'services/private/customers';
import { customersHeadCell } from '../utils/head-cells';

function CustomerListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const customersListResponse = useGetCustomersListQuery();
  const [deleteCustomer] = useDeleteCutomerMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  };
  const deleteSingleCustomer = async id => {
    const deleteItemResp = await deleteCustomer(id);
    if (deleteItemResp.data) {
      enqueueSnackbar('Customer Deleted Successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    }
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleCustomer(id);
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
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                Add New Customer{' '}
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default CustomerListing;
