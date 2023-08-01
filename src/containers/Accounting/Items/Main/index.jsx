import React from 'react';
import { useChangeItemStatusMutation, useGetItemsListQuery } from 'services/private/items';
import MuiTable from 'shared/components/table/MuiTable';
import AddIcon from '@mui/icons-material/Add';
import { itemsHeadCell } from 'utilities/tableHeadCells';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import 'styles/mui.scss';

function ItemsListing() {
  const navigate = useNavigate();
  const resp = useGetItemsListQuery();
  const [handleChangeItemStatus] = useChangeItemStatusMutation();
  return (
    <>
      <Helmet>
        <title>Items - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {resp.isSuccess && resp?.data?.results?.length > 0 && (
        <MuiTable
          data={resp.data.results}
          TableHeading="Items"
          showCheckbox
          headCells={itemsHeadCell}
          actionButtonKey="is_active"
          handleTableBodyActionButton={handleChangeItemStatus}
          otherOptions={[
            {
              label: (
                <>
                  <AddIcon sx={{ fontSize: 15 }} />
                  Add New Item{' '}
                </>
              ),
              handleClick: () => navigate('add'),
            },
          ]}
        />
      )}
    </>
  );
}

export default ItemsListing;
