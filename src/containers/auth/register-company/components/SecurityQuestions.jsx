/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Grid, IconButton, Stack, Tooltip } from '@mui/material';
// shared
import MuiFormikField from 'shared/components/form/MuiFormikField';
import FormikField from 'shared/components/form/FormikField';

function SecurityQuestions({ name, form, push, remove, showLabel, useMuiField, disabled }) {
  return (
    <Grid container>
      {form.values &&
        form.values[name].length > 0 &&
        form.values[name].map((item, index) => (
          <Grid container key={index} item xs={12}>
            <Grid item xs={6}>
              {useMuiField ? (
                <MuiFormikField
                  className="mt-3 pe-4"
                  name={`${name}.${index}.question`}
                  placeholder="Question"
                  label={showLabel ? 'Question' : ''}
                  size="small"
                  disabled={disabled}
                />
              ) : (
                <FormikField
                  className="w-100 mt-2 pe-4"
                  name={`${name}.${index}.question`}
                  placeholder="Question"
                  label={showLabel ? 'Question' : ''}
                  disabled={disabled}
                />
              )}
            </Grid>

            <Grid item xs={6}>
              <Stack direction="row" alignItems="center">
                {useMuiField ? (
                  <MuiFormikField
                    name={`${name}.${index}.answer`}
                    type="text"
                    placeholder="Answer"
                    label={showLabel ? 'Answer' : ''}
                    size="small"
                    disabled={disabled}
                  />
                ) : (
                  <FormikField
                    className="w-100 mt-2 pe-4"
                    name={`${name}.${index}.answer`}
                    placeholder="Answer"
                    label={showLabel ? 'Answer' : ''}
                    disabled={disabled}
                  />
                )}
                {form?.values[name]?.length === 1 || disabled ? (
                  <IconButton
                    disabled={form?.values[name]?.length === 1 || disabled}
                    onClick={() => remove(index)}
                    className={useMuiField ? 'pt-4' : 'mb-1 mt-1'}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Remove" arrow placement="top">
                    <IconButton onClick={() => remove(index)} className={useMuiField ? 'pt-4' : 'mb-1 mt-1'}>
                      <HighlightOffIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            </Grid>
          </Grid>
        ))}
      <Stack>
        <Button
          className="mt-3 mb-3"
          variant="text"
          onClick={() => {
            push({
              question: '',
              answer: '',
            });
          }}
          disabled={disabled}
        >
          <AddCircleIcon color="primary" className="me-3" />
          Add Question?
        </Button>
      </Stack>
    </Grid>
  );
}
SecurityQuestions.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  showLabel: PropTypes.bool,
  useMuiField: PropTypes.bool,
  disabled: PropTypes.bool,
};
SecurityQuestions.defaultProps = {
  showLabel: false,
  useMuiField: true,
  disabled: false,
};

export default SecurityQuestions;
