import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
// services
import { useDeleteCutomerMutation, useGetCustomersListQuery } from 'services/private/customers';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities  and styles
import { addButtonIconStyle } from 'styles/common/common-styles';
import checkSelectedDataUsed from 'utilities/checkSelectedDataUsed';
import { getItemSearchQueryParams } from 'utilities/filters';
import { customersHeadCell } from '../utilities/head-cells';

function CustomerListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const customersListResponse = useGetCustomersListQuery(getItemSearchQueryParams(location));
  const [deleteCustomer] = useDeleteCutomerMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot delete these customers because some of the selected customers have transactions';
    let actionButton = false;
    const haveCreditNote = checkSelectedDataUsed(data, selected, 'have_credit_notes');
    const haveInvoice = checkSelectedDataUsed(data, selected, 'have_invoices');
    const haveProformaInvoice = checkSelectedDataUsed(data, selected, 'have_pro_invoices');
    const haveQuotations = checkSelectedDataUsed(data, selected, 'have_quotations');
    if (haveCreditNote.length > 0) {
      message =
        selected.length === 1
          ? 'This account has credit notes, please delete the credit notess first.'
          : message;
    } else if (haveInvoice.length > 0) {
      message =
        selected.length === 1 ? 'This account has a Invoices, please delete the Invoices first.' : message;
    } else if (haveProformaInvoice.length > 0) {
      message =
        selected.length === 1
          ? 'This account has a proforma invoices, please delete the proforma invoices first.'
          : message;
    } else if (haveQuotations.length > 0) {
      message =
        selected.length === 1
          ? 'This account has a quotations, please delete the quotations first.'
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
        checkStatusBeforeEdit={false}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={addButtonIconStyle} />
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
