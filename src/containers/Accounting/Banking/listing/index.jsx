import React from 'react';
import { useChangeBankAccountStatusMutation, useGetBankAccountsListQuery } from 'services/private/banking';
import MuiTable from 'shared/components/table/MuiTable';
import AddIcon from '@mui/icons-material/Add';
import { BankingHeadCells } from 'utilities/tableHeadCells';
import { useLocation, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import 'styles/mui.scss';

function BankListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const bankAccountListResponse = useGetBankAccountsListQuery(getsearchQueryOffsetAndLimitParams(location));
  const [handleChangeBankAccountStatus] = useChangeBankAccountStatusMutation();
  return (
    <>
      <Helmet>
        <title>Banking - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {/* {bankAccountListResponse.isSuccess && bankAccountListResponse?.data?.results?.length > 0 && ( */}
      <MuiTable
        data={bankAccountListResponse?.data?.results}
        totalDataCount={bankAccountListResponse?.data?.count}
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
      {/* )} */}
    </>
  );
}

export default BankListing;
