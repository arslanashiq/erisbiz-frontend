import React from 'react';
import PropTypes from 'prop-types';
import { COMPANY_NAME } from 'utilities/constants';

function CustomReportsDetailHeader({ reportTitle, filterInfo }) {
  return (
    <div className="text-center mb-5 text-capitalize">
      <h4>{COMPANY_NAME}</h4>
      <h3 className="fs-24">{reportTitle}</h3>
      <h3 className="fs-13 fw-400">{filterInfo}</h3>
    </div>
  );
}
CustomReportsDetailHeader.propTypes = {
  reportTitle: PropTypes.string,
  filterInfo: PropTypes.string,
};
CustomReportsDetailHeader.defaultProps = {
  reportTitle: '',
  filterInfo: '',
};

export default CustomReportsDetailHeader;
