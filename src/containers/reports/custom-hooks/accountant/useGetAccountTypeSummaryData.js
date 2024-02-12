import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

const availableDateList = [
  {
    title: 'Assets',
    keyValue: 'asset',
  },
  {
    title: 'Equity',
    keyValue: 'equity',
  },
  {
    title: 'Expene',
    keyValue: 'expense',
  },
  {
    title: 'Income',
    keyValue: 'income',
  },
  {
    title: 'Liability',
    keyValue: 'liability',
  },
];
const headerStyle = { fontWeight: 'bold', fontSize: 15, backgroundColor: '#F2F4F7' };

function useGetAccountTypeSummaryData(accountTypeSummaryResponse) {
  const getTableBodyValue = (data, keyValue) => {
    const body = [];
    let amount = 0;
    let dueAmount = 0;
    data[keyValue].forEach(item => {
      //   currencySymbol = item.currency_symbol;
      amount += item.grand_total;
      dueAmount += item.amount_due;

      body.push([
        {
          value: item.chart_of_account__account_type__account_type?.replaceAll('_', ' '),
          style: { textAlign: 'start' },
        },
        { value: formatAmount(item.debit) },
        { value: formatAmount(item.credit) },
      ]);
    });
    return { body, amount, dueAmount };
  };

  const getHeader = title => [
    {
      value: title,
      style: { textAlign: 'start', ...headerStyle },
    },
    {
      value: ' ',
      style: { textAlign: 'end', ...headerStyle },
    },
    {
      value: ' ',
      style: { textAlign: ' ', ...headerStyle },
    },
  ];

  const { tableBody, totalAmount, totalDueAmount } = useMemo(() => {
    let amount = 0;
    let dueAmount = 0;
    let body = [];
    if (!accountTypeSummaryResponse?.data?.data) {
      return {
        tableBody: body,
        totalAmount: amount,
        totalDueAmount: dueAmount,
      };
    }

    availableDateList.forEach(date => {
      const {
        body: currentBody,
        amount: currentTotalAmount,
        dueAmount: currentDueAmount,
      } = getTableBodyValue(accountTypeSummaryResponse?.data?.data, date.keyValue);
      if (currentBody.length > 0) {
        const currentHeader = getHeader(date.title);
        body = [...body, currentHeader, ...currentBody];
        amount += currentTotalAmount;
        dueAmount += currentDueAmount;
      }
    });

    return {
      tableBody: body,
      totalAmount: amount,
      totalDueAmount: dueAmount,
    };
  }, [accountTypeSummaryResponse]);

  const tableFooter = useMemo(() => [[]], [totalAmount, totalDueAmount]);
  return { tableBody, tableFooter };
}

export default useGetAccountTypeSummaryData;
