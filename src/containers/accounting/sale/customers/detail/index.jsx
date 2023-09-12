import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom/dist';
// services
import { useDeleteCutomerMutation, useGetSingleCustomerQuery } from 'services/private/customers';
// shared
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { Card } from '@mui/material';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';

// styles
import 'styles/sales/customer/customer.scss';
import CustomerDetailOverview from './components/CustomerDetailOverview';

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
            showActionButton = true;
          } else {
            infoDescription = 'Are you sure you want to delete?';
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
  return (
    <SectionLoader options={[customerDetailResponse.isLoading]}>
      <DetailPageHeader
        title={customerDetailResponse?.data?.company_name}
        actionsList={customerActionList}
        openPopup={openInfoPopup}
        useDeleteItemMutation={useDeleteCutomerMutation}
        setOpenPopup={setOpenInfoPopup}
      />

      <Card sx={{ minHeight: '76vh', padding: 2, fontSize: 14 }}>
        <DetailTabsWrapper activeTab={activeTab} setActiveTab={setActiveTab} tabsList={['Overview']}>
          <CustomerDetailOverview customer={customerDetailResponse?.data} />
        </DetailTabsWrapper>
      </Card>
    </SectionLoader>
  );
}
export default CustomerDetail;
