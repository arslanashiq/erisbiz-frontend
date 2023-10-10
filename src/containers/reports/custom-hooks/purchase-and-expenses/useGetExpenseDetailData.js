import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetExpenseDetailData(expenseDetailResponse) {
  const { tableBody, totalAmountWithoutTax, totalAmountWithTax, currencySymbol } = useMemo(() => {
    let amountWithoutTax = 0;
    let amountWithTax = 0;
    const currency = 'AED';
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
          value: `${currency} ${item.amount_without_tax}`,
          link: `/pages/accounting/purchase/expenses/${item.object_id}/detail`,
        },
        {
          value: `${currency} ${item.total_amount}`,
          link: `/pages/accounting/purchase/expenses/${item.object_id}/detail`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmountWithoutTax: amountWithoutTax,
      totalAmountWithTax: amountWithTax,
      currencySymbol: currency,
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
        { value: `${currencySymbol} ${totalAmountWithoutTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmountWithTax.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalAmountWithoutTax, totalAmountWithTax, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetExpenseDetailData;
