import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import usersActions from "redux/actions/users";
import { connect } from "react-redux";

import { Container, Button, NavItem, Navbar } from 'reactstrap';
import ModalWindow from 'components/Modal';
import TicketsContainer from 'containers/Tickets';

const Tickets = ({ users, setUserIsAuth }) => {
  const [ modal, setModal ]  = useState(false);
  let history = useHistory();

  const logOut = () => {
    toast.info("Вы покинули аккаунт!")
    window.localStorage.setItem('isAuth', 'false');
    delete window.localStorage.userId;

    setUserIsAuth(false);

    history.push('/signin');
  }

  const onеToggleModal = () => setModal(!modal);
  
  return (
    <section>
      <div className="bg-secondary">
        <Container>
          <Navbar className="pb-3 pt-3 pl-0 pr-0">
            <NavItem className="col-4">
              <Link to='/home' className="font-weight-bold p-0 m-0 text-white">{users.userData.login}</Link>
            </NavItem>
            <NavItem className="col-4 d-flex justify-content-center">
              <Link to='/tickets'>Tickets</Link>
            </NavItem>
            <NavItem className="col-4 d-flex">
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

      <TicketsContainer />

    </section>
  )
};

export default connect((users) => users, usersActions)(Tickets);