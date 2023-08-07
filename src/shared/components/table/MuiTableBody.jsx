/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';

function MuiTableBody({
  dataList,
  headCells,
  selected,
  showCheckbox,
  handleClick,
  actionButtonKey,
  handleTableBodyButtonAction,
}) {
  const handlegetCellStyle = (cell, value) => {
    if (cell && cell.style) {
      return cell.style(value);
    }
    return {};
  };
  const renderCellValue = (row, cell) => {
    if (cell.cellValueAction) {
      return cell.cellValueAction(row[cell.id]);
    }
    return row[cell.id] === true || row[cell.id] === false ? (
      row[cell.id] === true ? (
        'Activated'
      ) : (
        'Deactivated'
      )
    ) : cell.isLink ? (
      <Link className="text-decoration-none" to={`${window.location.pathname}/${row.id}/detail`}>
        {row[cell.id]}
      </Link>
    ) : cell.date ? (
      moment(`${row[cell.id] || '-'}`).format(DATE_FORMAT)
    ) : (
      `${row[cell.id] || '-'}`
    );
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  if (dataList.length === 0) {
    return (
      <TableRow>
        <TableCell
          style={{ padding: '30px 0px', textAlign: 'center', fontSize: 16, border: 0 }}
          colSpan={actionButtonKey ? headCells.length + 1 : headCells.length}
        >
          No Data Found
        </TableCell>
      </TableRow>
    );
  }
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
            {/* CheckBox */}
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

            {/* Table Body Cells */}
            {headCells.map(cell => (
              <TableCell
                key={cell.id}
                component="th"
                id={labelId}
                scope="row"
                padding="normal"
                align={cell.align || 'left'}
                className="text-capitalize"
                style={handlegetCellStyle(cell, row[cell.id])}
              >
                {renderCellValue(row, cell)}
              </TableCell>
            ))}

            {/* Action Button */}
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
  selected: PropTypes.array.isRequired,
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
