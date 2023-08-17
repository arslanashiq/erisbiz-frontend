import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import 'styles/radio-btn.scss';

function ImportantAgentRadioButtons({ name, values, touched, errors, setFieldValue, ...restProps }) {
  return (
    <Field name={name}>
      {({ field: { value: fieldValue, onChange: onFieldChange, ...restFieldProps } }) => (
        <div className="row p-0" key="is_important_agent">
          <label className="col-12 radio-btn" style={{ paddingLeft: 23 }}>
            <input
              className="radio-btn__radio"
              type="radio"
              id="is_important_agent"
              {...restFieldProps}
              {...restProps}
              value="is_important_agent"
              checked={fieldValue.is_important_agent}
              onChange={e => {
                onFieldChange(e);
                setFieldValue('is_important_agent', true);
                setFieldValue('vat_reverse', false);
              }}
            />
            <span className="radio-btn__radio-custom" />
            <span className="radio-btn__label">Supplier is Important Agent</span>
          </label>
          <label className="col-12 radio-btn" style={{ paddingLeft: 23 }}>
            <input
              className="radio-btn__radio"
              type="radio"
              id="vat_reverse"
              {...restFieldProps}
              {...restProps}
              value="vat_reverse"
              checked={fieldValue.vat_reverse}
              onChange={e => {
                onFieldChange(e);
                setFieldValue('is_important_agent', false);
                setFieldValue('vat_reverse', true);
              }}
            />
            <span className="radio-btn__radio-custom" />
            <span className="radio-btn__label">VAT Reverse Charges</span>
          </label>
        </div>
      )}
    </Field>
  );
}
ImportantAgentRadioButtons.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func.isRequired,
};

ImportantAgentRadioButtons.defaultProps = {
  name: '',
  onChange: () => {},
  values: {},
  touched: {},
  errors: {},
};
export default ImportantAgentRadioButtons;
