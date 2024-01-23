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
  useGetUnpaidInvoicesAgainstCustomerMutation,
  useApplyPaymentVoucherToInvoiceMutation,
} from 'services/private/receipt-voucher';

import JournalTable from 'shared/components/accordion/JournalTable';
import RefundDialog from 'shared/components/refund-dialog/RefundDialog';
import ApplyToBill from 'shared/components/apply-to-bill-dialog/ApplyToBill';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import PaymentVoucherHistory from 'containers/accounting/purchase/payment-voucher/detail/components/PaymentVoucherHistory';
import { customerOpeningBalanceName } from 'utilities/constants';
import { displayJournalActionButton } from 'utilities/display-journals';
import { UnPaidSaleInvoiceHeadCells } from '../utilities/head-cells';

const keyValue = 'invoice_payments';
function ReceiptVoucherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [applyToInvoiceInitialValues, setApplyToInvoiceInitialValues] = useState([]);

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Payment Voucher beacuse this Voucher has debit Notes',
  });
  const [defaultExpanded, setDefaultExpanded] = useState(false);

  const [openApplyToInvoiceModal, setOpenApplyToInvoiceModal] = useState(false);
  const [openRefundModal, setOpenRefundModal] = useState(false);

  const receiptVoucherJournalsResponse = useReceiptVoucherJournalsQuery(id);
  const receiptVoucherResponse = useGetSingleReceiptVoucherQuery(id);
  const receiptVoucherDocumentsList = useGetReceiptVoucherDocumentsQuery(id);

  const [refundReceiptVoucher] = useRefundReceiptVoucherMutation();
  const [getUnPaidSaleInvoices] = useGetUnpaidInvoicesAgainstCustomerMutation();
  const [applyPaymentToInvoice] = useApplyPaymentVoucherToInvoiceMutation();

  const orderInfo = useMemo(
    () => ({
      type: 'Receipt Voucher',
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
        handleClick: () => displayJournalActionButton(setDefaultExpanded),
      },
    ];
    if (receiptVoucherResponse?.data?.over_payment > 0) {
      actionsList.push({
        label: 'Refund',
        handleClick: () => {
          setOpenRefundModal(true);
        },
      });
      actionsList.push({
        label: 'Apply To Invoice',
        divider: true,
        handleClick: () => {
          setOpenApplyToInvoiceModal(true);
          (async () => {
            const response = await getUnPaidSaleInvoices(receiptVoucherResponse?.data?.customer);
            const unpaidBills = response?.data?.map(bill => ({
              ...bill,
              amount_applied: 0,
            }));
            setApplyToInvoiceInitialValues(unpaidBills);
          })();
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

  const handleApplyToInvoice = async (values, { setErrors }) => {
    const payload = {
      payment_vouchers: values.bill_credit_notes
        .filter(invoice => invoice.amount_applied > 0)
        .map(invoice => {
          if (invoice.invoice_num === customerOpeningBalanceName) {
            return {
              amount_applied: invoice.amount_applied,
              sales_company: invoice.id,
              payment_received: id,
            };
          }

          return {
            amount_applied: invoice.amount_applied,
            invoice_id: invoice.id,
            payment_received: id,
          };
        }),
    };

    const response = await applyPaymentToInvoice(payload);
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    enqueueSnackbar('Amount Applied To Invoice', { variant: 'success' });
    setOpenApplyToInvoiceModal(false);
  };

  const maxUnusedAmount = useMemo(
    () => receiptVoucherResponse?.data?.over_payment || 0,
    [receiptVoucherResponse]
  );

  return (
    <SectionLoader options={[receiptVoucherResponse.isLoading, receiptVoucherDocumentsList.isLoading]}>
      <RefundDialog
        open={openRefundModal}
        setOpen={setOpenRefundModal}
        handleRefund={handleRefundPaymentVoucher}
        maxAmount={maxUnusedAmount}
      />
      <ApplyToBill
        open={openApplyToInvoiceModal}
        setOpen={setOpenApplyToInvoiceModal}
        handleApply={handleApplyToInvoice}
        maxAmount={maxUnusedAmount}
        initialValues={applyToInvoiceInitialValues || []}
        headCells={UnPaidSaleInvoiceHeadCells}
        title="Apply To Invoice"
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
                  <JournalTable
                    key={uuid()}
                    journalItems={journalItems?.payment_received_journal_items}
                    defaultValue={defaultExpanded}
                  />
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
