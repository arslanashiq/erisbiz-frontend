import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Typography } from '@mui/material';
import { isMobileOnly } from 'react-device-detect';

function IntervalDatePickerField({ onChange }) {
  const [state, setState] = useState({
    startDate: '',
    endDate: '',
  });
  const handleChange = ({ startDate, endDate }) => {
    const newStartDate = state.startDate || startDate;
    const newEndDate = state.endDate || endDate;

    setState({ startDate, endDate });
    onChange({ start: newStartDate, end: newEndDate });
  };
  const handleChangeStart = startDate => handleChange({ startDate });

  const handleChangeEnd = endDate => handleChange({ endDate });

  return (
    <div className="date-picker date-picker--interval">
      <DatePicker
        selected={state.startDate}
        selectsStart
        startDate={state.startDate}
        endDate={state.endDate}
        onChange={handleChangeStart}
        dateFormat="yyyy/MM/dd"
        placeholderText="From"
        dropDownMode="select"
        withPortal={isMobileOnly}
      />
      <Typography>minum icon</Typography>
      <DatePicker
        selected={state.endDate}
        selectsEnd
        startDate={state.startDate}
        endDate={state.endDate}
        onChange={handleChangeEnd}
        dateFormat="yyyy/MM/dd"
        placeholderText="To"
        dropDownMode="select"
        withPortal={isMobileOnly}
      />
    </div>
  );
}
IntervalDatePickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
};

function renderIntervalDatePickerField({ input }) {
  return <IntervalDatePickerField {...input} />;
}

renderIntervalDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
  }).isRequired,
};
export default renderIntervalDatePickerField;
