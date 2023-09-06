import React from 'react';
import { useParams } from 'react-router';
import { useGetSingleCustomerQuery } from 'services/private/customers';

function CustomerDetail() {
  const { id } = useParams();
  const customerDetailResponse = useGetSingleCustomerQuery(id);
  console.log(customerDetailResponse, 'alksjdlkadjakdlkjdsa');
  return <div>CustomerDetail</div>;
}

export default CustomerDetail;
