import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, Stack, Typography } from '@mui/material';
// services
import {
  useGetSingleSupplierQuery,
  useGetSupplierActivityLogsQuery,
  useGetSupplierCommentsQuery,
  useGetSupplierIncomeQuery,
  useGetSupplierStatementQuery,
  useDeleteSupplierCommentMutation,
  useAddSupplierCommentMutation,
  useGetSuppliersUpaidBillsListMutation,
} from 'services/private/suppliers';
import { useRefundSupplierCreditsMutation } from 'services/private/supplier-credit';

// shared
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
import InfoPopup from 'shared/modals/InfoPopup';
import ApplyToBill from 'shared/components/apply-to-bill-dialog/ApplyToBill';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utillities
import getSearchParamsList from 'utilities/getSearchParamsList';
import useSupplierStatement from '../utilities/custom-hooks/useSupplierStatement';
// components
import SupplierOverview from './components/SupplierOverview';
import SupplierTransactions from './components/SupplierTransactions';
import SupplierStatement from './components/SupplierStatement';
import SupplierComment from './components/SupplierComment';
import SupplierContacts from './components/SupplierContacts';
// styles
import 'styles/suppliers/supplier-detail.scss';
import { UnPaidBillsHeadCells } from '../../payment-voucher/utilities/head-cells';

