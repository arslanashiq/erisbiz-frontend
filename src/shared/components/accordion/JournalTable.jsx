import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
// utilities and styles
import { addButtonIconStyle } from 'styles/common/common-styles';
import formatAmount from 'utilities/formatAmount';
import { handleGetSortedData } from 'utilities/get-sorted-journals';

function JournalTable({ journalItems, defaultValue, isPurchaseJournal }) {
  const sortedJournalsArrayForPurchase = ['Accounts Payable', 'Input VAT', 'otherAccounts'];
  const sortedJournalsArrayForSale = [
    'Accounts Receivable',
    'Sales',
    'Output VAT',
    'otherAccounts',
    'Cost of Sales',
  ];
  const [updatedJournalItems, setUpdatedJournalItems] = useState([]);
  const total = useMemo(
    () => journalItems.reduce(
      (acc, val) => {
        acc.debit += val.debit;
        acc.credit += val.credit;
        return acc;
      },
      { debit: 0, credit: 0 }
    ),
    [journalItems]
  );

  useEffect(() => {
    const journalObject = {};
    journalItems.forEach(item => {
      try {
        if (journalObject[item.account_name]) {
          journalObject[item.account_name].credit += item.credit;
          journalObject[item.account_name].debit += item.debit;
        } else if (item.credit > 0 || item.debit > 0) {
          journalObject[item.account_name] = { ...item };
        }
      } catch (error) {
        journalObject[item.account_name] = { ...item };
      }
    });
    let sortedList = sortedJournalsArrayForSale;
    if (isPurchaseJournal) {
      sortedList = sortedJournalsArrayForPurchase;
    }
    const sortedJournals = handleGetSortedData(journalObject, sortedList);
    setUpdatedJournalItems([...sortedJournals]);
  }, [journalItems]);

  // if (total.debit < total.credit) {
  //   total.debit += total.credit - total.debit;
  // } else if (total.credit < total.debit) {
  //   total.credit += total.debit - total.credit;
  // }

  return (
    <Accordion defaultExpanded={defaultValue} sx={{ boxShadow: '0px 0px 3px silver' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>Display Journal</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className=" w-100" style={addButtonIconStyle}>
          <table className=" border-top-bottom w-100" id="lineitems-section">
            <thead className="line-item-header">
              <tr className="border-top-bottom" style={{ backgroundColor: '#F9F9F9' }}>
                <th
                  className="line-item-column no-border over-flow"
                  style={{ fontSize: 15, padding: '10px 5px', width: '40%' }}
                >
                  Account
                </th>
                <th
                  className="line-item-column no-border over-flow text-right"
                  style={{ fontSize: 15, padding: '10px 5px', width: '30%' }}
                >
                  Debit
                </th>
                <th
                  className="line-item-column no-border over-flow text-right"
                  style={{ fontSize: 15, padding: '10px 5px', width: '30%' }}
                >
                  Credit
                </th>
              </tr>
            </thead>
            <tbody className="line-item-body">
              {updatedJournalItems.map(item => (
                <tr key={item.id} className="line-item-column line-item-row no-border">
                  <td style={{ fontSize: 15, padding: '5px 5px' }}>{item?.account_name}</td>
                  <td style={{ fontSize: 15, padding: '5px 5px', textAlign: 'right' }}>
                    {formatAmount(item?.debit)}
                  </td>
                  <td style={{ fontSize: 15, padding: '5px 5px', textAlign: 'right' }}>
                    {formatAmount(item?.credit)}
                  </td>
                </tr>
              ))}
              <tr className="line-item-column line-item-row border-top-bottom">
                <td className=""> </td>
                <td style={{ fontSize: 15, padding: '5px 5px', textAlign: 'right' }}>
                  <b>{formatAmount(total.debit)}</b>
                </td>
                <td style={{ fontSize: 15, padding: '5px 5px', textAlign: 'right' }}>
                  <b>{formatAmount(total.credit)}</b>
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
  defaultValue: PropTypes.bool,
  isPurchaseJournal: PropTypes.bool,
};
JournalTable.defaultProps = {
  journalItems: [],
  defaultValue: false,
  isPurchaseJournal: false,
};

export default JournalTable;
