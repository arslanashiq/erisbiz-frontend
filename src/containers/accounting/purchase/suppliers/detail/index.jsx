import React, { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
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
} from 'services/private/suppliers';

// shared
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
import InfoPopup from 'shared/modals/InfoPopup';
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

function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { duration } = getSearchParamsList();
  const [activeTab, setActiveTab] = useState(0);
  const [activityLogDuration, setActivityLogDuration] = useState('this fiscal year');
  const [popup, setPopup] = useState({
    open: false,
    message: '',
    actionButton: false,
  });

  const [deleteComment] = useDeleteSupplierCommentMutation();
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

  return (
    <SectionLoader options={[supplierActivityLogsResponse.isLoading]}>
      <Helmet>
        <title>Supplier Detail - ErisBiz</title>
      </Helmet>
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
