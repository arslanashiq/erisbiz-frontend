import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetPurchaseOrderBySupplierDetailData(purchaseOrderBySupplierResponse) {
  const { tableBody, totalAmount } = useMemo(() => {
    let amount = 0;
    const body = [];
    purchaseOrderBySupplierResponse?.data?.data.forEach(item => {
      amount += item.amount || 0;
      body.push([
        {
          value: item.pur_order_formatted_number,
          style: { textAlign: 'start' },

          link: `/pages/accounting/purchase/purchase-orders/${item.id}/detail`,
        },
        {
          value: moment(item.date).format(DATE_FORMAT),
          style: { textAlign: 'start' },
        },
        {
          value: formatAmount(item.amount),
        },
        { value: item.status },
      ]);
    });
    return { tableBody: body, totalAmount: amount };
  }, [purchaseOrderBySupplierResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseOrderBySupplierDetailData;
