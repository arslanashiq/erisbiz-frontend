import React, { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import formatAmount from 'utilities/formatAmount';
import SectionLoader from 'containers/common/loaders/SectionLoader';

function RenderBalanceSheetRow({ data, padding, getTotalAmount }) {
  const childAccount = data?.child_accounts;
  const [collapse, setCollapse] = useState(true);
  const { totalAmountForCurrentAccount } = useMemo(() => {
    const initTotal = 0;
    const totalValue = data?.child_accounts ? getTotalAmount(data.child_accounts, initTotal) : initTotal;
    return { totalAmountForCurrentAccount: totalValue };
  }, [data]);

  return (
    <SectionLoader condition={!data}>
      <tr>
        <td
          style={{
            border: 'none',
            textAlign: 'start',
            paddingLeft: padding * 20 + 10,
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {childAccount?.length > 0 && collapse && (
            <IndeterminateCheckBoxOutlinedIcon
              sx={{ cursor: 'pointer', fontSize: 14 }}
              onClick={() => setCollapse(!collapse)}
            />
          )}
          {childAccount?.length > 0 && !collapse && (
            <AddBoxOutlinedIcon
              sx={{ cursor: 'pointer', fontSize: 14 }}
              onClick={() => setCollapse(!collapse)}
            />
          )}

          <Link to={`/pages/reports/account-transactions?chart_of_account_id=${data?.id}`}>
            {data.name}
          </Link>
        </td>

        <td style={{ textAlign: 'end', border: 'none' }}>
          {collapse
            ? formatAmount(data.date_range_balance)
            : formatAmount(totalAmountForCurrentAccount + data.date_range_balance || 0)}
        </td>
      </tr>
      {childAccount?.length > 0 &&
        collapse &&
        childAccount.map(item => (
          <RenderBalanceSheetRow
            key={uuid()}
            data={item}
            padding={padding + 1}
            isChild
            parentCollapse={collapse}
            getTotalAmount={getTotalAmount}
          />
        ))}
      {childAccount?.length > 0 && collapse && (
        <tr>
          <td
            style={{
              border: 'none',
              textAlign: 'start',
              paddingLeft: padding + 1 * 20 + 10,
              alignItems: 'center',
              display: 'flex',
              color: 'silver',
            }}
          >
            Total For {data?.name}
          </td>
          <td style={{ textAlign: 'end', color: 'silver', border: 'none' }}>
            {formatAmount(totalAmountForCurrentAccount + data.date_range_balance)}
          </td>
        </tr>
      )}
    </SectionLoader>
  );
}
RenderBalanceSheetRow.propTypes = {
  data: PropTypes.object,
  padding: PropTypes.number.isRequired,
  getTotalAmount: PropTypes.func.isRequired,
};

RenderBalanceSheetRow.defaultProps = {
  data: {},
};

export default RenderBalanceSheetRow;
