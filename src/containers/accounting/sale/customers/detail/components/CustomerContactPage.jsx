import React from 'react';
import PropTypes from 'prop-types';
// import EditIcon from '@mui/icons-material/Edit';
// import { IconButton, Tooltip } from '@mui/material';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities
import { customerContactHeadCells } from '../../utilities/head-cells';

function CustomerContactPage({ customerContact }) {
  return (
    <MuiTable
      data={customerContact}
      totalDataCount={customerContact.length}
      TableHeading="Supplier"
      showCheckbox
      headCells={customerContactHeadCells}
      //   customActionButton={[
      //     {
      //       title: 'Actions',
      //       //   handleClick: handleClickEdit,
      //       element: (
      //         <Tooltip title="Edit Contact" arrow placement="top">
      //           <IconButton>
      //             <EditIcon />
      //           </IconButton>
      //         </Tooltip>
      //       ),
      //     },
      //   ]}
      hoverEffect={false}
    />
  );
}
CustomerContactPage.propTypes = {
  customerContact: PropTypes.array,
};
CustomerContactPage.defaultProps = {
  customerContact: [],
};
export default CustomerContactPage;
