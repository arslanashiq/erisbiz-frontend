import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';
import getSearchParamsList from 'utilities/getSearchParamsList';

function useGetSupplierBalanceData(supplierPayableBalanceResponse) {
  const { tableBody, totalBalance, currencySymbol } = useMemo(() => {
    const { duration } = getSearchParamsList();
    let balance = 0;
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      balance += item.balance_bcy;
      body.push([
        {
          value: item.supplier__supplier_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        {
          value: formatAmount(item.bill_balance || 0),
          link: `bill/detail?duration=${duration || 'this%20month'}&supplier_id=${item.supplier__id}`,
        },
        {
          value: formatAmount(item.credit_balance || 0),
          link: `excess-payment/detail?duration=${duration || 'this%20month'}&supplier_id=${
            item.supplier__id
          }`,
        },
        {
          value: formatAmount(item.balance_bcy || 0),
          link: `detail?duration=${duration || 'this%20month'}&supplier_id=${item.supplier__id}`,
        },
      ]);
    });
    return { tableBody: body, totalBalance: balance };
  }, [supplierPayableBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalBalance), style: { fontWeight: 700 } },
      ],
    ],
    [totalBalance, currencySymbol]
  );
  return { tableBody, totalBalance, tableFooter };
}

export default useGetSupplierBalanceData;
