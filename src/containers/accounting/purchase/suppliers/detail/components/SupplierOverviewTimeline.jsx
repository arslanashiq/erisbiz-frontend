import React from 'react';
import PropTypes from 'prop-types';
import CommentIcon from '@mui/icons-material/Comment';
import { CardContent, Grid } from '@mui/material';
import moment from 'moment';
import 'styles/timeline/timeline.scss';

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
TimeLineIcon.propTypes = {
  type: PropTypes.string,
};
TimeLineIcon.defaultProps = {
  type: '',
};
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
                )}, ${moment(item.created_at).format('hh:mm A')}`}
                </h4>
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
