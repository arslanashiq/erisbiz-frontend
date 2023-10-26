import React from 'react';
import { v4 as uuid } from 'uuid';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
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
            key={uuid()}
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
              {headCell.label || headCell.title}
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
            <TableCell key={uuid()} align="center" padding="normal" sx={{ fontWeight: 'bold' }}>
              {btn.title}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

MuiTableHead.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  showCheckbox: PropTypes.bool,
  actionButtonKey: PropTypes.string,
  customActionButton: PropTypes.array,
};

MuiTableHead.defaultProps = {
  actionButtonKey: '',
  showCheckbox: false,
  customActionButton: null,
  onSelectAllClick: () => {},
  numSelected: 0,
  onRequestSort: () => {},
  order: 'asc',
  orderBy: '',
  rowCount: 0,
};
export default MuiTableHead;
