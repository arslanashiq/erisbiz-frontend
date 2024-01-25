import React, { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Grid, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import { Form, Formik } from 'formik';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
import getSearchParamsList from 'utilities/getSearchParamsList';
import FormikDatePicker from '../form/FormikDatePicker';
import 'styles/form/form.scss';
import FormikSelect from '../form/FormikSelect';
import FormikField from '../form/FormikField';

function ActionMenu({
  buttonTitle,
  actionsList,
  variant,
  handleAction,
  cutomInitialValues,
  handleSubmitCustomFilter,
  customFilterInputs,
  customInputListValidationSchema,
}) {
  const searchQueryParams = getSearchParamsList();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const renderFilterInput = useCallback(
    (input, values) => {
      if (input.options) {
        return <FormikSelect key={input.name} {...input} />;
      }
      if (input.isDate) {
        if (values?.duration === 'custom' && input?.hidden) {
          return <FormikDatePicker key={input.name} {...input} />;
        }
        if (input?.hidden) {
          return '';
        }
        return <FormikDatePicker key={input.name} {...input} />;
      }

      return <FormikField key={input.name} {...input} />;
    },
    [customFilterInputs]
  );
  const handleSubmit = useCallback(
    (...props) => {
      const [values, { ...rest }] = props;
      let payload = { ...values };
      if (values.duration !== 'custom' && values.duration !== '') {
        customFilterInputs?.forEach(input => {
          if (input.hidden) {
            payload = { ...payload, [input.name]: '' };
          } else {
            payload = { ...payload, [input.name]: values[input.name] };
          }
        });
      }
      handleSubmitCustomFilter(payload, { ...rest }, handleClose, customFilterInputs);
    },
    [customFilterInputs]
  );

  const updatedInitialValues = useMemo(() => {
    let newValues = { ...cutomInitialValues };
    customFilterInputs?.forEach(input => {
      if (searchQueryParams[input.name]) {
        const value = searchQueryParams[input.name]?.replaceAll('%20', ' ')?.replaceAll('+', ' ');
        newValues = {
          ...newValues,
          [input.name]: Number(value) || value,
        };
      }
    });
    if (searchQueryParams?.start_date) {
      newValues = {
        ...newValues,
        start_date: searchQueryParams.start_date,
      };
    }

    return newValues;
  }, [cutomInitialValues, searchQueryParams]);

  return (
    <>
      <Tooltip title={actionsList.length === 0 ? 'You can`t perform any action' : ''} placement="top" arrow>
        <Stack className="no-print">
          <Button
            id="basic-button"
            disabled={actionsList.length === 0}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            variant={variant}
          >
            {buttonTitle} <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
          </Button>
        </Stack>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Stack minWidth={130} maxWidth={630} spacing={2} direction="row">
          <Stack width={buttonTitle === 'Custom' ? 'auto' : '100%'}>
            {actionsList.map(action => (
              <MenuItem
                className="text-capitalize"
                sx={
                  action.divider
                    ? {
                      borderTop: 1,
                      borderColor: 'divider',
                    }
                    : {}
                }
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
            <Stack justifyContent="space-between" className="px-2">
              <Formik
                enableReinitialize
                initialValues={updatedInitialValues}
                onSubmit={handleSubmit}
                validationSchema={
                  customInputListValidationSchema ||
                  Yup.object({
                    duration: Yup.string(),
                  })
                }
              >
                {({ values }) => (
                  <Form className="form " style={{ height: '100%' }}>
                    <Grid height="100%">
                      <Grid container item>
                        {customFilterInputs.map(input => (
                          <Grid key={input?.name} item xs={input.fullWidth ? 12 : 6} width={100}>
                            {renderFilterInput(input, values)}
                          </Grid>
                        ))}
                      </Grid>

                      <FormSubmitButton
                        clearButtonAction={({ values: formValues, ...rest }) => {
                          handleSubmitCustomFilter(
                            { duration: 'this%20month' },
                            { ...rest },
                            handleClose,
                            customFilterInputs
                          );
                        }}
                        clearButtonTitle="Reset"
                        showSaveAndContinue={false}
                      />
                    </Grid>
                  </Form>
                )}
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
  customInputListValidationSchema: PropTypes.object,
};
ActionMenu.defaultProps = {
  buttonTitle: 'Perform Action',
  actionsList: [],
  variant: 'contained',
  handleAction: () => {},
  cutomInitialValues: {},
  handleSubmitCustomFilter: () => {},
  customFilterInputs: [],
  customInputListValidationSchema: null,
};
export default ActionMenu;
