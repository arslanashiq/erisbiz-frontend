import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Box, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import MuiTableHead from 'shared/components/table/MuiTableHead';
import formatAmount from 'utilities/formatAmount';
import { Link } from 'react-router-dom';
import { VAT_CHARGES } from 'utilities/constants';

function TaxReturnDetailTable({ taxReturnResponse, mainTitle, headCells, tableBody, tableStyles }) {
  const getTaxRate = item => {
    if (item.tax_id >= 0 && VAT_CHARGES[item.tax_id]?.label) {
      return `&tax_rate=${VAT_CHARGES[item.tax_id].label}`;
    }
    return `&tax_rate=${VAT_CHARGES[1].label}`;
  };
  const getPlace = item => {
    let place = '&place_of_supply=';
    if (item.place) {
      place = `&place_of_supply=${item.place}`;
    }
    return place;
  };
  return (
    <Box sx={{ marginTop: 10 }}>
      <Typography sx={{ fontSize: 24 }}>{mainTitle}</Typography>
      <Table size="small" className="tax-return-detail-table" sx={tableStyles}>
        <MuiTableHead
          headCells={headCells}
          headerStyles={{ backgroundColor: '#F7F7F7', border: '1px solid lightgrey' }}
        />
        <TableBody>
          {tableBody.map(item => {
            let taxableAmount = 0;
            let taxAmount = 0;
            // table no 1
            if (taxReturnResponse.sales_data && item.place) {
              const filteredItem = taxReturnResponse.sales_data.find(
                data => data.place_of_supply === item.place
              );
              if (filteredItem) {
                taxableAmount = filteredItem.taxable_amount;
                taxAmount = filteredItem.tax_amount;
              }
            }
            if (item.zero_rate_sales_date) {
              taxableAmount = taxReturnResponse?.zero_rate_sales_date || 0;
            }
            if (item.tax_exempt_sales_data) {
              taxableAmount = taxReturnResponse?.tax_exempt_sales_data || 0;
            }
            if (item.total_sales_taxable) {
              taxableAmount = taxReturnResponse?.total_sales_taxable || 0;
              taxAmount = taxReturnResponse?.total_sales_tax || 0;
            }

            // table no 2
            if (item.standard_rated_expenses) {
              taxableAmount = taxReturnResponse?.standard_rated_expenses?.taxable_amount || 0;
              taxAmount = taxReturnResponse?.standard_rated_expenses?.tax_amount || 0;
            }
            if (item.total_expense_taxable) {
              taxableAmount = taxReturnResponse?.total_expense_taxable || 0;
              taxAmount = taxReturnResponse?.total_expense_tax || 0;
            }

            // table No3 3
            if (item.due_tax) {
              taxAmount = taxReturnResponse?.due_tax || 0;
            }
            if (item.recoverable_tax) {
              taxAmount = taxReturnResponse?.recoverable_tax || 0;
            }

            return (
              <TableRow key={uuid()}>
                <TableCell sx={item.style}>
                  <Typography>{item.num}</Typography>
                </TableCell>
                <TableCell sx={item.style}>
                  <Stack spacing={1}>
                    <Typography>
                      <strong>{item.description_head}</strong>
                    </Typography>
                    <Typography>{item.description_detail}</Typography>
                  </Stack>
                </TableCell>
                {item?.taxable_amount && (
                  <TableCell sx={item.style}>
                    {item.type ? (
                      <Link
                        to={`detail?start_date=${taxReturnResponse?.start_date}&end_date=${
                          taxReturnResponse?.end_date
                        }${getTaxRate(item)}${getPlace(item)}&type=${item.type}`}
                      >
                        <Typography>{`AED${formatAmount(taxableAmount)}`}</Typography>
                      </Link>
                    ) : (
                      <Typography>{`AED${formatAmount(taxableAmount)}`}</Typography>
                    )}
                  </TableCell>
                )}
                <TableCell sx={item.style}>
                  <Typography>{`AED${formatAmount(taxAmount)}`}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
TaxReturnDetailTable.propTypes = {
  taxReturnResponse: PropTypes.object,
  mainTitle: PropTypes.string,
  tableBody: PropTypes.array,
  tableStyles: PropTypes.object,
  headCells: PropTypes.array,
};

TaxReturnDetailTable.defaultProps = {
  taxReturnResponse: {},
  mainTitle: '',
  tableStyles: {},
  tableBody: [],
  headCells: [],
};
export default TaxReturnDetailTable;
