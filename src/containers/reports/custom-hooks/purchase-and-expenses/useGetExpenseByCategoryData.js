import { useMemo } from 'react';
import { useLocation } from 'react-router';
import formatAmount from 'utilities/formatAmount';

function useGetExpenseByCategoryData(expenseByCategoryResponse) {
  const location = useLocation();
  const { tableBody, totalAmountWithoutTax, totalAmountWithTax } = useMemo(() => {
    let amountWithoutTax = 0;
    let amountWithTax = 0;
    const body = [];
    expenseByCategoryResponse?.data?.data.forEach(item => {
      amountWithoutTax += item.amount_without_tax;
      amountWithTax += item.total_amount;
      //   currency = item.currency_symbol;

      body.push([
        { value: item.chart_of_account__account_name, style: { textAlign: 'start' } },
        {
          value: formatAmount(item.amount_without_tax),
          link: `detail/${location.search}&category_name=${item.chart_of_account__account_name}`,
        },
        {
          value: formatAmount(item.total_amount),
          link: `detail/${location.search}&category_name=${item.chart_of_account__account_name}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmountWithoutTax: amountWithoutTax,
      totalAmountWithTax: amountWithTax,
    };
  }, [expenseByCategoryResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: formatAmount(totalAmountWithoutTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountWithTax), style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalAmountWithoutTax, totalAmountWithTax]
  );
  return { tableBody, tableFooter };
}

export default useGetExpenseByCategoryData;
