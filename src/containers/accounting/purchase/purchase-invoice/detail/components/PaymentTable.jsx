import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Table, Typography } from '@mui/material';
import MuiTableHead from 'shared/components/table/MuiTableHead';
import MuiTableBody from 'shared/components/table/MuiTableBody';
import { paymentsAgainstPurchaseInvoiceHeadCells } from '../../utilities/head-cells';

function PaymentTable({ payments }) {
  return (
    <Stack fontSize={13} justifyContent="center" maxWidth={900}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Payments Made</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table className="line-item-table border-top-bottom w-100" id="lineitems-section">
            <MuiTableHead headCells={paymentsAgainstPurchaseInvoiceHeadCells} />
            <MuiTableBody
              headCells={paymentsAgainstPurchaseInvoiceHeadCells}
              dataList={payments}
              selected={[]}
            />
          </Table>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

PaymentTable.propTypes = {
  payments: PropTypes.array.isRequired,
  // currency: PropTypes.string.isRequired,
};

export default PaymentTable;
