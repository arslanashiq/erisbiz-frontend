import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import FormikField from 'shared/components/form/FormikField';
import RadioButtons from 'shared/components/form/FormikRadioButtons';
import { supplierPaymentInfo } from '../../utilities/constants';
import 'styles/form/radio-btn.scss';

function CreditTermsRadioButtons({ name, values, onChange }) {
  return (
    <Field name={name}>
      {({ meta: { touched, error } }) => (
        <div className="row p-0" key={supplierPaymentInfo[0].label}>
          <Box className="col-6 mt-1">
            <RadioButtons name="set_credit_terms" options={supplierPaymentInfo} onChange={onChange} />
            {touched && error && <span className="form__form-group-error">{error}</span>}
          </Box>
          <FormikField
            name="days_after_invoice"
            type="number"
            placeholder="Days After Inovice"
            disabled={values.set_credit_terms !== 'invoice_date'}
            className="col-6 d-flex"
          />
        </div>
      )}
    </Field>
  );
}
CreditTermsRadioButtons.propTypes = {
  name: PropTypes.string,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

CreditTermsRadioButtons.defaultProps = {
  name: '',
  onChange: () => {},
};
export default CreditTermsRadioButtons;
