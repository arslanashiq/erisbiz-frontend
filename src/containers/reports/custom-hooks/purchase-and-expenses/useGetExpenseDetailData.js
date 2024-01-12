import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetExpenseDetailData(expenseDetailResponse) {
  const { tableBody, totalAmountWithoutTax, totalAmountWithTax } = useMemo(() => {
    let amountWithoutTax = 0;
    let amountWithTax = 0;
    const body = [];
    expenseDetailResponse?.data?.data.forEach(item => {
      amountWithoutTax += item.amount_without_tax;
      amountWithTax += item.total_amount;
      //   currency = item.currency_symbol;

      body.push([
        { value: item.status, style: { textAlign: 'start' } },
        { value: moment(item.transaction_date).format(DATE_FILTER_REPORT) },
        {
          value: item.reference_number,
        },
        {
          value: item.transaction_detail,
          link: `/pages/accounting/purchase/suppliers/${item.supplier_id}/detail`,
        },
        {
          value: item.chart_of_account__account_name,
        },
        {
          value: formatAmount(item.amount_without_tax),
          link: `/pages/accounting/purchase/expenses/${item.object_id}/detail`,
        },
        {
          value: formatAmount(item.total_amount),
          link: `/pages/accounting/purchase/expenses/${item.object_id}/detail`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmountWithoutTax: amountWithoutTax,
      totalAmountWithTax: amountWithTax,
    };
  }, [expenseDetailResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '', style: { fontWeight: 700 } },
        { value: '', style: { fontWeight: 700 } },
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

export default useGetExpenseDetailData;
