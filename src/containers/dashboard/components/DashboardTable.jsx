/* eslint-disable react/prop-types */
import React from 'react';
import { v4 as uuid } from 'uuid';
import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import palette from 'styles/mui/theme/palette';
import moment from 'moment';
import { DATE_FORMAT_PRINT } from 'utilities/constants';

function DashboardTable({ className, title, data, headCells }) {
  const renderData = (row, cell) => {
    if (cell.handleData) {
      return cell.handleData(row, cell);
    }

    if (cell.isDate) {
      return moment(row[cell.id]).format(DATE_FORMAT_PRINT);
    }
    return row[cell.id];
  };
  return (
    <Grid item xs={12} xl={6} className={`${className} `}>
      <Stack
        sx={{
          height: 310,
          width: '100%',
          backgroundColor: 'white',
          marginTop: 0.3,
          borderRadius: 3,
          padding: '20px 20px',
        }}
      >
        <Typography sx={{ fontSize: 19, fontWeight: 500, marginBottom: 1 }}>{title}</Typography>
        <TableContainer sx={{ overflow: 'auto', height: '100%', outline: '1px solid silver' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {headCells.map(cell => (
                  <TableCell
                    key={uuid()}
                    sx={{
                      backgroundColor: palette.primary.main,
                      color: 'white',
                      outline: '1px solid silver',
                      fontSize: 11,
                    }}
                  >
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map(row => (
                  <TableRow key={uuid()}>
                    {headCells.map(cell => (
                      <TableCell key={uuid()} sx={{ fontSize: 11, outline: '1px solid silver' }}>
                        {renderData(row, cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow key={uuid()}>
                  <TableCell
                    colSpan={headCells.length}
                    key={uuid()}
                    sx={{ fontSize: 12, border: '1px solid silver', textAlign: 'center' }}
                  >
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Grid>
  );
}

export default DashboardTable;
