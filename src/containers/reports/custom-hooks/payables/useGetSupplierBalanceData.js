import { useMemo } from 'react';

function useGetSupplierBalanceData(supplierPayableBalanceResponse) {
  const { tableBody, totalBalance, currencySymbol } = useMemo(() => {
    let balance = 0;
    let currency = 'AED';
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      balance += item.balance_bcy;
      currency = item.currency__symbol;
      body.push([
        {
          value: item.supplier__supplier_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        {
          value: `${currency} ${item.bill_balance}`,
          link: `bill/detail?duration=this+month&supplier_id=${item.supplier__id}`,
        },
        {
          value: `${currency} ${item.credit_balance}`,
          link: `excess-payment/detail?duration=this+month&supplier_id=${item.supplier__id}`,
        },
        {
          value: `${currency} ${item.balance_bcy}`,
          link: `detail?duration=this+month&supplier_id=${item.supplier__id}`,
        },
      ]);
    });
    return { tableBody: body, totalBalance: balance, currencySymbol: currency };
  }, [supplierPayableBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalBalance.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalBalance, currencySymbol]
  );
  return { tableBody, totalBalance, tableFooter };
}

export default useGetSupplierBalanceData;
