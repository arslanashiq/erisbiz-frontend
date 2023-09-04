/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */
import React, { useEffect } from 'react';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MuiTableHead from 'shared/components/table/MuiTableHead';
import FormikField from 'shared/components/form/FormikField';
import { UnPaidBillsHeadCells } from '../../utilities/head-cells';

const tableBottomTextClasses = 'col-12 d-flex justify-content-between align-items-center pe-5 mx-2 mt-md-0 ';
const tableBottomTextStyle = {
  fontSize: '0.9rem',
  fontWeight: '300',
};
function UnPaidBillsList({ unPaidBills = [], form }) {
  const { values, setFieldValue } = form;

  const handleChangeUsedAmount = (value, index) => {
    let usedAmout = 0;
    values.bill_payments.forEach((item, idx) => {
      if (idx === index) {
        usedAmout += value;
      } else {
        usedAmout += item.amount_applied;
      }
    });
    setFieldValue('used_amount', Number(usedAmout));
    const unUsedAmount = Number(values.total - usedAmout);
    if (unUsedAmount >= 0) setFieldValue('unused_amount', Number(values.total - usedAmout));
  };
  useEffect(() => {
    setFieldValue('used_amount', values?.used_amount);
  }, []);
  console.log(unPaidBills, 'ajdslkjsadlksadjks');
  return (
    <Box className="col-12 mb-3">
      <TableContainer>
        <Table className="border border-1">
          <MuiTableHead headCells={UnPaidBillsHeadCells} />

          <TableBody>
            {!unPaidBills ||
              (unPaidBills?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} style={{ padding: '30px 0px', textAlign: 'center' }}>
                    No Data Found
                  </TableCell>
                </TableRow>
              ))}
            {unPaidBills &&
              unPaidBills.length > 0 &&
              unPaidBills.map((bill, index) => (
                <TableRow>
                  <TableCell>{bill.bill_date}</TableCell>
                  <TableCell>{bill.bill_num}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{bill.grand_total}</TableCell>
                  <TableCell>{bill.amount_due}</TableCell>
                  <TableCell>
                    <FormikField
                      name={`bill_payments[${index}].amount_applied`}
                      type="number"
                      className="col-12"
                      onChange={value => handleChangeUsedAmount(value, index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="row justify-content-between align-items-center ">
        <Box className="col-md-4 col-xl-5" />
        <Box
          className="col-md-6 col-xl-5 d-flex row me-3 mt-2"
          sx={{ padding: 2, backgroundColor: '#FBFAFA' }}
        >
          <Box className={tableBottomTextClasses}>
            <Typography sx={tableBottomTextStyle}>Total Amount</Typography>
            <Typography sx={tableBottomTextStyle}>{values.total}</Typography>
          </Box>
          <Box className={tableBottomTextClasses}>
            <Typography sx={tableBottomTextStyle}>Amount used for payments:</Typography>
            <Typography sx={tableBottomTextStyle}>{values.used_amount}</Typography>
          </Box>
          <Stack direction="row" sx={{ display: values.total >= values.used_amount ? 'none' : 'flex' }}>
            <Typography sx={{ color: 'red', fontSize: 10 }}>
              <ErrorOutlineIcon sx={{ fontSize: 14 }} />
              Total amount applied must be less than or equal to amount recieved
            </Typography>
          </Stack>
          <Box className={tableBottomTextClasses}>
            <Typography sx={tableBottomTextStyle}>Amount in excess:</Typography>
            <Typography sx={tableBottomTextStyle}>{values.unused_amount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UnPaidBillsList;
