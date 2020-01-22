import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";

import { Container, Button, NavItem, Navbar } from 'reactstrap';
import { Posts } from 'containers';
import ModalWindow from 'components/Modal';

const Home = () => {
  const [ modal, setModal]  = useState(false);
  let history = useHistory();

  const logOut = () => {
    toast.info("Вы покинули аккаунт!")
    window.localStorage.setItem('isAuth', 'false');
    history.push('/signin');
  }

  const onеToggleModal = () => setModal(!modal);
  
  return (
    <section>
      <div className="bg-secondary">
        <Container>
          <Navbar className="p-3">
            <NavItem className="col-9">
              <p className="font-weight-bold p-0 m-0 text-white">Домашняя страница</p>
            </NavItem>
            <NavItem className="col-3 d-flex">
              <Button className="text-success d-inline ml-auto font-weight-bold" onClick={onеToggleModal}>Выйти</Button>
            </NavItem>
          </Navbar>
          <ModalWindow
            modal={modal}
            logOut={logOut}
            onеToggleModal={onеToggleModal}
          />
        </Container>
      </div>

      <Posts />

    </section>
  )
};

export default Home;