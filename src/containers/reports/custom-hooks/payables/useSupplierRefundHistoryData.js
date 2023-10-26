import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useSupplierRefundHistoryData(supplierRefundHistoryResponse) {
  const { tableBody, totalBalance, currencySymbol } = useMemo(() => {
    let balance = 0;
    const body = [];
    let currency = 'AED';
    supplierRefundHistoryResponse?.data?.data.forEach(item => {
      balance += item.amount_applied;
      currency = item.currency_symbol;
      body.push([
        {
          value: moment(item.refunded_on).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        { value: item.reference_num },
        { value: item.transaction_num },
        { value: item.account_name },
        { value: item.payment_mode },
        { value: `${currency} ${item.amount_applied}` },
      ]);
    });
    return { tableBody: body, totalBalance: balance, currencySymbol: currency };
  }, [supplierRefundHistoryResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalBalance.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalBalance, currencySymbol]
  );
  return { tableBody, totalBalance, tableFooter };
}
export default useSupplierRefundHistoryData;
