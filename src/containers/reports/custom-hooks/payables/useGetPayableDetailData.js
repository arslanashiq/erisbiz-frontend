import moment from 'moment';
import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetPayableDetailData(payableDetailResponse) {
  const { tableBody, totalAmount, totalQuantity } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    const body = [];
    payableDetailResponse?.data?.data.forEach(item => {
      amount += item.total_amount;
      quantity += item.num_nights;
      body.push([
        {
          value: item.status,
          style: { textAlign: 'start' },
        },
        { value: moment(item.date).format('DD MMM YYYY') },
        {
          value: item.formatted_number,
          link: `/pages/accounting/purchase/${item.type === 'Bill' ? 'purchase-invoice' : 'debit-notes'}/${
            item.type === 'Bill' ? item.bill__id : item.supplier_credit__id
          }/detail`,
        },
        {
          value: item.supplier,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        {
          value: item.type,
        },
        {
          value: item.service_type,
        },
        {
          value: formatAmount(item.item_price),
        },
        {
          value: formatAmount(item.num_nights),
        },
        {
          value: formatAmount(item.total_amount),
        },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalQuantity: quantity };
  }, [payableDetailResponse]);

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
        { value: formatAmount(totalQuantity), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalQuantity]
  );
  return { tableBody, tableFooter };
}

export default useGetPayableDetailData;
