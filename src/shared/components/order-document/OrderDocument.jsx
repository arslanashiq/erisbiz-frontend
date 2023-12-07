import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack } from '@mui/material';
import { useParams } from 'react-router';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import OrderReceipt from './OrderReceipt';

function OrderDocument({
  orderDetail,
  orderInfo,
  handleChangeStatus,
  keyValue,
  showStatus,
  showItemsTable,
  showOrderVoucher,
  showJournalVoucher,
  customComponent,
}) {
  const { id } = useParams();
  return (
    <Box style={{ margin: '0 auto', boxShadow: 'border-box', overflow: 'auto' }}>
      {handleChangeStatus && orderDetail && orderDetail.status === 'draft' && (
        <Box className="custom-box" style={{ maxWidth: 900 }}>
          <blockquote className="clr-blue row align-items-center justify-content-between">
            <Box className="col-md-9 d-flex align-items-center p-3">
              <span className="mr-3">
                <DraftsOutlinedIcon sx={{ height: 80, width: 80 }} />
              </span>
              <span>
                <h3>Mark As Issue</h3>
                <p>Order has been created. You can now mark as issue.</p>
              </span>
            </Box>
            <Stack className="col-md-3">
              <Button
                type="button"
                color="primary"
                className="icon-btn me-3"
                onClick={() => handleChangeStatus(id)}
                disabled={orderDetail && orderDetail.status !== 'draft'}
              >
                Mark as Issue
              </Button>
            </Stack>
          </blockquote>
        </Box>
      )}
      {customComponent && customComponent}
      {orderDetail && (
        <OrderReceipt
          orderDetail={orderDetail}
          orderInfo={orderInfo}
          keyValue={keyValue}
          showStatus={showStatus}
          showItemsTable={showItemsTable}
          showOrderVoucher={showOrderVoucher}
          showJournalVoucher={showJournalVoucher}
        />
      )}
    </Box>
  );
}

OrderDocument.propTypes = {
  orderDetail: PropTypes.object,
  handleChangeStatus: PropTypes.func,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,

  showStatus: PropTypes.bool,
  showItemsTable: PropTypes.bool,
  showOrderVoucher: PropTypes.bool,
  showJournalVoucher: PropTypes.bool,
  customComponent: PropTypes.node,
};
OrderDocument.defaultProps = {
  orderDetail: null,
  showStatus: true,
  showItemsTable: true,
  showOrderVoucher: false,
  handleChangeStatus: null,
  showJournalVoucher: false,
  customComponent: null,
};

export default OrderDocument;
