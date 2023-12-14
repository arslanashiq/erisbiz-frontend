/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */

import React, { useMemo } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router';
import {
  Box,
  Button,
  Card,
  CardContent,
  DialogContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// services
import { useGetActivityLogsDetailQuery } from 'services/private/reports';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import {
  // bankDetailPopupInfoBodyStyle,
  bankDetailPopupInfoTitleStyle,
} from 'styles/mui/container/accounting/banking/detail/components/bank-detail-popup';

// contant
const inValidKeys = [
  'uid',
  'id',
  'created_by',
  'created_at',
  'created_by_employee_name',
  'currency',
  'updated_at',
  'updated_by',
  'brand_num',
  'cost_account',
  'inventory_coa',
  'sale_account',
  'cost_account_label',
  'sale_account_label',
  'inventory_coa_label',
  'item_sale_amount_prefix',
  'item_cost_amount_prefix',
  'is_active',
  'is_digital_service',
  'is_item_used',
  'is_tracking_inventory',
  'opening_stock_per_unit',
  'current_value',
  'dynamic_opening_stock',
  'dynamic_opening_stock_per_unit',
  'limit',
  'opening_balance',
  'is_credit',
  'transaction_num',
  'exchange_rate',
  'credit_limit',
  'credit_terms',
];
const validKeyName = {
  set_credit_limit: 'Credit Limit',
  set_credit_terms: 'Credit Terms',
  is_import_agent: 'Important Agent',
  is_reverse_charge: 'Reverse Charge',
};
const tableCellStyle = {
  border: '1px solid silver',
};
function ActivityLogsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: activityData, isLoading } = useGetActivityLogsDetailQuery(id);
  const activityDetail = useMemo(() => {
    if (!activityData?.results) return {};
    // POST METHOD
    if (activityData?.results?.data?.request_method === 'POST') {
      return { ...activityData?.results?.data, payload: JSON.stringify(activityData?.results?.payload) };
    }
    if (activityData?.results?.data?.request_method === 'DELETE') {
      return { ...activityData?.results?.data, payload: JSON.stringify(activityData?.results?.payload) };
    }
    if (
      activityData?.results?.data?.request_method === 'PATCH' ||
      activityData?.results?.request_method === 'PUT'
    ) {
      return {
        ...activityData?.results?.data,
        payload: JSON.stringify(activityData?.results?.new_payload),
        old_payload: JSON.stringify(activityData?.results?.old_payload),
      };
    }
  }, [activityData]);
  // const getDomain = endpointValue => {
  //   let domain = '';
  //   try {
  //     if (endpointValue?.includes('/api')) {
  //       [domain] = endpointValue.split('/api');
  //     }
  //   } catch (error) {
  //     domain = '';
  //   }
  //   return domain;
  // };
  // const getEndpoint = endpointValue => {
  //   let endpoint = endpointValue;
  //   try {
  //     if (endpoint?.includes('/api')) {
  //       [, endpoint] = endpoint.split('/api');
  //     }
  //     if (endpoint?.includes('?')) {
  //       [endpoint] = endpoint.split('?');
  //     }
  //     return `api${endpoint}`;
  //   } catch (error) {
  //     return '';
  //   }
  // };

  // const getqueryParams = endpointValue => {
  //   let queryParams = '';
  //   try {
  //     if (endpointValue?.includes('?')) {
  //       [, queryParams] = endpointValue.split('?');
  //     }
  //   } catch (error) {
  //     queryParams = '';
  //   }
  //   return queryParams;
  // };

  const activityDetailInfo = useMemo(() => {
    const data = [];
    data.push({ label: 'User Name', value: activityDetail?.user });
    data.push({
      label: 'Action Date',
      value: moment(activityDetail?.datetime).format('DD-MMMM-YYYY'),
    });
    data.push({ label: 'Action Time', value: moment(activityDetail?.datetime).format('hh:mm:ss A') });

    data.push({ label: 'Location', value: `${activityDetail?.city},${activityDetail?.country}` });
    data.push({ label: 'IP Address', value: activityDetail?.ip_address });
    data.push({ label: 'Module Name', value: activityDetail?.module_name });
    data.push({ label: 'Status', value: activityDetail?.response_code });

    return data;
  }, [activityDetail]);

  const { payload, oldPayload, showData, isDataUpdated } = useMemo(() => {
    let payloadData = '';
    let oldPayloadData = '';
    const dataUpdated =
      activityDetail?.request_method === 'PUT' || activityDetail?.request_method === 'PATCH';
    const show =
      activityDetail?.request_method === 'PUT' ||
      activityDetail?.request_method === 'PATCH' ||
      activityDetail?.request_method === 'POST' ||
      activityDetail?.request_method === 'DELETE';
    try {
      payloadData = activityDetail?.payload?.length > 0 ? JSON.parse(activityDetail?.payload) : '';
      oldPayloadData = activityDetail?.old_payload?.length > 0 ? JSON.parse(activityDetail?.old_payload) : '';
    } catch (error) {
      // console.log(first)
    }
    return {
      payload: payloadData,
      oldPayload: oldPayloadData,
      isDataUpdated: dataUpdated,
      showData: show,
    };
  }, [activityDetail]);

  const renderkeyValue = value => {
    if (typeof value === 'boolean') {
      if (value) {
        return 'Yes';
      }
      return 'No';
    }
    return value;
  };
  const getValidName = key => {
    const keyName = key;
    if (!keyName) return 'Invalid Key';
    if (validKeyName[keyName]) return validKeyName[keyName];

    return keyName?.replaceAll('_', ' ');
  };
  const renderValue = (previousPayload = '-', newPayload = '-', key = '') => (
    <TableRow key={uuid()}>
      <TableCell key={uuid()} sx={tableCellStyle}>
        <span className="text-capitalize font-weight-bold">{getValidName(key)}</span>
      </TableCell>
      <TableCell sx={tableCellStyle}>{renderkeyValue(previousPayload)}</TableCell>
      <TableCell sx={tableCellStyle}>{renderkeyValue(newPayload)}</TableCell>
    </TableRow>
  );
  const isValidValue = payloadInfo => {
    if (payloadInfo) {
      if (typeof payloadInfo === 'object' && payloadInfo?.length > 0) {
        return 'list';
      }
      if (typeof payloadInfo === 'object') {
        return 'object';
      }
    }
    return 'value';
  };

  const checkDataAllowdedToPrint = key => !inValidKeys.includes(key);
  const renderObject = payloadInfo =>
    Object.keys(payloadInfo).map(key => {
      if (!checkDataAllowdedToPrint(key)) return;
      const valueType = isValidValue(payloadInfo[key]);

      if (valueType === 'list') {
        return (
          <TableRow>
            <TableCell colSpan={2} key={uuid()} sx={tableCellStyle}>
              <span className="text-capitalize font-weight-bold">{getValidName(key)}</span>
            </TableCell>
            <TableCell key={uuid()} sx={tableCellStyle}>
              This is List
            </TableCell>
          </TableRow>
        );
        // return <Stack direction="row">{payloadInfo[key]?.map(pay => renderObject(pay, renderKey))}</Stack>;
      }
      if (valueType === 'object') {
        return (
          <TableRow>
            <TableCell colSpan={2} key={uuid()} sx={tableCellStyle}>
              <span className="text-capitalize font-weight-bold">{getValidName(key)}</span>
            </TableCell>
            <TableCell key={uuid()} sx={tableCellStyle}>
              This is Object
            </TableCell>
          </TableRow>
        );
        // return (
        //   <TableCell key={uuid()} sx={tableCellStyle}>
        //     <ul key={uuid()}>{renderObject(payloadInfo[key], renderKey)}</ul>
        //   </TableCell>
        // );
      }
      if (
        payloadInfo[key] !== '' &&
        payloadInfo[key] !== null &&
        payloadInfo[key] !== 'null' &&
        payloadInfo[key] !== undefined
      ) {
        return (
          <TableRow>
            <TableCell colSpan={2} key={uuid()} sx={tableCellStyle}>
              <span className="text-capitalize font-weight-bold">{getValidName(key)}</span>
            </TableCell>
            <TableCell key={uuid()} sx={tableCellStyle}>
              {renderkeyValue(payloadInfo[key])}
            </TableCell>
          </TableRow>
        );
      }
      return <div key={uuid()} />;
    });

  const renderRow = (previousPayload, newPayload) =>
    Object.keys(newPayload).map(key => {
      if (!checkDataAllowdedToPrint(key)) return;
      const valueType = isValidValue(newPayload[key]);

      if (valueType === 'list') {
        return renderValue('This is List', 'This is List', key);

        // return newPayload[key]?.map((_, index) => renderRow(previousPayload[index], newPayload[index]));
      }
      if (valueType === 'object') {
        return renderValue('This is Object', 'This is Object', key);
        // return renderRow(previousPayload[key], newPayload[key], null);
      }
      if (
        newPayload[key] !== '' &&
        newPayload[key] !== null &&
        newPayload[key] !== 'null' &&
        newPayload[key] !== undefined &&
        newPayload[key] !== previousPayload[key]
      ) {
        return renderValue(previousPayload[key], newPayload[key], key);
      }
      return '';
    });
  return (
    <SectionLoader options={[isLoading, activityDetail]}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" mb={1}>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>Activity Detail</Typography>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Stack>
      <Card>
        <CardContent>
          <DialogContent>
            <Box className="col-8 row">
              {activityDetailInfo.map(row => (
                <Box key={uuid()} className="row">
                  <Box className="col-8 col-md-3">
                    <h5 style={{ fontWeight: 600, fontSize: '14px' }}>{row.label}</h5>
                  </Box>
                  <Box className="col-4 col-md-9">
                    <p style={{ fontSize: '14px' }}>{row.value}</p>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box key={uuid()} className="row">
              <Box className="col-8 col-md-3 mt-2">
                <h5 style={{ fontWeight: 600, fontSize: '14px' }}>Data</h5>
              </Box>
            </Box>
            <Table>
              <TableBody>
                {showData && isDataUpdated && (
                  <>
                    <TableRow>
                      <TableCell sx={bankDetailPopupInfoTitleStyle}>Name</TableCell>
                      <TableCell sx={bankDetailPopupInfoTitleStyle}>Existing Data</TableCell>
                      <TableCell sx={bankDetailPopupInfoTitleStyle}>Updated Data</TableCell>
                    </TableRow>
                    {renderRow(oldPayload, payload)}
                  </>
                )}
                {showData && !isDataUpdated && (
                  <TableRow>
                    <TableCell style={bankDetailPopupInfoTitleStyle} colSpan={2}>
                      Name
                    </TableCell>
                    <TableCell style={bankDetailPopupInfoTitleStyle} colSpan={2}>
                      Value
                    </TableCell>
                  </TableRow>
                )}
                {showData && !isDataUpdated && renderObject(payload || oldPayload)}
              </TableBody>
            </Table>
          </DialogContent>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ActivityLogsDetail;
