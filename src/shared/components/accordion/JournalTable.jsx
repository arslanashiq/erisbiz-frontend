import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import formatAmount from 'utilities/formatAmount';

function JournalTable({ journalItems }) {
  const total = journalItems.reduce(
    (acc, val) => {
      acc.bcy_debit += val.bcy_debit;
      acc.bcy_credit += val.bcy_credit;
      return acc;
    },
    { bcy_debit: 0, bcy_credit: 0 }
  );

  if (total.bcy_debit < total.bcy_credit) {
    total.bcy_debit += total.bcy_credit - total.bcy_debit;
  } else if (total.bcy_credit < total.bcy_debit) {
    total.bcy_credit += total.bcy_debit - total.bcy_credit;
  }

  return (
    <Accordion sx={{ boxShadow: '1px 0px 3px black' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Display Journal</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="mt-4 w-100" style={{ fontSize: 15 }}>
          <table className="line-item-table border-top-bottom w-100" id="lineitems-section">
            <thead className="line-item-header">
              <tr className="border-top-bottom">
                <th className="line-item-column no-border over-flow" style={{ width: '40%' }}>
                  Account
                </th>
                <th className="line-item-column no-border over-flow text-right" style={{ width: '30%' }}>
                  Debit
                </th>
                <th className="line-item-column no-border over-flow text-right" style={{ width: '30%' }}>
                  Credit
                </th>
              </tr>
            </thead>
            <tbody className="line-item-body">
              {journalItems.map(item => (
                <tr key={item.id} className="line-item-column line-item-row no-border">
                  <td className="line-item-table-data">{item.account_name}</td>
                  <td className="line-item-table-data text-right">{formatAmount(item.bcy_debit)}</td>
                  <td className="line-item-table-data text-right">{formatAmount(item.bcy_credit)}</td>
                </tr>
              ))}
              <tr className="line-item-column line-item-row border-top-bottom">
                <td className="line-item-table-data"> </td>
                <td className="line-item-table-data text-right">
                  <b>{formatAmount(total.bcy_debit)}</b>
                </td>
                <td className="line-item-table-data text-right">
                  <b>{formatAmount(total.bcy_credit)}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

JournalTable.propTypes = {
  journalItems: PropTypes.arrayOf(PropTypes.object),
};
JournalTable.defaultProps = {
  journalItems: [],
};

export default JournalTable;
