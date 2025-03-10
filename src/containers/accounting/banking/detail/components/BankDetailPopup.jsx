import React, { forwardRef, useCallback, useMemo, useState } from 'react';
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
  Box,
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
  bankingDetailPopupStyle,
} from 'styles/mui/container/accounting/banking/detail/components/bank-detail-popup';

export const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

function BankDetailPopup({ open, setOpen, bankDetail }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [infoPopup, setInfoPopup] = useState({
    open: false,
    infoDescription: 'Active banks cannot be deleted. Please inactive them first in order to delete',

    actionButton: false,
  });

  const [deleteBank] = useDeleteBankMutation(0);

  const bankOptions = useMemo(
    () => [
      { label: 'Bank Name', value: bankDetail.bank_name },
      { label: 'Bank Account Name', value: bankDetail.bank_account_name },
      { label: 'Account Number', value: bankDetail.account_number },
      { label: 'Branch Name', value: bankDetail.branch_name },
      { label: 'IBAN', value: bankDetail.IBAN },
      { label: 'Swift Code', value: bankDetail.swift_code },
    ],
    [bankDetail]
  );

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosePopup = () => {
    setInfoPopup({ ...infoPopup, open: false });
  };
  const handleEditBank = useCallback(() => {
    if (bankDetail.is_active) {
      setInfoPopup({
        open: true,
        infoDescription: 'Active banks cannot be deleted. Please inactive them first in order to Edit',
        actionButton: false,
      });
      return;
    }
    handleClose();
    navigate(`/pages/accounting/banking/edit/${id}`);
  }, []);
  const handleDeleteBank = useCallback(async () => {
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
  }, [bankDetail]);
  const handleConfirmDelete = useCallback(async () => {
    const res = await deleteBank(id);
    if (res.error) {
      enqueueSnackbar(res.error.error, { variant: 'error' });
    } else {
      enqueueSnackbar('Bank Deleted SuccessFully', { variant: 'success' });
      navigate('/pages/accounting/banking');
    }
  }, []);

  return (
    <Box>
      <InfoPopup
        open={infoPopup.open}
        infoDescription={infoPopup.infoDescription}
        handleClose={handleClosePopup}
        showActionButton={infoPopup.actionButton}
        handleYes={handleConfirmDelete}
      />
      <Dialog
        sx={bankingDetailPopupStyle}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
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
                    <TableCell sx={bankDetailPopupInfoTitleStyle}>{row.label}</TableCell>
                    <TableCell sx={bankDetailPopupInfoBodyStyle}>{row.value || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Stack>
      </Dialog>
    </Box>
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
