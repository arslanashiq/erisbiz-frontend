import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useParams } from 'react-router';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import OrderReceipt from './OrderReceipt';

function OrderDocument({ orderDetail, orderInfo, handleChangeStatus, keyValue }) {
  const { id } = useParams();
  return (
    <div style={{ margin: '0 auto', boxShadow: 'border-box', overflow: 'auto' }}>
      {orderDetail && orderDetail.status === 'draft' && (
        <div className="custom-box">
          <blockquote className="clr-blue d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center p-3">
              <span className="mr-3">
                <DraftsOutlinedIcon sx={{ height: 80, width: 80 }} />
              </span>
              <span>
                <h3>Payment</h3>
                <p>Order has been created. You can request for payment.</p>
              </span>
            </div>
            <Button
              type="button"
              color="primary"
              className="icon-btn mr-3"
              onClick={() => handleChangeStatus(id)}
              disabled={orderDetail && orderDetail.status !== 'draft'}
            >
              Request Payment
            </Button>
          </blockquote>
        </div>
      )}
      {orderDetail && <OrderReceipt orderDetail={orderDetail} orderInfo={orderInfo} keyValue={keyValue} />}
    </div>
  );
}

OrderDocument.propTypes = {
  orderDetail: PropTypes.object,
  handleChangeStatus: PropTypes.func,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
};
OrderDocument.defaultProps = {
  orderDetail: null,
  handleChangeStatus: () => {},
};

export default OrderDocument;
