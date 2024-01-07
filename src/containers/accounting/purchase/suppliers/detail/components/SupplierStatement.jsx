/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// styles components
import palette from 'styles/mui/theme/palette';
import ActionMenu from 'shared/components/action-menu/ActionMenu';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { getSelectedFilter } from 'containers/reports/utilities/get-selected-filter';
import OrderHeader, { renderCompanyHeaderRow } from 'shared/components/order-document/OrderHeader';
import {
  supplierStatementHeaderRowStyles,
  supplierStatementHeaderCellStyles,
  supplierStatementBodyRowStyles,
  supplierStatementBodyCellStyles,
  supplierStatementTable,
} from 'styles/mui/container/accounting/purchase/supplier/detail/components/supplier-statement';
import 'styles/template-style/template-styles.scss';
import 'styles/purchase-order-template/purchase-order-template.scss';
import AccountSummary from './AccountSummary';

function SupplierStatement({ basicInfo, transactions, personLink }) {
  const { email, company: companyData } = useSelector(state => state.user);
  const {
    name: companyName,
    logo: companyLogo,
    currency_detail: { currency_symbol: currencySymbol },
    trn: companyTRN,
  } = companyData;
  const [selectedFilter, setSelectedFilter] = useState(getSelectedFilter(FilterReportsList));

  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  const handleFilter = (selecteAction, handleCloseMenu) => {
    if (selecteAction.value !== '') {
      handleCloseMenu();
    }
    setSelectedFilter(selecteAction);
    handleChangeFilter(selecteAction);
  };
  // console.log(transactions, 'transactions');
  return (
    <>
      <Stack direction="row">
        <ActionMenu
          variant="outlined"
          buttonTitle={selectedFilter.label}
          actionsList={FilterReportsList}
          handleAction={handleFilter}
          cutomInitialValues={PayableReportFilterInitialValues}
          customFilterInputs={payableReportsFilterInputList}
          handleSubmitCustomFilter={handleSubmitCustomDateFilter}
        />
      </Stack>
      <Box className="statement-template do-print">
        <OrderHeader
          companyLogo={companyLogo}
          companyName={companyName}
          companyTRN={companyTRN}
          email={email}
          company={companyData}
        />
        <AccountSummary personLink={personLink} currencySymbol={currencySymbol} basicInfo={basicInfo} />
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
              <tr>
                <td colSpan="4"> </td>
                <td valign="top" style={supplierStatementHeaderCellStyles}>
                  <b>Balance Due</b>
                </td>
                <td valign="top" style={{ ...supplierStatementHeaderCellStyles, textAlign: 'right' }}>
                  <b>
                    {currencySymbol}
                    {basicInfo?.totalBalanceDue?.includes('-')
                      ? ` (${basicInfo.totalBalanceDue})`
                      : ` ${basicInfo.totalBalanceDue || 0}`}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </>
  );
}

SupplierStatement.propTypes = {
  transactions: PropTypes.array,
  basicInfo: PropTypes.object,
  personLink: PropTypes.string,
};
SupplierStatement.defaultProps = {
  transactions: [],
  basicInfo: {},
  personLink: '',
};
export default SupplierStatement;
