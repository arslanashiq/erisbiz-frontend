/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import CustomeReportTableHead from 'shared/components/custom-report/CustomeReportTableHead';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import { sortDataByType } from 'containers/reports/utilities/sort-data-by-type';
import { getSelectedFilter } from 'containers/reports/utilities/get-selected-filter';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
import transformDataInNestedStructure from 'containers/accounting/finance/chart-of-account/utilities/transformDataInNestedStructure';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';
import 'styles/reports/custom-report.scss';

// const accountTypesList = ['Asset', 'Liability', 'Income', 'Expense'];

function RenderRow({ data, padding, isChild, totalCredit, totalDebit }) {
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
            <Link to="/"> {data.chart_of_account}</Link>
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
          <RenderRow
            data={item}
            padding={padding + 1}
            isChild
            totalCredit={item?.is_debit ? totalDebit : totalCredit + item.balance}
            totalDebit={item?.is_debit ? totalDebit + item.balance : totalDebit}
          />
        ))}
      {childAccount?.length > 0 && collapse && (
        <tr>
          <td
            style={{
              textAlign: 'start',
              paddingLeft: padding + 1 * 20 + 10,
              alignItems: 'center',
              display: 'flex',
            }}
          >
            Total For {data.chart_of_account}
          </td>
          <td style={{ textAlign: 'end', borderLeft: '1px solid grey' }}>{totalDebit}</td>
          <td style={{ textAlign: 'end' }}>{totalCredit}</td>
        </tr>
      )}
    </>
  );
}
function CustomCollapseAbleReport({ reportTitle, reportHeadCells, useGetReportQuery }) {
  const location = useLocation();
  const reportResponse = useGetReportQuery(location.search);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();
  const startDate = moment(reportResponse?.data?.start_date).format(DATE_FILTER_REPORT);
  const endDate = moment(reportResponse?.data?.end_date).format(DATE_FILTER_REPORT);
  const timeInterval = `From ${startDate} To ${endDate}`;
  const hirericalResponse = transformDataInNestedStructure(reportResponse?.data?.data, 'chart_of_account_id');
  const sortedResponse = sortDataByType(hirericalResponse);
  console.log(sortedResponse, 'hirericalResponse');
  return (
    <SectionLoader options={[false]}>
      <ReportsHeader
        reportTitle={reportTitle}
        tableHeader={reportHeadCells}
        tableBody={[]}
        tableFooter={[]}
        initialFilterValue={getSelectedFilter(FilterReportsList)}
        filterList={FilterReportsList}
        handleSubmitCustomDateFilter={handleSubmitCustomDateFilter}
        handleChangeFilter={handleChangeFilter}
        customFilterInitialValues={PayableReportFilterInitialValues}
        customFilterInputsList={payableReportsFilterInputList}
      />
      <Card className="custom-receipt-main-container">
        <CardContent>
          <CustomReportsDetailHeader reportTitle={reportTitle} filterInfo={timeInterval} />

          <div className="overflow-auto">
            <table className="table1 w-100  ">
              <CustomeReportTableHead tableHeader={reportHeadCells} />
              {Object.keys(sortedResponse).map(type => (
                <>
                  <tr>
                    <td style={{ textAlign: 'start' }}>{type}</td>
                    <td colSpan={2}> </td>
                  </tr>
                  {sortedResponse[type]?.map(item => (
                    <RenderRow
                      data={item}
                      padding={0}
                      totalCredit={item?.is_debit ? 0 : item.balance}
                      totalDebit={item?.is_debit ? item.balance : 0}
                    />
                  ))}
                </>
              ))}
            </table>
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default CustomCollapseAbleReport;
