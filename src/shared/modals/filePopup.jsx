import React, { forwardRef, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import InfoPopup from './InfoPopup';

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);
const uploadButtonStyle = {
  padding: 2,
  cursor: 'pointer',
  alignItems: 'center',
  backgroundColor: '#F0F0F0',
  margin: '5px 20px',
  borderRadius: 1,
  justifyContent: 'space-around',
};
function FilePopup({ open, handleClose, files, handleUploadFile, handleDeleteFile }) {
  const fileInputRef = useRef(null);
  const [openPopup, setOpenPopup] = useState({
    open: false,
    actionButton: true,
    message: 'Are you sure you want to delete file',
  });
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedFileIndex, setSelectedFileIndex] = useState({});
  const handleSelectFiles = e => {
    if (e.target.files.length > 0) {
      handleUploadFile(e.target.files[0]);
    }
  };
  const deleteFile = (file, index) => {
    setSelectedFile({ ...file });
    setSelectedFileIndex(index);
    setOpenPopup({ ...openPopup, open: true });
  };
  const handleCloseDeleteConfirmationPopup = () => {
    setOpenPopup({ ...openPopup, open: false });
  };
  const convertFileSize = bytes => {
    if (bytes > 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  return (
    <div>
      <InfoPopup
        open={openPopup.open}
        infoDescription={openPopup.message}
        showActionButton={openPopup.actionButton}
        handleClose={handleCloseDeleteConfirmationPopup}
        handleYes={() => handleDeleteFile(selectedFile, selectedFileIndex)}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ zIndex: 1202 }}
      >
        <Stack
          sx={{
            minWidth: 350,
            padding: 1,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="primary">Uploaded Files</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {files && files?.length === 0 && (
            <Stack>
              <Typography sx={{ textAlign: 'center', color: 'silver' }}>No Available Files</Typography>
            </Stack>
          )}
          {files &&
            files?.length > 0 &&
            files.map((file, index) => (
              <Stack
                key={file.name || file.doc_name}
                direction="row"
                spacing={2}
                sx={{ borderBottom: 1, padding: '10px 10px' }}
              >
                <InsertDriveFileIcon color="primary" sx={{ fontSize: 50 }} />
                <Stack sx={{ maxWidth: 300 }}>
                  <Typography
                    noWrap
                    color="primary"
                    sx={{ width: 200, fontSize: 14, textOverflow: 'ellipsis' }}
                  >
                    {file.doc_name || file.name}
                  </Typography>
                  <Stack direction="row" sx={{ fontSize: 11, color: 'grey' }}>
                    File Size:{convertFileSize(file.doc_size_bytes || file.size)}
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Download File" placement="top" arrow>
                      <IconButton size="small">
                        <DownloadIcon color="primary" size="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete File" placement="top" arrow>
                      <IconButton onClick={() => deleteFile(file, index)} size="small">
                        <DeleteIcon color="error" size="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          <Stack
            sx={uploadButtonStyle}
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            <UploadFileIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography color="primary">Upload File</Typography>
          </Stack>
          <input ref={fileInputRef} type="file" hidden onChange={handleSelectFiles} />
        </Stack>
      </Dialog>
    </div>
  );
}
FilePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  files: PropTypes.array,
  handleUploadFile: PropTypes.func,
  handleDeleteFile: PropTypes.func,
};
FilePopup.defaultProps = {
  files: [],
  handleUploadFile: () => {},
  handleDeleteFile: () => {},
};
export default FilePopup;
