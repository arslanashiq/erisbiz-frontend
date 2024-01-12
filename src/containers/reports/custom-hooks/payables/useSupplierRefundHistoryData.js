import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useSupplierRefundHistoryData(supplierRefundHistoryResponse) {
  const { tableBody, totalBalance } = useMemo(() => {
    let balance = 0;
    const body = [];
    supplierRefundHistoryResponse?.data?.data.forEach(item => {
      balance += item.amount_applied;
      body.push([
        {
          value: moment(item.refunded_on).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        { value: item.reference_num },
        { value: item.transaction_num },
        { value: item.account_name },
        { value: item.payment_mode },
        { value: formatAmount(item.amount_applied) },
      ]);
    });
    return { tableBody: body, totalBalance: balance };
  }, [supplierRefundHistoryResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalBalance), style: { fontWeight: 700 } },
      ],
    ],
    [totalBalance]
  );
  return { tableBody, totalBalance, tableFooter };
}
export default useSupplierRefundHistoryData;
