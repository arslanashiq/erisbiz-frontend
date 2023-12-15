import { Card, CardContent } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  useChangeQuotationStatusMutation,
  useDeleteQuotationDocumentsMutation,
  useDeleteQuotationMutation,
  useGetSingleQuotationQuery,
  useUploadQuotationDocumentsMutation,
} from 'services/private/quotations';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { DATE_FORMAT_PRINT } from 'utilities/constants';
import QuotationStatusChange from './components/QuotationStatusChange';

const keyValue = 'quotation_items';
function QuotationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });

  const quotationsDetailResponse = useGetSingleQuotationQuery(id);

  const [changeQuotationStatus] = useChangeQuotationStatusMutation();

  const orderInfo = useMemo(
    () => ({
      type: 'QUOTATION',
      order_number: `#${quotationsDetailResponse?.data?.quotation_num}`,
      formated_order_number: quotationsDetailResponse?.data?.quotation_num,
      date: quotationsDetailResponse?.data?.date,
      supplier: null,
      location: quotationsDetailResponse?.data?.location,
      box1: [
        {
          label: 'Quotation No',
          value: quotationsDetailResponse?.data?.quotation_formatted_number,
        },
        {
          label: 'Quotation Date',
          value: moment(quotationsDetailResponse?.data?.quotation_num).format(DATE_FORMAT_PRINT),
        },
        {
          label: 'Location',
          value: quotationsDetailResponse?.data?.location,
        },
        {
          label: 'Currency',
          value: quotationsDetailResponse?.data?.currency_symbol,
        },
      ],
      box2: [
        {
          label: 'Customer',
          value: quotationsDetailResponse?.data?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: quotationsDetailResponse?.data?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: quotationsDetailResponse?.data?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: quotationsDetailResponse?.data?.customer_info?.invoice_address_line1,
        },
      ],
      showCustomOptions: true,
    }),
    [quotationsDetailResponse]
  );

  const handleChangeStatus = useCallback(async (changeInvoiceStatus, payload, successMessage) => {
    const response = await changeInvoiceStatus(payload);
    if (response.error) {
      enqueueSnackbar('Somthing went wrong', {
        variant: 'error',
      });
      return false;
    }
    enqueueSnackbar(successMessage, {
      variant: 'success',
    });
    return true;
  }, []);
  const handleStatus = useCallback(
    (status = 'approved') => {
      handleChangeStatus(changeQuotationStatus, { id, status }, 'Quotation status changed');
    },
    [id]
  );

  const quotationStatus = useMemo(() => quotationsDetailResponse?.data?.status, [quotationsDetailResponse]);

  const quotationsActionList = useMemo(() => {
    if (quotationStatus === 'declined') return [];
    const actionList = [
      {
        label: 'Edit & clone',
        handleClick: () => {
          navigate(`/pages/accounting/sales/quotations/add?quotationId=${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'Are you sure you want to delete?';
          let showActionButton = true;
          const canDelete = quotationStatus === 'draft';
          if (!canDelete) {
            infoDescription = 'Cannot delete this Quotation because its status is no draft';
            showActionButton = false;
          }

          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription,
            showActionButton,
          });
        },
      },
    ];
    if (quotationStatus === 'draft') {
      actionList.splice(0, 0, {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/quotations/edit/${id}`);
        },
      });
      actionList.push({
        label: 'Approve',
        divider: true,
        handleClick: () => handleStatus('approved'),
      });
    }
    if (quotationStatus === 'approved') {
      actionList.push({
        label: 'Create Proforma Invoice',
        handleClick: () => {
          navigate(`/pages/accounting/sales/proforma-invoice/add?quotationId=${id}`);
        },
      });
    }
    return actionList;
  }, [quotationsDetailResponse]);

  return (
    <SectionLoader options={[quotationsDetailResponse.isLoading]}>
      <DetailPageHeader
        title={`Quotation: #${quotationsDetailResponse?.data?.quotation_num}`}
        filesList={quotationsDetailResponse?.data?.quotation_docs}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={quotationsDetailResponse?.data}
        actionsList={quotationsActionList}
        useDeleteItemMutation={useDeleteQuotationMutation}
        useUploadDocumentFileMutation={useUploadQuotationDocumentsMutation}
        useDeleteDocumentFileMutation={useDeleteQuotationDocumentsMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
        navigateAfterDelete="pages/accounting/sales/quotations"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={quotationsDetailResponse.data}
            customComponent={
              quotationStatus === 'draft' && (
                <QuotationStatusChange
                  handleApprove={() => handleStatus('approved')}
                  handleDecline={() => handleStatus('declined')}
                />
              )
            }
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default QuotationDetailPage;
