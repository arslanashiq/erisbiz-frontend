/* eslint-disable no-underscore-dangle */
import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

const cellFontSize = 12;
const headerStyle = {
  fontSize: cellFontSize,
  textAlign: 'left',
  color: '#999',
  border: 'none',
  backgroundColor: '#EDEDED',
};
const bodyStyle = { fontSize: cellFontSize, textAlign: 'left', border: 'none' };
const footerStyle = { fontSize: cellFontSize, textAlign: 'left', fontWeight: 'bold', color: 'red' };
const footerTotalAmountStyle = {
  fontSize: cellFontSize,
  textAlign: 'right',
  fontWeight: 'bold',
  color: 'green',
};

function useGetProfitAndLossStatementData(profitAndLossStatementResponse) {
  const { tableBody, totalProfitLossAmount } = useMemo(() => {
    const body = [];
    let profitLossAmount = 0;
    let currentTotal = 0;

    // sales
    let data = profitAndLossStatementResponse?.data?.data?.Sales_;
    profitLossAmount += data?.total_balance || 0;
    body.push([
      {
        value: 'Operating Income',
        style: headerStyle,
      },
      {
        value: '',
        style: headerStyle,
      },
    ]);
    body.push([
      {
        value: data?.COA_name,
        style: bodyStyle,
      },
      {
        value: data?.date_range_balance,
        style: { ...bodyStyle, textAlign: 'right' },
      },
    ]);
    body.push([
      {
        value: 'Total Operating Income',
        style: footerStyle,
      },
      {
        value: data?.total_balance,
        style: { ...footerStyle, textAlign: 'right' },
      },
    ]);
    // cost of sales
    data = profitAndLossStatementResponse?.data?.data?.Sales_of_Cost_;
    profitLossAmount += data?.total_balance || 0;
    body.push([
      {
        value: 'Cost of Sales',
        style: headerStyle,
      },
      {
        value: '',
        style: headerStyle,
      },
    ]);
    body.push([
      {
        value: data?.COA_name,
        style: bodyStyle,
      },
      {
        value: data?.date_range_balance,
        style: { ...bodyStyle, textAlign: 'right' },
      },
    ]);
    body.push([
      {
        value: 'Total Cost of Sales',
        style: footerStyle,
      },
      {
        value: data?.total_balance,
        style: footerTotalAmountStyle,
      },
    ]);
    body.push([
      {
        value: 'Gross Profit',
        style: footerTotalAmountStyle,
      },
      {
        value: profitLossAmount,
        style: footerTotalAmountStyle,
      },
    ]);
    // expenses
    data = profitAndLossStatementResponse?.data?.data?.expense;
    profitLossAmount += data?.total_balance || 0;

    body.push([
      {
        value: 'Operating Expense',
        style: headerStyle,
      },
      {
        value: '',
        style: headerStyle,
      },
    ]);
    data?.forEach(item => {
      profitLossAmount += item?.total_balance || 0;
      currentTotal += item.total_balance || 0;
      body.push([
        {
          value: item?.COA_name,
          style: bodyStyle,
        },
        {
          value: item?.date_range_balance,
          style: { ...bodyStyle, textAlign: 'right' },
        },
      ]);
    });
    body.push([
      {
        value: 'Total Operating Expense',
        style: footerStyle,
      },
      {
        value: currentTotal,
        style: { ...footerStyle, textAlign: 'right' },
      },
    ]);
    body.push([
      {
        value: 'Operating Profit',
        style: { ...footerTotalAmountStyle },
      },
      {
        value: profitLossAmount,
        style: { ...footerTotalAmountStyle, fontWeight: 'bold' },
      },
    ]);
    // Loss_or_Gain_Exchange_
    data = profitAndLossStatementResponse?.data?.data?.Loss_or_Gain_Exchange_;
    profitLossAmount += data?.total_balance || 0;

    body.push([
      {
        value: 'Non Operating Expense',
        style: headerStyle,
      },
      {
        value: '',
        style: headerStyle,
      },
    ]);

    body.push([
      {
        value: data?.COA_name,
        style: bodyStyle,
      },
      {
        value: data?.date_range_balance,
        style: { ...bodyStyle, textAlign: 'right' },
      },
    ]);
    body.push([
      {
        value: 'Total Non Operating Expense',
        style: footerStyle,
      },
      {
        value: currentTotal,
        style: { ...footerStyle, textAlign: 'right' },
      },
    ]);

    return {
      tableBody: body,
      totalProfitLossAmount: profitLossAmount,
    };
  }, [profitAndLossStatementResponse]);
  const tableFooter = useMemo(
    () => [
      [
        {
          value: 'Net Profit/Loss',
          style: { ...footerTotalAmountStyle },
        },
        {
          value: formatAmount(totalProfitLossAmount),
          style: { ...footerTotalAmountStyle },
        },
      ],
    ],
    [tableBody, totalProfitLossAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetProfitAndLossStatementData;
