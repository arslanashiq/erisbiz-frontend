import React from 'react';
import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
import { Button, Stack, Toolbar, Typography } from '@mui/material';

function MuiTableToolbar(props) {
  const { numSelected, TableHeading, otherOptions } = props;
  console.log(otherOptions, 'otherOptionsotherOptionsotherOptions');
  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        // ...(numSelected > 0 && {
        //   bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        // }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Stack direction="row" spacing={3} alignItems="center">
            <Button size="small" className="text-capitalize ">
              Edit
            </Button>
            <Button size="small" className="text-capitalize ">
              Delete
            </Button>
            <Button size="small" className="text-capitalize">
              Clear
            </Button>
          </Stack>
          <Typography sx={{ fontSize: 12 }}>{numSelected} Row Selected</Typography>
        </>
      ) : (
        <>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6" id="tableTitle" component="div">
            {TableHeading}
          </Typography>
          <Stack direction="row" spacing={2}>
            {otherOptions.map(option => (
              <Button size="small" className="text-capitalize " onClick={option.handleClick}>
                {option.label}
              </Button>
            ))}
          </Stack>
        </>
      )}
    </Toolbar>
  );
}

MuiTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  TableHeading: PropTypes.string.isRequired,
  otherOptions: PropTypes.arrayOf(PropTypes.object),
};
MuiTableToolbar.defaultProps = {
  otherOptions: [],
};
export default MuiTableToolbar;
