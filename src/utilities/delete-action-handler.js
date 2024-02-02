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
export const handleBulkDelete = (list, deleQuery, enqueueSnackbar, message = 'Deleted Successfully') => {
  const requests = [];
  list.forEach(id => {
    requests.push(deleQuery(id));
  });
  Promise.all([...requests])
    .then(() => {
      enqueueSnackbar(message, { variant: 'success' });
    })
    .catch(() => {
      enqueueSnackbar('Somthing Went Wrong', { variant: 'error' });
    });
};
