import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';

// utilities
import formatAmount from 'utilities/formatAmount';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DATE_FORMAT } from 'utilities/constants';

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
            {expense.currency} {formatAmount(expense.total)}
          </Typography>
          <Typography>on {moment(expense?.expense_date).format(DATE_FORMAT)}</Typography>
        </Stack>
        <Typography>{expense?.status?.toUpperCase()}</Typography>
        <Stack
          display="inline-flex"
          padding="8px 40px"
          backgroundColor="#FBFAFA"
          {...topSpacing}
          {...textColor}
        >
          <Typography>{expense.expense_account && expense?.expense_account?.account_name}</Typography>
        </Stack>
        <Stack {...topSpacing}>
          <Typography sx={textColor}>Paid Through</Typography>
          <Typography>
            {expense.paid_through_account && expense?.paid_through_account?.account_name}
          </Typography>
        </Stack>
        {expense.reference_num && (
          <Stack {...topSpacing}>
            <Typography sx={textColor}>Ref #</Typography>
            <Typography> {expense?.reference_num}</Typography>
          </Stack>
        )}
        {expense.tax_rate && (
          <Stack {...topSpacing}>
            <Typography sx={textColor}>Tax</Typography>
            <Typography>{expense?.tax_rate}</Typography>
          </Stack>
        )}
        {expense.tax_rate && (
          <Stack {...topSpacing}>
            <Typography sx={textColor}>Tax Amount</Typography>
            <Typography>
              {expense.currency}
              {formatAmount(expense.total - expense.total_without_tax)}
            </Typography>
          </Stack>
        )}
        {expense.supplier && (
          <Stack {...topSpacing}>
            <Typography sx={textColor}>Paid To</Typography>
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
