import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import CommentIcon from '@mui/icons-material/Comment';
import { Box, CardContent, Grid } from '@mui/material';
import moment from 'moment';
// styles
import 'styles/timeline/timeline.scss';
import { getModuleName } from 'containers/reports/activity/utilities/constants';

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

  return <Box className={`timeline__icon ${type}`}>{Icon}</Box>;
}
TimeLineIcon.propTypes = {
  type: PropTypes.string,
};
TimeLineIcon.defaultProps = {
  type: '',
};
export default function SupplierOverviewTimeline({ supplierActivity }) {
  return (
    <Grid>
      <Box className="timeline mx-auto">
        {supplierActivity &&
          supplierActivity?.map(item => (
            <Box key={uuid()} className="timeline__item">
              <TimeLineIcon type="comments" />
              <CardContent className="timeline__content">
                <h5 className="timeline__title">{getModuleName(item?.module_name)}</h5>
                <h4 className="subhead timeline__date">
                  {moment(item.datetime).format('DD MMM YYYY hh:mm A')}
                </h4>
                <p className="timeline__description">{item.description}</p>
              </CardContent>
            </Box>
          ))}
      </Box>
    </Grid>
  );
}
SupplierOverviewTimeline.propTypes = {
  supplierActivity: PropTypes.array,
};
SupplierOverviewTimeline.defaultProps = {
  supplierActivity: [],
};
