import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Grid } from '@mui/material';
// services
import {
  useChagePurchaseInvoiceStatusToOpenMutation,
  useChangeInvoiceStatusToVoidMutation,
  useDeletePurchaseInvoceMutation,
  useDeletePurchaseInvoiceDocumentFileMutation,
  useGetJournalsAgainstPaymentInvoiceQuery,
  useGetPaymentsAgainstPaymentInvoiceQuery,
  useGetSinglePurchaseInvoiceQuery,
  useUploadPurchaseInvoiceDocumentFileMutation,
} from 'services/private/purchase-invoice';
// shared
import OrderDocument from 'shared/components/order-document/OrderDocument';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import JournalTable from 'shared/components/accordion/JournalTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import PaymentTable from './components/PaymentTable';
import ChangeStatusToVoid from './components/ChangeStatusToVoidModal';

const keyValue = 'bill_items';
const handleCheck = status => {
  if (!status) return true;
  if (status === 'draft') return true;
  return false;
};

function PurchaseInvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const paymentMadeAgainstInvoiceResponse = useGetPaymentsAgainstPaymentInvoiceQuery(id);
  const purchaseInvoiceResponse = useGetSinglePurchaseInvoiceQuery(id);
  const purchaseInvoiceJournals = useGetJournalsAgainstPaymentInvoiceQuery(id, {
    skip: handleCheck(purchaseInvoiceResponse?.data?.status),
  });

  const [changeInvoiceStatusToOpen] = useChagePurchaseInvoiceStatusToOpenMutation();
  const [changeInvoiceStatusToVoid] = useChangeInvoiceStatusToVoidMutation();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Invoice beacuse this order is used in Payment Voucher',
  });
  const [openVoidModal, setOpenVoidModal] = useState(false);
  const [defaultExpanded, setDefaultExpanded] = useState(false);

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
  const handleChangeStatusToVoid = useCallback(async values => {
    const { reason } = values;
    const response = await handleChangeStatus(
      changeInvoiceStatusToVoid,
      { id, reason },
      'Invoice status change to Void'
    );
    if (response) setOpenVoidModal(false);
  }, []);

  const orderInfo = useMemo(
    () => ({
      type: 'Bill Invoice',
      order_number: purchaseInvoiceResponse?.data?.bill_num || '',
      formated_order_number: purchaseInvoiceResponse?.data?.bill_num || '',
      sale_person: '',
      currency_symbol: purchaseInvoiceResponse?.data?.currency_symbol,
      date: purchaseInvoiceResponse?.data?.invoice_date || '',
      supplier: purchaseInvoiceResponse?.data?.supplier || {},
      invoiceToDetail: {
        attention_to: purchaseInvoiceResponse?.data?.supplier?.contact_person || '',
        supplier_name: purchaseInvoiceResponse?.data?.supplier?.supplier_name || '',
        address: purchaseInvoiceResponse?.data?.supplier?.address_line1 || '',
        city: purchaseInvoiceResponse?.data?.supplier?.city || '',
        country: purchaseInvoiceResponse?.data?.supplier?.country || '',
      },
      location: purchaseInvoiceResponse?.data?.location || '',
      bankDetail: '',
    }),
    [purchaseInvoiceResponse]
  );
  const purchaseInvoiceActionList = useMemo(() => {
    const invoiceStatus = purchaseInvoiceResponse?.data?.status;
    if (invoiceStatus === 'void') {
      return [];
    }
    const actionsList = [
      {
        label: 'Edit',
        handleClick: () => {
          const cantDelete =
            invoiceStatus === 'void' || invoiceStatus === 'partially paid' || invoiceStatus === 'paid';

          if (cantDelete) {
            setOpenInfoPopup({
              ...openInfoPopup,
              open: true,
              infoDescription:
                'You cannot edit this Purchase Invoice beacuse this order is used in Payment Voucher',
              showActionButton: false,
              handleAction: null,
            });
            return;
          }

          navigate(`/pages/accounting/purchase/purchase-invoice/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'Are you sure you want to delete?';
          let showActionButton = true;
          const canDelete = invoiceStatus === 'draft';

          if (!canDelete) {
            infoDescription =
              'You cannot delete this Purchase Invoice beacuse this Invoice status is not draft';
            showActionButton = false;
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
            infoDescription: 'Are you sure you want to change Status to Open',
            showActionButton: true,
            handleAction: async () => {
              handleChangeStatus(changeInvoiceStatusToOpen, id, 'Invoice status change to Open');
            },
          });
        },
      });
    }
    if (invoiceStatus !== 'draft' && invoiceStatus !== 'void') {
      actionsList.push({
        label: 'View Journal',
        handleClick: () => {
          const Journal = document.getElementById('Journal');
          Journal.scrollIntoView({ behavior: 'smooth' });
          setDefaultExpanded(true);
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
          {purchaseInvoiceJournals?.data?.bill_journal_items && (
            <Grid container>
              <Grid item xs={12} style={{ maxWidth: 900, margin: '20px auto', paddingBottom: 50 }}>
                <Grid marginTop={4} id="Journal">
                  <JournalTable
                    key={uuid()}
                    defaultValue={defaultExpanded}
                    journalItems={purchaseInvoiceJournals?.data?.bill_journal_items}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PurchaseInvoiceDetail;
