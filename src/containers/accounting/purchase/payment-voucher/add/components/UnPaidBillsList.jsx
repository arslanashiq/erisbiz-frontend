/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MuiTableHead from 'shared/components/table/MuiTableHead';
import FormikField from 'shared/components/form/FormikField';
import {
  tableBottomTextClasses,
  tableBottomTextStyle,
  unPaidBillsTotalAmountInfoBoxStyle,
  unPaidBillsTotalAmountWrapperStyle,
} from 'styles/mui/container/accounting/purchase/payment-voucher/add/components/unpaid-bills-list';
import formatAmount from 'utilities/formatAmount';

function UnPaidBillsList({ name, form, headCells, setHasError }) {
  const { values, setFieldValue } = form;

  const getUsedAmount = useCallback(
    (value, index) => {
      let usedAmout = 0;
      values[name].forEach((item, idx) => {
        if (idx === index) {
          usedAmout += Number(value || 0);
        } else {
          usedAmout += Number(item.amount_applied || 0);
        }
      });
      return usedAmout || 0;
    },
    [values]
  );
  const handleChangeUsedAmount = useCallback(
    (value, index) => {
      const usedAmount = getUsedAmount(value, index);
      setFieldValue('used_amount', Number(usedAmount));
      const unUsedAmount = Number(values.total) - Number(usedAmount);
      if (unUsedAmount >= 0) setFieldValue('unused_amount', Number(unUsedAmount.toFixed(2) || 0));
    },
    [values]
  );

  const renderCellValue = (cell, bill) => {
    if (cell.cellValueAction) {
      return cell.cellValueAction(bill);
    }
    if (cell.formatAmount) {
      return formatAmount(bill[cell.id]);
    }
    if (bill[cell.id]) return bill[cell.id];
    return cell.defaultValue;
  };
  useEffect(() => {
    setFieldValue('used_amount', getUsedAmount(-1, -1));
  }, [values[name]?.length]);

  useEffect(() => {
    if (values.used_amount && values.total < values.used_amount) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [values]);

  return (
    <Box className="col-12 mb-3">
      <TableContainer>
        <Table className="border border-1">
          <MuiTableHead headCells={headCells} />

          <TableBody>
            {!values ||
              (values[name].length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} style={{ padding: '30px 0px', textAlign: 'center' }}>
                    No Data Found
                  </TableCell>
                </TableRow>
              ))}
            {values[name]?.length > 0 &&
              values[name]?.map((bill, index) => (
                <TableRow key={`${name}.${bill.id}.${index}`}>
                  {headCells.map(cell => (cell.isInput ? (
                    <TableCell key={`${name}.${cell.id}.${index}`}>
                      <FormikField
                        name={`${name}[${index}].amount_applied`}
                        type="number"
                        className="col-12 text-end"
                        onChange={value => handleChangeUsedAmount(value, index)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell key={uuid()}>{renderCellValue(cell, bill)}</TableCell>
                  )))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="row justify-content-between align-items-center ">
        <Box className="col-md-4 col-xl-5" />
        <Box className="col-md-6 col-xl-5 d-flex row me-3 mt-2 p-2" sx={unPaidBillsTotalAmountWrapperStyle}>
          <Box className={tableBottomTextClasses}>
            <Typography sx={tableBottomTextStyle}>Total Amount</Typography>
            <Typography sx={tableBottomTextStyle}>{formatAmount(values.total)}</Typography>
          </Box>
          <Box className={tableBottomTextClasses}>
            <Typography sx={tableBottomTextStyle}>Amount used for payments:</Typography>
            <Typography sx={tableBottomTextStyle}>{formatAmount(values.used_amount)}</Typography>
          </Box>
          <Stack
            direction="row"
            sx={{ display: values.used_amount && values.total < values.used_amount ? 'flex' : 'none' }}
          >
            <Typography sx={unPaidBillsTotalAmountInfoBoxStyle}>
              <ErrorOutlineIcon sx={{ fontSize: 14 }} />
              Total amount applied must be less than or equal to amount recieved
            </Typography>
          </Stack>
          <Box className={tableBottomTextClasses}>
            <Typography sx={tableBottomTextStyle}>Amount in excess:</Typography>
            <Typography sx={tableBottomTextStyle}>{formatAmount(values.unused_amount)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
UnPaidBillsList.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  headCells: PropTypes.array.isRequired,
  setHasError: PropTypes.func.isRequired,
};

export default UnPaidBillsList;
