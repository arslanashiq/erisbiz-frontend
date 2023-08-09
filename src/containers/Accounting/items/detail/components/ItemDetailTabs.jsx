import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';
import ItemOverViewTab from './ItemOverViewTab';
import ItemTransactionsTab from './ItemTransactionsTab';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ItemDetailTabs({ itemDetail }) {
  const customItemDetail = [
    { label: 'Item Type', value: itemDetail.item_type },
    { label: 'Creation Data', value: moment(itemDetail.created_at).format(DATE_FORMAT) },
    {
      label: 'Item Status',
      value: itemDetail.is_active ? 'Activated' : 'Deactivated',
      className: itemDetail.is_active ? 'color-success' : 'color-danger',
    },
  ];
  const tabsList = [
    { label: 'overview', content: <ItemOverViewTab itemDetail={customItemDetail} /> },
    { label: 'transactions', content: <ItemTransactionsTab /> },
  ];
  const [value, setValue] = React.useState(1);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabsList.map((tab, index) => (
            <Tab label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabsList.map((tab, index) => (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {value === index && <Box sx={{ p: 3 }}>{tab.content}</Box>}
        </div>
      ))}
    </Box>
  );
}

ItemDetailTabs.propTypes = {
  itemDetail: PropTypes.object,
};
ItemDetailTabs.defaultProps = {
  itemDetail: {},
};
