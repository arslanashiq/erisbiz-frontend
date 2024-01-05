import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, IconButton, Stack, Table, Typography } from '@mui/material';
import StyledDialog from 'styles/mui/component/StyledDialog';
import CloseIcon from '@mui/icons-material/Close';
import { useGetSupplierUnusedCreditDetailsQuery } from 'services/private/suppliers';
import { useParams } from 'react-router';
import MuiTableHead from '../table/MuiTableHead';
import MuiTableBody from '../table/MuiTableBody';

const creditHeadCells = [
  {
    id: 'formatted_number',
    numeric: false,
    disablePadding: true,
    label: 'Credit Info',
    align: 'left',
    isLink: true,
    handleLink: row => {
      if (row.type === 'Debit Note') {
        return `/pages/accounting/purchase/debit-notes/${row.id}/detail`;
      }
      return '#';
    },
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date Credited',
    align: 'left',
  },
  {
    id: 'amount_due',
    numeric: false,
    disablePadding: true,
    label: 'Amount',
    align: 'left',
    mergeCell: true,
  },
];
function UnusedCreditsDialog({ title, open, name, handleClose }) {
  const { id } = useParams();
  const unusedCreditsResponse = useGetSupplierUnusedCreditDetailsQuery(id, { skip: !id });
  console.log(unusedCreditsResponse);
  return (
    <StyledDialog maxWidth={false} open={open} onClose={handleClose}>
      <Card>
        <CardContent>
          <Stack sx={{ borderBottom: 1, borderColor: 'divider', minWidth: 700 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {title} {name}
              </Typography>
              <IconButton onClick={handleClose} sx={{ color: 'black' }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Box>
            <Table>
              <MuiTableHead
                headCells={creditHeadCells}
                customActionButton={[
                  {
                    title: '',
                    handleClick: () => {},
                    element: <Button>Apply To Bill</Button>,
                  },
                ]}
              />
              <MuiTableBody
                headCells={creditHeadCells}
                dataList={unusedCreditsResponse?.data || []}
                selected={[]}
                customActionButton={[
                  {
                    title: '',
                    handleClick: () => {},
                    element: <Button>Apply To Bill</Button>,
                  },
                ]}
              />
            </Table>
            {/* <MuiTable
             hoverEffect={false}
            /> */}
          </Box>
        </CardContent>
      </Card>
    </StyledDialog>
  );
}

UnusedCreditsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
};
UnusedCreditsDialog.defaultProps = {
  handleClose: () => {},
  title: 'Credit Details for',
  name: 'Supplier',
};
export default UnusedCreditsDialog;
