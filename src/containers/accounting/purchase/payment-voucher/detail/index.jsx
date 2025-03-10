import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Grid } from '@mui/material';
// services
import {
  useDeletePaymentVoucherDocumentMutation,
  useDeletePaymentVoucherMutation,
  useGetPaymentVoucherJournalsQuery,
  useGetPaymentVouchersDocumentsQuery,
  useGetSinglePaymentVoucherQuery,
  useUploadPaymentVoucherDocumentMutation,
  useRefundPaymentVoucherMutation,
  useApplyPavmentVoucherToBillMutation,
} from 'services/private/payment-voucher';
import { useGetSuppliersUpaidBillsListMutation } from 'services/private/suppliers';
// shared
import RefundDialog from 'shared/components/refund-dialog/RefundDialog';
import JournalTable from 'shared/components/accordion/JournalTable';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import ApplyToBill from 'shared/components/apply-to-bill-dialog/ApplyToBill';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';

// components
import { supplierOpeningBalanceName } from 'utilities/constants';
import { displayJournalActionButton } from 'utilities/display-journals';
import { UnPaidBillsHeadCells } from '../utilities/head-cells';
import PaymentVoucherHistory from './components/PaymentVoucherHistory';

const keyValue = 'bill_payments';
function PaymentVoucherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [openApplyToBillModal, setOpenApplyToBillModal] = useState(false);
  const [applyToBillInitialValues, setApplyToBillInitialValues] = useState([]);
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Payment Voucher beacuse this Voucher has debit Notes',
  });
  const [defaultExpanded, setDefaultExpanded] = useState(false);
  const [openRefundModal, setOpenRefundModal] = useState(false);

  const PaymentVoucherDetailResponse = useGetSinglePaymentVoucherQuery(id);
  const paymenyVoucherJournalResponse = useGetPaymentVoucherJournalsQuery(id);
  const paymentVoucherDocumentsResponse = useGetPaymentVouchersDocumentsQuery(id);

  const [getUnpaidBills] = useGetSuppliersUpaidBillsListMutation();
  const [refundPaymentVoucher] = useRefundPaymentVoucherMutation();
  const [applyPaymentVoucherToBill] = useApplyPavmentVoucherToBillMutation();

  const orderInfo = useMemo(
    () => ({
      type: 'Payment Voucher',
      order_number: `#${
        PaymentVoucherDetailResponse?.data?.payment_formatted_number ||
        PaymentVoucherDetailResponse?.data?.payment_num
      }`,
      formated_order_number:
        PaymentVoucherDetailResponse?.data?.payment_formatted_number ||
        PaymentVoucherDetailResponse?.data?.payment_num,
      date: PaymentVoucherDetailResponse?.data?.payment_date,
      supplier: PaymentVoucherDetailResponse?.data?.supplier,
      label: 'Paid To',
      headCells: UnPaidBillsHeadCells,
      invoiceToDetail: {
        attention_to: PaymentVoucherDetailResponse?.data?.supplier?.contact_person || '',
        supplier_name: PaymentVoucherDetailResponse?.data?.supplier?.supplier_name || '',
        address: PaymentVoucherDetailResponse?.data?.supplier?.address_line1 || '',
        city: PaymentVoucherDetailResponse?.data?.supplier?.city || '',
        country: PaymentVoucherDetailResponse?.data?.supplier?.country || '',
      },
      currency_symbol: PaymentVoucherDetailResponse?.data?.currency || '',
      showSaleSectionFooter: false,
    }),
    [PaymentVoucherDetailResponse]
  );
  const PaymentVoucherActionList = useMemo(() => {
    const actionsList = [
      {
        label: 'Edit',
        handleClick: () => {
          const cantDelete = PaymentVoucherDetailResponse?.data?.refund_payment > 0;

          if (cantDelete) {
            setOpenInfoPopup({
              ...openInfoPopup,
              open: true,
              infoDescription: 'You cannot edit this Payment Voucher beacuse this Voucher has refund',
              showActionButton: false,
            });
            return;
          }

          navigate(`/pages/accounting/purchase/payment-voucher/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'Are you sure you want to delete?';
          let showActionButton = true;
          const cantDelete = PaymentVoucherDetailResponse?.data?.refund_payment > 0;
          if (cantDelete) {
            infoDescription = 'You cannot delete this Payment Voucher beacuse this Voucher has refund';
            showActionButton = false;
          }
          setOpenInfoPopup({ ...openInfoPopup, open: true, infoDescription, showActionButton });
        },
      },
      {
        label: 'View Journal',
        handleClick: () => displayJournalActionButton(setDefaultExpanded),
      },
    ];
    if (PaymentVoucherDetailResponse?.data?.over_payment > 0) {
      actionsList.push({
        label: 'Apply To Bill',
        divider: true,
        handleClick: async () => {
          setOpenApplyToBillModal(true);
          const response = await getUnpaidBills(PaymentVoucherDetailResponse?.data?.supplier?.id);
          const unpaidBills = response?.data?.map(bill => ({
            ...bill,
            amount_applied: 0,
          }));
          setApplyToBillInitialValues(unpaidBills);
        },
      });
      // actionsList.push({
      //   label: 'Refund',
      //   divider: true,
      //   handleClick: () => {
      //     setOpenRefundModal(true);
      //   },
      // });
    }
    return actionsList;
  }, [PaymentVoucherDetailResponse]);

  const handleRefundPaymentVoucher = useCallback(async (values, { setErrors }) => {
    const payload = {
      ...values,
      payment_made: id,
    };
    const response = await refundPaymentVoucher(payload);
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    enqueueSnackbar('Supplier Credit Updated', { variant: 'success' });

    setOpenRefundModal(false);
  }, []);

  const handleApplyToBill = async (values, { setErrors }) => {
    try {
      let payload = {};
      let response = null;

      const paymentVouchers = [];
      values.bill_credit_notes
        .filter(bill => bill.amount_applied > 0)
        .forEach(bill => {
          if (bill.bill_num === supplierOpeningBalanceName) {
            paymentVouchers.push({
              amount_applied: bill.amount_applied,
              supplier: bill.id,
              payment_made: id,
            });
          } else {
            paymentVouchers.push({
              amount_applied: bill.amount_applied,
              bill_id: bill.id,
              payment_made: id,
            });
          }
        });

      payload = { payment_vouchers: paymentVouchers };
      response = await applyPaymentVoucherToBill(payload);

      if (response === null) {
        enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
      }
      if (response.error) {
        setErrors(response.error.data);
        return;
      }
      enqueueSnackbar('Credit Applied Against Bill', { variant: 'success' });
      setOpenApplyToBillModal(false);
    } catch (error) {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    }
  };
  const maxUnusedAmount = useMemo(
    () => PaymentVoucherDetailResponse?.data?.over_payment || 0,
    [PaymentVoucherDetailResponse]
  );
  return (
    <SectionLoader
      options={[PaymentVoucherDetailResponse.isLoading, paymenyVoucherJournalResponse.isLoading]}
    >
      <ApplyToBill
        open={openApplyToBillModal}
        setOpen={setOpenApplyToBillModal}
        handleApply={handleApplyToBill}
        maxAmount={maxUnusedAmount}
        initialValues={applyToBillInitialValues || []}
        headCells={UnPaidBillsHeadCells}
        title="Apply To Bill"
      />
      <RefundDialog
        open={openRefundModal}
        setOpen={setOpenRefundModal}
        handleRefund={handleRefundPaymentVoucher}
        maxAmount={maxUnusedAmount}
      />
      <DetailPageHeader
        title={`Payment Voucher : ${orderInfo?.formated_order_number || ''}`}
        filesList={paymentVoucherDocumentsResponse?.data}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={PaymentVoucherDetailResponse?.data}
        actionsList={PaymentVoucherActionList}
        useDeleteItemMutation={useDeletePaymentVoucherMutation}
        useUploadDocumentFileMutation={useUploadPaymentVoucherDocumentMutation}
        useDeleteDocumentFileMutation={useDeletePaymentVoucherDocumentMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: false,
          showVoucherTable: true,
        }}
        navigateAfterDelete="/pages/accounting/purchase/payment-voucher"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={PaymentVoucherDetailResponse?.data}
            showStatus={false}
            showItemsTable={false}
            showOrderVoucher
          />

          <Grid container>
            <Grid item xs={12} style={{ maxWidth: 900, margin: '20px auto' }}>
              <PaymentVoucherHistory PaymentVoucher={PaymentVoucherDetailResponse.data} />
              <Grid marginTop={4} id="Journal">
                {paymenyVoucherJournalResponse?.data?.map(journalItems => (
                  <JournalTable
                    key={uuid()}
                    journalItems={journalItems?.payment_made_journal_items}
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

export default PaymentVoucherDetail;
