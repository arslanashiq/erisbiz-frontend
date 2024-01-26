import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetPayableDetailData(payableDetailResponse) {
  const { tableBody, totalAmount, totalQuantity, totalPrice } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    let price = 0;
    const body = [];
    payableDetailResponse?.data?.data.forEach(item => {
      price += item.item_price || 0;
      quantity += item.num_nights || 0;
      amount += item.total_amount || 0;
      body.push([
        {
          value: item.formatted_number,
          link: `/pages/accounting/purchase/${item.type === 'Bill' ? 'purchase-invoice' : 'debit-notes'}/${
            item.type === 'Bill' ? item.bill__id : item.supplier_credit__id
          }/detail`,
          style: { textAlign: 'start' },
        },
        { value: moment(item.date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        {
          value: item.supplier,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
          style: { textAlign: 'start' },
        },
        // {
        //   value: item.type,
        //   style: { textAlign: 'start' },
        // },
        {
          value: item.service_type,

          style: { textAlign: 'start' },
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
        {
          value: item.status,
        },
      ]);
    });
    return { tableBody: body, totalPrice: price, totalQuantity: quantity, totalAmount: amount };
  }, [payableDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalPrice), style: { fontWeight: 700 } },
        { value: formatAmount(totalQuantity), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalAmount, totalQuantity, totalPrice]
  );
  return { tableBody, tableFooter };
}

export default useGetPayableDetailData;
