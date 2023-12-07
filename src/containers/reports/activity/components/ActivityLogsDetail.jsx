/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
import React, { useMemo } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router';
import {
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
  bankDetailPopupInfoBodyStyle,
  bankDetailPopupInfoTitleStyle,
} from 'styles/mui/container/accounting/banking/detail/components/bank-detail-popup';

// contant
const inValidKeys = [
  'uid',
  'id',
  // 'created_by',
  'created_at',
  'created_by_employee_name',
  'currency',
];
const tableCellStyle = {
  border: '1px solid silver',
};
function ActivityLogsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: activityDetail, isLoading } = useGetActivityLogsDetailQuery(id);

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

  const renderValue = (previousPayload = '-', newPayload = '-') => (
    <TableRow>
      <TableCell sx={tableCellStyle}>{previousPayload || '-'}</TableCell>
      <TableCell sx={tableCellStyle}>{newPayload || '-'}</TableCell>
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
        return payloadInfo[key]?.map(pay => renderObject(pay));
      }
      if (valueType === 'object') {
        return (
          <TableCell sx={tableCellStyle}>
            <ul>{renderObject(payloadInfo[key], null)}</ul>
          </TableCell>
        );
      }
      if (
        payloadInfo[key] !== '' &&
        payloadInfo[key] !== null &&
        payloadInfo[key] !== 'null' &&
        payloadInfo[key] !== undefined
      ) {
        return <TableCell sx={tableCellStyle}>{payloadInfo[key] || '-'}</TableCell>;
      }
      return '';
    });

  const renderRow = (previousPayload, newPayload) =>
    Object.keys(newPayload).map(key => {
      if (!checkDataAllowdedToPrint(key)) return;
      const valueType = isValidValue(newPayload[key]);

      if (valueType === 'list') {
        return newPayload[key]?.map((_, index) => renderRow(previousPayload[index], newPayload[index]));
      }
      if (valueType === 'object') {
        return renderRow(previousPayload[key], newPayload[key], null);
      }
      if (
        newPayload[key] !== '' &&
        newPayload[key] !== null &&
        newPayload[key] !== 'null' &&
        newPayload[key] !== undefined
      ) {
        return renderValue(previousPayload[key], newPayload[key], { tableCellStyle });
      }
      return '';
    });
  return (
    <SectionLoader options={[isLoading, activityDetail]}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" mb={1}>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>Activity Detail</Typography>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Stack>
      <Card className="background-color-white modal-dialog--custom-max-width">
        <CardContent>
          <DialogContent>
            <Table>
              <TableBody>
                {activityDetailInfo.map(row => (
                  <TableRow key={uuid()}>
                    <TableCell key={uuid()} sx={{ ...bankDetailPopupInfoTitleStyle }}>
                      {row.label || 'N/A'}
                    </TableCell>
                    <TableCell key={uuid()} sx={{ ...bankDetailPopupInfoBodyStyle, fontWeight: 400 }}>
                      {row.value || 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}

                {showData && isDataUpdated && (
                  <>
                    <TableRow>
                      <TableCell sx={bankDetailPopupInfoTitleStyle}>Existing Data</TableCell>
                      <TableCell sx={bankDetailPopupInfoTitleStyle}>Updated Data</TableCell>
                    </TableRow>
                    {renderRow(oldPayload, payload)}
                  </>
                )}
                {showData && !isDataUpdated && (
                  <TableRow>
                    <TableCell style={bankDetailPopupInfoTitleStyle} colSpan={2}>
                      Data
                    </TableCell>
                  </TableRow>
                )}
                {showData && !isDataUpdated && (
                  <TableRow>
                    {activityDetail?.payload && payload && (
                      <TableCell sx={{ padding: 0, margin: 0 }} colSpan={2}>
                        <Stack>
                          {renderObject(payload)}
                          {/* <ol>{renderObject(payload, 0)}</ol> */}
                        </Stack>
                      </TableCell>
                    )}
                    {activityDetail?.old_payload && oldPayload && (
                      <TableCell sx={{ padding: 0, margin: 0 }} colSpan={2}>
                        <Stack>
                          {renderObject(oldPayload)}
                          {/* <ol>{renderObject(payload, 0)}</ol> */}
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DialogContent>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ActivityLogsDetail;
