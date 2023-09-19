import { Card, CardContent } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  useDeleteQuotationDocumentsMutation,
  useDeleteQuotationMutation,
  useGetSingleQuotationQuery,
  useUploadQuotationDocumentsMutation,
} from 'services/private/quotations';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { DATE_FORMAT_PRINT } from 'utilities/constants';

const keyValue = 'quotation_items';
function QuotationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });
  const quotationsDetailResponse = useGetSingleQuotationQuery(id);
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
          value: quotationsDetailResponse?.data?.location,
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
  const quotationsActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/quotations/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription =
            'You cannot delete this Purchase Order beacuse this order is used in purchase invoice';
          let showActionButton = false;
          const cantDelete = quotationsDetailResponse.data.status === 'closed';
          if (!cantDelete) {
            infoDescription = 'Are you sure you want to delete?';
            showActionButton = true;
          }

          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription,
            showActionButton,
          });
          // setOpenPopup({ ...openPopup, open: true });
        },
      },
    ],
    [quotationsDetailResponse]
  );
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
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={quotationsDetailResponse.data}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default QuotationDetailPage;
