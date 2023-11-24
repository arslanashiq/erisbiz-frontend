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
  return (
    <Grid item xs={12} lg={12} xl={6} className={`${className} `}>
      <Stack
        sx={{
          height: 250,
          width: '100%',
          backgroundColor: 'white',
          marginTop: 0.3,
          borderRadius: 3,
          padding: '20px 20px',
        }}
      >
        <Typography sx={{ fontSize: 19, fontWeight: 500 }}>{title}</Typography>
        <TableContainer sx={{ overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {headCells.map(cell => (
                  <TableCell
                    key={uuid()}
                    sx={{
                      backgroundColor: palette.primary.main,
                      color: 'white',
                      border: '1px solid silver',
                      fontSize: 10,
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
                      <TableCell key={uuid()} sx={{ fontSize: 10, border: '1px solid silver' }}>
                        {cell.isDate ? moment(row[cell.id]).format(DATE_FORMAT_PRINT) : row[cell.id]}
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
