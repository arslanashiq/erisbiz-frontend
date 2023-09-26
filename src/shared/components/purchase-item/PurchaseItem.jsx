/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// components
import FormikField from '../form/FormikField';
import FormikSelect from '../form/FormikSelect';
// styles
import 'styles/purchase-item/purchase-item.scss';

function PurchaseItem({ name, inputList, form, push, newList }) {
  const getTotalAmount = (key = 'net_amount') => {
    let total = 0.0;
    if (form && form.values && form.values[name]) {
      form.values[name].forEach(item => {
        total += parseFloat(item[key]) || 0;
      });
    }

    return total.toFixed(2);
  };
  const creditDebitDifference = useMemo(() => {
    if (!newList) {
      return getTotalAmount('credit') - getTotalAmount('debit') || 0;
    }
    return 0;
  }, [form]);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: '700px' }}>
          <TableHead className="purchase-item-head">
            <TableRow>
              {inputList?.map(input => (
                <TableCell key={uuid()} className="purchase-item-table-cell">
                  {input.placeholder}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {form?.values[name]?.map((item, index) => (
              <TableRow key={`${name}.${item.name}.${index}`}>
                {inputList?.map(input => (
                  <TableCell
                    key={input.name}
                    className="purchase-item-table-cell"
                    sx={{ width: input.width || 'auto' }}
                  >
                    {input.isSelect ? (
                      <FormikSelect
                        disabled={input.disabled || false}
                        options={input.options}
                        name={`${name}.${index}.${input.name}`}
                        placeholder={input.placeholder}
                        value={item[input.name]}
                        onChange={value => {
                          form.setFieldValue(`${name}.${index}.${input.name}`, value);
                          if (input.onChange) {
                            input.onChange(
                              name,
                              index,
                              input.name,
                              value,
                              item,
                              form.setFieldValue,
                              input.options,
                              form.values
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
                            input.onChange(
                              name,
                              index,
                              input.name,
                              key,
                              item,
                              form.setFieldValue,
                              form.values
                            );
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
      {newList ? (
        <div className="row justify-content-between align-items-center pe-1">
          <div className="col-md-6">
            <Button onClick={() => push(newList)}>Add New Item</Button>
          </div>
          <div className="col-md-5 d-flex justify-content-between align-items-center pe-5 px-2 mt-md-0 purchase-item-total-amount-wrapper">
            <Typography className="purchase-item-total-amount">Total Amount</Typography>
            <Typography className="purchase-item-total-amount">AED {getTotalAmount()}</Typography>
          </div>
        </div>
      ) : (
        <div className="row justify-content-between align-items-center pe-1">
          <div className="col-md-5">
            <Button onClick={() => push(newList)}>Add New Item</Button>
          </div>
          <div className="col-md-7 align-items-center pe-5 px-2 mt-md-0 purchase-item-total-amount-wrapper">
            <Stack direction="row" justifyContent="space-between">
              <Typography className="purchase-item-total-amount">Total Amount</Typography>
              <Typography className="purchase-item-total-amount">{getTotalAmount('debit')}</Typography>
              <Typography className="purchase-item-total-amount">{getTotalAmount('credit')}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography className="purchase-item-total-difference">Difference</Typography>
              <Typography className="purchase-item-total-difference">{creditDebitDifference}</Typography>
            </Stack>
            <Stack direction="row" sx={{ display: creditDebitDifference !== 0 ? 'flex' : 'none' }}>
              <Typography sx={{ color: 'red', fontSize: 10 }}>
                <ErrorOutlineIcon sx={{ fontSize: 14 }} />
                Total credited amount must be equal to debited amount
              </Typography>
            </Stack>
          </div>
        </div>
      )}
    </Box>
  );
}
PurchaseItem.propTypes = {
  inputList: PropTypes.array,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  newList: PropTypes.object,
  push: PropTypes.func.isRequired,
};
PurchaseItem.defaultProps = {
  inputList: [],
  newList: null,
};
export default PurchaseItem;
