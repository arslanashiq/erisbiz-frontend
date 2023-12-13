import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, CardContent, Box } from '@mui/material';
// shared
import FormikField from 'shared/components/form/FormikField';
// constiners
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// components
import StyledDialog from 'styles/mui/component/StyledDialog';
import FormikWrapper from 'containers/common/form/FormikWrapper';

function ChangeStatusToVoid({ open, setOpen, handleChangeStatus }) {
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
          <Box>
            <FormikWrapper
              initialValues={{
                reason: '',
              }}
              validationSchema={Yup.object({
                reason: Yup.string().required('reason is required'),
              })}
              onSubmit={handleChangeStatus}
            >
              <FormikField
                textArea
                isRequired
                name="reason"
                label="Reason"
                placeholder="Reason"
                className="col-12 mb-3"
              />

              <FormSubmitButton />
            </FormikWrapper>
          </Box>
        </CardContent>
      </Card>
    </StyledDialog>
  );
}
ChangeStatusToVoid.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default ChangeStatusToVoid;
