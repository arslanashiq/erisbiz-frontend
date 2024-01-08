/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom/dist';
// services
import {
  useAddCustomerCommentMutation,
  useDeleteCustomerCommentMutation,
  useDeleteCutomerMutation,
  useGetCustomerActivityDetailQuery,
  useGetCustomerCommentsQuery,
  useGetCustomerIncomeDetailQuery,
  useGetCustomerStatementQuery,
  useGetSingleCustomerQuery,
} from 'services/private/customers';
import { useRefundCreditNoteMutation } from 'services/private/credit-notes';
import {
  applyPaymentVoucherToInvoice,
  useGetUnpaidInvoicesAgainstCustomerMutation,
} from 'services/private/receipt-voucher';
// shared
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { Card } from '@mui/material';
import ApplyToBill from 'shared/components/apply-to-bill-dialog/ApplyToBill';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
// containers
import SupplierComment from 'containers/accounting/purchase/suppliers/detail/components/SupplierComment';
import SupplierStatement from 'containers/accounting/purchase/suppliers/detail/components/SupplierStatement';
import useSupplierStatement from 'containers/accounting/purchase/suppliers/utilities/custom-hooks/useSupplierStatement';

import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomerContactPage from './components/CustomerContactPage';
import CustomerOverview from './components/CustomerOverview';
import CustomerTransactions from './components/CustomerTransactions';
// styles
import 'styles/suppliers/supplier-detail.scss';
import { UnPaidSaleInvoiceHeadCells } from '../../receipt-voucher/utilities/head-cells';

