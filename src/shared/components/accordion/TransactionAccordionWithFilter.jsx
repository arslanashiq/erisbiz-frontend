import * as React from 'react';
import PropTypes from 'prop-types';
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
import MuiTableHead from '../table/MuiTableHead';
import MuiTableBody from '../table/MuiTableBody';
import Loader from '../loader/Loader';

export default function TransactionAccordionWithFilter({ title, fetchData, headCells, FiltersList }) {
  const { id } = useParams();

  const [expanded, setExpanded] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = React.useState(' ');

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

  if (response.isLoading) {
    return <Loader />;
  }
  return (
    <Accordion
      className="transaction-accordion"
      sx={{
        padding: '10px 0px',
        boxShadow: 'none',
        borderBottom: 1,
        borderRadius: '0px !important',
        zIndex: 1,
      }}
      expanded={expanded}
      // onChange={handleChange}
    >
      <AccordionSummary>
        <Stack direction="row" sx={{ padding: 2, cursor: 'pointer' }} onClick={handleChange}>
          <ExpandMoreIcon className={`accordion-icon accordion-${expanded ? 'expand' : 'close'}-icon`} />
          <Typography variant="body2" className="font-weight-bold">
            {title}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ position: 'absolute', top: 2, right: 10, zIndex: 100 }}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography sx={{ fontSize: 10 }}>Status:</Typography>
            <FormControl variant="standard" sx={{ fontSize: 8, minWidth: 50 }}>
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
              <MuiTableBody dataList={response?.data?.results} headCells={headCells} selected={[]} />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={response?.data?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
}

TransactionAccordionWithFilter.propTypes = {
  headCells: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  FiltersList: PropTypes.array,
};
TransactionAccordionWithFilter.defaultProps = {
  FiltersList: [],
};
