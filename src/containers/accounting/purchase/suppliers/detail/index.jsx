import { Button, Card, Stack, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import InfoPopup from 'shared/modals/InfoPopup';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
import SupplierOverview from './components/SupplierOverview';
import 'styles/supplier-detail.scss';
import SupplierTransactions from './components/SupplierTransactions';
import SupplierStatement from './components/SupplierStatement';
import SupplierComment from './components/SupplierComment';

function SupplierDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);

  const [popup, setPopup] = React.useState({
    open: false,
    message: '',
    actionButton: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClosePopup = () => {
    setPopup({ ...popup, open: false });
  };
  return (
    <>
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
      <Stack direction="row" justifyContent="space-between" sx={{ margin: '10px auto' }}>
        <Typography className="item-name-wrapper">Supplier Name</Typography>
        <Stack direction="row" spacing={2}>
          <ActionMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            actionsList={[
              { label: 'Edit', handleClick: () => {} },
              { label: 'Delete', handleClick: () => {} },
            ]}
          />
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
      <Card sx={{ minHeight: '76vh', padding: 2, fontSize: 14 }}>
        <DetailTabsWrapper
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabsList={['Overview', 'Transactions', 'Statement', 'Comments', 'Contacts', 'Mails']}
        >
          {activeTab === 0 && <SupplierOverview />}
          {activeTab === 1 && <SupplierTransactions />}
          {activeTab === 2 && <SupplierStatement />}
          {activeTab === 3 && <SupplierComment />}
        </DetailTabsWrapper>
      </Card>
    </>
  );
}

export default SupplierDetail;
