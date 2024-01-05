import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Table, Typography } from '@mui/material';
import MuiTableHead from 'shared/components/table/MuiTableHead';
import MuiTableBody from 'shared/components/table/MuiTableBody';

function PaymentTable({ heading, payments, headCells, customActionButton }) {
  return (
    <Stack fontSize={13} justifyContent="center" maxWidth={900}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{heading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table className="line-item-table border-top-bottom w-100" id="lineitems-section">
            <MuiTableHead headCells={headCells} customActionButton={customActionButton} />
            <MuiTableBody
              headCells={headCells}
              dataList={payments}
              selected={[]}
              customActionButton={customActionButton}
              hoverEffect={false}
            />
          </Table>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

PaymentTable.propTypes = {
  heading: PropTypes.string.isRequired,
  payments: PropTypes.array.isRequired,
  headCells: PropTypes.string.isRequired,
  customActionButton: PropTypes.array,
};
PaymentTable.defaultProps = {
  customActionButton: [],
};

export default PaymentTable;
