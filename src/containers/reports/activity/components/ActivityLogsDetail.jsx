/* eslint-disable consistent-return */

import React, { useCallback, useMemo } from 'react';
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

// constant Values
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
  'chart_of_account',
  'company',
  'category_num',
  'category_num',
  'category_order_formatted_number',
  'brand_order_formatted_number',
  'is_type_editable',
  'weighted_cost_price',
  'remaining_stock',
  'committed_stock',
  'forecast_stock',
  'Opening Balance Date',
  'Payment Terms',
];
const validKeyName = {
  set_credit_limit: 'Credit Limit',
  set_credit_terms: 'Credit Terms',
  is_import_agent: 'Important Agent',
  is_reverse_charge: 'Reverse Charge',
  account_no: 'GL Number',
  item_image: 'Image',
  mobile_num: 'Mobile Number',
  reference_num: 'Reference Number',
};
const imageKeyName = {
  item_image: true,
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

  const getResponseStatus = useCallback((code, method, module) => {
    if (module === 'Login') {
      if (code === '200') return 'Successfully Logged In';
      return 'Unsuccessful Logged In';
    }
    if (method === 'POST') {
      if (code === '201') return 'Added Successfully';
      return 'Not Added Successfully';
    }
    if (method === 'PATCH' || method === 'PUT') {
      if (code === '200') return 'Updated Successfully';
      return 'Not Updated Successfully';
    }
    if (method === 'DELETE') {
      if (code === '204') return 'Deleted Successfully';
      return 'Not Deleted Successfully';
    }
  }, []);

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
    data.push({
      label: 'Status',
      value: getResponseStatus(
        activityDetail?.response_code,
        activityDetail?.request_method,
        activityDetail?.module_name
      ),
    });

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

  const renderkeyValue = useCallback((value, key) => {
    if (typeof value === 'boolean') {
      if (value) {
        return 'Yes';
      }
      return 'No';
    }
    if (imageKeyName[key]) return <img style={{ height: 100, objectFit: 'contain' }} src={value} alt="key" />;

    return value;
  }, []);
  const getValidName = useCallback(key => {
    const keyName = key;
    if (!keyName) return 'Invalid Key';
    if (validKeyName[keyName]) return validKeyName[keyName];

    return keyName?.replaceAll('_', ' ');
  }, []);
  const renderThreeColumn = useCallback(
    (previousValue = '-', newValue = '-', key = '-') => (
      <TableRow key={uuid()}>
        <TableCell key={uuid()} sx={tableCellStyle}>
          <span className="text-capitalize font-weight-bold">{getValidName(key)}</span>
        </TableCell>
        <TableCell sx={tableCellStyle}>{renderkeyValue(previousValue, key)}</TableCell>
        <TableCell sx={tableCellStyle}>{renderkeyValue(newValue, key)}</TableCell>
      </TableRow>
    ),
    []
  );
  const renderTwoColumn = useCallback(
    (value = '-', key = '-') => (
      <TableRow key={uuid()}>
        <TableCell colSpan={2} key={uuid()} sx={tableCellStyle}>
          <span className="text-capitalize font-weight-bold">{getValidName(key)}</span>
        </TableCell>
        <TableCell key={uuid()} sx={tableCellStyle}>
          {renderkeyValue(value, key)}
        </TableCell>
      </TableRow>
    ),
    []
  );

  const checkValueType = useCallback(payloadInfo => {
    if (payloadInfo) {
      if (typeof payloadInfo === 'object' && payloadInfo?.length > 0) {
        return 'list';
      }
      if (typeof payloadInfo === 'object') {
        return 'object';
      }
    }
    return 'value';
  }, []);

  const checkDataNotAllowdedToPrint = useCallback(
    key => inValidKeys.some(
      item => item === key || item?.toLowerCase() === key?.replaceAll('_', ' ')?.toLowerCase()
    ),
    []
  );

  const handleRenderRowColumns = useCallback(
    (payloadOld, payloadNew) => Object.keys(payloadNew).map(key => {
      if (checkDataNotAllowdedToPrint(key)) return;
      const valueType = checkValueType(payloadNew[key]);

      if (valueType === 'list') {
        if (payloadOld) return renderThreeColumn('This is List', 'This is List', key);
        return renderTwoColumn('This is List', key);
      }
      if (valueType === 'object') {
        if (payloadOld) return renderTwoColumn('This is Object', 'This is Object', key);
        return renderTwoColumn('This is Object', key);
      }
      if (
        payloadNew[key] !== '' &&
          payloadNew[key] !== null &&
          payloadNew[key] !== 'null' &&
          payloadNew[key] !== undefined
      ) {
        if (payloadOld) {
          if (
            payloadNew[key] !== payloadOld[key] &&
              payloadNew[key]?.toString() !== payloadOld[key]?.toString()
          ) {
            return renderThreeColumn(payloadOld[key], payloadNew[key], key);
          }
          return '';
        }
        return renderTwoColumn(payloadNew[key], key);
      }
      return '';
    }),
    []
  );

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
                    {handleRenderRowColumns(oldPayload, payload)}
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
                {showData && !isDataUpdated && handleRenderRowColumns(null, payload || oldPayload)}
              </TableBody>
            </Table>
          </DialogContent>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ActivityLogsDetail;
