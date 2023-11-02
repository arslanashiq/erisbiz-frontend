import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Slide,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// components and styles
import { useDeleteBankMutation } from 'services/private/banking';
import InfoPopup from 'shared/modals/InfoPopup';
import {
  bankDetailPopupCloseButtonStyle,
  bankDetailPopupInfoTitleStyle,
  bankDetailPopupInfoBodyStyle,
} from 'styles/mui/container/accounting/banking/detail/components/bank-detail-popup';

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

function BankDetailPopup({ open, setOpen, bankDetail }) {
  const [infoPopup, setInfoPopup] = useState({
    open: false,
    infoDescription: 'Active banks cannot be deleted. Please inactive them first in order to delete',

    actionButton: false,
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
        actionButton: false,
      });
      return;
    }
    setInfoPopup({
      ...infoPopup,
      open: true,
      actionButton: true,
      infoDescription: 'Are you sure you want to delete this bank?',
    });
  };
  const handleConfirmDelete = async () => {
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
        showActionButton={infoPopup.actionButton}
        handleYes={handleConfirmDelete}
      />
      <Dialog
        sx={{ zIndex: 1201 }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <IconButton onClick={handleClose} sx={bankDetailPopupCloseButtonStyle}>
          <CloseIcon />
        </IconButton>
        <Stack className="mt-2">
          <DialogTitle>Bank Detail</DialogTitle>
          <Stack direction="row" justifyContent="start" className="ms-2">
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
                    <TableCell sx={{ ...bankDetailPopupInfoTitleStyle, ...bankDetailPopupInfoBodyStyle }}>
                      {row.label}
                    </TableCell>
                    <TableCell sx={bankDetailPopupInfoBodyStyle}>{row.value || 'N/A'}</TableCell>
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
  bankDetail: PropTypes.object,
};
BankDetailPopup.defaultProps = {
  bankDetail: {},
};
export default BankDetailPopup;
