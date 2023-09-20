import { Card, CardContent } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  useDeleteSaleInvoiceDocumentsMutation,
  useDeleteSaleInvoiceMutation,
  useGetSingleSaleInvoiceQuery,
  useUploadSaleInvoiceDocumentsMutation,
} from 'services/private/sale-invoice';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { DATE_FORMAT_PRINT } from 'utilities/constants';

const keyValue = 'invoice_items';
function SaleInvoiceDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });
  const saleInvoiceDetailResponse = useGetSingleSaleInvoiceQuery(id);
  const orderInfo = useMemo(
    () => ({
      type: 'Sale Invoice',
      order_number: `#${saleInvoiceDetailResponse?.data?.invoice_formatted_number}`,
      formated_order_number: saleInvoiceDetailResponse?.data?.invoice_num,
      date: saleInvoiceDetailResponse?.data?.date,
      supplier: null,
      location: saleInvoiceDetailResponse?.data?.location,
      box1: [
        {
          label: 'Invoice No',
          value: saleInvoiceDetailResponse?.data?.quotation_formatted_number,
        },
        {
          label: 'Invoice Date',
          value: moment(saleInvoiceDetailResponse?.data?.quotation_num).format(DATE_FORMAT_PRINT),
        },
        {
          label: 'Location',
          value: saleInvoiceDetailResponse?.data?.location,
        },
        {
          label: 'Currency',
          value: saleInvoiceDetailResponse?.data?.location,
        },
      ],
      box2: [
        {
          label: 'Customer',
          value: saleInvoiceDetailResponse?.data?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: saleInvoiceDetailResponse?.data?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: saleInvoiceDetailResponse?.data?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: saleInvoiceDetailResponse?.data?.customer_info?.invoice_address_line1,
        },
      ],
      showCustomOptions: true,
    }),
    [saleInvoiceDetailResponse]
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
          const cantDelete = saleInvoiceDetailResponse.data.status === 'closed';
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
    [saleInvoiceDetailResponse]
  );
  return (
    <SectionLoader options={[saleInvoiceDetailResponse.isLoading]}>
      <DetailPageHeader
        title={`Sale Invoice: #${saleInvoiceDetailResponse?.data?.invoice_num}`}
        filesList={saleInvoiceDetailResponse?.data?.invoice_docs}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={saleInvoiceDetailResponse?.data}
        actionsList={quotationsActionList}
        useDeleteItemMutation={useDeleteSaleInvoiceMutation}
        useUploadDocumentFileMutation={useUploadSaleInvoiceDocumentsMutation}
        useDeleteDocumentFileMutation={useDeleteSaleInvoiceDocumentsMutation}
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
            orderDetail={saleInvoiceDetailResponse.data}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default SaleInvoiceDetailPage;
