import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

function useGetReceivablesDetailData(receivablesDetailResponse) {
  const { tableBody, totalAmount, totalQuantity } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    const body = [];
    receivablesDetailResponse?.data?.data.forEach(item => {
      amount += item.total_amount || 0;
      quantity += item.num_units || 0;
      body.push([
        {
          value: item.customer_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },
        { value: moment(item.date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        {
          value: item.formatted_number,
          link: getLinkByTransactionType(item.type, item.id),
          style: { textAlign: 'start' },
        },
        {
          value: item.type,
          style: { textAlign: 'start' },
        },
        {
          value: item.service_type,
          style: { textAlign: 'start' },
        },
        {
          value: formatAmount(item.item_price || 0),
        },
        {
          value: item.num_units,
        },
        {
          value: formatAmount(item.total_amount || 0),
        },
        {
          value: item.status,
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
        { value: formatAmount(totalQuantity), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalAmount, totalQuantity]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivablesDetailData;
