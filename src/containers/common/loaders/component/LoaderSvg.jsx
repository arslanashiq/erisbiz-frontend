import React from 'react';
import { LineWave } from 'react-loader-spinner';
import palette from 'styles/mui/theme/palette';

function LoaderSvg() {
  return (
    <LineWave
      visible
      height="130"
      width="130"
      color={palette.primary.main}
      ariaLabel="line-wave-loading"
      wrapperStyle={{}}
    />
  );
}

export default LoaderSvg;
