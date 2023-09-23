import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OrderItemsTable from './OrderItemsTable';
import OrderVoucher from './OrderVoucher';
import 'styles/purchase-order-template/purchase-order-template.scss';

function OrderReceipt({ orderDetail, orderInfo, keyValue, showStatus, showItemsTable, showOrderVoucher }) {
  return (
    <div className="invoice-receipt-main-container">
      {showStatus && (
        <div className="check">
          <header className="paidArrow"> {orderDetail.status} </header>
        </div>
      )}
      <div style={{ padding: 20 }}>
        <div className="invoice-receipt-container">
          <div className="box-1">
            <img src="/logo.png" alt="" id="logo" />
            <p>Luxury Events and VIP Travel DMCC</p>
            <p>Office # 1206, JBC 4, Cluster N,</p>
            <p>Jumeirah Lake Towers, Dubai,</p>
            <p>United Arab Emirates</p>
            <p>Phone: +971 4 379 9960</p>
            <p>TRN: 100204615700003</p>
            <p>info@luxuryexplorersme.com</p>
          </div>
          {orderInfo.showCustomOptions ? (
            <div className="box-2">
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
              <div className="boxSecond" style={{ fontSize: '16px' }}>
                {orderInfo?.box1?.map(option => (
                  <div key={uuid()} className="entry-info">
                    <p className="head">{option.label}:</p>
                    <p>{option.value}</p>
                  </div>
                ))}
              </div>

              <div id="bill_to">
                <div className="boxSecond" style={{ fontSize: '15px' }}>
                  {orderInfo?.box2?.map(option => (
                    <div key={uuid()} className="entry-info">
                      <p className="head">{option.label}:</p>
                      {option.link ? (
                        <p>
                          <Link to={option.link}>{option.value}</Link>
                        </p>
                      ) : (
                        <p>{option.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="box-2">
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
              <div className="boxSecond" style={{ fontSize: '16px' }}>
                {orderInfo.formated_order_number && (
                  <div className="entry-info">
                    <p className="head">OrderNumber:</p>
                    <p>{orderInfo.formated_order_number}</p>
                  </div>
                )}

                {orderInfo.date && (
                  <div className="entry-info">
                    <p className="head">Date:</p>
                    <p>{orderInfo.date}</p>
                  </div>
                )}
                {orderInfo.location && (
                  <div className="entry-info">
                    <p className="head">Location:</p>
                    <p>{orderInfo.location}</p>
                  </div>
                )}
              </div>
              <div id="bill_to">
                <div className="boxSecond" style={{ fontSize: '15px' }}>
                  <div className="entry-info">
                    <p className="head">{orderInfo.label ? orderInfo.label : 'Supplier'}:</p>
                    <p>
                      <Link to={`/pages/accounting/purchases/suppliers/${orderDetail.supplier_id}/detail`}>
                        {orderInfo.supplier.supplier_name}
                      </Link>
                    </p>
                  </div>
                  <div className="entry-info">
                    <p className="head">Country:</p>
                    <p>{orderInfo.supplier.country}</p>
                  </div>
                  <div className="entry-info">
                    <p className="head">City:</p>
                    <p>{orderInfo.supplier.city}</p>
                  </div>
                  {orderInfo.supplier_trn && (
                    <div className="entry-info">
                      <p className="head">TRN:</p>
                      <p>{orderInfo.supplier_trn}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Purchase Order and Purchase Invoice */}
        {showItemsTable && <OrderItemsTable orderDetail={orderDetail} keyValue={keyValue} />}

        {showOrderVoucher && (
          <OrderVoucher orderDetail={orderDetail} keyValue={keyValue} orderInfo={orderInfo} />
        )}
      </div>
    </div>
  );
}

OrderReceipt.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
  showStatus: PropTypes.bool,
  showItemsTable: PropTypes.bool,
  showOrderVoucher: PropTypes.bool,
};
OrderReceipt.defaultProps = {
  showStatus: true,
  showItemsTable: true,
  showOrderVoucher: false,
};

export default OrderReceipt;
