import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Grid } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';

// services
import {
  useDeleteCreditNoteMutation,
  useGetCreditNoteJournalsQuery,
  useGetSingleCreditNoteQuery,
  useRefundCreditNoteMutation,
} from 'services/private/credit-notes';
import { useGetUnpaidInvoicesAgainstCustomerMutation } from 'services/private/receipt-voucher';

// shared components and utilities
import RefundDialog from 'shared/components/refund-dialog/RefundDialog';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import ApplyToBill from 'shared/components/apply-to-bill-dialog/ApplyToBill';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import JournalTable from 'shared/components/accordion/JournalTable';
import { DATE_FORMAT_PRINT, customerOpeningBalanceName } from 'utilities/constants';
import { UnPaidSaleInvoiceHeadCells } from '../../receipt-voucher/utilities/head-cells';

const keyValue = 'credit_note_items';
function CreditNoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [defaultExpanded, setDefaultExpanded] = useState(false);
  const [openRefundModal, setOpenRefundModal] = useState(false);
  const [openApplyToInvoiceModal, setOpenApplyToInvoiceModal] = useState(false);
  const [applyToInvoiceInitialValues, setApplyToInvoiceInitialValues] = useState([]);
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });

  const creditNoteDetailResponse = useGetSingleCreditNoteQuery(id);
  const creditNoteJournalsReponse = useGetCreditNoteJournalsQuery(id);

  const [refundCreditNote] = useRefundCreditNoteMutation();
  const [getUnpaidInvoices] = useGetUnpaidInvoicesAgainstCustomerMutation();

  const orderInfo = useMemo(
    () => ({
      type: 'Sales Credit Note',
      // informationTo: 'Sales CN',

      order_number: `#${creditNoteDetailResponse?.data?.credit_note_num}`,
      formated_order_number: creditNoteDetailResponse?.data?.credit_note_formatted_number,
      sale_person: creditNoteDetailResponse?.data?.sales_person_name,
      currency_symbol: creditNoteDetailResponse?.data?.currency_symbol,
      bankDetail: '',

      date: creditNoteDetailResponse?.data?.credit_note_date,
      supplier: null,
      invoiceToDetail: {
        customer_name: creditNoteDetailResponse?.data?.invoice?.customer_info?.customer_name || '',
        attention_to: creditNoteDetailResponse?.data?.invoice?.customer_info?.contact_person || '',
        address: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_address_line1 || '',
        city: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_city || '',
        country: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_country || '',
      },
      location: creditNoteDetailResponse?.data?.location,

      box1: [
        {
          label: 'Credit No',
          value: creditNoteDetailResponse?.data?.credit_note_formatted_number,
        },
        {
          label: 'invoice No',
          value: creditNoteDetailResponse?.data?.invoice.invoice_formatted_number || '-',
        },
        {
          label: 'Credit Date',
          value: moment(creditNoteDetailResponse?.data?.credit_note_date).format(DATE_FORMAT_PRINT),
        },
      ],
      box2: [
        {
          label: 'Customer',
          value: creditNoteDetailResponse?.data?.invoice?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_address_line1,
        },
      ],
      showCustomOptions: true,
    }),
    [creditNoteDetailResponse]
  );
  const quotationsActionList = useMemo(() => {
    const actionList = [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/credit-notes/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription: 'Are you sure you want to delete?',
            showActionButton: true,
          });
        },
      },
      {
        label: 'View Journal',
        handleClick: () => {
          setDefaultExpanded(true);
          const Journal = document.getElementById('Journal');
          Journal.scrollIntoView({ behavior: 'smooth' });
        },
      },
    ];
    if (creditNoteDetailResponse?.data?.status === 'open') {
      actionList.push({
        label: 'Refund',
        divider: true,
        handleClick: () => {
          setOpenRefundModal(true);
        },
      });
      actionList.push({
        label: 'Apply to Invoice',
        handleClick: () => {
          // navigate(
          //   `/pages/accounting/sales/receipt-voucher/add?customerId=${creditNoteDetailResponse?.data?.invoice?.customer_info?.id}`
          // );
          setOpenApplyToInvoiceModal(true);
        },
      });
    }
    return actionList;
  }, [creditNoteDetailResponse]);

  const handleCreditNote = useCallback(async (values, { setErrors }) => {
    const payload = {
      invoice_credit_notes: [{ ...values }],
      credit_note_id: id,
    };
    const response = await refundCreditNote(payload);
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    enqueueSnackbar('Credit Note Updated', { variant: 'success' });
    setOpenRefundModal(false);
  }, []);

  const handleApplyToInvoice = useCallback(async (values, { setErrors }) => {
    const billCreditNotes = values.bill_credit_notes
      .filter(cn => cn.amount_applied > 0)
      .map(cn => {
        if (cn.invoice_num === customerOpeningBalanceName) {
          return {
            amount_applied: cn.amount_applied,
            sales_company: cn.id,
          };
        }
        return {
          amount_applied: cn.amount_applied,
          invoice_id: cn.id,
        };
      });

    const payload = {
      invoice_credit_notes: billCreditNotes,
      credit_note_id: id,
    };
    const response = await refundCreditNote(payload);
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    enqueueSnackbar('Credit Note Updated', { variant: 'success' });
    setOpenApplyToInvoiceModal(false);
  }, []);

  useEffect(() => {
    (async () => {
      if (openApplyToInvoiceModal) {
        const response = await getUnpaidInvoices(creditNoteDetailResponse?.data?.invoice?.customer);
        const unpaidInvoices =
          response?.data?.map(invoice => ({
            ...invoice,
            amount_applied: 0,
          })) || [];
        setApplyToInvoiceInitialValues(unpaidInvoices);
      }
    })();
  }, [openApplyToInvoiceModal]);
  return (
    <SectionLoader options={[creditNoteDetailResponse.isLoading]}>
      <RefundDialog
        open={openRefundModal}
        setOpen={setOpenRefundModal}
        handleRefund={handleCreditNote}
        maxAmount={creditNoteDetailResponse?.data?.credits_remaining}
      />
      <ApplyToBill
        open={openApplyToInvoiceModal}
        setOpen={setOpenApplyToInvoiceModal}
        handleApply={handleApplyToInvoice}
        maxAmount={creditNoteDetailResponse?.data?.credits_remaining}
        initialValues={applyToInvoiceInitialValues}
        headCells={UnPaidSaleInvoiceHeadCells}
        title="Apply To Invoice"
      />
      <DetailPageHeader
        title={`Credit Note: #${creditNoteDetailResponse?.data?.credit_note_formatted_number}`}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={creditNoteDetailResponse?.data}
        actionsList={quotationsActionList}
        useDeleteItemMutation={useDeleteCreditNoteMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
        navigateAfterDelete="/pages/accounting/sales/credit-notes"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={creditNoteDetailResponse.data}
          />
          {creditNoteJournalsReponse?.data?.credit_note_journal_items && (
            <Grid container>
              <Grid item xs={12} style={{ maxWidth: 900, margin: '20px auto' }}>
                <Grid marginTop={4} id="Journal">
                  <JournalTable
                    key={uuid()}
                    defaultValue={defaultExpanded}
                    journalItems={creditNoteJournalsReponse?.data?.credit_note_journal_items}
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

export default CreditNoteDetail;
