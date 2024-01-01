/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import FormikField from 'shared/components/form/FormikField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ContactInfo({ name, form, push, remove }) {
  return (
    <Box sx={{ minHeight: 200 }}>
      <Table>
        <TableBody>
          {form.values[name].map((_, index) => (
            <TableRow key={index} sx={{ borderBottom: 0 }}>
              <TableCell>
                <FormikField
                  className="w-100"
                  name={`${name}.${index}.first_name`}
                  type="text"
               //  placeholder="Name"
                />
              </TableCell>
              <TableCell>
                <FormikField
                  className="w-100"
                  name={`${name}.${index}.designation`}
                  type="text"
               //  placeholder="Designation"
                />
              </TableCell>
              <TableCell>
                <FormikField
                  className="w-100"
                  type="number"
                  name={`${name}.${index}.mobile_num`}
               //  placeholder="Mobile Number"
                />
              </TableCell>
              <TableCell>
                <FormikField
                  className="w-100"
                  name={`${name}.${index}.email`}
                  type="email"
               //  placeholder="Email"
                />
              </TableCell>
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FormikField
                  className="w-100"
                  name={`${name}.${index}.notes`}
                  type="text"
               //  placeholder="Notes"
                />
                <Tooltip title="Remove" arrow placement="top">
                  <IconButton color="error" onClick={() => remove(index)} className="mb-2 ms-2">
                    <HighlightOffIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
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
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

ContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
export default ContactInfo;
