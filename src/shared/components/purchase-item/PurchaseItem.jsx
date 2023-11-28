/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
// components
import FormikField from '../form/FormikField';
import FormikSelect from '../form/FormikSelect';
// styles
import 'styles/purchase-item/purchase-item.scss';

function PurchaseItem({ name, inputList, form, push, newList, showItemsAmount }) {
  const companyDetail = useSelector(state => state?.user?.company);
  const {
    currency: { currency_symbol: currencySymbol },
  } = companyDetail;
  const getTotalAmount = (key = 'net_amount') => {
    let total = 0.0;
    if (form && form.values && form.values[name]) {
      form.values[name].forEach(item => {
        total += parseFloat(item[key]) || 0;
      });
    }

    return total.toFixed(2);
  };
  const handlePopItem = index => {
    const list = [...form.values[name]];
    list.splice(index, 1);
    form.setFieldValue(name, list);
  };
  const creditDebitDifference = useMemo(
    () => getTotalAmount('credit') - getTotalAmount('debit') || 0,
    [form]
  );

  const getFieldDisabledStatus = (item, input) => {
    if (input?.name === 'cost_price') {
      if (item?.service_type_name === 'Service') return false;
      return true;
    }
    return input?.disabled || false;
  };

  return (
    <Box width="100%">
      <TableContainer sx={{ overflow: 'auto', minHeight: 'auto' }}>
        <Table sx={{ minWidth: '900px' }}>
          <TableHead className="purchase-item-head">
            <TableRow>
              {inputList?.map(input => (
                <TableCell key={uuid()} className="purchase-item-table-cell">
                  {input.placeholder}
                </TableCell>
              ))}
              {form?.values[name].length > 1 && (
                <TableCell key={uuid()} className="purchase-item-table-cell">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {form?.values[name]?.map((item, index) => (
              <TableRow key={`${name}.${item.name}.${index}`}>
                {inputList?.map(input => (
                  <TableCell
                    key={input.name}
                    className="purchase-item-table-cell"
                    sx={{
                      width: input.width || 'auto',
                      alignItems: 'center',
                    }}
                  >
                    {input.isSelect ? (
                      <FormikSelect
                        disabled={input.disabled || false}
                        options={input.options}
                        name={`${name}.${index}.${input.name}`}
                        placeholder={input.placeholder}
                        value={item[input.name]}
                        onChange={value => {
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
                        disabled={getFieldDisabledStatus(item, input)}
                        type={input.type || 'number'}
                        onChange={key => {
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
                        className="w-100 d-flex"
                      />
                    )}
                  </TableCell>
                ))}
                {form?.values[name].length > 1 && (
                  <TableCell
                    key="remove button"
                    className="purchase-item-table-cell"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    <Tooltip arrow placement="top" title="Remove Item">
                      <IconButton
                        color="error"
                        onClick={() => {
                          handlePopItem(index);
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showItemsAmount ? (
        <Box className="row justify-content-between align-items-center pe-1">
          <Box className="col-md-6">
            <Button disabled={Boolean(!newList)} onClick={() => push(newList)}>
              Add New Item
            </Button>
          </Box>
          <Box className="col-md-5 d-flex justify-content-between align-items-center pe-5 px-2 mt-md-0 purchase-item-total-amount-wrapper">
            <Typography className="purchase-item-total-amount">Total Amount</Typography>
            <Typography className="purchase-item-total-amount">
              {currencySymbol} {getTotalAmount()}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box className="row justify-content-between align-items-center pe-1">
          <Box className="col-md-5">
            <Button disabled={Boolean(!newList)} onClick={() => push(newList)}>
              Add New Item
            </Button>
          </Box>
          <Box className="col-md-7 align-items-center pe-5 px-2 mt-md-0 purchase-item-total-amount-wrapper">
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
          </Box>
        </Box>
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
  showItemsAmount: PropTypes.bool,
};
PurchaseItem.defaultProps = {
  inputList: [],
  newList: null,
  showItemsAmount: true,
};
export default PurchaseItem;
