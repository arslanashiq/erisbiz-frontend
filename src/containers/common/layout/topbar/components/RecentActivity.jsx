import React, { useState } from 'react';
import { Box, CircularProgress, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import { useGetRecentActivityQuery } from 'services/private/user';
import 'styles/topbar/recent-activity.scss';

function RecentActivity() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const recentActivity = useGetRecentActivityQuery({}, { refetchOnMountOrArgChange: Boolean(anchorEl) });
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    if (recentActivity) {
      recentActivity.refetch();
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getActivityIcon = type => {
    switch (type) {
      case 'Invoice' || 'Invoice Payment' || 'Credit Note' || 'Payment Made':
        return <ArticleIcon className="recent-activity-menu-list-icon" />;
      case 'Account' || 'Customer' || 'Supplier':
        return <PersonIcon className="recent-activity-menu-list-icon" />;
      default:
        return <AssignmentIcon className="recent-activity-menu-list-icon" />;
    }
  };
  return (
    <div>
      <Tooltip title="Recent Activity" placement="bottom" arrow>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <SettingsBackupRestoreIcon className="clr-add" />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box className="recent-activity-menu">
          {recentActivity.status === 'fulfilled' ? (
            recentActivity?.data?.results.slice(0, 10).map(activity => (
              <MenuItem key={activity.id} className="recent-activity-menu-list">
                {getActivityIcon(activity.type)}
                <Stack>
                  <Typography className="recent-activity-menu-list-title text-capitalize">
                    {activity.title}
                  </Typography>
                  <Typography className="recent-activity-menu-list-activity-type">{activity.type}</Typography>
                </Stack>
              </MenuItem>
            ))
          ) : (
            <CircularProgress />
          )}
          {recentActivity?.data?.results?.length === 0 && (
            <MenuItem disabled className="recent-activity-menu-list">
              <Typography className="recent-activity-menu-list-title">No activity found</Typography>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </div>
  );
}

export default RecentActivity;
