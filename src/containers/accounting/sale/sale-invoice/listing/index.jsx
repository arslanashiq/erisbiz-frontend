import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import MuiTable from 'shared/components/table/MuiTable';
import { useDeleteSaleInvoiceMutation, useGetSaleInvoicesListQuery } from 'services/private/sale-invoice';
import { invoiceHeadCell } from '../utilities/head-cells';

function PerformaInvoiceListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const invoicesListResponse = useGetSaleInvoicesListQuery(location.search);
  const [deleteinvoice] = useDeleteSaleInvoiceMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  };
  const deleteSingleInvoice = async id => {
    await deleteinvoice(id);
    enqueueSnackbar('Proforma Invoice Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleInvoice(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Invoice - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={invoicesListResponse?.data?.results}
        totalDataCount={invoicesListResponse?.data?.count}
        TableHeading="Sales Invoice"
        headCells={invoiceHeadCell}
        showCheckbox
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Sales Invoice
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

export default PerformaInvoiceListing;
