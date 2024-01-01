import React from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Stack, IconButton, Typography, Card, CardContent, Box } from '@mui/material';
// services
import { useGetBankAccountsListQuery } from 'services/private/banking';
// constiners
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { DATE_FORMATE_ADD, PAYMENT_MODE } from 'utilities/constants';
// components
import StyledDialog from 'styles/mui/component/StyledDialog';
import FormikField from '../form/FormikField';
import FormikDatePicker from '../form/FormikDatePicker';
import FormikSelect from '../form/FormikSelect';
import 'styles/form/form.scss';

function RefundDialog({ open, setOpen, handleRefund, maxAmount }) {
  const bankListResponse = useGetBankAccountsListQuery();
  const { optionsList: bankAccountListOptions } = useListOptions(bankListResponse?.data?.results, {
    label: 'bank_account_name',
    value: 'chart_of_account',
  });
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <StyledDialog
      maxWidth={false}
      open={open}
      onClose={handleClose}
      className="theme-light modal-dialog--custom-max-width"
    >
      <Card>
        <CardContent>
          <Stack sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Refund
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Box>
            <Formik
              initialValues={{
                refunded_on: moment().format(DATE_FORMATE_ADD),
                payment_mode: '',
                reference_num: '',
                amount_applied: maxAmount,
                from_account_id: '',
                description: '',
              }}
              validationSchema={Yup.object({
                refunded_on: Yup.date().required('required'),
                payment_mode: Yup.string().max(50, 'Cannot exceed 50 characters').required('required'),
                reference_num: Yup.string().max(50, 'Cannot exceed 50 characters'),
                amount_applied: Yup.number('must be a number')
                  .positive('must be greater than zero')
                  .max(maxAmount, `must be leass tha ${maxAmount}`)
                  .required('required'),
                from_account_id: Yup.string().required('required'),
                description: Yup.string(),
              })}
              onSubmit={handleRefund}
            >
              <Form className="form form--horizontal row justify-content-center">
                <div className="row col-9 justify-content-center">
                  <FormikDatePicker
                    name="refunded_on"
                    label="Refunded On"
                 //  placeholder="Refunded On"
                    isRequired
                    className="col-12 mb-3"
                  />
                  <FormikSelect
                    name="payment_mode"
                    options={PAYMENT_MODE}
                    label="Payment Mode"
                 //  placeholder="Payment Mode"
                    className="col-12 mb-3"
                    isRequired
                  />
                  <FormikField
                    name="reference_num"
                    label="Reference Number"
                 //  placeholder="Reference Number"
                    className="col-12 mb-3"
                  />
                  <FormikField
                    name="amount_applied"
                    label="Amount"
                 //  placeholder="Amount"
                    isRequired
                    type="number"
                    className="col-12 mb-3"
                    endIconClass="ps-2 d-flex align-items-center"
                    endIcon={(
                      <span className="form__form-group-label align-items-center">
                        <strong>Balance:</strong>
                        AED{maxAmount}
                      </span>
                    )}
                  />

                  <FormikSelect
                    name="from_account_id"
                    options={bankAccountListOptions}
                    label="Deposit To"
                 //  placeholder="Deposit To"
                    isRequired
                    className="col-12 mb-3"
                  />
                  <FormikField
                    name="description"
                    label="Description"
                 //  placeholder="Description"
                    textArea
                    className="col-12 mb-3"
                  />
                  <FormSubmitButton />
                </div>
              </Form>
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </StyledDialog>
  );
}
RefundDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleRefund: PropTypes.func.isRequired,
  maxAmount: PropTypes.number,
};
RefundDialog.defaultProps = {
  maxAmount: 0,
};

export default RefundDialog;
