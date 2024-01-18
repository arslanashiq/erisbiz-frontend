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
import formatAmount from 'utilities/formatAmount';
import { DATE_FORMAT } from 'utilities/constants';
import {
  formDataReplaceableKeys,
  formattedNumber,
  converToDecimal,
  getModuleName,
  imageKeyName,
  inValidKeys,
  invalidKeysModuleWise,
  invalidNestedKeys,
  invalidNestedKeysModuleWise,
  tableCellStyle,
  validKeyName,
  validObjectKeysNames,
  getResponseStatus,
} from '../utilities/constants';

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
    return {};
  }, [activityData]);

  const { data: activityDetailInfo, module: moduleName } = useMemo(() => {
    const data = [];
    const module = activityDetail?.module_name;
    data.push({ label: 'User Name', value: activityDetail?.user });
    data.push({
      label: 'Action Date',
      value: moment(activityDetail?.datetime).format(DATE_FORMAT),
    });
    data.push({ label: 'Action Time', value: moment(activityDetail?.datetime).format('hh:mm:ss A') });

    data.push({ label: 'Location', value: `${activityDetail?.city},${activityDetail?.country}` });
    data.push({ label: 'IP Address', value: activityDetail?.ip_address });
    data.push({ label: 'Module Name', value: getModuleName(activityDetail?.module_name) });
    data.push({
      label: 'Status',
      value: getResponseStatus(
        activityDetail?.response_code,
        activityDetail?.request_method,
        activityDetail?.module_name
      ),
    });

    return { data, module };
  }, [activityDetail]);

  const renderkeyValue = useCallback((value, key) => {
    if (typeof value === 'boolean') {
      if (value) {
        return 'Yes';
      }
      return 'No';
    }
    if (converToDecimal[moduleName] && converToDecimal[moduleName][key]) {
      return formatAmount(Number(value) || value);
    }
    if (converToDecimal[key]) {
      return formatAmount(Number(value) || value);
    }
    if (imageKeyName[key]) return <img style={{ height: 100, objectFit: 'contain' }} src={value} alt={key} />;
    if (key === 'password') {
      const last2Digits = value.slice(-2);
      return (
        <>
          {last2Digits.padStart(value.length, '*')}
          <bold className="font-weight-bold ps-2">Passowrd is hidden for security Reasons</bold>
        </>
      );
    }

    return value;
  }, []);
  const getValidName = useCallback(key => {
    const keyName = key;
    if (!keyName) return 'Invalid Key';

    if (validKeyName[keyName]) return validKeyName[keyName];

    return <span className="text-capitalize">{keyName?.replaceAll('_', ' ')}</span>;
  }, []);

  const checkValueType = useCallback(payloadInfo => {
    if (typeof payloadInfo === 'object' && payloadInfo?.length >= 0) {
      return 'list';
    }
    if (typeof payloadInfo === 'object') {
      return 'object';
    }

    return 'value';
  }, []);

  const checkDataNotAllowdedToPrint = useCallback(
    (key, data) => data.some(item => item === key || item?.toLowerCase() === key?.replaceAll('_', ' ')?.toLowerCase()),
    [moduleName]
  );

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

    if (payloadData) {
      try {
        formDataReplaceableKeys.forEach(formDataOption => {
          const purchaseOrderItems = [{}];

          Object.keys(payloadData).forEach(key => {
            if (key.includes(`${formDataOption}[`) && typeof payloadData[key] === 'string') {
              let slices = key;
              slices = slices.split('[')[1].split(']');

              if (slices.length > 0) {
                if (!purchaseOrderItems[slices[0]]) {
                  purchaseOrderItems.splice(slices[0], 0, {});
                }
                purchaseOrderItems[slices[0]][slices[1]] = payloadData[key];
                delete payloadData[key];
              }
              payloadData[formDataOption] = purchaseOrderItems;
            }
          });
        });
      } catch (error) {
        //
      }
    }
    return {
      payload: payloadData,
      oldPayload: oldPayloadData,
      isDataUpdated: dataUpdated,
      showData: show,
    };
  }, [activityDetail]);

  const renderThreeColumn = useCallback(
    (previousValue = '-', newValue = '-', key = '-') => (
      <TableRow key={uuid()}>
        <TableCell key={uuid()} sx={tableCellStyle}>
          <span className="font-weight-bold">{getValidName(key)}</span>
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
          <span className=" font-weight-bold">{getValidName(key)}</span>
        </TableCell>
        <TableCell key={uuid()} sx={tableCellStyle}>
          {renderkeyValue(value, key)}
        </TableCell>
      </TableRow>
    ),
    []
  );

  const handleObjectData = (payloadOld, payloadNew, key) => {
    try {
      if (validObjectKeysNames[key]) {
        if (payloadOld) {
          return renderThreeColumn(
            payloadOld[key][validObjectKeysNames[key]] || 'Error',
            payloadNew[key][validObjectKeysNames[key]] || 'Error',
            key
          );
        }
      }
      return renderTwoColumn(payloadNew[key][validObjectKeysNames[key]] || 'Error', key);
    } catch (error) {
      return '';
    }
  };
  const renderNestedData = (payloadOld = {}, payloadNew = {}, showOldData = true, listKeyName = '') => {
    if (!payloadNew) return '';

    return Object.keys(payloadNew)
      ?.sort()
      ?.map(key => {
        if (checkDataNotAllowdedToPrint(key, invalidNestedKeys)) return '';
        if (
          invalidNestedKeysModuleWise &&
          invalidNestedKeysModuleWise[moduleName] &&
          invalidNestedKeysModuleWise[moduleName][listKeyName]
        ) {
          if (checkDataNotAllowdedToPrint(key, invalidNestedKeysModuleWise[moduleName][listKeyName])) {
            return '';
          }
        }

        const valueType = checkValueType(payloadNew[key]);

        if (valueType === 'list') {
          return '';
        }
        if (valueType === 'object') {
          return handleObjectData(null, payloadNew, key);
        }
        if (
          payloadNew[key] !== '' &&
          payloadNew[key] !== null &&
          payloadNew[key] !== 'null' &&
          payloadNew[key] !== undefined
        ) {
          return renderTwoColumn(showOldData ? payloadOld[key] : payloadNew[key], key);
        }
        return '';
      });
  };
  const renderList = (payloadOld, payloadNew, key, showOldData, mappedObject) => {
    if (!mappedObject) return '';
    return mappedObject.map((_, index) => (
      <TableRow key={uuid()}>
        <TableCell colSpan={showOldData ? 1 : 2} key={uuid()} sx={tableCellStyle}>
          <span className=" font-weight-bold">
            {getValidName(key)}
            {`[${index}]`}
          </span>
        </TableCell>
        {showOldData && (
          <TableCell key={uuid()} sx={tableCellStyle}>
            {renderNestedData(payloadNew[index] || {}, payloadOld[index] || {}, false, key)}
          </TableCell>
        )}
        <TableCell key={uuid()} sx={tableCellStyle}>
          {renderNestedData(
            payloadNew[index],
            showOldData ? payloadNew[index] : payloadOld[index],
            true,
            key
          )}
        </TableCell>
      </TableRow>
    ));
  };

  const handleRenderRowColumns = useCallback(
    (payloadOld, payloadNew) => Object.keys(payloadNew)
      ?.sort()
      ?.map(key => {
        try {
          if (checkDataNotAllowdedToPrint(key, inValidKeys)) return '';
          if (invalidKeysModuleWise[moduleName]) {
            if (checkDataNotAllowdedToPrint(key, invalidKeysModuleWise[moduleName])) return '';
          }

          const valueType = checkValueType(payloadNew[key] || payloadOld[key]);
          if (valueType === 'list') {
            if (payloadOld) {
              if (JSON.stringify(payloadOld[key]) === JSON.stringify(payloadNew[key])) return '';

              if (payloadNew[key]?.length > payloadOld[key]?.length) {
                return renderList(payloadOld[key], payloadNew[key], key, true, payloadNew[key]);
              }

              return renderList(payloadOld[key], payloadNew[key], key, true, payloadOld[key]);
            }
            return renderList(payloadNew[key], payloadNew[key], key, false, payloadNew[key]);
          }
          if (valueType === 'object') {
            if (payloadOld) {
              if (JSON.stringify(payloadOld[key]) === JSON.stringify(payloadNew[key])) return '';
            }
            return handleObjectData(payloadOld, payloadNew, key);
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
        } catch (error) {
          return '';
        }
      }),
    [moduleName]
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
                    {formattedNumber[moduleName] && (
                      <TableRow>
                        <TableCell style={bankDetailPopupInfoTitleStyle}>Formated Number</TableCell>
                        <TableCell style={tableCellStyle}>
                          {oldPayload[formattedNumber[moduleName]]}
                        </TableCell>
                        <TableCell style={tableCellStyle}>{payload[formattedNumber[moduleName]]}</TableCell>
                      </TableRow>
                    )}
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
                {showData && !isDataUpdated && formattedNumber[moduleName] && (
                  <TableRow>
                    <TableCell style={bankDetailPopupInfoTitleStyle} colSpan={2}>
                      Formated Number
                    </TableCell>
                    <TableCell style={tableCellStyle}>
                      {payload[formattedNumber[moduleName]] || oldPayload[formattedNumber[moduleName]]}
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
