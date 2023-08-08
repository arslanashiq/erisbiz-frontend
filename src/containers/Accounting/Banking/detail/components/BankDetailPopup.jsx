/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import { IconButton, Stack, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router';
import { useDeleteBankMutation } from 'services/private/banking';
import { useSnackbar } from 'notistack';
import InfoPopup from 'shared/modals/InfoPopup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function BankDetailPopup({ open, setOpen, bankDetail }) {
  const [infoPopup, setInfoPopup] = React.useState({
    open: false,
    infoDescription: 'Active banks cannot be deleted. Please inactive them first in order to delete',
  });
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { id } = useParams();

  const [deleteBank] = useDeleteBankMutation(0);
  const bankOptions = [
    { label: 'Bank Name', value: bankDetail.bank_name },
    { label: 'Bank Account Name', value: bankDetail.bank_account_name },
    { label: 'Account Number', value: bankDetail.account_number },
    { label: 'Branch Name', value: bankDetail.bank_branch_address },
    { label: 'IBAN', value: bankDetail.IBAN },
    { label: 'Swift Code', value: bankDetail.swift_code },
  ];
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditBank = () => {
    handleClose();
    navigate(`/pages/accounting/banking/edit/${id}`);
  };
  const handleClosePopup = () => {
    setInfoPopup({ ...infoPopup, open: false });
  };
  const handleDeleteBank = async () => {
    if (bankDetail.is_active) {
      setInfoPopup({
        open: true,
        infoDescription: 'Active banks cannot be deleted. Please inactive them first in order to delete',
      });
      return;
    }
    const res = await deleteBank(id);
    if (res.error) {
      enqueueSnackbar(res.error.error, { variant: 'error' });
    } else {
      enqueueSnackbar('Bank Deleted SuccessFully', { variant: 'success' });
      navigate('/pages/accounting/banking');
    }
  };
  return (
    <div>
      <InfoPopup
        open={infoPopup.open}
        infoDescription={infoPopup.infoDescription}
        handleClose={handleClosePopup}
      />
      <Dialog
        sx={{ zIndex: 1201 }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '0%', right: '0%' }}>
          <CloseIcon />
        </IconButton>
        <Stack
          sx={{
            marginTop: 3,
          }}
        >
          <DialogTitle>Bank Detail</DialogTitle>
          <Stack direction="row" justifyContent="start" sx={{ marginLeft: 2 }}>
            <Tooltip arrow title="Edit" placement="top">
              <IconButton onClick={handleEditBank}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Delete" placement="top">
              <IconButton onClick={handleDeleteBank}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <DialogContent>
            <Table>
              <TableBody>
                {bankOptions.map(row => (
                  <TableRow key={row.label}>
                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid silver', minWidth: 250 }}>
                      {row.label}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid silver', minWidth: 250 }}>
                      {row.value || 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Stack>
      </Dialog>
    </div>
  );
}
BankDetailPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  bankDetail: PropTypes.object.isRequired,
};
BankDetailPopup.defaultProps = {};
export default BankDetailPopup;
