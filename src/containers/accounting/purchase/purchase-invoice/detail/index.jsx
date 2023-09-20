import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Grid } from '@mui/material';
// services
import {
  useDeletePurchaseInvoceMutation,
  useDeletePurchaseInvoiceDocumentFileMutation,
  useGetPaymentsAgainstPaymentInvoiceQuery,
  useGetSinglePurchaseInvoiceQuery,
  useUploadPurchaseInvoiceDocumentFileMutation,
} from 'services/private/purchase-invoice';
// shared
import OrderDocument from 'shared/components/order-document/OrderDocument';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import PaymentTable from './components/PaymentTable';

const keyValue = 'bill_items';
function PurchaseInvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const paymentMadeAgainstInvoiceResponse = useGetPaymentsAgainstPaymentInvoiceQuery(id);
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Invoice beacuse this order is used in Payment Voucher',
  });
  const purchaseInvoiceResponse = useGetSinglePurchaseInvoiceQuery(id);
  const orderInfo = useMemo(
    () => ({
      type: 'Bill Invoice',
      order_number: purchaseInvoiceResponse?.data?.bill_num || '',
      formated_order_number: purchaseInvoiceResponse?.data?.bill_formated_number || '',
      date: purchaseInvoiceResponse?.data?.invoice_date || '',
      supplier: purchaseInvoiceResponse?.data?.supplier || {},
      location: purchaseInvoiceResponse?.data?.location || '',
    }),
    [purchaseInvoiceResponse]
  );
  const purchaseInvoiceActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/purchase-invoice/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription =
            'You cannot delete this Purchase Invoice beacuse this order is used in Payment Voucher';
          let showActionButton = false;
          const cantDelete =
            purchaseInvoiceResponse.data.status === 'partially paid' ||
            purchaseInvoiceResponse.data.status === 'void';

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
          setOpenInfoPopup({ ...openInfoPopup, open: true });
        },
      },
    ],
    [purchaseInvoiceResponse]
  );

  return (
    <SectionLoader
      options={[
        purchaseInvoiceResponse.isLoading,
        purchaseInvoiceResponse.data === undefined,
        paymentMadeAgainstInvoiceResponse.isLoading,
      ]}
    >
      <DetailPageHeader
        title={`Bill:${purchaseInvoiceResponse?.data?.bill_num}`}
        filesList={purchaseInvoiceResponse?.data?.bill_docs}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={purchaseInvoiceResponse?.data}
        actionsList={purchaseInvoiceActionList}
        useDeleteItemMutation={useDeletePurchaseInvoceMutation}
        useUploadDocumentFileMutation={useUploadPurchaseInvoiceDocumentFileMutation}
        useDeleteDocumentFileMutation={useDeletePurchaseInvoiceDocumentFileMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
        navigateAfterDelete="/pages/accounting/purchase/purchase-invoice"
      />
      <Card>
        <CardContent>
          {paymentMadeAgainstInvoiceResponse?.data?.payment?.length > 0 && (
            <Grid style={{ maxWidth: 900, margin: '20px auto' }} md={12}>
              <PaymentTable payments={paymentMadeAgainstInvoiceResponse.data} />
            </Grid>
          )}
          <OrderDocument
            keyValue={keyValue}
            orderInfo={orderInfo}
            orderDetail={purchaseInvoiceResponse.data}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PurchaseInvoiceDetail;
