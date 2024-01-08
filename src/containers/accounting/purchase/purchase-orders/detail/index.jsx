import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
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
  const { id } = useParams();
  const navigate = useNavigate();

  const [qrCode, setQRCode] = useState('');
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });

  const purchaseOrderResponse = useGetSinglePurchaseOrderQuery(id);

  const [chagePurchaseOrderStatus] = useChangePurchaseOrderStatusToIssuedMutation();

  const purchaseOrderActionList = useMemo(() => {
    const actionsList = [
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'Are you sure you want to delete?';
          let showActionButton = true;
          const canDelete = purchaseOrderResponse?.data?.status === 'draft';
          if (!canDelete) {
            infoDescription = 'You cannot delete this Purchase Order beacuse its status is not draft';
            showActionButton = false;
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
    ];
    if (purchaseOrderResponse?.data?.status === 'draft') {
      actionsList.splice(0, 0, {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/purchase-orders/edit/${id}`);
        },
      });
    }
    if (purchaseOrderResponse?.data?.status === 'issued') {
      actionsList.push({
        label: 'Convert to Bill',
        divider: true,
        handleClick: () => {
          navigate(`/pages/accounting/purchase/purchase-invoice/add?purchaseId=${id}`);
        },
      });
    }
    return actionsList;
  }, [purchaseOrderResponse]);

  const orderInfo = useMemo(
    () => ({
      type: 'Purchase Order',
      order_number: `#${purchaseOrderResponse?.data?.pur_order_num}`,
      formated_order_number: purchaseOrderResponse?.data?.pur_order_formatted_number,
      sale_person: '',
      currency_symbol: purchaseOrderResponse?.data?.currency_symbol,
      date: purchaseOrderResponse?.data?.date,
      location: purchaseOrderResponse?.data?.location,
      bankDetail: {
        bank_name: purchaseOrderResponse?.data?.supplier?.bank_name,
        account_holder_name: purchaseOrderResponse?.data?.supplier?.account_payee,
        IBAN: purchaseOrderResponse?.data?.supplier?.IBAN,
        swift_code: purchaseOrderResponse?.data?.supplier?.swift_code,
      },
      supplier: purchaseOrderResponse?.data?.supplier,
      invoiceToDetail: {
        attention_to: purchaseOrderResponse?.data?.supplier?.contact_person || '',
        supplier_name: purchaseOrderResponse?.data?.supplier?.supplier_name || '',
        address: purchaseOrderResponse?.data?.supplier?.address_line1 || '',
        city: purchaseOrderResponse?.data?.supplier?.city || '',
        country: purchaseOrderResponse?.data?.supplier?.country || '',
      },
    }),
    [purchaseOrderResponse]
  );
  useEffect(() => {
    QRCode.toDataURL('I am a pony!', { errorCorrectionLevel: 'H' }).then(url => setQRCode(url));
  }, [purchaseOrderResponse]);

  return (
    <SectionLoader options={[purchaseOrderResponse.isLoading]}>
      <DetailPageHeader
        title={`PO : ${purchaseOrderResponse?.data?.pur_order_num}`}
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
        navigateAfterDelete="/pages/accounting/purchase/purchase-orders"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={{ ...orderInfo, QRCode: qrCode }}
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
