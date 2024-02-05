/* eslint-disable indent */
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import getSearchParamsList from 'utilities/getSearchParamsList';
import RenderCustomInputs from './RenderCustomInputs';

function ActionMenu({
  hideFilterList,
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

  const handleSubmit = useCallback(
    (...props) => {
      const [values, { ...rest }] = props;
      let payload = { ...values };
      try {
        customFilterInputs?.forEach(input => {
          if (input.hidden) {
            if (input.displayKeyValue?.includes(values[input.displayKey])) {
              payload = { ...payload, [input.name]: values[input.name] };
            } else {
              payload = { ...payload, [input.name]: '' };
            }
          } else {
            payload = { ...payload, [input.name]: values[input.name] };
          }
        });
      } catch (error) {
        payload = { ...values };
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
          {hideFilterList ? (
            <RenderCustomInputs
              updatedInitialValues={updatedInitialValues}
              handleSubmit={handleSubmit}
              customInputListValidationSchema={customInputListValidationSchema}
              customFilterInputs={customFilterInputs}
              handleSubmitCustomFilter={handleSubmitCustomFilter}
              handleClose={handleClose}
            />
          ) : (
            <>
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
                <RenderCustomInputs
                  updatedInitialValues={updatedInitialValues}
                  handleSubmit={handleSubmit}
                  customInputListValidationSchema={customInputListValidationSchema}
                  customFilterInputs={customFilterInputs}
                  handleSubmitCustomFilter={handleSubmitCustomFilter}
                  handleClose={handleClose}
                />
              )}
            </>
          )}
        </Stack>
      </Menu>
    </>
  );
}
ActionMenu.propTypes = {
  buttonTitle: PropTypes.string,
  hideFilterList: PropTypes.bool,
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
  hideFilterList: false,
  actionsList: [],
  variant: 'contained',
  handleAction: () => {},
  cutomInitialValues: {},
  handleSubmitCustomFilter: () => {},
  customFilterInputs: [],
  customInputListValidationSchema: null,
};
export default ActionMenu;
