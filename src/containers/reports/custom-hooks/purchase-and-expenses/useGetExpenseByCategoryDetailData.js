import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetExpenseByCategoryDetailData(expenseByCategoryDetailResponse) {
  const getLinkByType = item => {
    if (item.transaction_type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.object_id}/detail`;
    }
    if (item.transaction_type === 'Supplier Payment') {
      return `/pages/accounting/purchase/payment-voucher/${item.object_id}/detail`;
    }
    if (item.transaction_type === 'Debit Note') {
      return `/pages/accounting/purchase/debit-notes/${item.object_id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmountWithoutTax, totalAmountWithTax } = useMemo(() => {
    let amountWithoutTax = 0;
    let amountWithTax = 0;
    const body = [];
    expenseByCategoryDetailResponse?.data?.data.forEach(item => {
      amountWithoutTax += item.amount_without_tax;
      amountWithTax += item.total_amount;
      //   currency = item.currency_symbol;

      body.push([
        { value: moment(item.transaction_date).format(DATE_FILTER_REPORT), style: { textAlign: 'start' } },
        {
          value: item.transaction_type,
        },
        {
          value: item.transaction_detail,
          link: `/pages/accounting/purchase/suppliers/${item.supplier_id}/detail`,
        },
        {
          value: formatAmount(item.amount_without_tax),
          link: getLinkByType(item),
        },
        {
          value: formatAmount(item.total_amount),
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmountWithoutTax: amountWithoutTax,
      totalAmountWithTax: amountWithTax,
    };
  }, [expenseByCategoryDetailResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '', style: { fontWeight: 700 } },
        { value: '', style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountWithoutTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountWithTax), style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalAmountWithoutTax, totalAmountWithTax]
  );
  return { tableBody, tableFooter };
}

export default useGetExpenseByCategoryDetailData;
