/* eslint-disable no-unused-vars */
import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Checkbox, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';
import { useSelector } from 'react-redux';
import formatAmount from 'utilities/formatAmount';

// constants
const tableCellFontSize = 14;
const tableBodyDefaultStyle = {
  fontSize: tableCellFontSize,
  padding: '10px',
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  lineSpacing: '0.01071em',
};

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
  const location = useLocation();
  const companyDetail = useSelector(state => state?.user?.company);
  const {
    currency_detail: { currency_symbol: currencySymbol },
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
      value = `${currencySymbol}`;
    }
    value += cell.date ? moment(row[cell.id]).format(DATE_FORMAT) : row[cell.id];

    return value;
  };
  const handleLinkClick = (row, cell) => {
    if (cell.handleLink) {
      return cell.handleLink(row);
    }
    return `${location.pathname}/${row.uuid || row.id}/detail`;
  };
  const renderCellValue = (row, cell) => {
    // for custom actions based on values values
    if (cell.cellValueAction) {
      return <span>{cell.cellValueAction(row[cell.id], currencySymbol, row)}</span>;
    }
    if (cell.formatAmount) {
      return formatAmount(row[cell.id]);
    }
    // for null or undefined values
    if (row[cell.id] === null || row[cell.id] === undefined) {
      return '-';
    }
    // to show active status
    if (typeof row[cell.id] === 'boolean') {
      return row[cell.id] ? 'Active' : 'Inactive';
    }
    return cell.isLink ? (
      <Link className="text-decoration-none" to={handleLinkClick(row, cell)}>
        {getValue(row, cell)}
      </Link>
    ) : (
      getValue(row, cell)
    );
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const renderTooltip = (row, newRow, cell) => (
    <Tooltip title={row[cell.id]} arrow placement="top">
      {renderCellValue(newRow, cell)}
    </Tooltip>
  );
  const renderCell = (row, cell) => {
    if (cell.sliceLength) {
      if (cell.cellValueAction || cell.sliceValueAction) {
        if (cell.cellValueAction && cell.sliceValueAction) {
          const { newValueForRender, newValueForTooltip } = cell.sliceValueAction(
            row[cell.id],
            cell,
            row,
            cell.sliceLength
          );

          const newRowForRender = { ...row, [cell.id]: newValueForRender };
          const newRowForTooltip = { ...row, [cell.id]: newValueForTooltip };

          return renderTooltip(newRowForTooltip, newRowForRender, cell);
        }
        return renderCellValue(row, cell);
      }
      if (row?.[cell.id] && row?.[cell.id]?.length > cell.sliceLength) {
        const newRowForRender = { ...row, [cell.id]: `${row[cell.id]?.slice(0, cell.sliceLength)}..` };
        return renderTooltip(row, newRowForRender, cell);
      }
    }
    return renderCellValue(row, cell);
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
            }}
            colSpan={
              actionButtonKey
                ? (headCells?.length || 0) + (customRows?.length || 0) + 2
                : (headCells?.length || 0) + (customRows?.length || 0) + 1
            }
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
                  {renderCell(row, cell)}
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
                    {btn.handleHide ? (
                      btn.handleHide(row) && (
                        <Box onClick={() => btn.handleClick(row.id || row)}>{btn.element}</Box>
                      )
                    ) : (
                      <Box onClick={() => btn.handleClick(row.id || row, row)}>{btn.element}</Box>
                    )}
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
                  style={tableBodyDefaultStyle}
                >
                  <Button
                    size="small"
                    className="text-capitalize"
                    sx={{ fontSize: 11, width: 70 }}
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
