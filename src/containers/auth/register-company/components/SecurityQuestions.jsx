import React from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Grid, IconButton, Stack, Tooltip } from '@mui/material';
// shared
import MuiFormikField from 'shared/components/form/MuiFormikField';

function SecurityQuestions({ name, form, push, remove }) {
  return (
    <Grid container>
      {form.values &&
        form.values[name].length > 0 &&
        form.values[name].map((item, index) => (
          <Grid container key={item} xs={12}>
            <Grid item xs={6}>
              <MuiFormikField
                className="mt-3 pe-4"
                name={`${name}.${index}.question`}
                placeholder="Question"
                // label="Question"
                size="small"
              />
            </Grid>

            <Grid item xs={6}>
              <Stack direction="row" alignItemst="center">
                <MuiFormikField
                  name={`${name}.${index}.answer`}
                  type="text"
                  placeholder="Answer"
                  // label="Answer"
                  size="small"
                />
                <Tooltip title="Remove" arrow placement="top">
                  <IconButton onClick={() => remove(index)} className="pt-4">
                    <HighlightOffIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        ))}
      <Grid>
        <Button
          className="mt-3 mb-3"
          variant="text"
          onClick={() => {
            push({
              question: '',
              answer: '',
            });
          }}
        >
          <AddCircleIcon color="primary" className="me-3" />
          Add Question?
        </Button>
      </Grid>
    </Grid>
  );
}
SecurityQuestions.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default SecurityQuestions;
