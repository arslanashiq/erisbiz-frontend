/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react';
import {
  tableCellBody,
  tableCellBodyNoData,
  tableCellCompanyName,
  tableCellFooter,
  tableCellHeader,
} from 'styles/components/custom-hooks/use-excel-sheet';
import { COMPANY_NAME } from 'utilities/constants';

const Excel = require('exceljs');

function useExcelSheet(
  reportTitle,
  startDate,
  endDate,
  timeInterval,
  excelHeading = [],
  excelBody = [],
  excelFooter = []
) {
  const MAX_COLUMN_WIDTH = [40, 40, 40];
  let buffer = null;
  let selectedRow = 1;
  const fileName = `${reportTitle} (${startDate}-${endDate})`;
  const sheetName = `(${startDate}-${endDate})`;
  const [isLoading, setIsLoading] = useState(true);
  const addDataInSheetAndMergeCells = (numOfColumns, sheet, value, style) => {
    sheet.addRow([value]);
    sheet.getRow(selectedRow).getCell(1).style = style;
    sheet.mergeCells(selectedRow, 1, selectedRow, numOfColumns);
    selectedRow += 1;
  };
  //   create
  const makeWorkSheet = () => {
    // import ExcelJS and create excel workbook
    const workbook = new Excel.Workbook();
    // setting workbook
    const date = new Date();
    workbook.creator = 'Arslan Ashiq';
    workbook.created = date;
    workbook.modified = date;
    workbook.views = [
      {
        firstSheet: 0,
        activeTab: 0,
        visibility: 'visible',
      },
    ];

    // creating excel work sheet
    const sheet = workbook.addWorksheet(sheetName);

    return { workbook, sheet };
  };
  // add new row in excel sheet
  const addNewRowInExcelSheet = (targetSheet, cellsList, key, style) => {
    const row = [];
    const sheet = targetSheet;

    for (let j = 0; j < cellsList.length; j += 1) {
      row.push(cellsList[j][key]);
    }
    sheet.addRow(row);
    for (let j = 0; j < cellsList.length; j += 1) {
      sheet.getRow(selectedRow).getCell(j + 1).style = cellsList[j].excelSheetStyle || style;
    }
    selectedRow += 1;
  };
  //   const addBlanckRow = sheet => {
  //     // append empty row at end of data for sepration
  //     sheet.addRow([]);
  //     selectedRow += 1;
  //   };
  const appendDataInExcelSheet = (sheet, data, key, style) => {
    // reorganising bodyData for excel sheet
    for (let i = 0; i < data.length; i += 1) {
      const column = data[i];
      // organising data in excel
      if (column.length > 0) {
        addNewRowInExcelSheet(sheet, column, key, style);
      }
    }
    // addBlanckRow(sheet, selectedRow);
  };
  //   make excel sheet
  const createExcelSheet = async (header, body, footer) => {
    const { workbook, sheet } = makeWorkSheet();

    // COMPANY INFO
    const headerData = [COMPANY_NAME, reportTitle, timeInterval];
    for (let i = 0; i < headerData.length; i += 1) {
      addDataInSheetAndMergeCells(header.length, sheet, headerData[i], tableCellCompanyName);
    }
    addDataInSheetAndMergeCells(header.length, sheet, '', {});

    // REPORT HEADING
    addNewRowInExcelSheet(sheet, header, 'title', tableCellHeader);

    // REPORT BODY
    if (body.length === 0) {
      addDataInSheetAndMergeCells(header.length, sheet, 'No Data Available', tableCellBodyNoData);
    } else {
      appendDataInExcelSheet(sheet, body, 'value', tableCellBody);
      addDataInSheetAndMergeCells(header.length, sheet, '', {});

      // REPORT FOOTER
      appendDataInExcelSheet(sheet, footer, 'value', tableCellFooter);
    }

    // get each column and assigning specific
    for (let i = 0; i < sheet.columnCount; i += 1) {
      let width = MAX_COLUMN_WIDTH[MAX_COLUMN_WIDTH.length - 1];
      if (i < MAX_COLUMN_WIDTH.length) width = MAX_COLUMN_WIDTH[i];
      sheet.getColumn(i + 1).width = width;
    }

    buffer = await workbook.xlsx.writeBuffer();
    setIsLoading(false);
  };
  //   download file
  const handleDownload = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const blob = new Blob([buffer], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.setAttribute('href', url);
    link.click();
  };
  useEffect(() => {
    createExcelSheet(excelHeading, excelBody, excelFooter);
  }, [reportTitle, startDate, endDate, timeInterval, excelHeading, excelBody, excelFooter]);
  return {
    isLoading,
    handleDownload,
  };
}

export default useExcelSheet;
