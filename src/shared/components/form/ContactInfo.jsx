/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import FormikModernField from 'shared/components/form/FormikModernField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ContactInfo({ name, form, push, remove }) {
  return (
    <Box sx={{ minHeight: 200 }}>
      <Table>
        <TableBody>
          {form.values[name].map((item, index) => (
            <TableRow key={index} sx={{ borderBottom: 0 }}>
              <TableCell>
                <FormikModernField name={`${name}.${index}.name`} type="text" placeholder="Name" />
              </TableCell>
              <TableCell>
                <FormikModernField
                  name={`${name}.${index}.designation`}
                  type="text"
                  placeholder="Designation"
                />
              </TableCell>
              <TableCell>
                <FormikModernField
                  name={`${name}.${index}.mobile_num`}
                  type="number"
                  placeholder="Mobile Number"
                />
              </TableCell>
              <TableCell>
                <FormikModernField name={`${name}.${0}.email`} type="email" placeholder="Email" />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <FormikModernField name={`${name}.${0}.notes`} type="text" placeholder="Notes" />

                  <Tooltip title="Remove" arrow placement="top">
                    <IconButton onClick={() => remove(index)}>
                      <HighlightOffIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
          <Button
            sx={{ marginLeft: 2 }}
            onClick={() => {
              push({
                name: '',
                designation: '',
                mobile_num: '',
                email: '',
                remarks: '',
              });
            }}
          >
            Add Contact{' '}
          </Button>
        </TableBody>
      </Table>
    </Box>
  );
}

ContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.element.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
export default ContactInfo;
