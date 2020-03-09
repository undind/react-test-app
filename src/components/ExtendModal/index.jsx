import React from 'react';
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalWindow = ({ modal, onеToggleModal, children, header, formId, btnText }) => {

  return (
    <div>
      <Modal isOpen={modal} toggle={onеToggleModal}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button color="success" type='submit' form={formId} >{btnText}</Button>{' '}
          <Button color="warning" onClick={onеToggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

ModalWindow.propTypes = {
  modal: PropTypes.bool,
  logOut: PropTypes.func,
  onеToggleModal: PropTypes.func,
  header: PropTypes.string,
  formId: PropTypes.string
}

ModalWindow.defaulProps = {
  btnText: 'Add',
  header: 'HEADER'
}

export default ModalWindow;