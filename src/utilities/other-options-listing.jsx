import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { addButtonIconStyle } from 'styles/common/common-styles';
import { useNavigate } from 'react-router';

function ListingOtherOptions({ addButtonLabel }) {
  const navigate = useNavigate();
  return [
    {
      label: (
        <>
          <AddIcon sx={addButtonIconStyle} />
          {addButtonLabel}
        </>
      ),
      handleClick: () => navigate('add'),
    },
  ];
}

export default ListingOtherOptions;
