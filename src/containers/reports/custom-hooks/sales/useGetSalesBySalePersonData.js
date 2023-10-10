import { useMemo } from 'react';
import { useLocation } from 'react-router';

function useGetSalesBySalePersonData(saleBySalePersonResponse) {
  const location = useLocation();
  const getLink = item => {
    if (item) {
      return `detail${location.search}&sales_person_id=${item.customer_id}`;
    }
    return false;
  };
  const {
    tableBody,
    totalInvoiceCount,
    totalInvoiceSaleWithoutTax,
    totalInvoiceSaleWithTax,
    totalCreditNoteCount,
    totalCreditNoteSaleWithoutTax,
    totalCreditNoteSaleWithTax,
    totalAmountWithoutTax,
    totalAmountWithTax,
    currencySymbol,
  } = useMemo(() => {
    let invoiceCount = 0;
    let invoiceSaleWithoutTax = 0;
    let invoiceSaleWithTax = 0;
    let creditNoteCount = 0;

    let creditNoteSaleWithoutTax = 0;
    let creditNoteSaleWithTax = 0;
    let total = 0;
    let totalWithTax = 0;

    const currency = 'AED';
    const body = [];
    saleBySalePersonResponse?.data?.data.forEach(item => {
      invoiceCount += item.invoice_count;
      invoiceSaleWithoutTax += item.sales;
      invoiceSaleWithTax += item.sales_with_tax;
      creditNoteCount += item.credit_count;
      creditNoteSaleWithoutTax += item.credit_sales;
      creditNoteSaleWithTax += item.credit_sales_with_tax;
      total += item.sales + item.credit_sales;
      totalWithTax += item.sales_with_tax + item.credit_sales_with_tax;
      //   currency = item.currency__symbol;
      body.push([
        {
          value: item.sales_persone_name,
          style: { textAlign: 'start' },
        },
        {
          value: item.invoice_count,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.sales}`,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.sales_with_tax.toFixed(2)}`,
          link: getLink(item),
        },
        {
          value: item.credit_count,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.credit_sales}`,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.credit_sales_with_tax.toFixed(2)}`,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.sales + item.credit_sales}`,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.sales_with_tax + item.credit_sales_with_tax}}`,
          link: getLink(item),
        },
      ]);
    });
    return {
      tableBody: body,
      totalInvoiceCount: invoiceCount,
      totalInvoiceSaleWithoutTax: invoiceSaleWithoutTax,
      totalInvoiceSaleWithTax: invoiceSaleWithTax,
      totalCreditNoteCount: creditNoteCount,
      totalCreditNoteSaleWithoutTax: creditNoteSaleWithoutTax,
      totalCreditNoteSaleWithTax: creditNoteSaleWithTax,
      totalAmountWithoutTax: total,
      totalAmountWithTax: totalWithTax,
      currencySymbol: currency,
    };
  }, [saleBySalePersonResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: totalInvoiceCount },
        { value: `${currencySymbol} ${totalInvoiceSaleWithoutTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalInvoiceSaleWithTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: totalCreditNoteCount },
        {
          value: `${currencySymbol} ${totalCreditNoteSaleWithoutTax.toFixed(2)}`,
          style: { fontWeight: 700 },
        },
        { value: `${currencySymbol} ${totalCreditNoteSaleWithTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmountWithoutTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmountWithTax.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [
      totalInvoiceCount,
      totalInvoiceSaleWithoutTax,
      totalInvoiceSaleWithTax,
      totalCreditNoteCount,
      totalCreditNoteSaleWithoutTax,
      totalCreditNoteSaleWithTax,
      totalAmountWithoutTax,
      totalAmountWithTax,

      currencySymbol,
    ]
  );
  return { tableBody, tableFooter };
}

export default useGetSalesBySalePersonData;
