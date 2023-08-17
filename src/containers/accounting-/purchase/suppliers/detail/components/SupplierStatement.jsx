/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import 'styles/template-styles.scss';

const transactions = [
  {
    id: 1660078,
    date: '26 Jul 2023',
    transactions: 'Supplier Opening Balance',
    details: '-',
    amount: '10.00',
    payment: '',
    balance: '10.00',
  },
  {
    id: 1659990,
    date: '03 Aug 2023',
    transactions: 'Bill',
    details: 'Bill-1014',
    amount: '10.00',
    payment: '',
    balance: '20.00',
  },
  {
    id: 1660027,
    date: '09 Aug 2023',
    transactions: 'Supplier Payment',
    details: 'PM-2',
    amount: '',
    payment: '30.00',
    balance: '-10.00',
  },
  {
    id: 1660081,
    date: '10 Aug 2023',
    transactions: 'Supplier Payment',
    details: '-',
    amount: '',
    payment: '20.30',
    balance: '-30.30',
  },
  {
    id: 1660082,
    date: '15 Aug 2023',
    transactions: 'Supplier Payment',
    details: 'PM-6',
    amount: '',
    payment: '30.20',
    balance: '-60.50',
  },
];
const basicInfo = {
  supplierId: 1489,
  supplierName: 'Aleem',
  supplierAddress: '',
  supplierCity: '',
  supplierState: '',
  supplierCountry: 'Albania',
  trn: '',
  currency_symbol: 'CNH',
  openingBalance: '60.50',
  totalBilledAmount: '0.00',
  totalPaymentAmount: '60.50',
  totalBalanceDue: '-60.50',
  startDate: '16 Aug 2023',
  endDate: '16 Aug 2023',
  filterType: 'all',
};
function SupplierStatement() {
  return (
    <div className="statement-template">
      <div className="d-flex justify-content-between">
        <div className="w-50">
          <img src="/logo.png" alt="" className="statement-logo" />
        </div>
        <div className="text-right">
          <h5 className="font-weight-bold">Luxury Events and VIP Travel DMCC</h5>
          <p className="m-0">Office # 1206, JBC 4, Cluster N,</p>
          <p className="m-0">Jumeirah Lake Towers, Dubai,</p>
          <p className="m-0">United Arab Emirates</p>
          <p className="m-0">Phone: +971 4 379 9960</p>
          <p className="m-0">info@luxuryexplorersme.com</p>
          <div className="my-2 ml-auto">
            <h3>Statement of Accounts</h3>
            <p className="border-top border-bottom">{`${basicInfo.startDate} To ${basicInfo.endDate}`}</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="w-100">
            <p className="font-weight-bold m-0 p-0">To</p>
            <a
              href={`/pages/accounting/purchases/suppliers/${basicInfo.supplierId}/detail`}
              className="font-weight-bold m-0 p-0"
            >
              {basicInfo.supplierName}
            </a>
            <p className="m-0 p-0">{basicInfo.supplierAddress}</p>
            <p className="m-0 p-0">{basicInfo.supplierCity}</p>
            <p className="m-0 p-0">{basicInfo.supplierState}</p>
            <p className="m-0 p-0">{basicInfo.supplierCountry}</p>
            {basicInfo.trn && <p className="m-0 p-0 text-nowrap">TRN: {basicInfo.trn}</p>}
          </div>
        </div>
        <div className="w-50">
          <div className="bg-grey py-2 px-2">
            <strong>Account Summary</strong>
          </div>
          {basicInfo.filterType !== 'outstanding' && (
            <div className="row py-2 ps-2">
              <div className="col-sm-6">
                <p>Opening Balance</p>
              </div>
              <div className="col-sm-6 text-right">
                <p>
                  {basicInfo.currency_symbol}
                  {basicInfo.openingBalance}
                </p>
              </div>
            </div>
          )}
          <div className="row py-2 ps-2">
            <div className="col-sm-6">
              <p>Billed Amount</p>
            </div>
            <div className="col-sm-6 text-right">
              <p>
                {basicInfo.currency_symbol}
                {basicInfo.totalBilledAmount}
              </p>
            </div>
          </div>
          <div className="row py-2 ps-2">
            <div className="col-sm-6">
              <p>Amount Paid</p>
            </div>
            <div className="col-sm-6 text-right">
              <p>
                {basicInfo.currency_symbol}
                {basicInfo.totalPaymentAmount}
              </p>
            </div>
          </div>
          <div className="row border-top py-2 ps-2">
            <div className="col-sm-6">
              <p>Balance Due</p>
            </div>
            <div className="col-sm-6 text-right">
              <p>
                {basicInfo.currency_symbol}
                {basicInfo.totalBalanceDue}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table
          style={{ width: '100%', marginTop: 10, tableLayout: 'fixed' }}
          className="pcs-itemtable"
          border="0"
          cellSpacing="0"
          cellPadding="0"
        >
          <thead>
            <tr style={{ height: 32 }}>
              <td
                style={{
                  padding: '5px 10px 5px 10px',
                  wordWrap: 'break-word',
                }}
                className="pcs-taxtable-header"
              >
                Date
              </td>
              <td
                style={{
                  padding: '5px 10px 5px 5px',
                  wordWrap: 'break-word',
                }}
                className="pcs-taxtable-header"
              >
                Transactions
              </td>
              <td
                style={{
                  padding: '5px 10px 5px 5px',
                  wordWrap: 'break-word',
                }}
                className="pcs-taxtable-header"
              >
                Details
              </td>
              <td
                align="right"
                style={{
                  padding: '5px 10px 5px 5px',
                  wordWrap: 'break-word',
                }}
                className="pcs-taxtable-header"
              >
                Amount
              </td>
              <td
                align="right"
                style={{
                  padding: '5px 10px 5px 5px',
                  wordWrap: 'break-word',
                }}
                className="pcs-taxtable-header"
              >
                Payments
              </td>
              <td
                align="right"
                style={{
                  padding: '5px 10px 5px 5px',
                  wordWrap: 'break-word',
                }}
                className="pcs-taxtable-header"
              >
                Balance
              </td>
            </tr>
          </thead>
          <tbody className="itemBody">
            {transactions &&
              transactions.map(item => (
                <tr key={item.id}>
                  <td valign="top" style={{ padding: '10px 0px 10px 10px' }} className="pcs-item-row">
                    <span style={{ wordWrap: 'break-word' }} id="tmp_item_tax_rate_summary">
                      {item.date}
                    </span>
                    <br />
                  </td>
                  <td
                    valign="top"
                    style={{
                      padding: '10px 10px 5px 10px',
                      wordWrap: 'break-word',
                    }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_taxable_amount_summary">{item.transactions}</span>
                  </td>
                  <td
                    valign="top"
                    style={{
                      padding: '10px 10px 5px 10px',
                      wordWrap: 'break-word',
                    }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_tax_amount_summary">{item.details}</span>
                  </td>
                  <td
                    valign="top"
                    style={{
                      padding: '10px 10px 5px 10px',
                      textAlign: 'right',
                      wordWrap: 'break-word',
                    }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_tax_amount_summary">{item.amount}</span>
                  </td>
                  <td
                    valign="top"
                    style={{
                      padding: '10px 10px 5px 10px',
                      textAlign: 'right',
                      wordWrap: 'break-word',
                    }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_tax_amount_summary">{item.payment}</span>
                  </td>
                  <td
                    valign="top"
                    style={{
                      padding: '10px 10px 5px 10px',
                      textAlign: 'right',
                      wordWrap: 'break-word',
                    }}
                    className="pcs-item-row"
                  >
                    <span id="tmp_item_tax_amount_summary">{item.balance}</span>
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan="4" />
              <td
                valign="top"
                style={{
                  padding: '10px 10px 5px 10px',
                  wordWrap: 'break-word',
                }}
                // className="pcs-item-row"
              >
                <b>Balance Due</b>
              </td>
              <td
                valign="top"
                style={{
                  padding: '10px 10px 5px 10px',
                  textAlign: 'right',
                  wordWrap: 'break-word',
                }}
                // className="pcs-item-row"
              >
                <b>
                  {basicInfo.currency_symbol}
                  {basicInfo.totalBalanceDue}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierStatement;
