import moment from 'moment';
import { useMemo } from 'react';

function useGetReceivablesDetailData(receivablesDetailResponse) {
  const { tableBody, totalAmount, totalQuantity } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    const body = [];
    receivablesDetailResponse?.data?.data.forEach(item => {
      amount += item.total_amount;
      quantity += item.num_units;
      body.push([
        {
          value: item.status,
          style: { textAlign: 'start' },
        },
        { value: moment(item.date).format('DD MMM YYYY') },
        {
          value: item.formatted_number,
        },
        {
          value: item.customer_name,
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },
        {
          value: item.type,
        },
        {
          value: item.service_type,
        },
        {
          value: item.item_price,
        },
        {
          value: item.num_units,
        },
        {
          value: item.total_amount,
        },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalQuantity: quantity };
  }, [receivablesDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: totalQuantity, style: { fontWeight: 700 } },
        { value: `AED ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalQuantity]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivablesDetailData;
