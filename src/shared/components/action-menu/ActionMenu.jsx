import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import FormikDatePicker from '../form/FormikDatePicker';
import 'styles/form/form.scss';

function ActionMenu({
  buttonTitle,
  actionsList,
  variant,
  handleAction,
  cutomInitialValues,
  handleSubmitCustomFilter,
  customFilterInputs,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="text-capitalize"
        variant={variant}
      >
        {buttonTitle} <KeyboardArrowDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Stack sx={{ minWidth: 130 }} spacing={2} direction="row">
          <Stack>
            {actionsList.map(action => (
              <MenuItem
                className="text-capitalize"
                key={action.label}
                onClick={() => {
                  if (action.handleClick) {
                    handleClose();
                    action.handleClick(action.label);
                  }
                  handleAction(action, handleClose);
                }}
              >
                {action.label}
              </MenuItem>
            ))}
          </Stack>
          {buttonTitle === 'Custom' && (
            <Stack justifyContent="space-between" className="pe-2">
              <Formik
                initialValues={cutomInitialValues}
                onSubmit={(...props) => handleSubmitCustomFilter(...props, handleClose)}
              >
                <Form className="form ">
                  {customFilterInputs.map(input => (
                    <FormikDatePicker key={input.name} {...input} />
                  ))}
                  <FormSubmitButton />
                </Form>
              </Formik>
            </Stack>
          )}
        </Stack>
      </Menu>
    </>
  );
}
ActionMenu.propTypes = {
  buttonTitle: PropTypes.string,
  actionsList: PropTypes.array,
  variant: PropTypes.string,
  handleAction: PropTypes.func,
  cutomInitialValues: PropTypes.object,
  handleSubmitCustomFilter: PropTypes.func,
  customFilterInputs: PropTypes.array,
};
ActionMenu.defaultProps = {
  buttonTitle: 'Perform Action',
  actionsList: [],
  variant: 'contained',
  handleAction: () => {},
  cutomInitialValues: {},
  handleSubmitCustomFilter: () => {},
  customFilterInputs: [],
};
export default ActionMenu;
