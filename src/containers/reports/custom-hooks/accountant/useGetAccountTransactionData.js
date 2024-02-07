import { transactionType } from 'containers/reports/utilities/constants';
import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

function useGetAccountTransactionData(accountTransactionResponse) {
  const getTransactionType = type => {
    try {
      let transactionTypeName = type;
      transactionType.forEach(transaction => {
        if (transaction.value === type) {
          transactionTypeName = transaction.label;
        }
      });
      return transactionTypeName;
    } catch (error) {
      return type;
    }
  };
  const { tableBody, totalDebitAmount, totalCreditAmount } = useMemo(() => {
    let totalDebit = 0;
    let totalCredit = 0;

    const body = [];
    accountTransactionResponse?.data?.data.forEach(item => {
      totalDebit += item.bcy_debit || 0;
      totalCredit += item.bcy_credit;
      body.push([
        {
          value: moment(item.transaction_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.account_name,
          style: { textAlign: 'start' },
        },
        {
          value: item.transaction_detail,
          style: { textAlign: 'start' },
        },
        {
          value: getTransactionType(item.transaction_type),
          style: { textAlign: 'start' },
        },
        {
          value: item.transaction_number,
          style: { textAlign: 'start' },
          link: getLinkByTransactionType(item.transaction_type, item.object_id),
        },
        {
          value: item.remarks?.substring(0, 180) || item.remarks || '',

          style: { textAlign: 'start', maxWidth: 300 },
          toolTip: true,
          toolTipContent: item.remarks || '',
        },

        {
          value: formatAmount(item.bcy_debit),
        },
        {
          value: formatAmount(item.bcy_credit),
        },
      ]);
    });
    return {
      tableBody: body,
      totalDebitAmount: totalDebit,
      totalCreditAmount: totalCredit,
    };
  }, [accountTransactionResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start' } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalDebitAmount) },
        { value: formatAmount(totalCreditAmount) },
      ],
    ],
    [totalDebitAmount, totalCreditAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetAccountTransactionData;
