import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { COMPANY_NAME } from 'utilities/constants';
import OrderItemsTable from './OrderItemsTable';
import OrderVoucher from './OrderVoucher';
import 'styles/purchase-order-template/purchase-order-template.scss';
import JournalVoucher from './JournalVoucher';

function OrderReceipt({
  orderDetail,
  orderInfo,
  keyValue,
  showStatus,
  showItemsTable,
  showOrderVoucher,
  showJournalVoucher,
}) {
  return (
    <Box className="invoice-receipt-main-container">
      {showStatus && (
        <Box className="check">
          <header className="paidArrow"> {orderDetail.status} </header>
        </Box>
      )}
      <Box style={{ padding: 20 }}>
        <Box className="invoice-receipt-container">
          <Box className="box-1">
            <img src="/logo.png" alt="" id="logo" />
            <p>{COMPANY_NAME}</p>
            <p>Office # 1206, JBC 4, Cluster N,</p>
            <p>Jumeirah Lake Towers, Dubai,</p>
            <p>United Arab Emirates</p>
            <p>Phone: +971 4 379 9960</p>
            <p>TRN: 100204615700003</p>
            <p>info@luxuryexplorersme.com</p>
          </Box>
          {orderInfo.showCustomOptions ? (
            <Box className="box-2">
              <h1
                style={{
                  fontSize: '27px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                {orderInfo.type}
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                {orderInfo.order_number}
              </p>
              <Box className="boxSecond" style={{ fontSize: '16px' }}>
                {orderInfo?.box1 &&
                  orderInfo.box1.map(option => (option.value ? (
                    <Box key={uuid()} className="entry-info">
                      <p className="head">{option.label}:</p>
                      <p>{option.value}</p>
                    </Box>
                  ) : (
                    <div key={uuid()} />
                  )))}
              </Box>

              {orderInfo?.box2 && (
                <Box id="bill_to">
                  <Box className="boxSecond" style={{ fontSize: '15px' }}>
                    {orderInfo.box2.map(option => (
                      <Box key={uuid()} className="entry-info">
                        <p className="head">{option.label}:</p>
                        {option.link ? (
                          <p>
                            <Link to={option.link}>{option.value}</Link>
                          </p>
                        ) : (
                          <p>{option.value}</p>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <Box className="box-2">
              <h1
                style={{
                  fontSize: '27px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                {orderInfo.type}
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                {orderInfo.order_number}
              </p>
              <Box className="boxSecond" style={{ fontSize: '16px' }}>
                {orderInfo.formated_order_number && (
                  <Box className="entry-info">
                    <p className="head">OrderNumber:</p>
                    <p>{orderInfo.formated_order_number}</p>
                  </Box>
                )}

                {orderInfo.date && (
                  <Box className="entry-info">
                    <p className="head">Date:</p>
                    <p>{orderInfo.date}</p>
                  </Box>
                )}
                {orderInfo.location && (
                  <Box className="entry-info">
                    <p className="head">Location:</p>
                    <p>{orderInfo.location}</p>
                  </Box>
                )}
              </Box>
              <Box id="bill_to">
                <Box className="boxSecond" style={{ fontSize: '15px' }}>
                  <Box className="entry-info">
                    <p className="head">{orderInfo.label ? orderInfo.label : 'Supplier'}:</p>
                    <p>
                      <Link to={`/pages/accounting/purchases/suppliers/${orderDetail.supplier_id}/detail`}>
                        {orderInfo.supplier.supplier_name}
                      </Link>
                    </p>
                  </Box>
                  <Box className="entry-info">
                    <p className="head">Country:</p>
                    <p>{orderInfo.supplier.country}</p>
                  </Box>
                  <Box className="entry-info">
                    <p className="head">City:</p>
                    <p>{orderInfo.supplier.city}</p>
                  </Box>
                  {orderInfo.supplier_trn && (
                    <Box className="entry-info">
                      <p className="head">TRN:</p>
                      <p>{orderInfo.supplier_trn}</p>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        {/* Purchase Order and Purchase Invoice */}
        {showItemsTable && <OrderItemsTable orderDetail={orderDetail} keyValue={keyValue} />}

        {showOrderVoucher && (
          <OrderVoucher orderDetail={orderDetail} keyValue={keyValue} orderInfo={orderInfo} />
        )}
        {showJournalVoucher && (
          <JournalVoucher orderDetail={orderDetail} keyValue={keyValue} orderInfo={orderInfo} />
        )}
      </Box>
    </Box>
  );
}

OrderReceipt.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
  showStatus: PropTypes.bool,
  showItemsTable: PropTypes.bool,
  showOrderVoucher: PropTypes.bool,
  showJournalVoucher: PropTypes.bool,
};
OrderReceipt.defaultProps = {
  showStatus: true,
  showItemsTable: true,
  showOrderVoucher: false,
  showJournalVoucher: false,
};

export default OrderReceipt;
