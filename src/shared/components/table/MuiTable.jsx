// /* eslint-disable implicit-arrow-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { ROWS_PER_PAGE } from 'utilities/constants';
import Paper from '@mui/material/Paper';
import MuiTableHead from './MuiTableHead';
import MuiTableBody from './MuiTableBody';
import MuiTableToolbar from './MuiTableToolbar';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export default function MuiTable({
  data,
  TableHeading,
  headCells,
  actionButtonKey,
  showCheckbox,
  handleTableBodyActionButton,
  otherOptions,
}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = data.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEditSelection = () => {};
  const handleClearSelection = () => {
    setSelected([]);
  };

  // Avoid a layout jump when reaching the last page with empty data.
  //   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [data, otherOptions, order, orderBy, page, rowsPerPage]
  );
  return (
    <Box sx={{ width: '100%' }}>
      <MuiTableToolbar
        numSelected={selected.length}
        TableHeading={TableHeading}
        otherOptions={otherOptions}
        handleEditSelection={handleEditSelection}
        handleClearSelection={handleClearSelection}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <MuiTableHead
              showCheckbox={showCheckbox}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              actionButtonKey={actionButtonKey}
            />
            <MuiTableBody
              showCheckbox={showCheckbox}
              dataList={visibleRows}
              headCells={headCells}
              selected={selected}
              handleClick={handleClick}
              actionButtonKey={actionButtonKey}
              handleTableBodyButtonAction={handleTableBodyActionButton}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

MuiTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  TableHeading: PropTypes.string.isRequired,
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleTableBodyActionButton: PropTypes.func,
  actionButtonKey: PropTypes.string,
  showCheckbox: PropTypes.bool,
  otherOptions: PropTypes.arrayOf(PropTypes.object),
};
MuiTable.defaultProps = {
  actionButtonKey: '',
  handleTableBodyActionButton: () => {},
  showCheckbox: false,
  otherOptions: [],
};
