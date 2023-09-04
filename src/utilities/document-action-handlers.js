export const addDocument = async (id, file, addDoc, enqueueSnackbar) => {
  const formData = new FormData();
  formData.append('doc_file', file);
  formData.append('doc_type', file.type);
  formData.append('doc_name', file.name);
  formData.append('doc_size_bytes', file.size);
  const response = await addDoc({ id, payload: formData });
  if (response.data) {
    enqueueSnackbar('File Uploaded', { variant: 'success' });
  } else {
    enqueueSnackbar(response.error.message, { variant: 'error' });
  }
};

export const deleteDocument = async (id, deleteDoc, enqueueSnackbar) => {
  await deleteDoc({ id });
  enqueueSnackbar('File Deleted', { variant: 'success' });
};
