import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

function CustomeReportTableHead({ tableHeader }) {
  return (
    <thead>
      <tr>
        {tableHeader.map(cell => (
          <th
            key={uuid()}
            style={{
              textAlign: 'right',
              textTransform: 'uppercase',
              padding: '8px 10px',
              fontSize: '13px',
              ...cell.style,
            }}
          >
            {cell.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

CustomeReportTableHead.propTypes = {
  tableHeader: PropTypes.array.isRequired,
};

export default CustomeReportTableHead;
