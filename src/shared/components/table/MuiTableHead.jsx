/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';

function MuiTableHead(props) {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    showCheckbox,
    actionButtonKey,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all table',
              }}
            />
          </TableCell>
        )}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? headCell.align : 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {actionButtonKey && (
          <TableCell key="Action-Button" align="center" padding="normal" sx={{ fontWeight: 'bold' }}>
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

MuiTableHead.propTypes = {
  headCells: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  showCheckbox: PropTypes.bool,
  actionButtonKey: PropTypes.string,
};

MuiTableHead.defaultProps = {
  actionButtonKey: '',
  showCheckbox: false,
};
export default MuiTableHead;
