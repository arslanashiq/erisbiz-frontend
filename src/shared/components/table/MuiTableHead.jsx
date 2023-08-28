/* eslint-disable */
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
    customActionButton,
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
              size="small"
            />
          </TableCell>
        )}
        {headCells.map(headCell => (
          <TableCell
            component="td"
            key={headCell.id}
            align={headCell.align ? headCell.align : 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold', fontSize: '0.80rem' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
        {actionButtonKey && (
          <TableCell key="Action-Button" align="center" padding="normal" sx={{ fontWeight: 'bold' }}>
            Actions
          </TableCell>
        )}
        {customActionButton &&
          customActionButton.map(btn => (
            <TableCell key="Action-Button" align="center" padding="normal" sx={{ fontWeight: 'bold' }}>
              {btn.title}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

MuiTableHead.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  showCheckbox: PropTypes.bool,
  actionButtonKey: PropTypes.string,
  customActionButton: PropTypes.array,
};

MuiTableHead.defaultProps = {
  actionButtonKey: '',
  showCheckbox: false,
  customActionButton: null,
};
export default MuiTableHead;
