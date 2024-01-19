import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

function useErrorHandler(queryResponse) {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (queryResponse?.isError) {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    }
  }, [queryResponse]);
  return queryResponse;
}

export default useErrorHandler;
