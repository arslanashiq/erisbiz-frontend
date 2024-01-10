import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
// shared
import MuiTable from 'shared/components/table/MuiTable';
// utilities
import { customerContactHeadCells } from '../../utilities/head-cells';

function CustomerContactPage({ customerContact }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClickEdit = useCallback(contactId => {
    navigate(`/pages/accounting/sales/customers/${id}/contact/edit/${contactId}`);
  }, []);
  return (
    <MuiTable
      data={customerContact}
      totalDataCount={customerContact.length}
      TableHeading="Customer"
      showCheckbox
      headCells={customerContactHeadCells}
      hoverEffect={false}
      customActionButton={[
        {
          title: 'Actions',
          handleClick: handleClickEdit,
          element: (
            <Tooltip title="Edit Contact" arrow placement="top">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
          ),
        },
      ]}
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
