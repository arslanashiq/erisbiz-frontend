import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, Grid } from '@mui/material';
// services
import {
  useDeleteSupplierCreditsDocumentsMutation,
  useDeleteSupplierCreditsMutation,
  useGetSingleSupplierCreditsQuery,
  useGetSupplierCreditJournalsQuery,
  useGetSupplierCreditsDocumentsQuery,
  useRefundSupplierCreditsMutation,
  useUploadSupplierCreditsDocumentsMutation,
} from 'services/private/supplier-credit';
// shared
import OrderDocument from 'shared/components/order-document/OrderDocument';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
// containers
import useErrorHandler from 'shared/custom-hooks/useErrorHandler';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import RefundDialog from 'shared/components/refund-dialog/RefundDialog';
import JournalTable from 'shared/components/accordion/JournalTable';
import ApplyToBill from 'shared/components/apply-to-bill-dialog/ApplyToBill';
import { supplierOpeningBalanceName } from 'utilities/constants';
import { displayJournalActionButton } from 'utilities/display-journals';
import { useGetSuppliersUpaidBillsListMutation } from 'services/private/suppliers';
import { UnPaidBillsHeadCells } from '../../payment-voucher/utilities/head-cells';

const keyValue = 'supplier_credit_items';
function SupplierCreditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Payment Voucher beacuse this Voucher has debit Notes',
  });
  const [defaultExpanded, setDefaultExpanded] = useState(false);
  const [openRefundModal, setOpenRefundModal] = useState(false);
  const [openApplyToBillModal, setOpenApplyToBillModal] = useState(false);
  const [applyToBillInitialValues, setApplyToBillInitialValues] = useState([]);

  const supplierCreditResponse = useGetSingleSupplierCreditsQuery(id);
  const supplierCreditJournalsReponse = useGetSupplierCreditJournalsQuery(id);
  const SupplierCreditDocumentsResponse = useGetSupplierCreditsDocumentsQuery(id);

  const [refundSupplierCredit] = useRefundSupplierCreditsMutation();
  const [getUnpaidBills] = useGetSuppliersUpaidBillsListMutation();

  const { isError } = useErrorHandler(supplierCreditResponse);

  const orderInfo = useMemo(
    () => ({
      type: 'Purchase Debit Note',
      // informationTo: 'Purchase DN',
      formated_order_number: supplierCreditResponse?.data?.supplier_credit_formatted_number || '',
      date: supplierCreditResponse?.data?.supplier_credit_date || '',
      supplier: supplierCreditResponse?.data?.supplier || {},
      location: supplierCreditResponse?.data?.location || '',
      invoiceToDetail: {
        attention_to: supplierCreditResponse?.data?.supplier?.contact_person || '',
        supplier_name: supplierCreditResponse?.data?.supplier?.supplier_name || '',
        address: supplierCreditResponse?.data?.supplier?.address_line1 || '',
        city: supplierCreditResponse?.data?.supplier?.city || '',
        country: supplierCreditResponse?.data?.supplier?.country || '',
      },
      currency_symbol: supplierCreditResponse?.data?.currency_symbol || '',
      bankDetail: {
        bank_name: supplierCreditResponse?.data?.supplier?.bank_name,
        account_holder_name: supplierCreditResponse?.data?.supplier?.account_payee,
        IBAN: supplierCreditResponse?.data?.supplier?.IBAN,
        swift_code: supplierCreditResponse?.data?.supplier?.swift_code,
      },
    }),
    [supplierCreditResponse]
  );
  const SupplierCreditsActionList = useMemo(() => {
    const actionList = [
      {
        label: 'Edit',
        handleClick: () => {
          const cantEdit = supplierCreditResponse?.data?.is_applied;
          if (cantEdit) {
            setOpenInfoPopup({
              ...openInfoPopup,
              open: true,
              infoDescription: 'This Debit Note is either applied to bill or refunded.',
              showActionButton: false,
            });
            return;
          }
          navigate(`/pages/accounting/purchase/debit-notes/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'Are you sure you want to delete?';
          let showActionButton = true;
          const cantDelete = supplierCreditResponse?.data?.is_applied;
          if (cantDelete) {
            infoDescription = 'This Debit Note is either applied to bill or refunded.';
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
    if (supplierCreditResponse?.data?.status === 'open') {
      // actionList.push({
      //   label: 'Refund',
      //   divider: true,
      //   handleClick: () => {
      //     setOpenRefundModal(true);
      //   },
      // });
      actionList.push({
        label: 'Apply to Bill',
        handleClick: () => {
          setOpenApplyToBillModal(true);
          // navigate(
          //   `/pages/accounting/purchase/payment-voucher/add?supplierId=${supplierCreditResponse?.data?.supplier_id}&debitAmount=${supplierCreditResponse?.data?.credits_remaining}`
          // );
        },
      });
    }
    return actionList;
  }, [supplierCreditResponse]);

  const handleRefundSupplierCredit = useCallback(async (values, { setErrors }) => {
    const payload = {
      bill_credit_notes: [{ ...values }],
      supplier_credit_id: id,
    };
    const response = await refundSupplierCredit(payload);
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    enqueueSnackbar('Purchase Debit Note Updated', { variant: 'success' });
    setOpenRefundModal(false);
  }, []);
  const handleApplyToBill = useCallback(
    async (values, { setErrors }) => {
      const billCreditNotes = values.bill_credit_notes
        .filter(cn => cn.amount_applied > 0)
        .map(cn => {
          if (cn.bill_num === supplierOpeningBalanceName) {
            return {
              amount_applied: cn.amount_applied,
              supplier_account_id: cn.id,
            };
          }
          return {
            amount_applied: cn.amount_applied,
            bill_id: cn.id,
          };
        });

      const payload = {
        credit_note_id: supplierCreditResponse?.data.id,
        supplier_credit_id: supplierCreditResponse?.data.id,
        bill_credit_notes: billCreditNotes,
      };
      const response = await refundSupplierCredit(payload);
      if (response.error) {
        setErrors(response.error.data);
        return;
      }
      enqueueSnackbar('Purchase Debit Note Updated', { variant: 'success' });
      setOpenApplyToBillModal(false);
    },
    [supplierCreditResponse]
  );
  useEffect(() => {
    (async () => {
      if (openApplyToBillModal) {
        const response = await getUnpaidBills(supplierCreditResponse?.data?.supplier_id);
        const unpaidBills = response?.data?.map(bill => ({
          ...bill,
          amount_applied: 0,
        }));
        setApplyToBillInitialValues(unpaidBills);
      }
    })();
  }, [openApplyToBillModal]);

  return (
    <SectionLoader options={[supplierCreditResponse.isLoading, isError]}>
      <RefundDialog
        open={openRefundModal}
        setOpen={setOpenRefundModal}
        handleRefund={handleRefundSupplierCredit}
        maxAmount={supplierCreditResponse?.data?.credits_remaining}
      />
      <ApplyToBill
        open={openApplyToBillModal}
        setOpen={setOpenApplyToBillModal}
        handleApply={handleApplyToBill}
        maxAmount={supplierCreditResponse?.data?.credits_remaining}
        initialValues={applyToBillInitialValues}
        headCells={UnPaidBillsHeadCells}
      />
      <DetailPageHeader
        title={`Purchase Debit Note : ${orderInfo?.formated_order_number || ''}`}
        filesList={SupplierCreditDocumentsResponse?.data}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={supplierCreditResponse?.data}
        actionsList={SupplierCreditsActionList}
        useDeleteItemMutation={useDeleteSupplierCreditsMutation}
        useUploadDocumentFileMutation={useUploadSupplierCreditsDocumentsMutation}
        useDeleteDocumentFileMutation={useDeleteSupplierCreditsDocumentsMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
        navigateAfterDelete="/pages/accounting/purchase/debit-notes"
      />
      <Card>
        <CardContent>
          <OrderDocument
            keyValue={keyValue}
            orderInfo={orderInfo}
            orderDetail={supplierCreditResponse.data}
          />

          <Grid container>
            <Grid item xs={12} style={{ maxWidth: 900, margin: '20px auto' }}>
              <Grid marginTop={4} id="Journal">
                {supplierCreditJournalsReponse?.data?.map(journalItems => (
                  <JournalTable
                    key={uuid()}
                    defaultValue={defaultExpanded}
                    journalItems={journalItems?.suppplier_credit_note_journal_items}
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

export default SupplierCreditDetail;
