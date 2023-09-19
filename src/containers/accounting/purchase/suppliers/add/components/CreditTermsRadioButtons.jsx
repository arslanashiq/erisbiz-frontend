import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import FormikField from 'shared/components/form/FormikField';
import { supplierPaymentInfo } from '../../utilities/constants';
import 'styles/form/radio-btn.scss';

function CreditTermsRadioButtons({ name, values, errors, onChange, ...restProps }) {
  return (
    <Field name={name}>
      {({ field: { value: fieldValue, onChange: onFieldChange, ...restFieldProps } }) => (
        <div className="row p-0" key={supplierPaymentInfo[0].label}>
          <label className="col-8 d-flex align-items-center radio-btn">
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
            <FormikField
              name="days_after_invoice"
              type="nnumber"
              placeholder="Days"
              value={values.days_after_invoice}
              disabled={values.set_credit_terms !== 'invoice_date'}
              className="col-12"
            />
          </div>
          <label className="col-12 d-flex align-items-center radio-btn">
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
          <label className="col-12 d-flex align-items-center radio-btn">
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
CreditTermsRadioButtons.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
};

CreditTermsRadioButtons.defaultProps = {
  name: '',
  onChange: () => {},
  values: {},
  errors: {},
};
export default CreditTermsRadioButtons;
