import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import MuiTable from 'shared/components/table/MuiTable';
import { useDeleteQuotationMutation, useGetQuotationsListQuery } from 'services/private/quotations';
import { getItemSearchQueryParams } from 'utilities/filters';
import { quotationsHeadCell } from '../utils/head-cells';

function QuotationListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const customersListResponse = useGetQuotationsListQuery(getItemSearchQueryParams(location));
  const [deleteQuotation] = useDeleteQuotationMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message: 'Are you sure you want to delete?',
      actionButton: true,
    });
  };
  const deleteSingleQuotation = async id => {
    const deleteItemResp = await deleteQuotation(id);
    if (deleteItemResp.data) {
      enqueueSnackbar('Quotation Deleted Successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    }
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleQuotation(id);
    });
  };
  return (
    <>
      <Helmet>
        <title>Quotations - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={customersListResponse?.data?.results}
        totalDataCount={customersListResponse?.data?.count}
        TableHeading="Quotations"
        headCells={quotationsHeadCell}
        showCheckbox
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                Add New Quotation{' '}
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

export default QuotationListing;
