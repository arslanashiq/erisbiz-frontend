import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
import { Box, Button, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterDrawer from '../drawer/FilterDrawer';

function MuiTableToolbar(props) {
  const {
    numSelected,
    TableHeading,
    otherOptions,
    handleClearSelection,
    handleDeleteSelection,
    handleEditSelection,
    filterButton,
  } = props;

  const [openFiterDrawer, setOpenFiterDrawer] = useState(false);
  const handleOpenFilterDrawer = () => {
    setOpenFiterDrawer(true);
  };
  return (
    <>
      {filterButton && (
        <FilterDrawer open={openFiterDrawer} setOpen={setOpenFiterDrawer}>
          {filterButton}
        </FilterDrawer>
      )}

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
              {numSelected === 1 && (
                <Button onClick={handleEditSelection} size="small" className="text-capitalize ">
                  Edit
                </Button>
              )}
              <Button onClick={handleDeleteSelection} size="small" className="text-capitalize ">
                Delete
              </Button>
              <Button onClick={handleClearSelection} size="small" className="text-capitalize">
                Clear
              </Button>
            </Stack>
            <Typography sx={{ fontSize: 12 }}>{numSelected} Row Selected</Typography>
          </>
        ) : (
          <Box className="row w-100">
            <Box className="col-md-6">
              <Typography sx={{ fontWeight: 'bold' }} variant="h6" id="tableTitle">
                {TableHeading}
              </Typography>
            </Box>
            <Box className="col-md-6 d-flex justify-content-md-end mb-3 mb-md-0 p-0">
              <Stack direction="row" spacing={2}>
                {filterButton && (
                  <Tooltip title="Search" arrow placement="top">
                    <Button size="small" className="text-capitalize " onClick={handleOpenFilterDrawer}>
                      <SearchIcon />
                    </Button>
                  </Tooltip>
                )}
                {otherOptions.map(option => (
                  <Button
                    key={option.label}
                    size="small"
                    className="text-capitalize "
                    onClick={option.handleClick}
                  >
                    {option.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Box>
        )}
      </Toolbar>
    </>
  );
}

MuiTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  TableHeading: PropTypes.string.isRequired,
  otherOptions: PropTypes.arrayOf(PropTypes.object),
  handleClearSelection: PropTypes.func.isRequired,
  handleEditSelection: PropTypes.func.isRequired,
  handleDeleteSelection: PropTypes.func.isRequired,
  filterButton: PropTypes.element,
};
MuiTableToolbar.defaultProps = {
  otherOptions: [],
  filterButton: null,
};
export default MuiTableToolbar;
