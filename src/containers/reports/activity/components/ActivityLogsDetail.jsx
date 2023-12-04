/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import moment from 'moment';
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

function ActivityLogsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: activityDetail, isLoading } = useGetActivityLogsDetailQuery(id);

  const getDomain = endpointValue => {
    let domain = '';
    try {
      if (endpointValue?.includes('/api')) {
        [domain] = endpointValue.split('/api');
      }
    } catch (error) {
      domain = '';
    }
    return domain;
  };
  const getEndpoint = endpointValue => {
    let endpoint = endpointValue;
    try {
      if (endpoint?.includes('/api')) {
        [, endpoint] = endpoint.split('/api');
      }
      if (endpoint?.includes('?')) {
        [endpoint] = endpoint.split('?');
      }
      return `api${endpoint}`;
    } catch (error) {
      return '';
    }
  };

  const getqueryParams = endpointValue => {
    let queryParams = '';
    try {
      if (endpointValue?.includes('?')) {
        [, queryParams] = endpointValue.split('?');
      }
    } catch (error) {
      queryParams = '';
    }
    return queryParams;
  };

  const activityDetailInfo = useMemo(() => {
    const data = [];
    data.push({ label: 'User', value: activityDetail?.user });
    data.push({
      label: 'Action Date',
      value: moment(activityDetail?.datetime).format('DD-MMMM-YYYY'),
    });
    data.push({ label: 'Action Time', value: moment(activityDetail?.datetime).format('hh:mm:ss A') });
    data.push({
      label: 'Request Method',
      value: `${activityDetail?.request_method} with Status ${activityDetail?.response_code || 'N/A'}`,
    });
    data.push({ label: 'Location', value: `${activityDetail?.city},${activityDetail?.country}` });
    data.push({ label: 'IP Address', value: activityDetail?.ip_address });
    data.push({ label: 'Domain', value: getDomain(activityDetail?.request_url) });
    data.push({ label: 'Endpoints', value: getEndpoint(activityDetail?.request_url) });
    data.push({ label: 'Params', value: getqueryParams(activityDetail?.request_url) });

    return data;
  }, [activityDetail]);

  const payload = useMemo(() => {
    try {
      return activityDetail?.payload?.length > 0 ? JSON.parse(activityDetail?.payload) : null;
    } catch (error) {
      return '';
    }
  }, [activityDetail]);

  const renderValue = payloadInfo => payloadInfo;

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

  const renderObject = (payloadInfo, spaceCount) =>
    Object.keys(payloadInfo).map(key => {
      if (isValidValue(payloadInfo[key]) === 'list') {
        return payloadInfo[key]?.map((pay, index) => (
          <>
            <li>
              {key}[{index}]
            </li>
            <ul>{renderObject(pay, spaceCount + 1)}</ul>
          </>
        ));
      }
      if (isValidValue(payloadInfo[key]) === 'object') {
        return (
          <>
            <li>{key}</li>
            {renderObject(payloadInfo[key], spaceCount + 1)}
          </>
        );
      }
      return <li>{`${key} : ${renderValue(payloadInfo[key])}`}</li>;
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
                  <TableRow key={row.label}>
                    <TableCell sx={bankDetailPopupInfoTitleStyle}>{row.label}</TableCell>
                    <TableCell sx={{ ...bankDetailPopupInfoBodyStyle, fontWeight: 400 }}>
                      {row.value || 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
                {activityDetail?.payload && payload && (
                  <TableRow>
                    <TableCell sx={bankDetailPopupInfoTitleStyle}>Payload</TableCell>
                    <TableCell
                      sx={{
                        border: '1px solid silver',
                      }}
                    >
                      <ul>{renderObject(payload, 1)}</ul>
                    </TableCell>
                  </TableRow>
                )}
                {activityDetail?.payload && !payload && (
                  <TableRow>
                    <TableCell sx={bankDetailPopupInfoTitleStyle}>Payload</TableCell>
                    <TableCell
                      sx={{
                        border: '1px solid silver',
                      }}
                    >
                      <ul>{activityDetail.payload}</ul>
                    </TableCell>
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
