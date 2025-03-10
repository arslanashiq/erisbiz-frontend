import { useMemo } from 'react';
import { useLocation } from 'react-router';
import formatAmount from 'utilities/formatAmount';

function useGetSalesBySalePersonData(saleBySalePersonResponse) {
  const location = useLocation();
  const getLink = item => {
    if (item) {
      return `detail${location.search}&sales_person_id=${item.sales_person_id}`;
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
  } = useMemo(() => {
    let invoiceCount = 0;
    let invoiceSaleWithoutTax = 0;
    let invoiceSaleWithTax = 0;
    let creditNoteCount = 0;

    let creditNoteSaleWithoutTax = 0;
    let creditNoteSaleWithTax = 0;
    let total = 0;
    let totalWithTax = 0;

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
          value: formatAmount(item.sales),
          link: getLink(item),
        },
        {
          value: formatAmount(item.sales_with_tax),
          link: getLink(item),
        },
        {
          value: item.credit_count,
          link: getLink(item),
        },
        {
          value: formatAmount(item.credit_sales),
          link: getLink(item),
        },
        {
          value: formatAmount(item.credit_sales_with_tax),
          link: getLink(item),
        },
        {
          value: formatAmount(item.sales + item.credit_sales),
          link: getLink(item),
        },
        {
          value: formatAmount(item.sales_with_tax + item.credit_sales_with_tax),
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
    };
  }, [saleBySalePersonResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: totalInvoiceCount },
        { value: formatAmount(totalInvoiceSaleWithoutTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalInvoiceSaleWithTax), style: { fontWeight: 700 } },
        { value: totalCreditNoteCount },
        {
          value: formatAmount(totalCreditNoteSaleWithoutTax),
          style: { fontWeight: 700 },
        },
        { value: formatAmount(totalCreditNoteSaleWithTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountWithoutTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountWithTax), style: { fontWeight: 700 } },
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
    ]
  );
  return { tableBody, tableFooter };
}

export default useGetSalesBySalePersonData;
