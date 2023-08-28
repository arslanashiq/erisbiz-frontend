/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import PropTypes from 'prop-types';
import MuiTable from 'shared/components/table/MuiTable';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router';
import { supplierContactHeadCells } from '../../utils/head-cells';

function SupplierContacts({ supplierContacts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClickEdit = contactId => {
    navigate(`/pages/accounting/purchase/suppliers/${id}/contact/edit/${contactId}`);
  };
  return (
    <MuiTable
      data={supplierContacts}
      totalDataCount={supplierContacts.length}
      TableHeading="Supplier"
      showCheckbox
      headCells={supplierContactHeadCells}
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
      hoverEffect={false}
    />
  );
}
SupplierContacts.propTypes = {
  supplierContacts: PropTypes.array,
};
SupplierContacts.defaultProps = {
  supplierContacts: [],
};

export default SupplierContacts;
