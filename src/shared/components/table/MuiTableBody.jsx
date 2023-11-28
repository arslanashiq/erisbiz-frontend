import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button, Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';
import { useSelector } from 'react-redux';

function MuiTableBody({
  dataList,
  headCells,
  selected,
  showCheckbox,
  handleClick,
  actionButtonKey,
  handleTableBodyButtonAction,
  customRows,
  customActionButton,
  hoverEffect,
}) {
  const companyDetail = useSelector(state => state?.user?.company);
  const {
    currency: { currency_symbol: currencySymbol },
  } = companyDetail;
  const handlegetCellStyle = (cell, value) => {
    if (cell && cell.style) {
      return cell.style(value);
    }
    return {};
  };
  const handlegetCellClass = (cell, value) => {
    if (cell && cell.class) {
      return cell.class(value);
    }
    return '';
  };

  const getValue = (row, cell) => {
    let value = '';
    if (cell.mergeCell) {
      value = `${currencySymbol} `;
    }
    value += cell.date ? moment(row[cell.id]).format(DATE_FORMAT) : row[cell.id];

    return value;
  };
  const handleLinkClick = (row, cell) => {
    if (cell.handleLink) {
      return cell.handleLink(row);
    }
    return `${window.location.pathname}/${row.uuid || row.id}/detail`;
  };
  const renderCellValue = (row, cell) => {
    // for null or undefined values
    if (row[cell.id] === null || row[cell.id] === undefined) {
      return '-';
    }
    // for custom actions based on values values
    if (cell.cellValueAction) {
      return cell.cellValueAction(row[cell.id]);
    }

    // to show active status
    if (typeof row[cell.id] === 'boolean') {
      return row[cell.id] ? 'Activated' : 'Inactive';
    }

    // simple value
    return cell.isLink ? (
      <Link className="text-decoration-none" to={handleLinkClick(row, cell)}>
        {getValue(row, cell)}
      </Link>
    ) : (
      getValue(row, cell)
    );
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const tableBodyDefaultStyle = {
    fontSize: '14px',
    padding: '8px 16px',
  };
  return (
    <TableBody>
      {dataList.length === 0 ? (
        <TableRow>
          <TableCell
            style={{
              ...tableBodyDefaultStyle,
              padding: '30px 0px',
              textAlign: 'center',
              fontSize: 16,
              border: 0,
            }}
            colSpan={actionButtonKey ? headCells.length + 1 : headCells.length}
          >
            No Data Found
          </TableCell>
        </TableRow>
      ) : (
        dataList.map(row => {
          const id = row.uuid || row.id || row.uid;
          const isItemSelected = isSelected(id);
          const labelId = `enhanced-table-checkbox-${id}`;
          return (
            <TableRow
              key={uuid()}
              hover={hoverEffect}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
              sx={{ cursor: 'pointer' }}
            >
              {/* CheckBox */}
              {showCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    sx={tableBodyDefaultStyle}
                    onClick={event => {
                      if (showCheckbox) handleClick(event, id);
                    }}
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                    size="small"
                  />
                </TableCell>
              )}

              {/* Table Body Cells */}
              {headCells.map(cell => (
                <TableCell
                  key={uuid()}
                  component="td"
                  id={labelId}
                  scope="row"
                  padding="normal"
                  align={cell.align || 'left'}
                  className={`text-capitalize ${handlegetCellClass(cell, row[cell.id])}`}
                  style={{
                    ...tableBodyDefaultStyle,
                    ...handlegetCellStyle(cell, row[cell.id]),
                  }}
                >
                  {renderCellValue(row, cell)}
                </TableCell>
              ))}

              {/* Action Button */}
              {customActionButton &&
                customActionButton.map(btn => (
                  <TableCell
                    key={uuid}
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="normal"
                    align="center"
                    style={tableBodyDefaultStyle}
                  >
                    <Box onClick={() => btn.handleClick(row.id || row)}>{btn.element}</Box>
                  </TableCell>
                ))}
              {/* Action Button */}
              {actionButtonKey && (
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="normal"
                  align="center"
                  style={{ fontSize: '0.80rem' }}
                >
                  <Button
                    size="small"
                    className="text-capitalize"
                    sx={{ fontSize: 10, width: 70 }}
                    onClick={() => handleTableBodyButtonAction(row.id, row)}
                  >
                    {row[actionButtonKey] ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          );
        })
      )}
      {customRows &&
        customRows.map(row => (
          <TableRow key={uuid()}>
            {row.column.map(col => (
              <TableCell
                key={uuid()}
                align={col?.align || 'left'}
                sx={{ fontSize: '0.80rem', ...col?.style }}
                colSpan={col?.colSpan}
              >
                {col?.data || ''}
              </TableCell>
            ))}
          </TableRow>
        ))}
    </TableBody>
  );
}
MuiTableBody.propTypes = {
  dataList: PropTypes.array,
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
  showCheckbox: PropTypes.bool,
  selected: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
  handleTableBodyButtonAction: PropTypes.func,
  actionButtonKey: PropTypes.string,
  customRows: PropTypes.array,
  customActionButton: PropTypes.array,
  hoverEffect: PropTypes.bool,
};
MuiTableBody.defaultProps = {
  dataList: [],
  showCheckbox: false,
  actionButtonKey: '',
  handleTableBodyButtonAction: () => {},
  customRows: null,
  customActionButton: null,
  hoverEffect: true,
  handleClick: () => {},
};
export default MuiTableBody;
