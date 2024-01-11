import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, IconButton, Stack, Table, Typography } from '@mui/material';
import StyledDialog from 'styles/mui/component/StyledDialog';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router';
import MuiTableHead from '../table/MuiTableHead';
import MuiTableBody from '../table/MuiTableBody';

function UnusedCreditsDialog({
  title,
  open,
  name,
  handleClose,
  headCells,
  usegetUnUsedCreditQuery,
  setOpenApplyToBillModal,
  setSelectedUnusedCreditObject,
  customButtonText,
}) {
  const { id } = useParams();
  const unusedCreditsResponse = usegetUnUsedCreditQuery(id, { skip: !id });
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
                headCells={headCells}
                customActionButton={[
                  {
                    title: '',
                  },
                ]}
              />
              <MuiTableBody
                headCells={headCells}
                dataList={unusedCreditsResponse?.data || []}
                selected={[]}
                customActionButton={[
                  {
                    title: '',
                    handleClick: (_, rowObject) => {
                      setSelectedUnusedCreditObject(rowObject);
                      setOpenApplyToBillModal(true);
                      handleClose();
                    },
                    element: <Button>{customButtonText}</Button>,
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
  headCells: PropTypes.array,
  usegetUnUsedCreditQuery: PropTypes.func.isRequired,
  setOpenApplyToBillModal: PropTypes.func,
  setSelectedUnusedCreditObject: PropTypes.func,
  customButtonText: PropTypes.string,
};
UnusedCreditsDialog.defaultProps = {
  handleClose: () => {},
  title: 'Credit Details for',
  name: 'Supplier',
  headCells: [],
  setOpenApplyToBillModal: () => {},
  setSelectedUnusedCreditObject: () => {},
  customButtonText: 'Apply To Bill',
};
export default UnusedCreditsDialog;
