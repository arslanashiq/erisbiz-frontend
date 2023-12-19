import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { FieldArray, Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Stack, IconButton, Typography, Card, CardContent, Box } from '@mui/material';
// constiners
import FormSubmitButton from 'containers/common/form/FormSubmitButton';

// components
import StyledDialog from 'styles/mui/component/StyledDialog';
import UnPaidBillsList from 'containers/accounting/purchase/payment-voucher/add/components/UnPaidBillsList';
import 'styles/form/form.scss';

function ApplyToBill({ open, setOpen, handleApply, maxAmount, initialValues, headCells, title }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <StyledDialog maxWidth={false} open={open} onClose={handleClose}>
      <Card>
        <CardContent>
          <Stack sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {title}
              </Typography>
              <IconButton onClick={handleClose} sx={{ color: 'black' }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Box>
            <Formik
              enableReinitialize
              initialValues={{
                amount_applied: maxAmount,
                total: maxAmount,
                bill_credit_notes: initialValues,
              }}
              validationSchema={Yup.object({
                amount_applied: Yup.number('must be a number')
                  .positive('must be greater than zero')
                  .max(maxAmount, `must be leass tha ${maxAmount}`)
                  .required('required'),
                bill_credit_notes: Yup.array().of(
                  Yup.object().shape({
                    amount_applied: Yup.number()
                      .min(0, 'Payment Must be greater than 0')
                      .max(maxAmount, `Must be less than ${maxAmount}`)

                      .required('Payment is require'),
                  })
                ),
              })}
              onSubmit={handleApply}
            >
              <Form className="form form--horizontal row justify-content-center">
                <FieldArray
                  name="bill_credit_notes"
                  render={props => <UnPaidBillsList headCells={headCells} {...props} />}
                />
                <FormSubmitButton />
              </Form>
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </StyledDialog>
  );
}
ApplyToBill.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleApply: PropTypes.func.isRequired,
  maxAmount: PropTypes.number,
  initialValues: PropTypes.array,
  headCells: PropTypes.array,
  title: PropTypes.string,
};
ApplyToBill.defaultProps = {
  maxAmount: 0,
  initialValues: [],
  headCells: [],
  title: 'Apply To Bill',
};

export default ApplyToBill;
