import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import HttpsIcon from '@mui/icons-material/Https';
import { Box, Checkbox, Link, TableCell, TableRow, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';
import {
  chartOfAccountCellIconStyle,
  chartOfAccountRowStyle,
  chartOfAccountCellBoxStyle,
} from 'styles/mui/container/accounting/finance/chart-of-account/listing/components/render-chart-of-account';

function RenderChartOfAccount({ chartOfAccounts, selected, handleClick }) {
  const navigate = useNavigate();

  const isSelected = id => selected.indexOf(id) !== -1;
  const renderRow = useCallback(
    (account, padding, childIndex) => {
      let rows = [];
      const id = account.uuid || account.id || account.uid;

      const isItemSelected = isSelected(id);
      const labelId = `enhanced-table-checkbox-${id}`;

      rows.push(
        <TableRow
          key={uuid()}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          selected={isItemSelected}
          sx={chartOfAccountRowStyle}
        >
          <TableCell padding="checkbox">
            {account.child_accounts && (
              <FolderOpenIcon sx={{ ...chartOfAccountCellIconStyle, left: 25 + padding * 20 }} />
            )}
            {account.parent_account_name && (
              <Box
                sx={{
                  ...chartOfAccountCellBoxStyle,
                  width: account.child_accounts ? 10 : 30,
                  height: childIndex === 0 ? 30 : 40,
                  top: childIndex === 0 ? -13 : -20,
                  left: 15 + padding * 20,
                }}
              />
            )}

            {account.is_locked ? (
              <Tooltip title="You cannot edit or elete this item " placement="right" arrow>
                <HttpsIcon sx={{ color: 'grey' }} size="small" />
              </Tooltip>
            ) : (
              <Checkbox
                onClick={event => {
                  handleClick(event, id);
                }}
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
                size="small"
              />
            )}
          </TableCell>
          <TableCell
            sx={{ paddingLeft: `${padding * 20}px !important` }}
            onClick={() => navigate(`/pages/accounting/finance/chart-of-account/${account.id}/detail`)}
          >
            <Link
              className="text-decoration-none cursor-pointer"
              to={`/pages/accounting/finance/chart-of-account/${account.id}/detail`}
            >
              {account.account_name}
            </Link>
          </TableCell>
          <TableCell>{account.account_type}</TableCell>
          <TableCell>{account.parent_account_name || '-'}</TableCell>
        </TableRow>
      );

      if (account.child_accounts) {
        rows = [...rows, ...account.child_accounts.map((item, index) => renderRow(item, padding + 1, index))];
      }
      return rows;
    },
    [chartOfAccounts, selected]
  );
  if (chartOfAccounts?.length > 0) {
    return chartOfAccounts.map((item, index) => renderRow(item, 1, index));
  }
  return (
    <TableRow key={uuid()} sx={{ ...chartOfAccountRowStyle, padding: '10px 0px' }}>
      <TableCell colSpan={4}> No Data Found</TableCell>
    </TableRow>
  );
}
RenderChartOfAccount.propTypes = {
  chartOfAccounts: PropTypes.array,
  selected: PropTypes.array,
  handleClick: PropTypes.func,
};

RenderChartOfAccount.defaultProps = {
  chartOfAccounts: [],
  selected: [],
  handleClick: null,
};

export default RenderChartOfAccount;
