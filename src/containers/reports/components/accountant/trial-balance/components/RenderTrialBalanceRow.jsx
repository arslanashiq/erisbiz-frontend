import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

function RenderTrialBalanceRow({ data, padding, isChild = null, totalCredit, totalDebit, parentCollapse }) {
  const childAccount = data?.child_accounts;
  const [collapse, setCollapse] = useState(true);

  return (
    <>
      <tr>
        <td
          style={{
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
          {childAccount?.length > 0 || !isChild ? (
            <Link to={`/pages/reports/account-transactions?chart_of_account_id=${data?.chart_of_account_id}`}>
              {' '}
              {data.chart_of_account}
            </Link>
          ) : (
            data.chart_of_account
          )}
        </td>
        <td style={{ textAlign: 'end', borderLeft: '1px solid grey' }}>
          {data.is_debit ? data.balance : ''}
        </td>
        <td style={{ textAlign: 'end' }}>{data.is_debit ? '' : data.balance}</td>
      </tr>
      {childAccount?.length > 0 &&
        collapse &&
        childAccount.map(item => (
          <RenderTrialBalanceRow
            key={uuid()}
            data={item}
            padding={padding + 1}
            isChild={data.chart_of_account}
            totalDebit={item?.is_debit ? totalDebit + item.balance : totalDebit}
            totalCredit={item?.is_debit ? totalCredit : totalCredit + item.balance}
            parentCollapse={collapse}
          />
        ))}
      {isChild && parentCollapse && (
        <tr>
          <td
            style={{
              textAlign: 'start',
              paddingLeft: padding + 1 * 20 + 10,
              alignItems: 'center',
              display: 'flex',
              color: 'silver',
            }}
          >
            Total For {isChild}
          </td>
          <td style={{ textAlign: 'end', borderLeft: '1px solid grey', color: 'silver' }}>{totalDebit}</td>
          <td style={{ textAlign: 'end', color: 'silver' }}>{totalCredit}</td>
        </tr>
      )}
    </>
  );
}
RenderTrialBalanceRow.propTypes = {
  data: PropTypes.object,
  padding: PropTypes.number.isRequired,
  isChild: PropTypes.string,
  totalCredit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalDebit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parentCollapse: PropTypes.bool,
};

RenderTrialBalanceRow.defaultProps = {
  data: {},
  isChild: '',
  parentCollapse: true,
  totalCredit: null,
  totalDebit: null,
};

export default RenderTrialBalanceRow;
