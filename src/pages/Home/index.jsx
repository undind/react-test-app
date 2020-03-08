import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import usersActions from "redux/actions/users";
import { connect } from "react-redux";

import { Container, Button, NavItem, Navbar } from 'reactstrap';
import Posts from 'containers/Posts';
import ModalWindow from 'components/Modal';

const Home = ({ users, setUserIsAuth }) => {
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
              <p className="font-weight-bold p-0 m-0 text-white">{users.userData.login}</p>
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
          >
            Are you sure?
          </ModalWindow>
        </Container>
      </div>

      <Posts />

    </section>
  )
};

export default connect((users) => users, usersActions)(Home);