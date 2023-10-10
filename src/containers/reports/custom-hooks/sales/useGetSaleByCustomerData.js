import { useMemo } from 'react';
import { useLocation } from 'react-router';

function useGetSaleByCustomerData(saleByCustomerResponse) {
  const location = useLocation();
  const { tableBody, totalSales, totalSalesWithTax, totalInvoiceCount, currencySymbol } = useMemo(() => {
    let sales = 0;
    let salesWithTax = 0;
    let invoices = 0;
    const currency = 'AED';
    const body = [];
    saleByCustomerResponse?.data?.data.forEach(item => {
      sales += item.sales;
      salesWithTax += item.sales_with_tax;
      invoices += item.invoice_count;
      //   currency = item.currency__symbol;
      body.push([
        {
          value: item.sales_account__sales_account_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/sales/customers/${item.sales_account__id}/detail`,
        },
        {
          value: item.invoice_count,
        },
        {
          value: `${currency} ${item.sales}`,
          link: `detail${location.search}&customer_id=${item.sales_account__id}`,
        },
        {
          value: `${currency} ${item.sales_with_tax}`,
          link: `detail${location.search}&customer_id=${item.sales_account__id}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalSales: sales,
      totalSalesWithTax: salesWithTax,
      totalInvoiceCount: invoices,
      currencySymbol: currency,
    };
  }, [saleByCustomerResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: totalInvoiceCount },
        { value: `${currencySymbol} ${totalSales.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalSalesWithTax.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalSales, totalSalesWithTax, totalInvoiceCount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetSaleByCustomerData;
