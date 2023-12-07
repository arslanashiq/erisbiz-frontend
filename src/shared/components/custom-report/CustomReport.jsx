import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'styles/reports/custom-report.scss';
import CustomeReportTableHead from './CustomeReportTableHead';

function CustomReport({ tableHeader, tableBody, tableFooter, parentWrapperClassName }) {
  return (
    <div className={parentWrapperClassName} style={{ minWidth: 900 }}>
      <div style={{ padding: '0px 20px' }}>
        <table className="table1 w-100">
          <CustomeReportTableHead tableHeader={tableHeader} />
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
                      {cell.link ? <Link to={cell.link}>{cell.value}</Link> : cell.value}
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
  parentWrapperClassName: PropTypes.string,
};
CustomReport.defaultProps = {
  tableHeader: [],
  tableBody: [],
  tableFooter: [[]],
  parentWrapperClassName: 'custom-receipt-main-container',
};
export default CustomReport;
