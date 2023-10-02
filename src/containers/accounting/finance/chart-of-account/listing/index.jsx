import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';

import { Paper, Table, TableBody, TableContainer } from '@mui/material';
// services
import {
  useDeleteChartOfAccountMutation,
  useGetChartOfAccountListQuery,
} from 'services/private/chart-of-account';
// shared
import InfoPopup from 'shared/modals/InfoPopup';
import MuiTableHead from 'shared/components/table/MuiTableHead';
import MuiTableToolbar from 'shared/components/table/MuiTableToolbar';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { chartOfAccountHeadCells } from '../utilities/head-cells';
// components
import RenderChartOfAccount from './components/RenderChartOfAccount';
import transformDataInNestedStructure from '../utilities/transformDataInNestedStructure';

function ChartOfAccountListing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [selected, setSelected] = useState([]);

  const [openInfoPopup, setOpenInfoPopup] = useState({
    status: false,
    message: null,
    actionButton: false,
  });

  const chartOfAccountListResponse = useGetChartOfAccountListQuery(location.search);
  const [deleteChartOfAccount] = useDeleteChartOfAccountMutation();

  const getAllUnlockedAcocunt = useMemo(
    accountList => {
      let newSelected = [];
      if (!accountList) return [];
      accountList.forEach(n => {
        const id = n.uuid || n.id || n.uid;
        if (!n.is_locked) {
          newSelected.push(id);
        }
        if (n.child_accounts) newSelected = [...newSelected, ...getAllUnlockedAcocunt(n.child_accounts)];
      });
      return newSelected;
    },
    [chartOfAccountListResponse]
  );
  const handleClearSelection = () => {
    setSelected([]);
  };
  const handleSelectAll = event => {
    if (event.target.checked) {
      const newSelected = getAllUnlockedAcocunt(chartOfAccountListResponse.data.results);
      setSelected(newSelected);
      return;
    }
    handleClearSelection();
  };
  const handleClickSingleRow = (event, name) => {
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

  const handleEditSelection = () => {
    navigate(`edit/${selected[0]}`);
  };
  const handleCloseInfoPopup = () => {
    setOpenInfoPopup({ ...openInfoPopup, status: false });
  };
  const handleDelete = () => {
    let message =
      'You cannot delete these items because some of the selected items is used in Performa Invoiced';
    let actionButton = false;

    message = 'Are you sure you want to delete?';
    actionButton = true;

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  };
  const deleteSingleChartOfAccount = async id => {
    await deleteChartOfAccount(id);
    enqueueSnackbar('Journal Voucher Deleted Successfully', { variant: 'success' });
  };
  const handleConfirmDelete = list => {
    list.forEach(id => {
      deleteSingleChartOfAccount(id);
    });
  };
  const updatedChartOfAccounts = useMemo(
    () => transformDataInNestedStructure(chartOfAccountListResponse?.data?.results),
    [chartOfAccountListResponse]
  );
  return (
    <SectionLoader options={[chartOfAccountListResponse.isLoading]}>
      <Helmet>
        <title>Chart Of Account - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
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
      <MuiTableToolbar
        numSelected={selected?.length || 0}
        TableHeading="Chart Of Account"
        handleEditSelection={handleEditSelection}
        handleClearSelection={handleClearSelection}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Chart of Account
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        handleDeleteSelection={handleDelete}
      />
      <Paper>
        <TableContainer sx={{ maxHeight: '74vh' }}>
          <Table stickyHeader size="small" sx={{ minWidth: 650 }}>
            <MuiTableHead
              rowCount={updatedChartOfAccounts?.length}
              showCheckbox
              numSelected={selected.length}
              headCells={chartOfAccountHeadCells}
              onSelectAllClick={handleSelectAll}
            />
            <TableBody>
              <RenderChartOfAccount
                chartOfAccounts={updatedChartOfAccounts}
                selected={selected}
                onSelectAllClick={handleSelectAll}
                handleClick={handleClickSingleRow}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </SectionLoader>
  );
}

export default ChartOfAccountListing;
