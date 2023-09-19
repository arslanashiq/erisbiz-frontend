import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import InfoPopup from 'shared/modals/InfoPopup';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { ROWS_PER_PAGE } from 'utilities/constants';
import { getComparator, stableSort } from 'utilities/sort';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import MuiTableHead from './MuiTableHead';
import MuiTableBody from './MuiTableBody';
import MuiTableToolbar from './MuiTableToolbar';

export default function MuiTable({
  data,
  TableHeading,
  headCells,
  actionButtonKey,
  showCheckbox,
  handleTableBodyActionButton,
  otherOptions,
  handleEdit,
  handleDelete,
  handleConfirmDelete,
  filterButton,
  totalDataCount,
  customRows,
  customActionButton,
  hoverEffect,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [openInfoPopup, setOpenInfoPopup] = useState({
    status: false,
    message: null,
    actionButton: false,
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = data.map(n => n.uuid || n.id || n.uid);
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
    const search = new URLSearchParams(location.search);
    search.set('offset', newPage);
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    const search = new URLSearchParams(location.search);
    search.set('offset', '0');
    search.set('limit', parseInt(event.target.value, 10));
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };
  const handleCloseInfoPopup = () => {
    setOpenInfoPopup({ ...openInfoPopup, status: false });
  };

  const handleClearSelection = () => {
    setSelected([]);
  };
  const handleGetPaginationData = () => {
    const filters = getsearchQueryOffsetAndLimitParams(location);
    return filters;
  };
  const handleEditSelection = () => {
    if (handleEdit) {
      handleEdit(data, selected, openInfoPopup, setOpenInfoPopup);
    } else {
      navigate(`edit/${selected[0]}`);
    }
  };

  const visibleRows = useMemo(
    () => stableSort(data || [], getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [data, otherOptions, order, orderBy, page, rowsPerPage]
  );
  return (
    <SectionLoader options={[data === undefined, data === null]}>
      <Box sx={{ width: '100%' }}>
        <InfoPopup
          open={openInfoPopup.status}
          handleClose={handleCloseInfoPopup}
          infoDescription={openInfoPopup.message}
          showActionButton={openInfoPopup.actionButton}
          handleYes={() => {
            handleConfirmDelete(selected);
            handleClearSelection();
          }}
        />
        {TableHeading && (
          <MuiTableToolbar
            filterButton={filterButton}
            numSelected={selected?.length || 0}
            TableHeading={TableHeading}
            otherOptions={otherOptions}
            handleEditSelection={handleEditSelection}
            handleClearSelection={handleClearSelection}
            handleDeleteSelection={() => handleDelete(data, selected, openInfoPopup, setOpenInfoPopup)}
          />
        )}
        <Paper>
          <TableContainer>
            <Table stickyHeader size="small" sx={{ minWidth: 650 }}>
              <MuiTableHead
                showCheckbox={showCheckbox}
                headCells={headCells}
                numSelected={selected?.length || 0}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data?.length || 0}
                actionButtonKey={actionButtonKey}
                customActionButton={customActionButton}
              />
              <MuiTableBody
                showCheckbox={showCheckbox}
                dataList={visibleRows}
                headCells={headCells}
                selected={selected}
                handleClick={handleClick}
                actionButtonKey={actionButtonKey}
                handleTableBodyButtonAction={handleTableBodyActionButton}
                customRows={customRows}
                customActionButton={customActionButton}
                hoverEffect={hoverEffect}
              />
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={totalDataCount}
            rowsPerPage={handleGetPaginationData().limit || ROWS_PER_PAGE}
            page={handleGetPaginationData().offset}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </SectionLoader>
  );
}

MuiTable.propTypes = {
  data: PropTypes.array,
  TableHeading: PropTypes.string,
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleTableBodyActionButton: PropTypes.func,
  actionButtonKey: PropTypes.string,
  showCheckbox: PropTypes.bool,
  otherOptions: PropTypes.arrayOf(PropTypes.object),
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleConfirmDelete: PropTypes.func,
  filterButton: PropTypes.element,
  totalDataCount: PropTypes.number,
  // tableHeight: PropTypes.string,
  customRows: PropTypes.array,
  customActionButton: PropTypes.array,
  hoverEffect: PropTypes.bool,
};
MuiTable.defaultProps = {
  data: null,
  actionButtonKey: '',
  TableHeading: '',
  handleTableBodyActionButton: () => {},
  showCheckbox: false,
  otherOptions: [],
  handleDelete: () => {},
  handleConfirmDelete: () => {},
  handleEdit: null,
  filterButton: null,
  totalDataCount: ROWS_PER_PAGE,
  // tableHeight: '65vh',
  customRows: null,
  customActionButton: null,
  hoverEffect: true,
};
