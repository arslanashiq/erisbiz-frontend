import React, { useState } from 'react';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import { useGetRecentActivityQuery } from 'services/private/user';
import {
  recentActivityMenuList,
  recentActivityMenuListActivityType,
  recentActivityMenuListIcon,
  recentActivityMenuListTitle,
} from 'styles/mui/common/layouts/topbar/components/recent-activity';
import Loader from 'shared/components/loader/Loader';
import { useNavigate } from 'react-router';

function RecentActivity() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const recentActivity = useGetRecentActivityQuery({}, { refetchOnMountOrArgChange: Boolean(anchorEl) });
  const handleClick = () => {
    navigate('/pages/reports/activity-logs?duration=this+month');
    // setAnchorEl(event.currentTarget);
    // if (recentActivity) {
    //   recentActivity.refetch();
    // }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getActivityIcon = type => {
    switch (type) {
      case 'Invoice' || 'Invoice Payment' || 'Credit Note' || 'Payment Made':
        return <ArticleIcon sx={recentActivityMenuListIcon} />;
      case 'Account' || 'Customer' || 'Supplier':
        return <PersonIcon sx={recentActivityMenuListIcon} />;
      default:
        return <AssignmentIcon sx={recentActivityMenuListIcon} />;
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
        <Box>
          {recentActivity.status === 'fulfilled' ? (
            recentActivity?.data?.results?.slice(0, 10).map(activity => (
              <MenuItem key={activity.id} sx={recentActivityMenuList}>
                {getActivityIcon(activity.type)}
                <Stack>
                  <Typography sx={recentActivityMenuListTitle} className="text-capitalize">
                    {activity.title}
                  </Typography>
                  <Typography sx={recentActivityMenuListActivityType}>{activity.type}</Typography>
                </Stack>
              </MenuItem>
            ))
          ) : (
            <Loader />
          )}
          {recentActivity?.data?.results?.length === 0 && (
            <MenuItem disabled sx={recentActivityMenuList}>
              <Typography sx={recentActivityMenuListTitle}>No activity found</Typography>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </div>
  );
}

export default RecentActivity;
