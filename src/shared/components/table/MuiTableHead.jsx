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
    headerStyles,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  const tableHeadDefaultStyle = {
    fontWeight: 'bold',
    fontSize: '15px',
    padding: '8px 16px',
    backgroundColor: '#c7c7c7',
  };
  const borderRadius = 10;
  return (
    <TableHead sx={{ ...headerStyles }}>
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox" sx={{ ...tableHeadDefaultStyle, borderTopLeftRadius: borderRadius }}>
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
            sx={{
              ...tableHeadDefaultStyle,
              borderTopLeftRadius: !showCheckbox && headCells[0].id === headCell.id ? borderRadius : 0,
              borderTopRightRadius:
                !actionButtonKey && headCells[headCells.length - 1].id === headCell.id ? borderRadius : 0,
              ...headCell.headingStyle,
            }}
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
          <TableCell
            key="Action-Button"
            align="center"
            padding="normal"
            sx={{
              ...tableHeadDefaultStyle,
              borderTopRightRadius: borderRadius,
            }}
          >
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
  headerStyles: PropTypes.object,
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
  headerStyles: {},
};
export default MuiTableHead;