function CustomerDetail() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { duration } = getSearchParamsList();

  const [activeTab, setActiveTab] = useState(0);
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });
  const [openApplyToBillModal, setOpenApplyToBillModal] = useState(false);
  const [applyToInvoiceInitialValues, setApplyToInvoiceInitialValues] = useState([]);
  const [selectedUnusedCreditObject, setSelectedUnusedCreditObject] = useState({});
  const [activityLogDuration, setActivityLogDuration] = useState('this fiscal year');

  const [addComment] = useAddCustomerCommentMutation();
  const [deleteComment] = useDeleteCustomerCommentMutation();
  const [getUnPaidSaleInvoices] = useGetUnpaidInvoicesAgainstCustomerMutation();
  const [applyPaymentToInvoice] = applyPaymentVoucherToInvoice();
  const [refundCreditNote] = useRefundCreditNoteMutation();

  const customersCommentResponse = useGetCustomerCommentsQuery(id);
  const customerActivityResponse = useGetCustomerActivityDetailQuery(id);
  const customerIncomeResponse = useGetCustomerIncomeDetailQuery({
    id,
    params: { duration: activityLogDuration },
  });
  const customerStatementResponse = useGetCustomerStatementQuery({ id, params: location.search });
  const { basicInfo, transactions } = useSupplierStatement(
    customerStatementResponse?.data || {},
    customerStatementResponse?.data?.transactions || [],
    duration
  );

  const customerDetailResponse = useGetSingleCustomerQuery(id);

  const customerActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/customers/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'You cannot delete this Customer beacuse this Customer have Transactions';
          let showActionButton = false;
          const {
            have_credit_notes: haveCreditNotes,
            have_invoices: haveInvoices,
            have_pro_invoices: havePurchaseInvoices,
            have_quotations: haveQuotations,
          } = customerDetailResponse.data;
          if (haveCreditNotes || haveInvoices || havePurchaseInvoices || haveQuotations) {
            showActionButton = false;
          } else {
            infoDescription = 'Are you sure you want to delete?';
            showActionButton = true;
          }
          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription,
            showActionButton,
          });
        },
      },
    ],
    [customerDetailResponse]
  );

  const handleChangeActivityDuration = useCallback(value => {
    setActivityLogDuration(value?.toLowerCase());
  }, []);
  const handleAddComment = payload => addComment({ comments: payload.comments, customer_id: Number(id) });

  const getPaymentType = () => {
    let payload = {};
    if (selectedUnusedCreditObject?.type === 'Excess Payment') {
      payload = {
        payment_received: selectedUnusedCreditObject.id,
      };
    }
    if (selectedUnusedCreditObject?.type === 'Account Opening Balance') {
      payload = {
        sales_account: selectedUnusedCreditObject.id,
      };
    }
    if (selectedUnusedCreditObject?.type === 'Credit Note') {
      payload = {};
    }
    return payload;
  };
  const handleApplyToBill = async (values, { setErrors }) => {
    try {
      const paymentObjectId = getPaymentType();
      const invoicePayments = values.bill_credit_notes
        .filter(cn => cn.amount_applied > 0)
        .map(cn => ({
          amount_applied: cn.amount_applied,
          invoice_id: cn.id,
          ...paymentObjectId,
        }));

      let payload = {
        payment_vouchers: invoicePayments,
      };
      let response = null;
      if (paymentObjectId) {
        payload = {
          ...payload,
          credit_note_id: selectedUnusedCreditObject.id,
        };
        response = refundCreditNote(payload);
      } else {
        response = await applyPaymentToInvoice(payload);
      }
      if (response.error) {
        setErrors(response.error.data);
        return;
      }
      enqueueSnackbar('Amount Applied To Invoice', { variant: 'success' });
      setOpenApplyToBillModal(false);
    } catch (error) {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    }
  };
  useEffect(() => {
    (async () => {
      if (openApplyToBillModal) {
        const response = await getUnPaidSaleInvoices(id);
        const unpaidBills = response?.data?.map(bill => ({
          ...bill,
          amount_applied: 0,
        }));
        setApplyToInvoiceInitialValues(unpaidBills);
      }
    })();
  }, [openApplyToBillModal]);

  return (
    <SectionLoader options={[customerDetailResponse.isLoading]}>
      <DetailPageHeader
        title={customerDetailResponse?.data?.customer_name}
        actionsList={customerActionList}
        openPopup={openInfoPopup}
        useDeleteItemMutation={useDeleteCutomerMutation}
        setOpenPopup={setOpenInfoPopup}
        navigateAfterDelete="/pages/accounting/sales/customers"
      />
      <ApplyToBill
        open={openApplyToBillModal}
        setOpen={setOpenApplyToBillModal}
        handleApply={handleApplyToBill}
        maxAmount={selectedUnusedCreditObject?.amount_due || 0}
        initialValues={applyToInvoiceInitialValues || []}
        headCells={UnPaidSaleInvoiceHeadCells}
        title="Apply To Invoice"
      />

      <Card sx={{ minHeight: '76vh', padding: 2, fontSize: 14 }}>
        <DetailTabsWrapper
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabsList={['Overview', 'Transactions', 'Statement', 'Comments', 'Contacts']}
        >
          {activeTab === 0 && (
            <CustomerOverview
              customerDetail={customerDetailResponse?.data}
              activityLogDuration={activityLogDuration}
              handleClickMenu={handleChangeActivityDuration}
              setOpenApplyToBillModal={setOpenApplyToBillModal}
              setSelectedUnusedCreditObject={setSelectedUnusedCreditObject}
              customerIncome={customerIncomeResponse?.data?.income || []}
              customerActivity={customerActivityResponse?.data || []}
            />
          )}
          {activeTab === 1 && <CustomerTransactions />}
          {activeTab === 2 && (
            <SupplierStatement
              basicInfo={basicInfo}
              transactions={transactions}
              personLink={`/pages/accounting/sales/customers/${id}/detail`}
            />
          )}

          {activeTab === 3 && (
            <SupplierComment
              comments={customersCommentResponse?.data || []}
              addComment={handleAddComment}
              deleteComment={deleteComment}
            />
          )}

          {activeTab === 4 && (
            <CustomerContactPage customerContact={customerDetailResponse?.data?.sales_company_contact} />
          )}
        </DetailTabsWrapper>
      </Card>
    </SectionLoader>
  );
}
export default CustomerDetail;
