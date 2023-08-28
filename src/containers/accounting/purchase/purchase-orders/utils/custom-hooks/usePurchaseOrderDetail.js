import { useEffect, useState } from 'react';

function usePurchaseOrderDetail(purchaseOrder) {
  const [orderInfo, setOrderInfo] = useState({});
  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    if (purchaseOrder) {
      setOrderInfo({
        type: 'Purchase Order',
        order_number: `#${purchaseOrder.pur_order_num}`,
        formated_order_number: purchaseOrder.pur_order_formatted_number,
        date: purchaseOrder.date,
        supplier: purchaseOrder.supplier,
        location: purchaseOrder.location,
      });
      setOrderDetail({ purchaseOrder });
    }
  }, [purchaseOrder]);

  return { orderInfo, orderDetail };
}

export default usePurchaseOrderDetail;
