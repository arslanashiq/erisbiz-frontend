import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom/dist';
// services
import {
  useAddCustomerCommentMutation,
  useDeleteCutomerMutation,
  useGetCustomerCommentsQuery,
  useGetCustomerStatementQuery,
  useGetSingleCustomerQuery,
} from 'services/private/customers';
// shared
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { Card } from '@mui/material';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
// containers
import SupplierComment from 'containers/accounting/purchase/suppliers/detail/components/SupplierComment';
import SupplierStatement from 'containers/accounting/purchase/suppliers/detail/components/SupplierStatement';

import CustomerContactPage from './components/CustomerContactPage';
import CustomerOverview from './components/CustomerOverview';
import CustomerTransactions from './components/CustomerTransactions';
// styles
import 'styles/suppliers/supplier-detail.scss';

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [addComment] = useAddCustomerCommentMutation();
  const [deleteComment] = useDeleteCutomerMutation();

  const customersCommentResponse = useGetCustomerCommentsQuery(id);
  const customerStatementResponse = useGetCustomerStatementQuery({ id, params: location.search });

  const [activityLogDuration, setActivityLogDuration] = useState('this fiscal year');
  const [activeTab, setActiveTab] = useState(0);
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });

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
  const handleAddComment = payload => addComment({ comments: payload.comments, customer: Number(id) });
  console.log(customerStatementResponse, 'customerStatementResponse');
  return (
    <SectionLoader options={[customerDetailResponse.isLoading]}>
      <DetailPageHeader
        title={customerDetailResponse?.data?.company_name}
        actionsList={customerActionList}
        openPopup={openInfoPopup}
        useDeleteItemMutation={useDeleteCutomerMutation}
        setOpenPopup={setOpenInfoPopup}
        navigateAfterDelete="/pages/accounting/sales/customers"
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
            />
          )}
          {activeTab === 1 && <CustomerTransactions />}
          {activeTab === 2 && <SupplierStatement basicInfo={customerDetailResponse} transactions={[]} />}

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
