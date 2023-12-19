import React, { forwardRef, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, CardContent, Dialog, IconButton, Slide, Stack, Typography } from '@mui/material';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import 'styles/form/form.scss';
import moment from 'moment';
import { DATE_FORMATE_ADD } from 'utilities/constants';

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

function ChangeTaxReturnStatus({ status, open, setOpen, handleSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Stack
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{status ? 'Mark as Unfiled' : 'Mark as Filed'}</Typography>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {status ? (
            <Stack spacing={2} mt={2} alignItems="center" justifyContent="center">
              <Typography fontSize={12}>Are you sure you want to mark this tax return as unfiled?</Typography>
              <Stack spacing={2} direction="row">
                <Button color="secondary" onClick={handleClose}>
                  No
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    await handleSubmit({ filed_on: null, status: 'unfiled' }, {});
                    setIsLoading(false);
                  }}
                >
                  Yes
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Formik
              validationSchema={Yup.object({
                // filed_on: Yup.date().max(new Date(), 'Filing date must be uptil today').required('Required'),
              })}
              initialValues={{
                filed_on: moment().format(DATE_FORMATE_ADD),
                status: 'filed',
              }}
              onSubmit={handleSubmit}
            >
              <Form className="form form--horizontal row">
                <FormikDatePicker name="filed_on" label="Start Date" className="col-12" />
                <FormSubmitButton submitButtonTitle="Continue" />
              </Form>
            </Formik>
          )}
        </CardContent>
      </Card>
    </Dialog>
  );
}
ChangeTaxReturnStatus.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  status: PropTypes.bool,
};
ChangeTaxReturnStatus.defaultProps = {
  status: false,
};
export default ChangeTaxReturnStatus;
