import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { getStableSort } from 'utilities/sort';
import MuiTableHead from '../table/MuiTableHead';
import MuiTableBody from '../table/MuiTableBody';

export default function TransactionAccordionWithFilter({
  title,
  fetchData,
  headCells,
  FiltersList,
  addNewRoute,
  keyName,
}) {
  const { id } = useParams();

  const [expanded, setExpanded] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(headCells[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(keyName ? 10 : 5);
  const [filter, setFilter] = useState(' ');

  const handleChangeFilter = event => {
    setFilter(event.target.value);
  };

  const response = fetchData({
    id,
    params: {
      limit: rowsPerPage,
      offset: page,
      status: filter.trim(),
    },
  });
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = e => {
    setPage(0);
    setRowsPerPage(e.target.value);
  };

  const handleChange = () => {
    setExpanded(!expanded);
  };
  const data = keyName ? response?.data?.[keyName] : response?.data?.results;
  const visibleRows = useMemo(
    () => getStableSort(data, order, orderBy, page, rowsPerPage),
    [data, order, orderBy, page, rowsPerPage]
  );

  return (
    <SectionLoader options={[response.isLoading]}>
      <Accordion
        className="transaction-accordion"
        sx={{
          // padding: '10px 0px',
          boxShadow: 'none',
          borderRadius: '0px !important',
          zIndex: 1,
        }}
        expanded={expanded}
        // onChange={handleChange}
      >
        <AccordionSummary>
          <Stack direction="row" sx={{ padding: 2, cursor: 'pointer' }} onClick={handleChange}>
            <ExpandMoreIcon className={`accordion-icon accordion-${expanded ? 'expand' : 'close'}-icon`} />
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: 13, paddingTop: 0.3 }}>
              {title}
            </Typography>
          </Stack>
          <Stack direction="row" position="absolute" top={2} right={10} zIndex={100}>
            {FiltersList && (
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Typography sx={{ fontSize: 10, marginRight: 1 }}>Status:</Typography>
                <FormControl variant="standard" sx={{ fontSize: 8, minWidth: 30 }}>
                  <Select sx={{ fontSize: 10 }} value={filter} onChange={handleChangeFilter}>
                    <MenuItem index value=" ">
                      All
                    </MenuItem>
                    {FiltersList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}
            {addNewRoute && (
              <>
                <Stack sx={{ margin: '0px 3px' }}> | </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <Link to={addNewRoute} style={{ textDecoration: 'none', fontSize: 10, marginRight: 1 }}>
                    Add New
                  </Link>
                </Stack>
              </>
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer sx={{ height: 'auto' }}>
              <Table>
                <MuiTableHead
                  headCells={headCells}
                  numSelected={0}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={0}
                />
                <MuiTableBody dataList={visibleRows} headCells={headCells} selected={[]} />
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={keyName ? response?.data?.[keyName]?.length ?? 0 : response?.data?.count ?? 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </AccordionDetails>
      </Accordion>
    </SectionLoader>
  );
}

TransactionAccordionWithFilter.propTypes = {
  headCells: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  FiltersList: PropTypes.array,
  addNewRoute: PropTypes.string,
  keyName: PropTypes.string,
};
TransactionAccordionWithFilter.defaultProps = {
  FiltersList: null,
  addNewRoute: '',
  keyName: null,
};
