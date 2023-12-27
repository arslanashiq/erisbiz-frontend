import React, { useEffect, useState } from 'react';
import { connect } from 'formik';
import PropTypes from 'prop-types';

function keyify(errors) {
  if (errors && typeof errors === 'object') {
    const obj = Object.keys(errors).reduce((acc, valKey) => {
      if (Array.isArray(errors[valKey])) {
        errors[valKey].forEach((val, idx) => {
          if (typeof val === 'object' && errors[valKey] !== null) {
            Object.keys(val).forEach(item => {
              acc.push(`${valKey}.${idx}.${item}`);
            });
          } else {
            acc.push(valKey);
          }
        });
      } else if (typeof errors[valKey] === 'object' && errors[valKey] !== null) {
        Object.keys(errors[valKey]).forEach(item => {
          acc.push(`${valKey}.${item}`);
        });
      } else {
        acc.push(`${valKey}`);
      }
      return acc;
    }, []);
    return obj;
  }
  return [];
}

function ErrorFocus({ formik }) {
  const { isSubmitting, isValidating, errors } = formik;
  const [formikErrors, setFormikErrors] = useState('');
  useEffect(() => {
    const keys = keyify(errors);
    if (keys.length > 0 && !isValidating) {
      if (errors?.non_field_errors) {
        setFormikErrors(errors.non_field_errors);
      } else {
        const idSelector = `[id="${keys[0]}"]`;
        const nameSelector = `[name="${keys[0]}"]`;
        const checkElementWithIdExist = document.querySelector(idSelector);
        const checkElementWithNameExist = document.querySelector(nameSelector);
        if (!checkElementWithIdExist && !checkElementWithNameExist) {
          setFormikErrors(errors[keys[0]]);
        }
      }
    } else {
      setFormikErrors('');
    }
    if (Object.keys(errors).length === 0) {
      setFormikErrors('');
    }
  }, [isSubmitting]);

  if (formikErrors) {
    return <h1 className="form__form-group-non_field_errors">{formikErrors}</h1>;
  }
  return null;
}

ErrorFocus.propTypes = {
  formik: PropTypes.object.isRequired,
};
export default connect(ErrorFocus);
