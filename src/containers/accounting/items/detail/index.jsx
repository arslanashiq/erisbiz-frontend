import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, Stack, Typography } from '@mui/material';
// services

import { useDeleteItemMutation, useGetSingleItemQuery } from 'services/private/items';
// shared
import InfoPopup from 'shared/modals/InfoPopup';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
// components
import ItemOverViewTab from './components/ItemOverViewTab';
import ItemTransactionsTab from './components/ItemTransactionsTab';
// styles
import 'styles/items/item-detail.scss';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [activeTab, setActiveTab] = useState(0);
  const [popup, setPopup] = useState({
    open: false,
    message: '',
    actionButton: false,
  });

  const itemDetailResponse = useGetSingleItemQuery(id, { refetchOnMountOrArgChange: true });

  const [handleDeleteItem] = useDeleteItemMutation();

  const handleClosePopup = useCallback(() => {
    setPopup({
      ...popup,
      open: false,
    });
  }, []);

  const { itemDetail, itemDetailInfo, itemStockInformation, isService } = useMemo(() => {
    const item = itemDetailResponse?.data;

    const detailInfo = [
      { label: 'Item Type', value: item?.item_type },
      { label: 'Creation Date', value: moment(item?.created_at).format(DATE_FORMAT) },
      {
        label: 'Item Status',
        value: item?.is_active ? 'Activated' : 'Deactivated',
        className: item?.is_active ? 'color-success' : 'color-danger',
      },
      { label: 'Cost Price', value: formatAmount(item?.cost_price || 0) },
      { label: 'Sale Price', value: formatAmount(item?.sale_price || 0) },
      { label: 'Supplier', value: item?.supplier_name },
      { label: 'Category', value: item?.category_name },
      { label: 'Brand', value: item?.brand_name },
      { label: 'Description', value: item?.description },
    ];
    const stockInformation = [
      { label: 'Opening Stock', value: item?.opening_stock },
      { label: 'Stock In Hand', value: item?.remaining_stock },
      { label: 'Forecasted Stock', value: item?.forecast_stock },
      { label: 'Committed Stock', value: item?.committed_stock },
      { label: 'Weightage Cost Price', value: item?.weighted_cost_price },
    ];

    return {
      itemDetail: item,
      itemDetailInfo: detailInfo,
      itemStockInformation: stockInformation,
      isService: item?.item_type === 'Service',
    };
  }, [itemDetailResponse]);

  const handleClickEdit = useCallback(() => {
    if (itemDetail.is_active) {
      setPopup({ ...popup, open: true, message: 'Item is Active please deactive it first' });
    } else if (itemDetail.is_item_used) {
      setPopup({ ...popup, open: true, message: 'Item is used in Transections' });
    } else navigate(`/pages/accounting/items/edit/${id}`);
  }, [itemDetail]);
  const handleClickDelete = useCallback(() => {
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
  }, [itemDetail]);
  const handleConfirmDeleteItem = useCallback(async () => {
    const delteItemResponse = await handleDeleteItem(id);
    if (delteItemResponse.error) {
      enqueueSnackbar(delteItemResponse.error.message, { variant: 'error' });
    } else {
      navigate('/pages/accounting/items');
      enqueueSnackbar('Item Deleted Successfully', { variant: 'success' });
    }
  }, [itemDetail]);

  const actionsList = useMemo(
    () => [
      { label: 'Edit', handleClick: handleClickEdit },
      { label: 'Delete', handleClick: handleClickDelete },
    ],
    []
  );

  return (
    <SectionLoader options={[itemDetailResponse.isLoading]}>
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
        <Typography variant="h6">{itemDetail?.item_name}</Typography>
        <Stack direction="row" spacing={2}>
          <ActionMenu actionsList={actionsList} />
          <Button onClick={() => navigate(-1)}>Back</Button>
        </Stack>
      </Stack>
      <Card className="p-2" sx={{ minHeight: '76vh', fontSize: 14 }}>
        <DetailTabsWrapper
          className="p-3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabsList={['Overview', 'Transactions']}
        >
          {activeTab === 0 && (
            <ItemOverViewTab
              item={itemDetail}
              itemDetail={itemDetailInfo}
              itemStock={itemStockInformation}
              itemImage={itemDetail?.item_image}
              itemDescription={itemDetailResponse?.data?.description}
              isService={isService}
            />
          )}
          {activeTab === 1 && <ItemTransactionsTab />}
        </DetailTabsWrapper>
      </Card>
    </SectionLoader>
  );
}

export default ItemDetail;
