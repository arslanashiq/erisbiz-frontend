import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { supplierPaymentInfo } from 'utilities/constants';
import FormikModernField from 'shared/components/form/FormikModernField';
import 'styles/radio-btn.scss';

function CreditLimitRadioButtons({ name, values, touched, errors, onChange, ...restProps }) {
  return (
    <Field name={name}>
      {({ field: { value: fieldValue, onChange: onFieldChange, ...restFieldProps } }) => (
        <div className="row p-0" key={supplierPaymentInfo[0].label}>
          <label className="col-8 radio-btn" style={{ paddingLeft: 23 }}>
            <input
              className="radio-btn__radio"
              type="radio"
              id={supplierPaymentInfo[0].value}
              {...restFieldProps}
              {...restProps}
              value={supplierPaymentInfo[0].value}
              checked={fieldValue === supplierPaymentInfo[0].value}
              onChange={e => {
                onFieldChange(e);
                onChange(e.target.value);
              }}
            />
            <span className="radio-btn__radio-custom" />
            <span className="radio-btn__label">{supplierPaymentInfo[0].label}</span>
          </label>

          <div className="col-lg-4">
            <FormikModernField
              name="days_after_invoice"
              type="text"
              placeholder="Days"
              value={values.days_after_invoice}
              touched={touched.days_after_invoice}
              error={errors.days_after_invoice}
              disabled={values.set_credit_terms !== 'invoice_date'}
            />
          </div>
          <label className="col-12 radio-btn" style={{ paddingLeft: 23 }}>
            <input
              className="radio-btn__radio"
              type="radio"
              id={supplierPaymentInfo[1].value}
              {...restFieldProps}
              {...restProps}
              value={supplierPaymentInfo[1].value}
              checked={fieldValue === supplierPaymentInfo[1].value}
              onChange={e => {
                onFieldChange(e);
                onChange(e.target.value);
              }}
            />
            <span className="radio-btn__radio-custom" />
            <span className="radio-btn__label">{supplierPaymentInfo[1].label}</span>
          </label>
          <label className="col-12 radio-btn" style={{ paddingLeft: 23 }}>
            <input
              className="radio-btn__radio"
              type="radio"
              id={supplierPaymentInfo[2].value}
              {...restFieldProps}
              {...restProps}
              value={supplierPaymentInfo[2].value}
              checked={fieldValue === supplierPaymentInfo[2].value}
              onChange={e => {
                onFieldChange(e);
                onChange(e.target.value);
              }}
            />
            <span className="radio-btn__radio-custom" />
            <span className="radio-btn__label">{supplierPaymentInfo[2].label}</span>
          </label>
        </div>
      )}
    </Field>
  );
}
CreditLimitRadioButtons.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
};

CreditLimitRadioButtons.defaultProps = {
  name: '',
  onChange: () => {},
  values: {},
  touched: {},
  errors: {},
};
export default CreditLimitRadioButtons;
