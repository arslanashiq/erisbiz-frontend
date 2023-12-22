/* eslint-disable implicit-arrow-linebreak */
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
import { getModuleName } from '../utilities/constants';

// constant Values
const inValidKeys = [
  'uid',
  'uuid',
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
  // 'opening_balance',
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
  'supplier_id',
  'Opening Balance Date',
  'Payment Terms',
  'Currency Id',
  'Currency Symbol',
  'Have Pur Orders',
  'Have Bills',
  'Have Debit Notes',
  'Have Expenses',
  'Supplier Type',
  'Payables',
  'Is Balance Used',
  'Pur Order Id',
  'Requestor Signature Show',
  'Show Stamp',
  'Convert To Aed',
  'Discount',
  'Amount Total',
  'Amount Total Aed',
  'Vat Total',
  'Pur Order Suffix',
  'Vat Total Aed',
  'Grand Total',
  'Grand Total Aed',
  'Sub Total',
  'Chart Of Account Id',
  'Tax Rate Id',
  'Tax Rate Perc',
  'Bcy Total',
  'Bcy Tax Rate Perc',
  'Bcy Total Without Tax',
  'Is Billable',
  'Is Personal',
  'Have Quotations',
  'Have Pro Invoices',
  'Have Invoices',
  'Have Credit Notes',
  'Quotation Prefix',
  'Quotation Num',
  'Aed Conversion Rate',
  'Operation Status',
  'Exchange Rate Of Quotation Currency',
  'Exchange Rate Of Proinvoice Currency',
  'Bcy Amount Total',
  'Bcy Vat Total',
  'Bcy Grand Total',
  'Credit Applied',
  'Credit Applied Invoice Currency',
  'Payment Amount Invoice Currency',
  'Bcy Amount Total Invoice Currency',
  'Bcy Vat Total Invoice Currency',
  'Bcy Grand Total Invoice Currency',
  'Invoice Prefix',
  'Exchange Rate Of Invoice Currency',
  'Aed Amount',
  'Other Amount',
  'Last Payment Number',
  'Bcy Bank Charges',
  'Bcy Unused Amount',
  'Chart Of Account Name',
  'Over Payment',
  'Refund Payment',
  'Have Credit Note',
  'Is Payment Applied',
  'Over Paid',
  'Account Id',
  'Credit Note Records',
  'Invoice Num With Suffix',
  'Credits Remaining Creditnote Currency',
  'Refunded Amount Creditnote Currency',
  'Credits Used Creditnote Currency',
  'Bcy Amount Total Credit Currency',
  'Bcy Vat Total Credit Currency',
  'Bcy Grand Total Credit Currency',
  'Credit Note Prefix',
  'Exchange Rate Of Creditnote Currency',
  'Is Currency',
  'Is Issue',
  'Is Tax Inclusive',
  'Is Applied',
  'Is System Account',
  'Is User Created',
  'Is Watchlisted',
  'Last Journal Num',
  'Journal Notes',
  'Journal Formatted Number',
  'Is Deleted',
  'Supplier Date',
  'Bcy Discount',
  'Exchange Rate Of Purorder Currency',
  'Payment Amount Bill Currency',
  'Credit Applied Bill Currency',
  'Bcy Amount Total Bill Currency',
  'Bcy Vat Total Bill Currency',
  'optional_data',
  'Bcy Grand Total Bill Currency',
  'Customer Type Suffix',
  'bill_id',
  'Credits Remaining Debitnote Currency',
  'Refunded Amount Debitnote Currency',
  'Credits Used Debitnote Currency',
  'Bcy Amount Total Debit Currency',
  'Bcy Vat Total Debit Currency',
  'Bcy Grand Total Debit Currency',
  'Currency Code',
  'Exchange Rate Of Suppliercredit Currency',
  'G Recaptcha Response',
  'Pur Order',
  // skip data testing
];
const validKeyName = {
  set_credit_limit: 'Credit Limit',
  set_credit_terms: 'Credit Terms',
  is_import_agent: 'Important Agent',
  is_reverse_charge: 'Reverse Charge',
  account_no: 'GL Number',
  gl_number: 'GL Number',
  item_image: 'Image',
  mobile_num: 'Mobile #',
  reference_num: 'Reference #',
  supplier_invoice_num: 'Supplier Invoice #',
  invoice_num: 'Invoice #',
  without_change_amount_total: 'Gross Total',
  without_change_discount_total: 'Discount',
  without_change_vat_total: 'VAT Amount',
  without_change_grand_total: 'Total',
  bill_num: 'Bill #',
  total_without_tax: 'Net Amount',
  expense_account_id: 'Expense Account',
  paid_through_account_id: 'Paid Through',
  vat_reg_no: 'VAT Registration #',
  quotation_formatted_number: 'Quotation Number',
  pro_invoice_formatted_number: 'Proforma Invoice Formatted #',
  pro_invoice_date: 'Proforma Invoice Date',
  pro_invoice: 'Proforma Invoice',
  account: 'Customer',
  payment_num: 'Payment #',
  account_num: 'Debit Account #',
  credit_account_num: 'Credit Account #',
  is_parent: 'Contain Parent Account',
  parent_account: 'Parent Account',
  account_number: 'Account #',
  pur_order_num: 'Purchase Order #',
  pur_order_items: 'Purchase Order Items',
  pur_order_docs: 'Purchase Order Documents',
  pur_order_formatted_number: 'Purchase Order #',
  debit_account_number: 'Debit Account #',
  supplier_credit_num: 'Supplier Credit #',
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
    return {};
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
    return 'Unhandled Code';
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
    data.push({ label: 'Module Name', value: getModuleName(activityDetail?.module_name) });
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

    return <span className="text-capitalize">{keyName?.replaceAll('_', ' ')}</span>;
  }, []);
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

  const checkValueType = useCallback(payloadInfo => {
    if (payloadInfo) {
      if (typeof payloadInfo === 'object' && payloadInfo?.length >= 0) {
        return 'list';
      }
      if (typeof payloadInfo === 'object') {
        return 'object';
      }
    }
    return 'value';
  }, []);

  const checkDataNotAllowdedToPrint = useCallback(
    key =>
      inValidKeys.some(
        item => item === key || item?.toLowerCase() === key?.replaceAll('_', ' ')?.toLowerCase()
      ),
    []
  );

  const renderNestedData = (payloadOld, payloadNew, showOldData) => {
    if (!payloadNew) return '';

    return Object.keys(payloadNew)
      ?.sort()
      ?.map(key => {
        if (checkDataNotAllowdedToPrint(key)) return '';
        const valueType = checkValueType(payloadNew[key]);
        if (valueType === 'list') {
          return '';
        }
        if (valueType === 'object') {
          return '';
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
  const renderList = (payloadOld, payloadNew, key, showOldData) => {
    if (!payloadNew) return '';

    return payloadNew.map((_, index) => (
      <TableRow key={uuid()}>
        <TableCell colSpan={showOldData ? 1 : 2} key={uuid()} sx={tableCellStyle}>
          <span className=" font-weight-bold">
            {getValidName(key)}
            {`[${index}]`}
          </span>
        </TableCell>
        {showOldData && (
          <TableCell key={uuid()} sx={tableCellStyle}>
            {renderNestedData(payloadOld[index], payloadNew[index], false)}
          </TableCell>
        )}
        <TableCell key={uuid()} sx={tableCellStyle}>
          {renderNestedData(payloadOld[index], payloadNew[index], true)}
        </TableCell>
      </TableRow>
    ));
  };

  const handleRenderRowColumns = useCallback(
    (payloadOld, payloadNew) =>
      Object.keys(payloadNew)
        ?.sort()
        ?.map(key => {
          if (checkDataNotAllowdedToPrint(key)) return <> </>;
          const valueType = checkValueType(payloadNew[key]);

          if (valueType === 'list') {
            if (payloadOld) {
              if (JSON.stringify(payloadOld[key]) === JSON.stringify(payloadNew[key])) return '';
              return renderList(payloadOld[key], payloadNew[key], key, true);
            }
            return renderList(payloadNew[key], payloadNew[key], key, false);
          }
          if (valueType === 'object') {
            if (payloadOld) return renderThreeColumn('This is Object', 'This is Object', key);
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
