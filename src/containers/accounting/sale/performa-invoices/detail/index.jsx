import { Card, CardContent } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  useDeletePerformaInvoiceDocumentFileMutation,
  useDeletePerformaInvoiceMutation,
  useGetSinglePerformaInvoiceQuery,
  useUploadPerformaInvoiceDocumentFileMutation,
} from 'services/private/performa-invoices';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { DATE_FORMAT_PRINT } from 'utilities/constants';

const keyValue = 'pro_invoice_items';
function PerformaInvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });
  const performaInvoiceDetailResponse = useGetSinglePerformaInvoiceQuery(id);
  const purchaseOrderActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/purchase-orders/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription =
            'You cannot delete this Purchase Order beacuse this order is used in purchase invoice';
          let showActionButton = false;
          const cantDelete = performaInvoiceDetailResponse.data.status === 'closed';
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
    [performaInvoiceDetailResponse]
  );
  const orderInfo = useMemo(
    () => ({
      type: 'Performa Invoice',
      order_number: `#${performaInvoiceDetailResponse?.data?.pro_invoice_num}`,
      formated_order_number: performaInvoiceDetailResponse?.data?.pro_invoice_formatted_number,
      date: performaInvoiceDetailResponse?.data?.pro_invoice_date,
      supplier: null,
      location: performaInvoiceDetailResponse?.data?.location,
      box1: [
        {
          label: 'Quotation No',
          value: performaInvoiceDetailResponse?.data?.quotation_formatted_number,
        },
        {
          label: 'Quotation Date',
          value: moment(performaInvoiceDetailResponse?.data?.quotation_num).format(DATE_FORMAT_PRINT),
        },
        {
          label: 'Location',
          value: performaInvoiceDetailResponse?.data?.location,
        },
      ],
      box2: [
        {
          label: 'Customer',
          value: performaInvoiceDetailResponse?.data?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: performaInvoiceDetailResponse?.data?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: performaInvoiceDetailResponse?.data?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: performaInvoiceDetailResponse?.data?.customer_info?.invoice_address_line1,
        },
      ],
      showCustomOptions: true,
    }),
    [performaInvoiceDetailResponse]
  );
  return (
    <SectionLoader options={[performaInvoiceDetailResponse.isLoading]}>
      <DetailPageHeader
        title={`Po:#${performaInvoiceDetailResponse?.data?.pro_invoice_formatted_number}`}
        filesList={performaInvoiceDetailResponse?.data?.pro_invoice_docs}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={performaInvoiceDetailResponse?.data}
        actionsList={purchaseOrderActionList}
        useDeleteItemMutation={useDeletePerformaInvoiceMutation}
        useUploadDocumentFileMutation={useUploadPerformaInvoiceDocumentFileMutation}
        useDeleteDocumentFileMutation={useDeletePerformaInvoiceDocumentFileMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
        navigateAfterDelete="/pages/accounting/sales/performa-invoice"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={performaInvoiceDetailResponse.data}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PerformaInvoiceDetail;
