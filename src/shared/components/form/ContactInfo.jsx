/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import FormikField from 'shared/components/form/FormikField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import 'styles/purchase-item/purchase-item.scss';
import palette from 'styles/mui/theme/palette';

function ContactInfo({ name, form, push, remove }) {
  const color = 'rgba(224, 224, 224, 1)';
  const tableCelStyle = { border: `1px solid ${color}`, paddingBottom: '0px' };
  const tableHeaderCelStyle = { ...tableCelStyle, padding: '10px' };
  return (
    <Box sx={{ minHeight: 200 }}>
      <Table>
        <TableHead sx={{ backgroundColor: palette.primary.backgroundColor, padding: 0.1 }}>
          <TableRow>
            <TableCell sx={{ width: '19%', ...tableHeaderCelStyle }}>Name</TableCell>
            <TableCell sx={{ width: '19%', ...tableHeaderCelStyle }}>Designation</TableCell>
            <TableCell sx={{ width: '19%', ...tableHeaderCelStyle }}>Mobile Number</TableCell>
            <TableCell sx={{ width: '19%', ...tableHeaderCelStyle }}>Email</TableCell>
            <TableCell sx={{ width: '19%', ...tableHeaderCelStyle }}>Notes</TableCell>
            <TableCell sx={{ width: '5%', ...tableHeaderCelStyle }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {form.values[name]?.length > 0 ? (
            form.values[name].map((_, index) => (
              <TableRow key={index} sx={{ borderBottom: 0 }}>
                <TableCell sx={tableCelStyle}>
                  <FormikField
                    className="w-100"
                    name={`${name}.${index}.${name === 'supplier_contacts' ? 'first_name' : 'name'}`}
                    type="text"
                    // placeholder="Name"
                  />
                </TableCell>
                <TableCell sx={tableCelStyle}>
                  <FormikField
                    className="w-100"
                    name={`${name}.${index}.designation`}
                    type="text"
                    // placeholder="Designation"
                  />
                </TableCell>
                <TableCell sx={tableCelStyle}>
                  <FormikField
                    className="w-100"
                    type="text"
                    name={`${name}.${index}.mobile_num`}
                    // placeholder="Mobile Number"
                  />
                </TableCell>
                <TableCell sx={tableCelStyle}>
                  <FormikField
                    className="w-100"
                    name={`${name}.${index}.email`}
                    type="email"
                    // placeholder="Email"
                  />
                </TableCell>
                <TableCell sx={tableCelStyle}>
                  <FormikField
                    className="w-100"
                    name={`${name}.${index}.notes`}
                    type="text"
                    // placeholder="Notes"
                  />
                </TableCell>
                <TableCell sx={tableCelStyle}>
                  <Tooltip title="Remove" arrow placement="top">
                    <IconButton color="error" onClick={() => remove(index)} className="mb-2">
                      <HighlightOffIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell sx={{ textAlign: 'center', ...tableHeaderCelStyle }} colSpan={6}>
                No Contact Available
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>
              <Button
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
