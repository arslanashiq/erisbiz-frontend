/* eslint-disable no-unused-expressions */
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import InfoPopup from 'shared/modals/InfoPopup';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, Stack, Typography } from '@mui/material';
import { useDeleteItemMutation, useGetSingleItemQuery } from 'services/private/items';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';
import Loader from 'shared/components/loader/Loader';
import ItemOverViewTab from './components/ItemOverViewTab';
import ItemTransactionsTab from './components/ItemTransactionsTab';
import 'styles/item-detail.scss';

function ItemDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popup, setPopup] = React.useState({
    open: false,
    message: '',
    actionButton: false,
  });
  const itemDetailResponse = useGetSingleItemQuery(id);
  const [handleDeleteItem] = useDeleteItemMutation();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePopup = () => {
    setPopup({
      ...popup,
      open: false,
    });
  };

  if (itemDetailResponse.isLoading) {
    return <Loader />;
  }
  const itemDetail = itemDetailResponse?.data;
  const customItemDetail = [
    { label: 'Item Type', value: itemDetail.item_type },
    { label: 'Creation Data', value: moment(itemDetail.created_at).format(DATE_FORMAT) },
    {
      label: 'Item Status',
      value: itemDetail.is_active ? 'Activated' : 'Deactivated',
      className: itemDetail.is_active ? 'color-success' : 'color-danger',
    },
  ];
  const handleClickEdit = () => {
    handleClose();
    if (itemDetail.is_active) {
      setPopup({ ...popup, open: true, message: 'Item is Active please Deactivate it first' });
    } else if (itemDetail.is_item_used) {
      setPopup({ ...popup, open: true, message: 'Item is used in Transections' });
    } else navigate('/pages/accounting/items/edit/243');
  };
  const handleClickDelete = () => {
    handleClose();
    if (itemDetail.is_active) {
      setPopup({ ...popup, open: true, message: 'Item is Active please Deactivate it first' });
    } else if (itemDetail.is_item_used) {
      setPopup({
        ...popup,
        open: true,
        message: 'This item is used in transactions, please delete them first.',
      });
    } else {
      setPopup({
        ...popup,
        open: true,
        message: 'Are you sure you want to delete this item?',
        actionButton: true,
      });
    }
  };
  const handleConfirmDeleteItem = async () => {
    const delteItemResponse = await handleDeleteItem(id);
    if (delteItemResponse.error) {
      enqueueSnackbar(delteItemResponse.error.message, { variant: 'error' });
    } else {
      navigate('/pages/accounting/items');
      enqueueSnackbar('Item Deleted Successfully', { variant: 'success' });
    }
  };
  return (
    <>
      <Helmet>
        <title>Item Detail - ErisBiz</title>
      </Helmet>
      <InfoPopup
        open={popup.open}
        handleClose={handleClosePopup}
        infoDescription={popup.message}
        showActionButton={popup.actionButton}
        handleYes={handleConfirmDeleteItem}
      />

      <Stack direction="row" justifyContent="space-between" sx={{ margin: '10px auto' }}>
        <Typography className="item-name-wrapper">{itemDetail?.item_name}</Typography>
        <Stack direction="row" spacing={2}>
          <ActionMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            actionsList={[
              { label: 'Edit', handleClick: handleClickEdit },
              { label: 'Delete', handleClick: handleClickDelete },
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
          className="p-3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabsList={['Overview', 'Transactions']}
        >
          {activeTab === 0 && (
            <ItemOverViewTab itemDetail={customItemDetail} itemImage={itemDetail.item_image} />
          )}
          {activeTab === 1 && <ItemTransactionsTab />}
        </DetailTabsWrapper>
      </Card>
    </>
  );
}

export default ItemDetail;
