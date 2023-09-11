import React from 'react';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  // Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import MuiFormikField from 'shared/components/form/MuiFormikField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function SecurityQuestions({ name, form, push, remove }) {
  return (
    <Box>
      <Table>
        <TableBody>
          {form.values &&
            form.values[name].length > 0 &&
            form.values[name].map((item, index) => (
              <TableRow key={item} sx={{ borderBottom: 0 }}>
                <TableCell>
                  <MuiFormikField
                    className="w-100"
                    name={`${name}.${index}.question`}
                    placeholder="Question"
                    // label="Question"
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <MuiFormikField
                      className="w-100"
                      name={`${name}.${0}.answer`}
                      type="text"
                      placeholder="Answer"
                      // label="Answer"
                      size="small"
                    />

                    <Tooltip title="Remove" arrow placement="top">
                      <IconButton onClick={() => remove(index)}>
                        <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                console.log('first');
                push({
                  question: '',
                  answer: '',
                });
              }}
            >
              <AddCircleIcon color="primary" className="me-3" />
              Add Question?
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
SecurityQuestions.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default SecurityQuestions;
