import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import {
  useChangePurchaseOrderStatusToIssuedMutation,
  useDeletePurchaseOrderDocumentFileMutation,
  useDeletePurchaseOrderMutation,
  useGetSinglePurchaseOrderQuery,
  useUploadPurchaseOrderDocumentFileMutation,
} from 'services/private/purchase-orders';
// shared
import OrderDocument from 'shared/components/order-document/OrderDocument';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';

const keyValue = 'pur_order_items';
function PurchaseOrderDetail() {
  const [chagePurchaseOrderStatus] = useChangePurchaseOrderStatusToIssuedMutation();

  const navigate = useNavigate();
  const { id } = useParams();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });
  const purchaseOrderResponse = useGetSinglePurchaseOrderQuery(id);

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
          const cantDelete = purchaseOrderResponse.data.status === 'closed';
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
    [purchaseOrderResponse]
  );

  const orderInfo = useMemo(
    () => ({
      type: 'Purchase Order',
      order_number: `#${purchaseOrderResponse?.data?.pur_order_num}`,
      formated_order_number: purchaseOrderResponse?.data?.pur_order_formatted_number,
      date: purchaseOrderResponse?.data?.date,
      supplier: purchaseOrderResponse?.data?.supplier,
      location: purchaseOrderResponse?.data?.location,
    }),
    [purchaseOrderResponse]
  );
  return (
    <SectionLoader options={[purchaseOrderResponse.isLoading]}>
      <DetailPageHeader
        title={`Po:#${purchaseOrderResponse?.data?.pur_order_num}`}
        filesList={purchaseOrderResponse?.data?.pur_order_docs}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={purchaseOrderResponse?.data}
        actionsList={purchaseOrderActionList}
        useDeleteItemMutation={useDeletePurchaseOrderMutation}
        useUploadDocumentFileMutation={useUploadPurchaseOrderDocumentFileMutation}
        useDeleteDocumentFileMutation={useDeletePurchaseOrderDocumentFileMutation}
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
            orderDetail={purchaseOrderResponse.data}
            handleChangeStatus={chagePurchaseOrderStatus}
            showPaymentRequest
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PurchaseOrderDetail;