function SupplierDetail() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const { duration } = getSearchParamsList();
  const [activeTab, setActiveTab] = useState(0);
  const [activityLogDuration, setActivityLogDuration] = useState('this fiscal year');
  const [openApplyToBillModal, setOpenApplyToBillModal] = useState(false);
  const [applyToBillInitialValues, setApplyToBillInitialValues] = useState([]);
  const [selectedUnusedCreditObject, setSelectedUnusedCreditObject] = useState({});
  const [popup, setPopup] = useState({
    open: false,
    message: '',
    actionButton: false,
  });

  const [deleteComment] = useDeleteSupplierCommentMutation();
  const [getUnpaidBills] = useGetSuppliersUpaidBillsListMutation();
  const [refundSupplierCredit] = useRefundSupplierCreditsMutation();

  const [addComment] = useAddSupplierCommentMutation();

  const supplierDetailResponse = useGetSingleSupplierQuery(id);
  const supplierStatementResponse = useGetSupplierStatementQuery({
    id,
    params: {
      duration: duration || 'this month',
      filter_type: 'all',
    },
  });
  const supplierCommentResponse = useGetSupplierCommentsQuery(id);
  const { basicInfo, transactions } = useSupplierStatement(
    supplierDetailResponse?.data || {},
    supplierStatementResponse?.data?.transactions || [],
    duration
  );
  const supplierActivityLogsResponse = useGetSupplierActivityLogsQuery(id);
  const supplierIncomeResponse = useGetSupplierIncomeQuery({ id, params: { duration: activityLogDuration } });

  const actionsList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/suppliers/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription =
            'You cannot delete this Supplier beacuse this supplier is used in purchase Order';
          let showActionButton = false;
          infoDescription = 'Are you sure you want to delete?';
          const {
            have_pur_orders: havePurchaseOrder,
            have_bills: haveBills,
            have_debit_notes: haveDebitNote,
            have_expenses: haveExpense,
          } = supplierDetailResponse.data;
          const canNotDelete = haveExpense || havePurchaseOrder || haveBills || haveDebitNote;

          if (havePurchaseOrder) {
            infoDescription =
              'You cannot delete this Supplier beacuse this supplier is used in purchase Order';
          }
          if (haveExpense) {
            infoDescription = 'You cannot delete this Supplier beacuse this supplier is used in Expenses';
          }
          if (haveBills) {
            infoDescription = 'You cannot delete this Supplier beacuse this supplier is used in Bills';
          }
          if (haveDebitNote) {
            infoDescription = 'You cannot delete this Supplier beacuse this supplier is used in Debit Notes';
          }
          if (!canNotDelete) {
            showActionButton = true;
          }

          setPopup({
            ...popup,
            open: true,
            message: infoDescription,
            actionButton: showActionButton,
          });
        },
      },
    ],
    [supplierDetailResponse]
  );

  const handleChangeActivityDuration = useCallback(value => {
    setActivityLogDuration(value?.toLowerCase());
  }, []);
  const handleClosePopup = useCallback(() => {
    setPopup({ ...popup, open: false });
  }, []);

  const getPaymentType = () => {
    let payload = {};
    if (selectedUnusedCreditObject?.type === 'Excess Payment') {
      payload = {
        payment_made: selectedUnusedCreditObject.id,
      };
    }
    if (selectedUnusedCreditObject?.type === 'Debit Note') {
      payload = {};
    }
    if (selectedUnusedCreditObject?.type === 'Supplier Opening Balance') {
      payload = {
        supplier: id,
      };
    }
    return payload;
  };
  const handleApplyToBill = async (values, { setErrors }) => {
    try {
      const paymentObjectId = getPaymentType();
      const billCreditNotes = values.bill_credit_notes
        .filter(cn => cn.amount_applied > 0)
        .map(cn => ({
          amount_applied: cn.amount_applied,
          bill_id: cn.id,
          ...paymentObjectId,
        }));

      let payload = {
        bill_credit_notes: billCreditNotes,
      };
      if (paymentObjectId) {
        payload = {
          ...payload,

          credit_note_id: selectedUnusedCreditObject.id,
          supplier_credit_id: selectedUnusedCreditObject.id,
        };
      }
      const response = await refundSupplierCredit(payload);
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
  useEffect(() => {
    (async () => {
      if (openApplyToBillModal) {
        const response = await getUnpaidBills(id);
        const unpaidBills = response?.data?.map(bill => ({
          ...bill,
          amount_applied: 0,
        }));
        setApplyToBillInitialValues(unpaidBills);
      }
    })();
  }, [openApplyToBillModal]);
  return (
    <SectionLoader options={[supplierActivityLogsResponse.isLoading]}>
      <Helmet>
        <title>Supplier Detail - ErisBiz</title>
      </Helmet>
      <ApplyToBill
        open={openApplyToBillModal}
        setOpen={setOpenApplyToBillModal}
        handleApply={handleApplyToBill}
        maxAmount={selectedUnusedCreditObject?.amount_due || 0}
        initialValues={applyToBillInitialValues || []}
        headCells={UnPaidBillsHeadCells}
        title="Apply To Bill"
      />
      <InfoPopup
        open={popup.open}
        handleClose={handleClosePopup}
        infoDescription={popup.message}
        showActionButton={popup.actionButton}
        // handleYes={handleConfirmDeleteItem}
      />
      <Stack className="no-print" direction="row" justifyContent="space-between" sx={{ margin: '10px auto' }}>
        <Typography className="item-name-wrapper">{supplierDetailResponse?.data?.supplier_name}</Typography>
        <Stack direction="row" spacing={2}>
          <ActionMenu actionsList={actionsList} />
          <Button
            onClick={() => {
              navigate(-1);
            }}
            className="text-capitalize"
          >
            Back
          </Button>
        </Stack>
      </Stack>
      <Card className="no-print" sx={{ minHeight: '76vh', padding: 2, fontSize: 14 }}>
        <DetailTabsWrapper
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabsList={['Overview', 'Transactions', 'Statement', 'Comments', 'Contacts']}
        >
          {activeTab === 0 && (
            <SupplierOverview
              activityLogDuration={activityLogDuration}
              supplierIncome={supplierIncomeResponse?.data?.income}
              supplierDetail={supplierDetailResponse?.data}
              supplierActivity={supplierActivityLogsResponse?.data}
              handleClickMenu={handleChangeActivityDuration}
              basicInfo={basicInfo}
              setOpenApplyToBillModal={setOpenApplyToBillModal}
              setSelectedUnusedCreditObject={setSelectedUnusedCreditObject}
            />
          )}
          {activeTab === 1 && <SupplierTransactions />}
          {activeTab === 2 && (
            <SupplierStatement
              basicInfo={basicInfo}
              transactions={transactions}
              personLink={`/pages/accounting/purchase/suppliers/${id}/detail`}
            />
          )}
          {activeTab === 3 && (
            <SupplierComment
              comments={supplierCommentResponse.data}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          )}
          {activeTab === 4 && (
            <SupplierContacts supplierContacts={supplierDetailResponse.data.supplier_contacts} />
          )}
        </DetailTabsWrapper>
      </Card>
    </SectionLoader>
  );
}

export default SupplierDetail;
