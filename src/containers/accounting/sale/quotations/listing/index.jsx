import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
// services
import { useDeleteQuotationMutation, useGetQuotationsListQuery } from 'services/private/quotations';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { getItemSearchQueryParams } from 'utilities/filters';
import { quotationsHeadCell } from '../utilities/head-cells';

function QuotationListing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const quotationDetailResponse = useGetQuotationsListQuery(getItemSearchQueryParams(location));
  const [deleteQuotation] = useDeleteQuotationMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message =
      'You cannot delete these items because some of the selected items is used in Proforma Invoice';
    let actionButton = false;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.uuid || item.id)) {
        selectedData.push(item);
      }
    });
    const cantDelete = selectedData.some(item => item.status === 'proforma-invoiced');
    if (!cantDelete) {
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
  const deleteSingleQuotation = async id => {
    await deleteQuotation(id);
    enqueueSnackbar('Quotation Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleQuotation(id);
    });
  };
  return (
    <SectionLoader options={[quotationDetailResponse.isLoading]}>
      <Helmet>
        <title>Quotations - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={quotationDetailResponse?.data?.results}
        totalDataCount={quotationDetailResponse?.data?.count}
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
    </SectionLoader>
  );
}

export default QuotationListing;
