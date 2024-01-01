import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
// services
import { useGetBankAccountsListQuery } from 'services/private/banking';
import { useAddTaxReturnPaymentMutation } from 'services/private/tax-returns';
// shared
import FormikField from 'shared/components/form/FormikField';
import FormikSelect from 'shared/components/form/FormikSelect';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
// containers
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// styles
import StyledDialog from 'styles/mui/component/StyledDialog';
import {
  addTaxPaymentFormChildWrapperStyle,
  addTaxPaymentFormParentWrapperStyle,
  fontWeightBold,
} from 'styles/mui/container/accounting/finance/tax-returns/listing/components/add-tax-payment-modal';
import { taxPaymentsInitialValues } from '../../utilities/initial-values';
import 'styles/form/form.scss';

function AddTaxPaymentsModal({ open, handleClose, selectedTax }) {
  const bankAccountResponse = useGetBankAccountsListQuery();

  const { optionsList: bankAccountOptions } = useListOptions(
    bankAccountResponse?.data?.results,
    {
      value: 'chart_of_account',
      label: 'bank_account_name',
    },
    ['swift_code', 'bank_name', 'account_number', 'IBAN']
  );

  const [addTaxPayment] = useAddTaxReturnPaymentMutation();

  const updatedTaxPaymentsInitialValues = useMemo(
    () => ({
      ...taxPaymentsInitialValues,
      amount_applied: selectedTax?.amount_due,
      tax_return_id: selectedTax.id,
    }),
    [taxPaymentsInitialValues, selectedTax]
  );

  const handleSubmitData = useCallback(async (values, { setErrors }) => {
    const response = await addTaxPayment(values);
    if (response.error) {
      setErrors(response.error.data);
    }
    handleClose();
  }, []);

  return (
    <StyledDialog
      maxWidth={false}
      open={open}
      onClose={handleClose}
      className="theme-light modal-dialog--custom-max-width"
    >
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Record Payments</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Formik
            enableReinitialize
            initialValues={updatedTaxPaymentsInitialValues}
            onSubmit={handleSubmitData}
          >
            <Form className="form form--horizontal row mt-3">
              <FormikSelect
              //  placeholder="Paid Through"
                name="paid_through_account"
                options={bankAccountOptions}
                label="Paid Through"
                className="col-12"
              />
              <Stack {...addTaxPaymentFormParentWrapperStyle}>
                <Stack {...addTaxPaymentFormChildWrapperStyle} spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={fontWeightBold}>Total Payable Tax</Typography>
                    <Typography sx={fontWeightBold}>{selectedTax?.total_tax_payable}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={fontWeightBold}>Amount Due</Typography>
                    <Typography sx={fontWeightBold}>{selectedTax?.amount_due}</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <FormikField
                name="amount_applied"
                type="number"
              //  placeholder="Amount Paid"
                label="Amount Paid"
                className="col-12"
              />
              <FormikDatePicker
                name="payment_date"
                label="Payment Date"
              //  placeholder="Payment Date"
                className="col-12"
              />
              <FormikField
                name="reference_num"
                label="Reference Number"
              //  placeholder="Reerence Number"
                className="col-12"
              />
              <FormikField
                name="notes"
                textArea
                label="Payment Note"
              //  placeholder="Payment Note"
                className="col-12"
              />

              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </StyledDialog>
  );
}

AddTaxPaymentsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedTax: PropTypes.object,
};
AddTaxPaymentsModal.defaultProps = {
  selectedTax: {},
};
export default AddTaxPaymentsModal;
