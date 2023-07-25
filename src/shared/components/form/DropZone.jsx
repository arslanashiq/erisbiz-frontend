import React, { useEffect, useState } from 'react';

function DropZoneField() {
  const [state, setState] = useState({ defaultImage: '' });
  useEffect(() => {
    setState({ ...state, defaultImage: state.defaultImage });
  }, [state.defaultImage]);

  return <div>DropZoneField</div>;
}
DropZoneField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  customHeight: PropTypes.bool,
  defaultImage: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  ]).isRequired,
  form: PropTypes.object.isRequired,
};

DropZoneField.defaultProps = {
  customHeight: false,
  onChange: null,
  setFieldValue: null,
  defaultImage: '',
};

export default DropZoneField;
