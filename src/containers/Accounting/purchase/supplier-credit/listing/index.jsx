import React from 'react';
import { Helmet } from 'react-helmet';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router';
import { useGetSupplierCreditsListQuery } from 'services/private/debit-note';
import MuiTable from 'shared/components/table/MuiTable';
import { getsearchQueryOffsetAndLimitParams } from 'utilities/filters';
import { supplierCreditHeadCells } from 'utilities/tableHeadCells';

function SupplierCreditListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const supplierCreditResponse = useGetSupplierCreditsListQuery(getsearchQueryOffsetAndLimitParams(location));
  return (
    <>
      <Helmet>
        <title>Debit Notes - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      {/* {resp.isSuccess && resp?.data?.results?.length > 0 && ( */}
      <MuiTable
        data={supplierCreditResponse?.data?.results}
        totalDataCount={supplierCreditResponse?.data?.count}
        TableHeading="Debit Notes"
        showCheckbox
        headCells={supplierCreditHeadCells}
        otherOptions={[
          {
            label: (
              <>
                <AddIcon sx={{ fontSize: 15 }} />
                New Debit Note
              </>
            ),
            handleClick: () => navigate('add'),
          },
        ]}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
        // handleConfirmDelete={handleConfirmDelete}
      />
      {/* )} */}
    </>
  );
}

export default SupplierCreditListing;
