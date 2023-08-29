/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PropTypes from 'prop-types';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button, Menu, Tooltip } from '@mui/material';

function AttachedFilesPopup({ toggleModal, docs, deleteDoc }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(false);

  const toggleDeleteModal = () => {
    setOpenDeleteModal(prevOpen => !prevOpen);
  };

  const handleDeleteModal = id => {
    setSelectedId(id);
    toggleDeleteModal();
  };

  // const handleDelete = () => {
  //   deleteDoc(selectedId);
  // };

  return (
    <>
      {/* <DeleteConfirmationPopup
        deleteItem={handleDelete}
        deleteToggle={toggleDeleteModal}
        isOpen={openDeleteModal}
      /> */}
      <div className="topbar__collapse">
        <Tooltip title="Attachments" placement="top" arrow>
          <Button onClick={handleClick}>
            <AttachFileIcon size={20} />
            <p style={{ display: 'inline' }}>{docs.length > 0 && docs.length}</p>
          </Button>
        </Tooltip>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose} className="topbar__collapse-content">
          <div className="topbar__collapse-title-wrap">
            <p className="topbar__collapse-title clr-add">Attached Files</p>
          </div>
          {docs.map(doc => (
            <div className="topbar__collapse-item pt-5 pb-5" key={doc.doc_name}>
              <div className="topbar__collapse-img-wrap--custom">
                <InsertDriveFileIcon size={40} />
              </div>
              <p className="topbar__collapse-message">
                <span className="topbar__collapse-name">{doc.doc_name}</span>
                <br />
                <span className="clr-add">File Size: {doc.doc_size_bytes} bytes</span>
                <br />
                <span className="topbar__collapse-name">
                  <a href={doc.doc_file} target="_blank" rel="noopener noreferrer" download>
                    Download
                  </a>{' '}
                  |{' '}
                  <button
                    type="button"
                    className="btn-link--custom"
                    onClick={() => handleDeleteModal(doc.id)}
                  >
                    Delete
                  </button>
                </span>
              </p>
            </div>
          ))}
          <button className="topbar__collapse-btn" type="button" onClick={toggleModal}>
            <UploadFileIcon size={30} />
            <div className="clr-blue mt-3">Upload File</div>
          </button>
        </Menu>
      </div>
    </>
  );
}

AttachedFilesPopup.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  deleteDoc: PropTypes.func.isRequired,
  docs: PropTypes.arrayOf(PropTypes.object),
};

AttachedFilesPopup.defaultProps = {
  docs: [],
};

export default AttachedFilesPopup;
