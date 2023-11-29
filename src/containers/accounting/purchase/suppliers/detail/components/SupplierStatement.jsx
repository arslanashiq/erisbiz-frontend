import React from 'react';
import PropTypes from 'prop-types';
// styles
import 'styles/template-style/template-styles.scss';
import {
  supplierStatementHeaderRowStyles,
  supplierStatementHeaderCellStyles,
  supplierStatementBodyRowStyles,
  supplierStatementBodyCellStyles,
  supplierStatementTable,
} from 'styles/mui/container/accounting/purchase/supplier/detail/components/supplier-statement';
import { Box } from '@mui/material';
import {
  COMPANY_ADDRESS,
  COMPANY_COUNTRY,
  COMPANY_EMAIL,
  COMPANY_OFFICE_ADDRESS,
  COMPANY_PHONE,
} from 'utilities/constants';
import { useSelector } from 'react-redux';

function SupplierStatement({ basicInfo, transactions }) {
  const { name: companyName, logo: companyLogo } = useSelector(state => state.user.company);

  return (
    <Box className="statement-template">
      <Box className="d-flex justify-content-between">
        <Box className="w-50">
          <img src={companyLogo} alt="" className="statement-logo" />
        </Box>
        <Box className="text-right">
          <h5 className="font-weight-bold">{companyName}</h5>
          <p className="m-0">{COMPANY_OFFICE_ADDRESS}</p>
          <p className="m-0">{COMPANY_ADDRESS}</p>
          <p className="m-0">{COMPANY_COUNTRY}</p>
          <p className="m-0">{COMPANY_PHONE}</p>
          <p className="m-0">{COMPANY_EMAIL}</p>
          <Box className="my-2 ml-auto">
            <h3>Statement of Accounts</h3>
            <p className="border-top border-bottom">{`${basicInfo.startDate} To ${basicInfo.endDate}`}</p>
          </Box>
        </Box>
      </Box>
      <Box className="d-flex justify-content-between">
        <Box className="d-flex align-items-center">
          <Box className="w-100">
            <p className="font-weight-bold m-0 p-0">To</p>
            <a
              href={`/pages/accounting/purchase/suppliers/${basicInfo.supplierId}/detail`}
              className="font-weight-bold m-0 p-0"
            >
              {basicInfo.supplierName}
            </a>
            <p className="m-0 p-0">{basicInfo.supplierAddress}</p>
            <p className="m-0 p-0">{basicInfo.supplierCity}</p>
            <p className="m-0 p-0">{basicInfo.supplierState}</p>
            <p className="m-0 p-0">{basicInfo.supplierCountry}</p>
            {basicInfo.trn && <p className="m-0 p-0 text-nowrap">TRN: {basicInfo.trn}</p>}
          </Box>
        </Box>
        <Box className="w-50">
          <Box className="bg-grey py-2 px-2">
            <strong>Account Summary</strong>
          </Box>
          {basicInfo.filterType !== 'outstanding' && (
            <Box className="row py-2 ps-2">
              <Box className="col-sm-6">
                <p>Opening Balance</p>
              </Box>
              <Box className="col-sm-6 text-right">
                <p>
                  {basicInfo.currency_symbol}
                  {basicInfo.openingBalance}
                </p>
              </Box>
            </Box>
          )}
          <Box className="row py-2 ps-2">
            <Box className="col-sm-6">
              <p>Billed Amount</p>
            </Box>
            <Box className="col-sm-6 text-right">
              <p>
                {basicInfo.currency_symbol}
                {basicInfo.totalBilledAmount}
              </p>
            </Box>
          </Box>
          <Box className="row py-2 ps-2">
            <Box className="col-sm-6">
              <p>Amount Paid</p>
            </Box>
            <Box className="col-sm-6 text-right">
              <p>
                {basicInfo.currency_symbol}
                {basicInfo.totalPaymentAmount}
              </p>
            </Box>
          </Box>
          <Box className="row border-top py-2 ps-2">
            <Box className="col-sm-6">
              <p>Balance Due</p>
            </Box>
            <Box className="col-sm-6 text-right">
              <p>
                {basicInfo.currency_symbol}
                {basicInfo.totalBalanceDue}
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <table
          style={supplierStatementTable}
          className="pcs-itemtable"
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
          <tbody className="itemBody">
            {transactions &&
              transactions.map(item => (
                <tr key={item.id}>
                  <td valign="top" style={supplierStatementBodyRowStyles} className="pcs-item-row">
                    <span style={supplierStatementBodyCellStyles} id="tmp_item_tax_rate_summary">
                      {item.date}
                    </span>
                    <br />
                  </td>
                  <td valign="top" style={supplierStatementHeaderCellStyles} className="pcs-item-row">
                    <span id="tmp_item_taxable_amount_summary">{item.transactions}</span>
                  </td>
                  <td valign="top" style={supplierStatementHeaderCellStyles} className="pcs-item-row">
                    <span id="tmp_item_tax_amount_summary">{item.details}</span>
                  </td>
                  <td
                    valign="top"
                    style={{ ...supplierStatementHeaderCellStyles, textAlign: 'right' }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_tax_amount_summary">{item.amount}</span>
                  </td>
                  <td
                    valign="top"
                    style={{ ...supplierStatementHeaderCellStyles, textAlign: 'right' }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_tax_amount_summary">{item.payment}</span>
                  </td>
                  <td
                    valign="top"
                    style={{ ...supplierStatementHeaderCellStyles, textAlign: 'right' }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_tax_amount_summary">{item.balance}</span>
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan="4"> </td>
              <td valign="top" style={supplierStatementHeaderCellStyles}>
                <b>Balance Due</b>
              </td>
              <td valign="top" style={{ ...supplierStatementHeaderCellStyles, textAlign: 'right' }}>
                <b>
                  {basicInfo.currency_symbol}
                  {basicInfo.totalBalanceDue}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

SupplierStatement.propTypes = {
  transactions: PropTypes.array,
  basicInfo: PropTypes.object,
};
SupplierStatement.defaultProps = {
  transactions: [],
  basicInfo: {},
};
export default SupplierStatement;
