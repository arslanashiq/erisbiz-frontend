import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';
// services
import { useChangeBankAccountStatusMutation, useGetBankAccountsListQuery } from 'services/private/banking';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities and styles
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import ListingOtherOptions from 'utilities/other-options-listing';
import { BankingHeadCells } from '../utilities/head-cells';

function BankListing() {
  const location = useLocation();
  const bankAccountListResponse = useGetBankAccountsListQuery(getsearchQueryOffsetAndLimitParams(location));
  const [handleChangeBankAccountStatus] = useChangeBankAccountStatusMutation();

  return (
    <SectionLoader options={[bankAccountListResponse.isLoading]}>
      <Helmet>
        <title>Banking - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <MuiTable
        data={bankAccountListResponse?.isSuccess ? bankAccountListResponse?.data?.results : []}
        totalDataCount={bankAccountListResponse?.data?.count}
        TableHeading="Banking Overview"
        headCells={BankingHeadCells}
        actionButtonKey="is_active"
        handleTableBodyActionButton={handleChangeBankAccountStatus}
        otherOptions={ListingOtherOptions({ addButtonLabel: 'New Bank Account' })}
      />
    </SectionLoader>
  );
}

export default BankListing;
