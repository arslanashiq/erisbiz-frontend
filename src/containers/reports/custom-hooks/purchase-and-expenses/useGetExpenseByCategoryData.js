import { useMemo } from 'react';
import { useLocation } from 'react-router';

function useGetExpenseByCategoryData(expenseByCategoryResponse) {
  const location = useLocation();
  const { tableBody, totalAmountWithoutTax, totalAmountWithTax, currencySymbol } = useMemo(() => {
    let amountWithoutTax = 0;
    let amountWithTax = 0;
    const currency = 'AED';
    const body = [];
    expenseByCategoryResponse?.data?.data.forEach(item => {
      amountWithoutTax += item.amount_without_tax;
      amountWithTax += item.total_amount;
      //   currency = item.currency_symbol;

      body.push([
        { value: item.chart_of_account__account_name, style: { textAlign: 'start' } },
        {
          value: `${currency} ${item.amount_without_tax}`,
          link: `detail/${location.search}&category_name=${item.chart_of_account__account_name}`,
        },
        {
          value: `${currency} ${item.total_amount}`,
          link: `detail/${location.search}&category_name=${item.chart_of_account__account_name}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmountWithoutTax: amountWithoutTax,
      totalAmountWithTax: amountWithTax,
      currencySymbol: currency,
    };
  }, [expenseByCategoryResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmountWithoutTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmountWithTax.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalAmountWithoutTax, totalAmountWithTax, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetExpenseByCategoryData;
