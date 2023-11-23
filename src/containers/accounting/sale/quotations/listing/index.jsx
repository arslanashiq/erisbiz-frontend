import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';
import { useSnackbar } from 'notistack';
// services
import { useDeleteQuotationMutation, useGetQuotationsListQuery } from 'services/private/quotations';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles
import { getItemSearchQueryParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { quotationsHeadCell } from '../utilities/head-cells';

function QuotationListing() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const quotationDetailResponse = useGetQuotationsListQuery(getItemSearchQueryParams(location));
  const [deleteQuotation] = useDeleteQuotationMutation();

  const handleDelete = (data, selected, openInfoPopup, setOpenInfoPopup) => {
    let message = 'Are you sure you want to delete?';
    let actionButton = true;
    const selectedData = [];
    data.forEach(item => {
      if (selected.includes(item.uuid || item.id)) {
        selectedData.push(item);
      }
    });
    const cantDelete = selectedData.some(
      item => item.status === 'proforma-invoiced' || item.status === 'invoiced'
    );
    if (cantDelete) {
      message =
        selectedData.length === 1
          ? 'This Quotation is used in proforma invoice or in sale invoice delete them first'
          : 'You cannot delete this quotation because some of the selected quotations are used in proforma invoice or in sale invoice';
      actionButton = false;
    }
    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      handleDeleteResponse(deleteQuotation, id, enqueueSnackbar, 'Quotation Deleted Successfully');
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
        editableStatusList={['draft', 'approved']}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Quotation' })}
        handleDelete={handleDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </SectionLoader>
  );
}

export default QuotationListing;
