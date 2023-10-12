import { useMemo } from 'react';

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
    const currencySymbol = 'AED';
    data[keyValue].forEach(item => {
      //   currencySymbol = item.currency_symbol;
      amount += item.grand_total;
      dueAmount += item.amount_due;

      body.push([
        { value: item.chart_of_account__account_type__account_type, style: { textAlign: 'start' } },
        { value: `${currencySymbol} ${item.debit}` },
        { value: `${currencySymbol} ${item.credit}` },
      ]);
    });
    return { body, amount, dueAmount, currencySymbol };
  };

  const getHeader = title => [
    {
      value: title,
      style: { textAlign: 'start', ...headerStyle },
    },
    {
      value: '',
      style: { textAlign: 'start', ...headerStyle },
    },
    {
      value: '',
      style: { textAlign: 'start', ...headerStyle },
    },
  ];

  const { tableBody, totalAmount, totalDueAmount, currencySymbol } = useMemo(() => {
    let amount = 0;
    let dueAmount = 0;
    let body = [];
    let currency = 'AED';
    if (!accountTypeSummaryResponse?.data?.data) {
      return {
        tableBody: body,
        totalAmount: amount,
        totalDueAmount: dueAmount,
        currencySymbol: currency,
      };
    }

    availableDateList.forEach(date => {
      const {
        body: currentBody,
        amount: currentTotalAmount,
        dueAmount: currentDueAmount,
        currencySymbol: currentCurrencySymbol,
      } = getTableBodyValue(accountTypeSummaryResponse?.data?.data, date.keyValue);
      if (currentBody.length > 0) {
        const currentHeader = getHeader(date.title);
        body = [...body, currentHeader, ...currentBody];
        amount += currentTotalAmount;
        dueAmount += currentDueAmount;
        currency = currentCurrencySymbol;
      }
    });

    return {
      tableBody: body,
      totalAmount: amount,
      totalDueAmount: dueAmount,
      currencySymbol: currency,
    };
  }, [accountTypeSummaryResponse]);

  const tableFooter = useMemo(() => [[]], [totalAmount, totalDueAmount, currencySymbol]);
  return { tableBody, tableFooter };
}

export default useGetAccountTypeSummaryData;
