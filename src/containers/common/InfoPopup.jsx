import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ButtonToolbar, Button } from 'reactstrap';

function InfoPopup({ isOpen, toggle, message }) {
  const Icon = <span className="lnr lnr-flag modal__title-icon" />;
  const colored = false;
  const color = 'warning';

  return (
    <Modal color="warning" btn="Warning" isOpen={isOpen} toggle={toggle} className="modal-dialog--warning">
      <div className="modal__header">
        <button className="lnr lnr-cross modal__close-btn" type="button" onClick={toggle}>
          {' '}
        </button>
        {Icon}
        <h4 className="text-modal  modal__title">Attention!</h4>
      </div>
      <div className="modal__body">{message}</div>
      <ButtonToolbar className="modal__footer">
        <Button className="modal_ok" outline={colored} color={color} onClick={toggle}>
          Ok
        </Button>
      </ButtonToolbar>
    </Modal>
  );
}

InfoPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default InfoPopup;
