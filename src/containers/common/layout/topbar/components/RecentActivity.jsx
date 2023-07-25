import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import HistoryIcon from '@mui/icons-material/History';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
// import { getRecentActivity } from '../../../redux/actions/usersActions';
// import getLinkAddress from '../../../utils/getLinkAddress';
// import ToolTip from 'containers/common/ToolTip';
// import { useSelector } from 'react-redux';
import { useGetRecentActivityQuery } from 'services/private';
import { IconButton, Tooltip } from '@mui/material';

function RecentActivity() {
  // const dispatch = useDispatch();
  // const { recentActivity } = useSelector(state => state.users);

  useEffect(() => {
    // dispatch(getRecentActivity());
  }, []);

  const recentActivity = useGetRecentActivityQuery();
  const getActivityIcon = type => {
    switch (type) {
      case 'Invoice' || 'Invoice Payment' || 'Credit Note' || 'Payment Made':
        return <ArticleIcon sx={{ fontSize: 28 }} color="#808080" />;
      case 'Account' || 'Customer' || 'Supplier':
        return <PersonIcon sx={{ fontSize: 28 }} color="#808080" />;
      default:
        return <AssignmentIcon sx={{ fontSize: 28 }} color="#808080" />;
    }
  };

  return (
    <UncontrolledDropdown className="mr-0 recent-activity-dropdown " style={{ cursor: 'pointer' }}>
      {/* <ToolTip text="Recent Activity" position="bottom" className="mr-3 text-nowrap"> */}
      <DropdownToggle tag="div" className="nav-link p-0 m-0">
        <Tooltip title="Recent Activity" placement="bottom" arrow>
          <IconButton>
            <HistoryIcon sx={{ fontSize: 28 }} color="#BABBBC" />
          </IconButton>
        </Tooltip>
      </DropdownToggle>
      {/* </ToolTip> */}
      <DropdownMenu className="dropdown__menu recent-activity-menu">
        <div className="container px-0">
          {recentActivity.isLoading === false &&
            recentActivity?.data?.results.slice(0, 10).map(activity => (
              <div className="row m-0 px-0" key={activity.id}>
                <div className="col-12 m-0 p-0">
                  {/* <Link to="/"> */}
                  <DropdownItem className="d-flex align-items-center">
                    <div className="icon d-flex custom-w-15">{getActivityIcon(activity.type)}</div>
                    <div className="data custom-w-85 ps-2">
                      <div className="header">{activity.title}</div>
                      <div
                        className="description text-uppercase"
                        style={{ fontSize: 10, textTransform: 'uppercase' }}
                      >
                        {activity.type}
                      </div>
                    </div>
                  </DropdownItem>
                  {/* </Link> */}
                </div>
              </div>
            ))}
        </div>
        {recentActivity.length === 0 && (
          <DropdownItem className="d-flex justify-content-center">
            <span>No activity found</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default RecentActivity;
