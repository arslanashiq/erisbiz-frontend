import { useMemo } from 'react';
import { useLocation } from 'react-router';
import formatAmount from 'utilities/formatAmount';

function useGetSaleByCustomerData(saleByCustomerResponse) {
  const location = useLocation();
  const { tableBody, totalSales, totalSalesWithTax, totalInvoiceCount } = useMemo(() => {
    let sales = 0;
    let salesWithTax = 0;
    let invoices = 0;
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
          link: `detail${location.search}&customer_id=${item.sales_account__id}`,
        },
        {
          value: formatAmount(item.sales),
        },
        {
          value: formatAmount(item.sales_with_tax),
        },
      ]);
    });
    return {
      tableBody: body,
      totalSales: sales,
      totalSalesWithTax: salesWithTax,
      totalInvoiceCount: invoices,
    };
  }, [saleByCustomerResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: totalInvoiceCount },
        { value: formatAmount(totalSales), style: { fontWeight: 700 } },
        { value: formatAmount(totalSalesWithTax), style: { fontWeight: 700 } },
      ],
    ],
    [totalSales, totalSalesWithTax, totalInvoiceCount]
  );
  return { tableBody, tableFooter };
}

export default useGetSaleByCustomerData;
