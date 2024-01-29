import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetPayableDetailData(payableDetailResponse) {
  const getAmountByType = item => {
    let numNights = item.num_nights || 0;
    if (item.type === 'Debit Note') {
      numNights *= -1;
    }
    return numNights;
  };
  const getLinkByType = item => {
    if (item.type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.bill__id}/detail`;
    }
    if (item.type === 'Debit Note') {
      return `/pages/accounting/purchase/debit-notes/${item.supplier_credit__id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmount, totalQuantity } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    const body = [];
    payableDetailResponse?.data?.data.forEach(item => {
      const numNights = getAmountByType(item);
      quantity += numNights;
      amount += item.total_amount || 0 - item.discount || 0;
      body.push([
        {
          value: item.formatted_number,
          link: getLinkByType(item),
          style: { textAlign: 'start' },
        },
        { value: moment(item.date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        {
          value: item.supplier,
          link: `/pages/accounting/purchase/suppliers/${item.supplier_id}/detail`,
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
          value: numNights,
        },
        {
          value: formatAmount(
            item.total_amount > 0
              ? (item.total_amount || 0) - (item.discount || 0)
              : (item.total_amount || 0) + (item.discount || 0)
          ),
        },

        {
          value: item.status,
        },
      ]);
    });
    return { tableBody: body, totalQuantity: quantity, totalAmount: amount };
  }, [payableDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '', style: { fontWeight: 700 } },
        { value: totalQuantity, style: { fontWeight: 700 } },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: '' },
        { value: '' },
      ],
    ],
    [totalAmount, totalQuantity]
  );
  return { tableBody, tableFooter };
}

export default useGetPayableDetailData;
