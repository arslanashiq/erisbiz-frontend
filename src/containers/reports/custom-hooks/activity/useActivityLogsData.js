/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import moment from 'moment';
import { activityLogsHeadCells } from 'containers/reports/utilities/head-cells';
import { getModuleName } from 'containers/reports/activity/utilities/constants';

function useActivityLogsData(activityLogsResponse) {
  // const getActionType = (method, module) => {
  //   if (module === 'Login') {
  //     return '';
  //   }
  //   if (method === 'POST') {
  //     return 'Added';
  //   }

  //   if (method === 'PUT' || method === 'PATCH') {
  //     return 'Updated';
  //   }

  //   if (method === 'DELETE') {
  //     return 'Deleted';
  //   }

  //   return 'Try';
  // };
  const { tableBody, modifiedTableBody } = useMemo(() => {
    const body = [];
    const modifiedBodyForPrint = [];
    activityLogsResponse?.data?.results.forEach(item => {
      body.push([
        {
          value: (
            <span>
              {moment(item.datetime).format('DD-MMM-YY')}
              <br />
              {moment(item.datetime).format('hh:mm A')}
            </span>
          ),
          style: {
            textAlign: 'start',
          },
        },

        {
          value: getModuleName(item.module_name) || 'Module',
          link: `${window.location.pathname}/${item.id}`,

          style: {
            textAlign: 'start',
          },
        },

        {
          // value: (
          //   <span>
          //     {item.module_name} {getActionType(item.request_method, item.module_name)} By
          //     <strong> {item.user_details.profile.employee_name}</strong>
          //   </span>
          // ),
          value: item.description,
          style: {
            textAlign: 'start',
          },
        },
        // {
        //   value: item?.user_details?.profile?.employee_name,
        //   style: {
        //     textAlign: 'start',
        //   },
        // },
      ]);
      modifiedBodyForPrint.push([
        {
          value: `${moment(item.datetime).format('DD-MMM-YY')} \n${moment(item.datetime).format('hh:mm A')}`,
          style: {
            textAlign: 'start',
          },
        },
        {
          value: item.module_name || 'Module',
          link: `/pages/reports/activity-logs/${item.id}`,

          style: {
            textAlign: 'start',
          },
        },

        {
          // value: `${item.module_name} ${getActionType(item.request_method, item.module_name)} By User ${
          //   item.user_details.profile.employee_name
          // }`,
          value: item.description,

          style: {
            textAlign: 'start',
          },
        },
      ]);
    });
    return {
      tableBody: body,
      modifiedTableBody: modifiedBodyForPrint,
    };
  }, [activityLogsResponse]);

  return {
    tableBody,
    tableFooter: [],
    modifiedTableBody,
    modifiedTableHead: activityLogsHeadCells,
  };
}

export default useActivityLogsData;
