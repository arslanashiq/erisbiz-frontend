/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
// utilities and styles
import { addButtonIconStyle } from 'styles/common/common-styles';
import formatAmount from 'utilities/formatAmount';

function JournalTable({ journalItems, defaultValue, isPurchaseJournal }) {
  const sortedJournalsArrayForPurchase = ['Accounts Payable', 'Cost of Sales', 'Input VAT', 'Discount'];
  const sortedJournalsArrayForSale = ['Accounts Receivable', 'Sales', 'Output VAT', 'Discount'];
  const [updatedJournalItems, setUpdatedJournalItems] = useState([]);
  const total = useMemo(
    () =>
      journalItems.reduce(
        (acc, val) => {
          acc.bcy_debit += val.bcy_debit;
          acc.bcy_credit += val.bcy_credit;
          return acc;
        },
        { bcy_debit: 0, bcy_credit: 0 }
      ),
    [journalItems]
  );

  const handleGetSortedData = (journalObject, sortedList) => {
    const sortedJournals = [];
    const newAccounts = [];
    Object.keys(journalObject).forEach(key => {
      if (sortedList.includes(key)) {
        const index = sortedList.indexOf(key);
        sortedJournals.splice(index, 0, journalObject[key]);
      } else {
        newAccounts.push(journalObject[key]);
      }
    });
    if (newAccounts.length > 0) {
      sortedJournals.splice(1, 0, ...newAccounts);
    }
    return sortedJournals;
  };
  useEffect(() => {
    const journalObject = {};
    journalItems.forEach(item => {
      try {
        if (journalObject[item.account_name]) {
          journalObject[item.account_name].bcy_credit += item.bcy_credit;
          journalObject[item.account_name].bcy_debit += item.bcy_debit;
        } else {
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

  // if (total.bcy_debit < total.bcy_credit) {
  //   total.bcy_debit += total.bcy_credit - total.bcy_debit;
  // } else if (total.bcy_credit < total.bcy_debit) {
  //   total.bcy_credit += total.bcy_debit - total.bcy_credit;
  // }

  return (
    <Accordion defaultExpanded={defaultValue} sx={{ boxShadow: '1px 0px 3px black' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Display Journal</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="mt-4 w-100" style={addButtonIconStyle}>
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
              {updatedJournalItems.map(item => (
                <tr key={item.id} className="line-item-column line-item-row no-border">
                  <td className="line-item-table-data">{item?.account_name}</td>
                  <td className="line-item-table-data text-right">{formatAmount(item?.bcy_debit)}</td>
                  <td className="line-item-table-data text-right">{formatAmount(item?.bcy_credit)}</td>
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
  defaultValue: PropTypes.bool,
  isPurchaseJournal: PropTypes.bool,
};
JournalTable.defaultProps = {
  journalItems: [],
  defaultValue: false,
  isPurchaseJournal: false,
};

export default JournalTable;
