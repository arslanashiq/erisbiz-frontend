import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import 'styles/reports/custom-report.scss';
import { Link } from 'react-router-dom';

function CustomReport({ tableHeader, tableBody, tableFooter }) {
  return (
    <div className="custom-receipt-main-container" style={{ minWidth: 900 }}>
      <div style={{ padding: 20 }}>
        <table className="table1 w-100">
          {/* head */}
          <thead>
            <tr>
              {tableHeader.map(cell => (
                <th key={uuid()} style={{ textAlign: 'end', textTransform: 'uppercase', ...cell.style }}>
                  {cell.title}
                </th>
              ))}
            </tr>
          </thead>
          {/* Detail */}
          <tbody>
            {tableBody.length === 0 && (
              <tr>
                <td
                  colSpan={tableHeader.length}
                  style={{ textAlign: 'center', fontWeight: 500, fontSize: 20, padding: '20px 0px' }}
                >
                  No Data Available
                </td>
              </tr>
            )}
            {tableBody.length > 0 &&
              tableBody.map(tableRow => (
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
                    >
                      {cell.link ? <Link to={cell.link}>{cell.value}</Link> : cell.value}
                    </td>
                  ))}
                </tr>
              ))}

            {tableBody.length > 0 &&
              tableFooter.length > 0 &&
              tableFooter.map(tableRow => (
                <tr key={uuid()}>
                  {tableRow.map(cell => (
                    <td key={uuid()} style={{ textAlign: 'end', ...cell.style }}>
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
  tableHeader: [],
  tableBody: [],
  tableFooter: [[]],
};
export default CustomReport;
