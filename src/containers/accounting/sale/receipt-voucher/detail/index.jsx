import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import { Card, CardContent, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import {
  useDeleteReceiptVoucherDocumentsMutation,
  useAddReceiptVoucherDocumentsMutation,
  useGetSingleReceiptVoucherQuery,
  useGetReceiptVoucherDocumentsQuery,
  useDeleteReceiptVoucherMutation,
  useRefundReceiptVoucherMutation,
  useReceiptVoucherJournalsQuery,
} from 'services/private/receipt-voucher';
import JournalTable from 'shared/components/accordion/JournalTable';
import RefundDialog from 'shared/components/refund-dialog/RefundDialog';
import PaymentVoucherHistory from 'containers/accounting/purchase/payment-voucher/detail/components/PaymentVoucherHistory';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { UnPaidSaleInvoiceHeadCells } from '../utilities/head-cells';

const keyValue = 'invoice_payments';
function ReceiptVoucherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Payment Voucher beacuse this Voucher has debit Notes',
  });
  const [openRefundModal, setOpenRefundModal] = useState(false);

  const receiptVoucherJournalsResponse = useReceiptVoucherJournalsQuery(id);
  const receiptVoucherResponse = useGetSingleReceiptVoucherQuery(id);
  const receiptVoucherDocumentsList = useGetReceiptVoucherDocumentsQuery(id);

  const [refundReceiptVoucher] = useRefundReceiptVoucherMutation();

  const orderInfo = useMemo(
    () => ({
      type: 'PAYMENT RECEIPT',
      order_number: `#${receiptVoucherResponse?.data?.payment_num}`,
      formated_order_number: receiptVoucherResponse?.data?.payment_num,
      sale_person: receiptVoucherResponse?.data?.sale_person || '',
      currency_symbol: receiptVoucherResponse?.data?.currency_symbol,
      bankDetail: '',

      date: receiptVoucherResponse?.data?.payment_date,
      supplier: null,
      invoiceToDetail: {
        customer_name: receiptVoucherResponse?.data?.customer_info?.customer_name || '',
        attention_to: receiptVoucherResponse?.data?.customer_info?.contact_person || '',
        address: receiptVoucherResponse?.data?.customer_info?.invoice_address_line1 || '',
        city: receiptVoucherResponse?.data?.customer_info?.invoice_city || '',
        country:
          receiptVoucherResponse?.data?.customer_info?.invoice_country_name ||
          receiptVoucherResponse?.data?.customer_info?.invoice_country,
      },
      location: receiptVoucherResponse?.data?.location || '',

      box2: [
        {
          label: 'Paid By',
          value: receiptVoucherResponse?.data?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: receiptVoucherResponse?.data?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: receiptVoucherResponse?.data?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: receiptVoucherResponse?.data?.customer_info?.invoice_address_line1,
        },
      ],
      headCells: UnPaidSaleInvoiceHeadCells,
      showCustomOptions: true,
      showSaleSectionFooter: true,
    }),
    [receiptVoucherResponse]
  );
  const PaymentVoucherActionList = useMemo(() => {
    const actionsList = [
      {
        label: 'Edit',
        handleClick: () => {
          const isRefunded = receiptVoucherResponse?.data?.refund_payment > 0;
          if (isRefunded) {
            setOpenInfoPopup({
              ...openInfoPopup,
              open: true,
              infoDescription: 'Selected Voucher have Refundds',
              showActionButton: false,
            });
            return;
          }
          navigate(`/pages/accounting/sales/receipt-voucher/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          const infoDescription = 'Are you sure you want to delete?';
          const showActionButton = true;
          const isRefunded = receiptVoucherResponse?.data?.refund_payment > 0;
          if (isRefunded) {
            setOpenInfoPopup({
              ...openInfoPopup,
              open: true,
              infoDescription: 'Selected Voucher have Refundds',
              showActionButton: false,
            });
            return;
          }
          setOpenInfoPopup({ ...openInfoPopup, open: true, infoDescription, showActionButton });
        },
      },
      {
        label: 'View Journal',
        handleClick: () => {
          const Journal = document.getElementById('Journal');
          Journal.scrollIntoView({ behavior: 'smooth' });
        },
      },
    ];
    if (receiptVoucherResponse?.data?.over_payment > 0) {
      actionsList.push({
        label: 'Refund',
        divider: true,
        handleClick: () => {
          setOpenRefundModal(true);
        },
      });
    }
    return actionsList;
  }, [receiptVoucherResponse]);

  const handleRefundPaymentVoucher = useCallback(async (values, { setErrors }) => {
    const payload = {
      ...values,
      payment_received: id,
    };
    const response = await refundReceiptVoucher(payload);
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    enqueueSnackbar('Supplier Credit Updated', { variant: 'success' });
    setOpenRefundModal(false);
  }, []);

  console.log(receiptVoucherJournalsResponse, 'receiptVoucherJournalsResponse');
  return (
    <SectionLoader options={[receiptVoucherResponse.isLoading, receiptVoucherDocumentsList.isLoading]}>
      <RefundDialog
        open={openRefundModal}
        setOpen={setOpenRefundModal}
        handleRefund={handleRefundPaymentVoucher}
        maxAmount={receiptVoucherResponse?.data?.over_payment}
      />
      <DetailPageHeader
        title={`Receipt Voucher: #${receiptVoucherResponse?.data?.payment_num}`}
        filesList={receiptVoucherDocumentsList?.data}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={receiptVoucherResponse?.data}
        actionsList={PaymentVoucherActionList}
        useDeleteItemMutation={useDeleteReceiptVoucherMutation}
        useUploadDocumentFileMutation={useAddReceiptVoucherDocumentsMutation}
        useDeleteDocumentFileMutation={useDeleteReceiptVoucherDocumentsMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: false,
          showVoucherTable: true,
        }}
        navigateAfterDelete="/pages/accounting/sales/receipt-voucher"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={receiptVoucherResponse?.data}
            showStatus={false}
            showItemsTable={false}
            showOrderVoucher
          />

          <Grid container>
            <Grid item xs={12} style={{ maxWidth: 900, margin: '20px auto' }}>
              <PaymentVoucherHistory PaymentVoucher={receiptVoucherResponse?.data} />
              <Grid marginTop={4} id="Journal">
                {receiptVoucherJournalsResponse?.data?.map(journalItems => (
                  <JournalTable key={uuid()} journalItems={journalItems?.payment_received_journal_items} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ReceiptVoucherDetail;
