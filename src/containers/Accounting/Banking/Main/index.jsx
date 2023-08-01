import React from 'react';
import { useChangeBankAccountStatusMutation, useGetBankAccountsQuery } from 'services/private/banking';
import MuiTable from 'shared/components/table/MuiTable';
import AddIcon from '@mui/icons-material/Add';
import { BankingHeadCells } from 'utilities/tableHeadCells';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import 'styles/mui.scss';

function BankListing() {
  const navigate = useNavigate();
  const resp = useGetBankAccountsQuery();
  const [handleChangeBankAccountStatus] = useChangeBankAccountStatusMutation();
  return (
    <>
      <Helmet>
        <title>Banking - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {resp.isSuccess && resp?.data?.results?.length > 0 && (
        <MuiTable
          data={resp.data.results}
          TableHeading="Banking"
          headCells={BankingHeadCells}
          actionButtonKey="is_active"
          handleTableBodyActionButton={handleChangeBankAccountStatus}
          otherOptions={[
            { label: 'Import Statemanet', handleClick: () => navigate('import') },
            {
              label: (
                <>
                  <AddIcon sx={{ fontSize: 15 }} />
                  New Bank Account
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

export default BankListing;
