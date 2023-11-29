import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function CustomReportsDetailHeader({ reportTitle, filterInfo }) {
  const { name: companyName } = useSelector(state => state.user.company);

  return (
    <div className="text-center mb-5 text-capitalize">
      <h4>{companyName}</h4>
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
