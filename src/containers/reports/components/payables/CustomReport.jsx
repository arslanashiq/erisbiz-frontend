import React from 'react';
import PropTypes from 'prop-types';
import 'styles/reports/custom-report.scss';

function CustomReport({ tableHeader, tableBody, tableFooter }) {
  return (
    <div className="invoice-receipt-main-container" style={{ minWidth: 660 }}>
      <div style={{ padding: 20 }}>
        <table className="table1 w-100">
          {/* head */}
          <thead>
            <tr>
              {tableHeader.map(cell => (
                <th style={{ textAlign: 'end', ...cell.style }}>{cell.title}</th>
              ))}
            </tr>
          </thead>
          {/* Detail */}
          <tbody>
            {tableBody &&
              tableBody &&
              tableBody.length > 0 &&
              tableBody.map(tableRow => (
                <tr>
                  {tableRow.map(cell => (
                    <td key={cell.value} style={{ textAlign: 'end', ...cell.style }}>
                      {cell.value}
                    </td>
                  ))}
                </tr>
              ))}
            {tableFooter &&
              tableFooter &&
              tableFooter.length > 0 &&
              tableFooter.map(tableRow => (
                <tr>
                  {tableRow.map(cell => (
                    <td key={cell.value} style={{ textAlign: 'end', ...cell.style }}>
                      {cell.value}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CustomReport.propTypes = {
  tableHeader: PropTypes.array,
  tableBody: PropTypes.array,
  tableFooter: PropTypes.array,
};
CustomReport.defaultProps = {
  tableHeader: [
    { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
    { title: 'BILL BALANCE' },
    { title: 'EXCESS PAYMENTS' },
    { title: 'BALANCE' },
  ],
  tableBody: [
    [{ value: '1', style: { textAlign: 'start' } }, { value: '2' }, { value: '3' }, { value: '4' }],
    [{ value: '1', style: { textAlign: 'start' } }, { value: '2' }, { value: '3' }, { value: '4' }],
    [{ value: '1', style: { textAlign: 'start' } }, { value: '2' }, { value: '3' }, { value: '4' }],
  ],
  tableFooter: [
    [
      { value: 'Total', style: { textAlign: 'start', fontWeight: 800 } },
      { value: '' },
      { value: '' },
      { value: 'AED 4', style: { fontWeight: 800 } },
    ],
  ],
};
export default CustomReport;
