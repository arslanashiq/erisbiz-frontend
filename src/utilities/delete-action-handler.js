export const handleDeleteResponse = async (
  deleteItem,
  id,
  enqueueSnackbar,
  message = 'Invoice Deleted Successfully'
) => {
  const response = await deleteItem(id);
  if (response.error) {
    enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    return;
  }
  enqueueSnackbar(message, { variant: 'success' });
};

export const test = '';
