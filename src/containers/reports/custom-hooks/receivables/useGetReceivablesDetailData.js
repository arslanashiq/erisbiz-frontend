import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetReceivablesDetailData(receivablesDetailResponse) {
  const getLinkByType = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    if (item.type === 'Credit Note') {
      return `/pages/accounting/sales/credit-notes/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmount, totalQuantity } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    const body = [];
    receivablesDetailResponse?.data?.data.forEach(item => {
      amount += item.total_amount;
      quantity += item.num_units;
      body.push([
        {
          value: item.customer_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },
        { value: moment(item.date).format(DATE_FORMAT) },
        {
          value: item.formatted_number,
          link: getLinkByType(item),
        },
        {
          value: item.status,
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
          value: formatAmount(item.num_units),
        },
        {
          value: formatAmount(item.total_amount),
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
        { value: formatAmount(totalQuantity), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalQuantity]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivablesDetailData;
