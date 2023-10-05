import { useMemo } from 'react';

function useGetSupplierBalanceData(supplierPayableBalanceResponse) {
  const { tableBody, totalBalance } = useMemo(() => {
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
        { value: item.bill_balance },
        { value: item.credit_balance },
        { value: item.balance_bcy },
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
        { value: `AED ${totalBalance.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalBalance]
  );
  return { tableBody, totalBalance, tableFooter };
}

export default useGetSupplierBalanceData;
