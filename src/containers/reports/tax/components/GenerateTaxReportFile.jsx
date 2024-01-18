import React, { forwardRef, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, CardContent, Dialog, IconButton, Slide, Stack, Typography } from '@mui/material';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import 'styles/form/form.scss';
import { DATE_FORMAT } from 'utilities/constants';

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

function GenerateTaxReportFile({ title, useMutation }) {
  const [open, setOpen] = useState(false);
  const [addReportFile] = useMutation();
  const handleGenerateAuditFile = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
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
              <Typography>{title}</Typography>
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Formik
              initialValues={{
                start_date: moment().format(DATE_FORMAT),
                end_date: moment().format(DATE_FORMAT),
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await addReportFile(values);
                if (response.error) {
                  setErrors(response.error.data);
                  return;
                }
                handleClose();
              }}
            >
              <Form className="form form--horizontal row">
                <FormikDatePicker name="start_date" label="Start Date" className="col-12" />
                <FormikDatePicker name="end_date" label="End Date" className="col-12" />
                <FormSubmitButton showSaveAndContinue={false} />
              </Form>
            </Formik>
          </CardContent>
        </Card>
      </Dialog>
      <Stack direction="row" justifyContent="end">
        <Button onClick={handleGenerateAuditFile}>{title}</Button>
      </Stack>
    </>
  );
}
GenerateTaxReportFile.propTypes = {
  title: PropTypes.string.isRequired,
  useMutation: PropTypes.func.isRequired,
};
export default GenerateTaxReportFile;
