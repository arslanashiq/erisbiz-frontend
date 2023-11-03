import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
// services
import { useDeleteSaleInvoiceMutation, useGetSaleInvoicesListQuery } from 'services/private/sale-invoice';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities and styles
import { addButtonIconStyle } from 'styles/common/common-styles';
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
                <AddIcon sx={addButtonIconStyle} />
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
