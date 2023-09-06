import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';

// utilities
import formatAmount from 'utilities/formatAmount';
import moment from 'moment';
import { Link } from 'react-router-dom';

const largeFont = { fontSize: 28 };
const topSpacing = { marginTop: 5 };
const textColor = { color: '#999999' };
function ExpenseDetailInfo({ expense }) {
  return (
    <Grid container px={3}>
      <Grid item xs={12}>
        <Typography sx={{ ...textColor }}>Expense Amount</Typography>
        <Stack direction="row" spacing={3} alignItems="end">
          <Typography sx={{ ...largeFont }}>
            {expense.currency_symbol} {formatAmount(expense.total)}
          </Typography>
          <Typography>on {moment(expense?.expense_date).format('DD MMM YYYY')}</Typography>
        </Stack>
        <Typography>{expense?.status?.toUpperCase()}</Typography>
        <Stack
          sx={{
            ...topSpacing,
            ...textColor,
            display: 'inline-flex',
            padding: '8px 40px',
            backgroundColor: '#FBFAFA',
          }}
        >
          <Typography>{expense.expense_account && expense?.expense_account?.account_name}</Typography>
        </Stack>
        <Stack sx={{ ...topSpacing }}>
          <Typography sx={{ ...textColor }}>Paid Through</Typography>
          <Typography>
            {expense.paid_through_account && expense?.paid_through_account?.account_name}
          </Typography>
        </Stack>
        {expense.reference_num && (
          <Stack sx={{ ...topSpacing }}>
            <Typography>Ref #</Typography>
            <Typography> {expense?.reference_num}</Typography>
          </Stack>
        )}
        {expense.tax_rate && (
          <Stack sx={{ ...topSpacing }}>
            <Typography>Tax</Typography>
            <Typography>{expense?.tax_rate}</Typography>
          </Stack>
        )}
        {expense.tax_rate && (
          <Stack sx={{ ...topSpacing }}>
            <Typography>Tax Amount</Typography>
            <Typography>
              {expense.currency_symbol}
              {formatAmount(expense.vat_total)}
            </Typography>
          </Stack>
        )}
        {expense.supplier && (
          <Stack sx={{ ...topSpacing }}>
            <Typography>Paid To</Typography>
            <Typography>
              <Link to={`/pages/accounting/purchases/suppliers/${expense.supplier.id}/detail`}>
                {expense.supplier.supplier_name}
              </Link>
            </Typography>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}
ExpenseDetailInfo.propTypes = {
  expense: PropTypes.object,
};
ExpenseDetailInfo.defaultProps = {
  expense: {},
};

export default ExpenseDetailInfo;
