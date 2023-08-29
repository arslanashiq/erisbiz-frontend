import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { IconButton, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import { TimelineOppositeContent } from '@mui/lab';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { useDeleteSupplierCommentMutation } from 'services/private/suppliers';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentsForm from './CommentsForm';
import 'styles/comments/comments.scss';

export default function SupplierComment({ comments }) {
  const [deleteComment] = useDeleteSupplierCommentMutation();

  return (
    <div style={{ maxWidth: 900 }}>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent />
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <CommentsForm />
          </TimelineContent>
        </TimelineItem>
        {comments &&
          comments.map(item => (
            <TimelineItem key={item.id}>
              <TimelineOppositeContent>
                <Typography color="textSecondary">{moment(item.created_at).format('DD MMM YYYY')}</Typography>
                <Typography color="textSecondary">{moment(item.created_at).format('hh:mm A')}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className="comment-box row align-items-center">
                  <div className="col-md-8">
                    <Typography>{item.comments}</Typography>
                  </div>
                  <div className="col-md-4 text-right">
                    <IconButton
                      className="customer__comment-item--delete-btn"
                      onClick={() => deleteComment(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
    </div>
  );
}
SupplierComment.propTypes = {
  comments: PropTypes.array,
};
SupplierComment.defaultProps = {
  comments: [],
};
