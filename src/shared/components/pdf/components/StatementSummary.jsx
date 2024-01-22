/* eslint-disable no-unused-vars */
import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import formatAmount from 'utilities/formatAmount';
import palette from 'styles/mui/theme/palette';

const BORDER_COLOR = 'lightgray';
const BORDER_STYLE = '1px solid lightgray';
const COL1_WIDTH = 25;
const COLN_WIDTH = (100 - COL1_WIDTH - 6) / 6;
const boldFont = {
  fontFamily: 'Lato Bold',
};

const containerStyle = {
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const textStyle = { fontSize: 10 };
const marginBetweenSummary = { marginTop: 10 };

const tableHeaderCells = [
  { label: 'Date', styles: { minWidth: 110 } },
  { label: 'Transactions', styles: { minWidth: 110 } },
  { label: 'Details', styles: { minWidth: 110 } },
  { label: 'Amount', styles: { minWidth: 110 } },
  { label: 'Payments', styles: { minWidth: 110 } },
  { label: 'Balance', styles: { minWidth: 110 } },
];
function StatementSummary({ statementInfo, statementTransactions }) {
  const { accountSummaryList = [] } = statementInfo;
  return (
    <View>
      {/* <View
        style={{
          ...containerStyle,
          justifyContent: 'flex-end',
          marginBottom: 5,
          textAlign: 'right',
        }}
      >
        <View style={{ width: 180 }}>
          <Text>Statement of Accounts</Text>
          <View
            style={{
              marginTop: 3,
              borderBottom: '1px solid silver',
            }}
          />
          <Text
            style={{
              ...textStyle,
              padding: '3px 0px',
            }}
          >
            22 jan 2024 To 22 jan 2024
          </Text>
          <View
            style={{
              borderBottom: '1px solid silver',
            }}
          />
        </View>
      </View> */}
      <View
        style={{
          ...containerStyle,
        }}
      >
        <Text style={textStyle}>To : {statementInfo?.supplierName}</Text>

        <View style={{ minWidth: 300 }}>
          <Text
            style={{
              ...boldFont,
              fontSize: 12,
            }}
          >
            Account Summary
          </Text>
          {accountSummaryList.map(summary => (
            <View style={{ ...containerStyle, ...marginBetweenSummary }} key={summary}>
              <Text style={textStyle}>{summary.label}</Text>
              <Text style={textStyle}>{formatAmount(summary?.value || 0)}</Text>
            </View>
          ))}
          <View
            style={{
              ...marginBetweenSummary,
              borderBottom: '1px solid silver',
            }}
          />
          <View style={{ ...containerStyle, ...marginBetweenSummary }}>
            <Text style={textStyle}>Amount Due</Text>
            <Text style={textStyle}>{formatAmount(statementInfo?.totalBalanceDue)}</Text>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            backgroundColor: palette.primary.main,
          }}
        >
          {tableHeaderCells?.map(cell => (
            <Text
              style={{
                color: 'white',

                padding: '5px 5px',
                borderRadius: 10,
                ...boldFont,
                ...textStyle,
              }}
              key={cell}
            >
              {cell.label}
            </Text>
          ))}
        </View>

        {statementTransactions?.length > 0 ? (
          statementTransactions.map(transaction => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid silver',
                padding: 3,
              }}
              key={uuid()}
            >
              <Text
                style={{
                  fontSize: 9,
                  padding: '5px 5px',
                  width: 110,
                  ...textStyle,
                }}
              >
                {transaction.date}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  padding: '5px 5px',
                  width: 110,
                }}
              >
                {transaction.transactions}
              </Text>

              <Text
                style={{
                  fontSize: 9,
                  padding: '5px 5px',
                  width: 110,
                }}
              >
                {transaction.details}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  padding: '5px 5px',
                  width: 110,
                }}
              >
                {formatAmount(transaction?.amount || '')}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  padding: '5px 5px',
                  width: 110,
                }}
              >
                {formatAmount(transaction?.payment || '')}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  padding: '5px 5px',
                  width: 110,
                }}
              >
                {formatAmount(transaction?.balance || '')}
              </Text>
            </View>
          ))
        ) : (
          <Text
            style={{
              fontSize: 10,
              padding: '5px 5px',
              borderRadius: 10,
              textAlign: 'center',
            }}
          >
            No Transactions Avaliable{' '}
          </Text>
        )}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <View style={{ ...containerStyle, width: 200, padding: '10px 20px' }}>
          <Text style={{ ...textStyle, ...boldFont }}>Balance Due</Text>
          <Text style={{ ...textStyle, ...boldFont }}>{statementInfo?.totalBalanceDue}</Text>
        </View>
      </View>
    </View>
  );
}

StatementSummary.propTypes = {
  statementInfo: PropTypes.object,
  statementTransactions: PropTypes.array,
};
StatementSummary.defaultProps = {
  statementInfo: {},
  statementTransactions: [],
};
export default StatementSummary;
