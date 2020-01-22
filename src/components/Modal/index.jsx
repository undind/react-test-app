import React from 'react';
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

export default ModalWindow;