import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import FormikField from '../form/FormikField';
import FormikSelect from '../form/FormikSelect';
import 'styles/purchase-item/purchase-item.scss';

function PurchaseItem({ name, inputList, form, push, newList }) {
  const getTotalAmount = () => {
    let total = 0.0;
    form.values[name].forEach(item => {
      total += parseFloat(item.net_amount);
    });

    return total.toFixed(2);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: '700px' }}>
          <TableHead className="purchase-item-head">
            <TableRow>
              {inputList.map(input => (
                <TableCell className="purchase-item-table-cell">{input.placeholder}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {form.values[name].map((item, index) => (
              <TableRow>
                {inputList.map(input => (
                  <TableCell className="purchase-item-table-cell" sx={{ width: input.width || 'auto' }}>
                    {input.isSelect ? (
                      <FormikSelect
                        disabled={input.disabled || false}
                        itemOptions={input.options}
                        name={`${name}.${index}.${input.name}`}
                        placeholder={input.placeholder}
                        value={item[input.name]}
                        onChange={(key, value) => {
                          form.setFieldValue(key, value);
                          if (input.onChange) {
                            input.onChange(
                              name,
                              index,
                              input.name,
                              value,
                              item,
                              form.setFieldValue,
                              input.options
                            );
                          }
                        }}
                        className="col-12"
                      />
                    ) : (
                      <FormikField
                        name={`${name}.${index}.${input.name}`}
                        placeholder={input.placeholder}
                        disabled={input.disabled || false}
                        type={input.type || 'number'}
                        onChange={(key, value) => {
                          form.setFieldValue(key, value);
                          if (input.onChange) {
                            input.onChange(name, index, input.name, key, item, form.setFieldValue);
                          }
                        }}
                        className="w-100"
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="row justify-content-between align-items-center pe-1">
        <div className="col-md-6">
          <Button onClick={() => push(newList)}>Add New Item</Button>
        </div>
        <div className="col-md-5 d-flex justify-content-between align-items-center pe-5 mx-2 mt-md-0 purchase-item-total-amount-wrapper">
          <Typography className="purchase-item-total-amount">Total Amount</Typography>
          <Typography className="purchase-item-total-amount">AED {getTotalAmount()}</Typography>
        </div>
      </div>
    </Box>
  );
}
PurchaseItem.propTypes = {
  inputList: PropTypes.array,
  form: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  newList: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
};
PurchaseItem.defaultProps = {
  inputList: [],
};
export default PurchaseItem;
