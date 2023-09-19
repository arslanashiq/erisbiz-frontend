import { useSnackbar } from 'notistack';

function useSubmitForm() {
  const { enqueueSnackbar } = useSnackbar();

  const handleSumbitData = async (payload, successMessage, navigatePath, handleData, setErrors) => {
    const response = await handleData(payload);
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    enqueueSnackbar(successMessage, { variant: 'success' });
  };

  return {
    handleSumbitData,
  };
}

export default useSubmitForm;
