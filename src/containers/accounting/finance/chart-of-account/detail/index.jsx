import React from 'react';
import { useParams } from 'react-router';
import { useGetSingleChartOfAccountQuery } from 'services/private/chart-of-account';

function ChartOfAccountDetail() {
  const { id } = useParams();
  const charOfAccountDetailResponse = useGetSingleChartOfAccountQuery(id);
  console.log(charOfAccountDetailResponse, 'charOfAccountDetailResponse');
  return <div>ChartOfAccountDetail</div>;
}

export default ChartOfAccountDetail;
