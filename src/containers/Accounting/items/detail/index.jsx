/* eslint-disable no-unused-expressions */
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { Button, Card, Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useGetSingleItemQuery } from 'services/private/items';
import InfoPopup from 'shared/modals/InfoPopup';
import ItemDetailTabs from './components/ItemDetailTabs';
import 'styles/item-detail.scss';
import ActionMenu from './components/ActionMenu';

function ItemDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popup, setPopup] = React.useState({
    open: false,
    message: '',
  });
  const itemDetailResponse = useGetSingleItemQuery(id);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePopup = () => {
    setPopup({
      ...popup,
      open: false,
    });
  };
  const itemDetail = itemDetailResponse?.data;
  const handleClickEdit = () => {
    if (itemDetail.is_active) {
      handleClose();
      setPopup({ ...popup, open: true, message: 'Item is Active please Deactivate it first' });
    } else if (itemDetail.is_item_used) {
      handleClose();
      setPopup({ ...popup, open: true, message: 'Item is used in Transections' });
    } else navigate('/pages/accounting/items/edit/243');
  };
  return (
    <>
      <Helmet>
        <title>Item Detail - ErisBiz</title>
      </Helmet>
      <ActionMenu anchorEl={anchorEl} handleClose={handleClose} handleClickEdit={handleClickEdit} />
      <InfoPopup open={popup.open} handleClose={handleClosePopup} infoDescription={popup.message} />
      <Stack direction="row" justifyContent="space-between" sx={{ margin: '10px auto' }}>
        <Typography className="item-name-wrapper">{itemDetail?.item_name}</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="text-capitalize"
          >
            Perform Action <KeyboardArrowDownIcon />
          </Button>
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
        <ItemDetailTabs itemDetail={itemDetail} />
      </Card>
    </>
  );
}

export default ItemDetail;
