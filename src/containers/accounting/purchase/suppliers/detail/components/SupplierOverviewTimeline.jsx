/* eslint-disable  */

import * as React from 'react';
import PropTypes from 'prop-types';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  TimelineOppositeContent,
} from '@mui/lab';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import CommentIcon from '@mui/icons-material/Comment';
import { CardContent, Grid, Stack, Typography } from '@mui/material';
// import 'styles/mui.scss';
import 'styles/timeline.scss';
import moment from 'moment';

function TimeLineIcon({ type }) {
  let Icon;

  switch (type) {
    case 'work':
      Icon = <CommentIcon />;
      break;
    case 'video':
      Icon = <CommentIcon />;
      break;
    case 'file':
      Icon = <CommentIcon />;
      break;
    case 'comments':
      Icon = <CommentIcon />;
      break;
    default:
      break;
  }

  return <div className={`timeline__icon ${type}`}>{Icon}</div>;
}
const activityLogs = [
  {
    id: 12308,
    activity_type: 'Expense',
    activity_title: 'Expense Added',
    module_num: '468',
    module_id: '468',
    module_name: 'Accruals and Other Current Liabilities',
    amount: null,
    description: 'Expense of amount AED120 created',
    created_at: '2023-08-15T15:33:51.332566+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12307,
    activity_type: 'Payment Made',
    activity_title: 'Payment Added',
    module_num: '6',
    module_id: '1447',
    module_name: null,
    amount: 30.2,
    description: 'Payment of amount CNH30.20 paid and applied for ',
    created_at: '2023-08-15T11:20:23.543861+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12306,
    activity_type: 'Payment Made',
    activity_title: 'Payment Updated',
    module_num: '4',
    module_id: '1445',
    module_name: null,
    amount: 20.3,
    description: 'Bill payment details modified',
    created_at: '2023-08-15T11:19:49.547549+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12303,
    activity_type: 'Payment Made',
    activity_title: 'Payment Added',
    module_num: '4',
    module_id: '1445',
    module_name: null,
    amount: 20,
    description: 'Payment of amount AED20.00 paid and applied for ',
    created_at: '2023-08-10T14:38:30.814974+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12300,
    activity_type: 'Expense',
    activity_title: 'Expense Added',
    module_num: '466',
    module_id: '466',
    module_name: 'Administrative Expenses',
    amount: null,
    description: 'Expense of amount AED100 created',
    created_at: '2023-08-10T11:49:12.932256+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12296,
    activity_type: 'Payment Made',
    activity_title: 'Payment Added',
    module_num: '2',
    module_id: '1443',
    module_name: null,
    amount: 30,
    description: 'Payment of amount AED30.00 paid and applied for 1014, Supplier Opening Balance, ',
    created_at: '2023-08-09T14:23:53.573077+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12295,
    activity_type: 'Payment Made',
    activity_title: 'Payment Deleted',
    module_num: '1442',
    module_id: null,
    module_name: null,
    amount: 30,
    description: 'Bill payment of amount AED30.00 deleted',
    created_at: '2023-08-09T14:10:51.089093+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12294,
    activity_type: 'Payment Made',
    activity_title: 'Payment Added',
    module_num: '2',
    module_id: '1442',
    module_name: null,
    amount: 30,
    description: 'Payment of amount AED30.00 paid and applied for 1014, Supplier Opening Balance, ',
    created_at: '2023-08-09T14:10:04.713506+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12293,
    activity_type: 'Payment Made',
    activity_title: 'Payment Deleted',
    module_num: '1441',
    module_id: null,
    module_name: null,
    amount: 50,
    description: 'Bill payment of amount AED50.00 deleted',
    created_at: '2023-08-09T14:09:24.233307+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12292,
    activity_type: 'Payment Made',
    activity_title: 'Payment Added',
    module_num: '2',
    module_id: '1441',
    module_name: null,
    amount: 50,
    description: 'Payment of amount AED50.00 paid and applied for 1014, Supplier Opening Balance, ',
    created_at: '2023-08-09T12:48:40.449204+04:00',
    created_by: 'Accounting',
    supplier: 1489,
  },
  {
    id: 12288,
    activity_type: 'Bill',
    activity_title: 'Bill Added',
    module_num: '1014',
    module_id: '2489',
    module_name: null,
    amount: 10,
    description: 'Bill 1014 of amount AED10.00 created',
    created_at: '2023-08-03T10:59:32.880868+04:00',
    created_by: 'payable Employee',
    supplier: 1489,
  },
  {
    id: 12287,
    activity_type: 'Purchase Order',
    activity_title: 'Purchase Order Added',
    module_num: '1014',
    module_id: '1067',
    module_name: null,
    amount: 10,
    description: 'Purchase Order LPO-1014  of amount AED10.00 created',
    created_at: '2023-07-26T18:59:44.369988+04:00',
    created_by: 'Operation Controller',
    supplier: 1489,
  },
  {
    id: 12286,
    activity_type: 'Purchase Order',
    activity_title: 'Purchase Order Added',
    module_num: '1013',
    module_id: '1066',
    module_name: null,
    amount: 10,
    description: 'Purchase Order LPO-1013  of amount AED10.00 created',
    created_at: '2023-07-26T18:55:00.408973+04:00',
    created_by: 'Operation Controller',
    supplier: 1489,
  },
];
export default function SupplierOverviewTimeline({ supplierActivity }) {
  return (
    <Grid>
      <div className="timeline mx-auto">
        {supplierActivity &&
          supplierActivity.map(item => (
            <div className="timeline__item">
              <TimeLineIcon type="comments" />

              <CardContent className="timeline__content">
                <h5 className="timeline__title">{item.activity_title}</h5>
                <h4 className="subhead timeline__date">{`${moment(item.created_at).format(
                  'DD MMM YYYY'
                )}, ${moment(item.created_at).format('hh:mm A')}`}</h4>
                <p className="timeline__description">{item.description}</p>
              </CardContent>
            </div>
          ))}
      </div>
    </Grid>
  );
}
SupplierOverviewTimeline.propTypes = {
  supplierActivity: PropTypes.array,
};
SupplierOverviewTimeline.defaultProps = {
  supplierActivity: [],
};
