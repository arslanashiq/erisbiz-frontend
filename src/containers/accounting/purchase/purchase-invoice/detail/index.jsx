/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Grid } from '@mui/material';
// services
import {
  useChagePurchaseInvoiceStatusToOpenMutation,
  useChangeInvoiceStatusToVoidMutation,
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
import ChangeStatusToVoid from './components/ChangeStatusToVoidModal';

const keyValue = 'bill_items';
function PurchaseInvoiceDetail() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const paymentMadeAgainstInvoiceResponse = useGetPaymentsAgainstPaymentInvoiceQuery(id);
  const [changeInvoiceStatusToOpen] = useChagePurchaseInvoiceStatusToOpenMutation();
  const [changeInvoiceStatusToVoid] = useChangeInvoiceStatusToVoidMutation();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Invoice beacuse this order is used in Payment Voucher',
  });
  const [openVoidModal, setOpenVoidModal] = useState(false);
  const purchaseInvoiceResponse = useGetSinglePurchaseInvoiceQuery(id);

  const handleChangeStatus = async (changeInvoiceStatus, payload, successMessage) => {
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
  };
  const handleChangeStatusToVoid = async values => {
    const { reason } = values;
    handleChangeStatus(changeInvoiceStatusToVoid, { id, reason }, 'Invoice status change to Void');
  };

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
  const purchaseInvoiceActionList = useMemo(() => {
    const invoiceStatus = purchaseInvoiceResponse?.data?.status;
    const actionsList = [
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
          const cantDelete = invoiceStatus === 'partially paid' || invoiceStatus === 'void';

          if (!cantDelete) {
            infoDescription = 'Are you sure you want to delete?';
            showActionButton = true;
          }

          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription,
            showActionButton,
            handleAction: null,
          });
        },
      },
    ];
    if (invoiceStatus === 'draft') {
      actionsList.push({
        label: 'Convert to Open',
        divider: true,
        handleClick: async () => {
          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription: 'Are you sure you want to change Status to Void',
            showActionButton: true,
            handleAction: async () => {
              handleChangeStatus(changeInvoiceStatusToOpen, id, 'Invoice status change to Open');
            },
          });
        },
      });
    }
    if (invoiceStatus !== 'draft' && invoiceStatus !== 'paid' && invoiceStatus !== 'partially paid') {
      actionsList.push({
        label: 'Void',
        divider: true,
        handleClick: () => {
          setOpenVoidModal(true);
        },
      });
    }
    if (invoiceStatus !== 'draft' && invoiceStatus !== 'paid') {
      actionsList.push({
        label: 'Record Payment',
        handleClick: async () => {
          navigate(
            `/pages/accounting/purchase/payment-voucher/add?supplierId=${purchaseInvoiceResponse?.data?.supplier_id}`
          );
        },
      });
    }
    if (invoiceStatus === 'partially paid' || invoiceStatus === 'paid') {
      actionsList.push({
        label: 'Create Debit Note',
        handleClick: async () => {
          navigate(`/pages/accounting/purchase/debit-notes/add?purchaseId=${id}`);
        },
      });
    }

    return actionsList;
  }, [purchaseInvoiceResponse]);

  return (
    <SectionLoader
      options={[
        purchaseInvoiceResponse.isLoading,
        purchaseInvoiceResponse.data === undefined,
        paymentMadeAgainstInvoiceResponse.isLoading,
      ]}
    >
      <ChangeStatusToVoid
        open={openVoidModal}
        setOpen={setOpenVoidModal}
        handleChangeStatus={handleChangeStatusToVoid}
      />
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
            <Grid item style={{ maxWidth: 900, margin: '20px auto' }} md={12}>
              <PaymentTable payments={paymentMadeAgainstInvoiceResponse.data?.payment} />
            </Grid>
          )}
          {paymentMadeAgainstInvoiceResponse?.data?.credits_applied?.length > 0 && (
            <Grid item style={{ maxWidth: 900, margin: '20px auto' }} md={12}>
              <PaymentTable payments={paymentMadeAgainstInvoiceResponse.data?.credits_applied} />
            </Grid>
          )}
          <OrderDocument
            keyValue={keyValue}
            orderInfo={orderInfo}
            orderDetail={purchaseInvoiceResponse.data}
            // handleChangeStatus={changeInvoiceStatus}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PurchaseInvoiceDetail;
