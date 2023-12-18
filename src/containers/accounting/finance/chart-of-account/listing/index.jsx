import React, { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
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
// utilities and styles
import ListingOtherOptions from 'utilities/other-options-listing';
import { handleDeleteResponse } from 'utilities/delete-action-handler';
import { chartOfAccountHeadCells } from '../utilities/head-cells';
import transformDataInNestedStructure from '../utilities/transformDataInNestedStructure';
import RenderChartOfAccount from './components/RenderChartOfAccount';

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

  const getAllUnlockedAcocunt = useCallback(
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
  const handleClearSelection = useCallback(() => {
    setSelected([]);
  }, [selected]);
  const handleSelectAll = useCallback(
    event => {
      if (event.target.checked) {
        const newSelected = getAllUnlockedAcocunt(chartOfAccountListResponse?.data?.results);
        setSelected(newSelected);
        return;
      }
      handleClearSelection();
    },
    [chartOfAccountListResponse]
  );
  const handleClickSingleRow = useCallback(
    (event, name) => {
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
    },
    [selected]
  );
  const handleEditSelection = useCallback(() => {
    navigate(`edit/${selected[0]}`);
  }, [selected]);
  const handleCloseInfoPopup = useCallback(() => {
    setOpenInfoPopup({ ...openInfoPopup, status: false });
  }, []);
  const handleDelete = useCallback(() => {
    let message =
      'You cannot delete these items because some of the selected items is used in Proforma Invoice';
    let actionButton = false;

    message = 'Are you sure you want to delete?';
    actionButton = true;

    setOpenInfoPopup({
      ...openInfoPopup,
      status: true,
      message,
      actionButton,
    });
  }, []);

  const handleConfirmDelete = useCallback(list => {
    list.forEach(id => {
      handleDeleteResponse(
        deleteChartOfAccount,
        id,
        enqueueSnackbar,
        'Chart of Account Deleted Successfully'
      );
    });
  }, []);
  const updatedChartOfAccounts = useMemo(
    () => transformDataInNestedStructure(chartOfAccountListResponse?.data?.results),
    [chartOfAccountListResponse]
  );

  return (
    <SectionLoader options={[chartOfAccountListResponse.isLoading]}>
      <Helmet>
        <title>Chart of Accounts - ErisBiz</title>
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
        TableHeading="Chart of Accounts"
        numSelected={selected?.length || 0}
        handleEditSelection={handleEditSelection}
        handleClearSelection={handleClearSelection}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Chart of Account' })}
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
