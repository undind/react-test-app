import React from 'react';
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalWindow = ({ modal, logOut, onеToggleModal }) => {

  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader>Подтвердите действие!</ModalHeader>
        <ModalBody>
          Вы дествительно хотите выйти из аккаунта?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={logOut}>Да</Button>{' '}
          <Button color="warning" onClick={onеToggleModal}>Отменить</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

ModalWindow.propTypes = {
  modal: PropTypes.bool,
  logOut: PropTypes.func,
  onеToggleModal: PropTypes.func
}

export default ModalWindow;