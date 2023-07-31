/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Checkbox, TableBody, TableCell, TableRow } from '@mui/material';

function MuiTableBody({
  dataList,
  headCells,
  selected,
  showCheckbox,
  handleClick,
  actionButtonKey,
  handleTableBodyButtonAction,
}) {
  const isSelected = id => selected.indexOf(id) !== -1;
  return (
    <TableBody>
      {dataList.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            role="checkbox"
            // onClick={event => {
            //   if (showCheckbox) handleClick(event, row.id);
            // }}
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
          >
            {showCheckbox && (
              <TableCell padding="checkbox">
                <Checkbox
                  onClick={event => {
                    if (showCheckbox) handleClick(event, row.id);
                  }}
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </TableCell>
            )}

            {headCells.map(cell => (
              <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="normal"
                align={cell.align ? cell.align : 'left'}
              >
                {row[cell.id] === true || row[cell.id] === false ? (
                  row[cell.id] === true ? (
                    'Activated'
                  ) : (
                    'Deactivated'
                  )
                ) : cell.isLink ? (
                  <Link className="text-decoration-none" to={`${window.location.pathname}/${row.id}/detail`}>
                    {row[cell.id]}
                  </Link>
                ) : (
                  `${row[cell.id]}`
                )}
              </TableCell>
            ))}
            {actionButtonKey && (
              <TableCell component="th" id={labelId} scope="row" padding="normal" align="center">
                <Button
                  size="small"
                  className="text-capitalize"
                  sx={{ fontSize: 10, width: 70 }}
                  onClick={() => handleTableBodyButtonAction(row.id)}
                >
                  {row[actionButtonKey] ? 'Deactivate' : 'Activate'}
                </Button>
              </TableCell>
            )}
          </TableRow>
        );
      })}
      {/* {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )} */}
    </TableBody>
  );
}
MuiTableBody.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
  showCheckbox: PropTypes.bool,
  selected: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleTableBodyButtonAction: PropTypes.func,
  actionButtonKey: PropTypes.string,
};
MuiTableBody.defaultProps = {
  showCheckbox: false,
  actionButtonKey: '',
  handleTableBodyButtonAction: () => {},
};
export default MuiTableBody;
