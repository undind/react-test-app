import React from 'react';
import { Link } from "react-router-dom";

import { Container, NavItem, Navbar } from 'reactstrap';
import { Posts } from 'containers';

const Home = () => {
  const logOut = () => {
    window.localStorage.setItem('isAuth', 'false');
  }

  return (
    <section>
      <div className="bg-secondary">
        <Container>
          <Navbar>
            <NavItem className="text-white col-3">
              Иван Иванов
            </NavItem>
            <NavItem className="col-6">
              <input type="text" placeholder="Поиск" className="form-control" />
            </NavItem>
            <NavItem className="col-3 d-flex">
              <Link className="text-success d-inline ml-auto" onClick={logOut} to='/signin'>Выйти</Link>
            </NavItem>
          </Navbar>
        </Container>
      </div>

      <Posts />
    </section>
  )
};

export default Home;