import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import PrintIcon from '@mui/icons-material/Print';
// styles components
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import PdfPrintModal from 'shared/components/pdf/modal/PdfPrintModal';
import OrderHeader from 'shared/components/order-document/OrderHeader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import { userStatementCustomFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { getSelectedFilter } from 'containers/reports/utilities/get-selected-filter';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { userStatementCustomFilterInputList } from 'containers/reports/utilities/filter-input-list';

// styles
import { iconButtonStyle } from 'utilities/mui-styles';
import 'styles/template-style/template-styles.scss';
import 'styles/purchase-order-template/purchase-order-template.scss';
import {
  supplierStatementHeaderRowStyles,
  supplierStatementHeaderCellStyles,
  supplierStatementBodyRowStyles,
  supplierStatementBodyCellStyles,
  supplierStatementTable,
} from 'styles/mui/container/accounting/purchase/supplier/detail/components/supplier-statement';
import AccountSummary from './AccountSummary';

function SupplierStatement({ basicInfo, transactions, personLink, CustomerAccountSummary }) {
  const { email, company: companyData } = useSelector(state => state.user);
  const {
    name: companyName,
    logo: companyLogo,
    currency_detail: { currency_symbol: currencySymbol },
    trn: companyTRN,
  } = companyData;

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(getSelectedFilter(FilterReportsList));

  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters(
    userStatementCustomFilterInputList
  );

  const handleFilter = (selecteAction, handleCloseMenu) => {
    if (selecteAction.value !== '') {
      handleCloseMenu();
    }
    setSelectedFilter(selecteAction);
    handleChangeFilter(selecteAction);
  };
  // console.log(transactions, 'transactions');
  const accountSummaryList = useMemo(
    () => [
      {
        label: 'Opening Balance',
        value: basicInfo?.openingBalance || 0,
      },
      {
        label: CustomerAccountSummary ? 'Invoiced Amount' : 'Billed Amount',
        value: basicInfo?.totalBilledAmount || 0,
      },
      {
        label: CustomerAccountSummary ? 'Amount Received' : 'Amount Paid',
        value: basicInfo?.totalPaymentAmount || 0,
      },
    ],
    [basicInfo, CustomerAccountSummary]
  );

  return (
    <>
      <PdfPrintModal
        isPrintModalOpen={isPrintModalOpen}
        setIsPrintModalOpen={setIsPrintModalOpen}
        orderInfo={{}}
        orderDetail={{}}
        pdfOptions={{
          showStatement: true,
          showItemsTable: false,
          showVoucherTable: false,
          showJournalVoucher: false,
        }}
        statementInfo={{ ...basicInfo, accountSummaryList }}
        statementTransactions={transactions}
      />
      <Stack direction="row" justifyContent="space-between">
        <ActionMenu
          variant="outlined"
          buttonTitle={selectedFilter.label}
          actionsList={FilterReportsList}
          handleAction={handleFilter}
          cutomInitialValues={userStatementCustomFilterInitialValues}
          customFilterInputs={userStatementCustomFilterInputList}
          handleSubmitCustomFilter={handleSubmitCustomDateFilter}
        />
        <Tooltip title="Print" placement="top" arrow>
          <Button onClick={() => setIsPrintModalOpen(true)}>
            <PrintIcon sx={iconButtonStyle} />
          </Button>
        </Tooltip>
      </Stack>
      <Box className="statement-template do-print">
        <OrderHeader
          companyLogo={companyLogo}
          companyName={companyName}
          companyTRN={companyTRN}
          email={email}
          company={companyData}
        />

        <AccountSummary
          personLink={personLink}
          currencySymbol={currencySymbol}
          basicInfo={basicInfo}
          accountSummaryList={accountSummaryList}
        />

        <Box>
          <table
            style={supplierStatementTable}
            className="table1 w-100 pcs-itemtable"
            border="0"
            cellSpacing="0"
            cellPadding="0"
          >
            <thead>
              <tr style={supplierStatementHeaderRowStyles}>
                <td style={supplierStatementHeaderCellStyles} className="pcs-taxtable-header">
                  Date
                </td>
                <td style={supplierStatementHeaderCellStyles} className="pcs-taxtable-header">
                  Transactions
                </td>
                <td style={supplierStatementHeaderCellStyles} className="pcs-taxtable-header">
                  Details
                </td>
                <td align="right" style={supplierStatementHeaderCellStyles} className="pcs-taxtable-header">
                  Amount
                </td>
                <td align="right" style={supplierStatementHeaderCellStyles} className="pcs-taxtable-header">
                  Payments
                </td>
                <td align="right" style={supplierStatementHeaderCellStyles} className="pcs-taxtable-header">
                  Balance
                </td>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map(item => (
                  <tr key={uuid()}>
                    <td valign="top" style={supplierStatementBodyRowStyles} className="pcs-item-row">
                      <span style={supplierStatementBodyCellStyles} id="tmp_item_tax_rate_summary">
                        {item.date}
                      </span>
                      <br />
                    </td>
                    <td valign="top" style={supplierStatementBodyRowStyles} className="pcs-item-row">
                      <span id="tmp_item_taxable_amount_summary">{item.transactions}</span>
                    </td>
                    <td valign="top" style={supplierStatementBodyRowStyles} className="pcs-item-row">
                      <span id="tmp_item_tax_amount_summary">{item.details}</span>
                    </td>
                    <td
                      valign="top"
                      style={{ ...supplierStatementBodyRowStyles, textAlign: 'right' }}
                      className="pcs-item-row"
                    >
                      <span id="tmp_item_tax_amount_summary">{item.amount}</span>
                    </td>
                    <td
                      valign="top"
                      style={{ ...supplierStatementBodyRowStyles, textAlign: 'right' }}
                      className="pcs-item-row"
                    >
                      <span id="tmp_item_tax_amount_summary">{item.payment}</span>
                    </td>
                    <td
                      valign="top"
                      style={{ ...supplierStatementBodyRowStyles, textAlign: 'right' }}
                      className="pcs-item-row"
                    >
                      <span id="tmp_item_tax_amount_summary">{item.balance}</span>
                    </td>
                  </tr>
                ))}
              {transactions?.length === 0 && (
                <tr key={uuid()}>
                  <td
                    colSpan={6}
                    valign="top"
                    style={{ ...supplierStatementBodyRowStyles, textAlign: 'center' }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_tax_amount_summary">No Transactions Avaliable</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="row justify-content-end w-100">
            <div
              className="row justify-content-between"
              style={{
                maxWidth: 300,
              }}
            >
              <div className="col d-flex justify-content-between">
                <b>Balance Due</b>

                <b>
                  {currencySymbol}
                  {basicInfo?.totalBalanceDue?.includes('-')
                    ? `(${basicInfo.totalBalanceDue})`
                    : `${basicInfo.totalBalanceDue || 0}`}
                </b>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

SupplierStatement.propTypes = {
  transactions: PropTypes.array,
  basicInfo: PropTypes.object,
  personLink: PropTypes.string,
  CustomerAccountSummary: PropTypes.func,
};
SupplierStatement.defaultProps = {
  transactions: [],
  basicInfo: {},
  CustomerAccountSummary: null,
  personLink: '',
};
export default SupplierStatement;
