import React, { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Stack, TablePagination } from '@mui/material';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from 'utilities/constants';
import { getStableSort } from 'utilities/sort';
import CustomeReportTableHead from './CustomeReportTableHead';
import 'styles/reports/custom-report.scss';

function CustomReport({
  tableHeader,
  tableBody,
  tableFooter,
  parentWrapperClassName,
  usePagination,
  rowCount,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const order = 'asc';
  const orderBy = '';
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const handleGetPaginationData = () => {
    const filters = getsearchQueryOffsetAndLimitParams(location);
    return filters;
  };

  const handleChangePage = (event, newPage) => {
    const search = new URLSearchParams(location.search);
    search.set('offset', newPage * rowsPerPage);
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    const search = new URLSearchParams(location.search);
    search.set('offset', '0');
    search.set('limit', parseInt(event.target.value, 10));
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };

  const visibleRows = useMemo(() => {
    if (usePagination) {
      return getStableSort(tableBody, order, orderBy, page, rowsPerPage);
    }
    return tableBody;
  }, [tableBody, order, orderBy, page, rowsPerPage]);
  return (
    <div className={parentWrapperClassName} style={{ minWidth: 900 }}>
      <div style={{ padding: '0px 20px' }}>
        <table className="table1 w-100">
          <CustomeReportTableHead tableHeader={tableHeader} />
          {/* Detail */}
          <tbody>
            {visibleRows.length === 0 && (
              <tr>
                <td
                  colSpan={tableHeader.length}
                  style={{ textAlign: 'center', fontWeight: 500, fontSize: 20, padding: '20px 0px' }}
                >
                  No Data Available
                </td>
              </tr>
            )}
            {visibleRows.length > 0 &&
              visibleRows.map(tableRow => (
                <tr key={uuid()}>
                  {tableRow.map(cell => (
                    <td
                      key={uuid()}
                      style={{
                        textAlign: 'end',
                        textTransform: 'capitalize',
                        fontWeight: 400,
                        ...cell.style,
                      }}
                      colSpan={cell.colSpan || 1}
                    >
                      {cell.link ? <Link to={cell.link}>{cell.value}</Link> : cell.value}
                    </td>
                  ))}
                </tr>
              ))}

            {visibleRows.length > 0 &&
              tableFooter.length > 0 &&
              tableFooter.map(tableRow => (
                <tr key={uuid()}>
                  {tableRow.map(cell => (
                    <td key={uuid()} style={{ textAlign: 'end', ...cell.style }}>
                      {cell.link ? <Link to={cell.link}>{cell.value}</Link> : cell.value}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {usePagination && (
          <Stack direction="row" width="100%" justifyContent="end">
            <TablePagination
              rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              component="div"
              count={rowCount}
              rowsPerPage={handleGetPaginationData().limit || ROWS_PER_PAGE}
              page={handleGetPaginationData().offset / rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        )}
      </div>
    </div>
  );
}

CustomReport.propTypes = {
  tableHeader: PropTypes.array,
  tableBody: PropTypes.array,
  tableFooter: PropTypes.array,
  parentWrapperClassName: PropTypes.string,
  usePagination: PropTypes.bool,
  rowCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
CustomReport.defaultProps = {
  tableHeader: [],
  tableBody: [],
  tableFooter: [[]],
  parentWrapperClassName: 'custom-receipt-main-container',
  usePagination: false,
  rowCount: 100,
};
export default CustomReport;
