export const handleDeleteResponse = async (deleteItem, id, enqueueSnackbar) => {
  const response = await deleteItem(id);
  if (response.error) {
    enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    return;
  }
  enqueueSnackbar('Invoice Deleted Successfully', { variant: 'success' });
};

export const test = '';
