/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import moment from 'moment';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import {
  VATAuditReportHeadCells,
  singleVATAuditReportHeadCells,
  singleVatAuditReportTotalHeadCells,
} from 'containers/reports/utilities/head-cells';
import formatAmount from 'utilities/formatAmount';
import { tableCellCompanyName } from 'styles/components/custom-hooks/use-excel-sheet';
import { excelSheet } from 'shared/custom-hooks/ExcelSheet';

function useGetVATAuditData(reportVATAuditResponse) {
  const getTotalSummary = (auditReportData, key) => {
    if (auditReportData[key]) {
      return [
        { value: formatAmount(auditReportData[key]?.transaction_total) },
        { value: formatAmount(auditReportData[key]?.total) },
        {
          value: formatAmount(auditReportData[key]?.vat_total),
        },
      ];
    }
    return [{ value: '' }];
  };
  const getVatAuditExcelSheetData = data => {
    const auditReportData = data?.record_data;
    if (!auditReportData) return [];
    // bill
    const billInvoice =
      auditReportData?.bill_invoices?.data?.map(item => [
        {
          value: item.supplier_name || '',
        },
        { value: item.supplier_country || '' },
        { value: item.supplier_trn || '' },
        { value: item.bill_date || '' },
        { value: item.bill_num || '' },
        { value: item.permit_num || '' },
        { value: item.transaction_id.toString() || '' },
        { value: item.line_no.toString() || '' },
        { value: item.product_desctiption || '' },
        { value: item.purchasefcy_value },
        { value: item.vatfcy_value },
        { value: item.tax_code || '' },
        { value: item.vatfcy },
        { value: item.purchasefcy },
        { value: item.currency_symbol || '' },
      ]) || [];
    const creditNote =
      auditReportData?.credit_note?.data?.map(item => [
        {
          value: item.sales_account || '',
        },
        { value: item.sales_account_country || '' },
        { value: item.sales_trn || '' },
        { value: item.invoice_date || '' },
        { value: item.credit_note_num || '' },
        { value: item.transaction_id.toString() || '' },
        { value: item.line_no.toString() || '' },
        { value: item.product_desctiption || '' },
        { value: formatAmount(item.purchasefcy_value) },
        { value: formatAmount(item.vatfcy_value) },
        { value: item.tax_code || '' },
        { value: item.country || '' },
        { value: formatAmount(item.vatfcy) },
        { value: formatAmount(item.purchasefcy) },
        { value: item.currency_symbol || '' },
      ]) || [];
    const saleInvoice =
      auditReportData?.sale_invoices?.data?.map(item => [
        {
          value: item.sales_account || '',
        },
        { value: item.sales_account_country || '' },
        { value: item.sales_trn || '' },
        { value: item.invoice_date || '' },
        { value: item.invoice_num || '' },
        { value: item.transaction_id.toString() || '' },
        { value: item.line_no.toString() || '' },
        { value: item.product_desctiption || '' },
        { value: formatAmount(item.purchasefcy_value) },
        { value: formatAmount(item.vatfcy_value) },
        { value: item.tax_code || '' },
        { value: item.country || '' },
        { value: formatAmount(item.vatfcy) },
        { value: formatAmount(item.purchasefcy) },
        { value: item.currency_symbol || '' },
      ]) || [];
    const supplierCredit =
      auditReportData?.supplier_credit?.data?.map(item => [
        {
          value: item.supplier_name || '',
        },
        { value: item.supplier_country || '' },
        { value: item.supplier_trn || '' },
        { value: item.bill_date || '' },
        { value: item.supplier_credit_num || '' },
        { value: item.supplier_permit_num || '' },
        { value: item.transaction_id.toString() || '' },
        { value: item.line_no.toString() || '' },
        { value: item.product_desctiption || '' },
        { value: formatAmount(item.purchasefcy_value) },
        { value: formatAmount(item.vatfcy_value) },
        { value: item.tax_code || '' },
        { value: formatAmount(item.vatfcy) },
        { value: formatAmount(item.purchasefcy) },
        { value: item.currency_symbol || '' },
      ]) || [];

    // gaterData
    const excelSheetData = [
      // sales invoice
      [
        { value: 'Customer Supply Listing Table', excelSheetStyle: tableCellCompanyName },
        { value: 'Sales Invoices', excelSheetStyle: tableCellCompanyName },
      ],
      singleVATAuditReportHeadCells,
      ...saleInvoice,
      [{ value: '' }],

      // sales Invoice Total
      [
        { value: 'Customer Supply Listing Total', excelSheetStyle: tableCellCompanyName },
        { value: 'Summary of Sales Invoices', excelSheetStyle: tableCellCompanyName },
      ],
      singleVatAuditReportTotalHeadCells,
      getTotalSummary(auditReportData, 'sale_invoices'),
      [{ value: '' }],

      // bill Invoice
      [
        { value: 'Supplier Purchase Listing Table', excelSheetStyle: tableCellCompanyName },
        { value: 'Purchase Invoices', excelSheetStyle: tableCellCompanyName },
      ],
      singleVATAuditReportHeadCells,
      ...billInvoice,
      [{ value: '' }],

      // bill Invoice Total
      [
        { value: 'Supplier Purchase Listing Total', excelSheetStyle: tableCellCompanyName },
        { value: 'Summary of Purchase Invoices', excelSheetStyle: tableCellCompanyName },
      ],
      singleVatAuditReportTotalHeadCells,
      getTotalSummary(auditReportData, 'bill_invoices'),
      [{ value: '' }],

      // credit Notes
      [
        { value: 'Credit Note', excelSheetStyle: tableCellCompanyName },
        { value: 'Credit Notes', excelSheetStyle: tableCellCompanyName },
      ],
      singleVATAuditReportHeadCells,
      ...creditNote,
      [{ value: '' }],

      // credit Note Total
      [
        { value: 'Customer Credit Note Total', excelSheetStyle: tableCellCompanyName },
        { value: 'Summary of Credit Notes', excelSheetStyle: tableCellCompanyName },
      ],
      singleVatAuditReportTotalHeadCells,
      getTotalSummary(auditReportData, 'credit_note'),
      [{ value: '' }],

      // debit Note
      [
        { value: 'Debit Note', excelSheetStyle: tableCellCompanyName },
        { value: 'Debit Notes', excelSheetStyle: tableCellCompanyName },
      ],
      singleVATAuditReportHeadCells,
      ...supplierCredit,
      [{ value: '' }],

      // Debit Note Total
      [
        { value: 'Supplier Debit Note Total', excelSheetStyle: tableCellCompanyName },
        { value: 'Summary of Debit Notes', excelSheetStyle: tableCellCompanyName },
      ],
      singleVatAuditReportTotalHeadCells,
      getTotalSummary(auditReportData, 'supplier_credit'),
      [{ value: '' }],
    ];
    return excelSheetData;
  };
  const { modifiedTableHead, tableBody, modifiedTableBody } = useMemo(() => {
    const header = [...VATAuditReportHeadCells];
    header.splice(header.length - 1, 1);
    const body = [];
    const modifiedBody = [];

    reportVATAuditResponse?.data?.result.forEach(item => {
      const temp = [
        {
          value: moment(item.start_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: moment(item.end_date).format(DATE_FILTER_REPORT),
        },
        {
          value: item.username,
        },
        {
          value: moment(item.created_at).format(DATE_FILTER_REPORT),
        },
      ];
      modifiedBody.push([...temp]);
      const excelSheetData = getVatAuditExcelSheetData(item);
      temp.push({
        value: (
          <Button
            size="small"
            variant="text"
            onClick={async () => {
              const timeInterval = `From ${item.start_date} To ${item.end_date}`;
              const handleDownload = await excelSheet(
                'Audit Report ',
                moment(item.start_date).format(DATE_FILTER_REPORT),
                moment(item.end_date).format(DATE_FILTER_REPORT),
                timeInterval,
                {},
                header,
                excelSheetData,
                []
              );
              handleDownload();
            }}
          >
            <DownloadIcon />
            Download
          </Button>
        ),
      });
      body.push(temp);
    });

    return {
      tableBody: body,
      modifiedTableBody: modifiedBody,
      modifiedTableHead: header,
    };
  }, [reportVATAuditResponse]);

  return { modifiedTableHead, tableBody, tableFooter: [], modifiedTableBody };
}

export default useGetVATAuditData;
