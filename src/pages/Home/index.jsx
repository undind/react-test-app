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
          <Navbar className="p-3">
            <NavItem className="col-9">
              <p className="font-weight-bold p-0 m-0 text-white">Домашняя страница</p>
            </NavItem>
            <NavItem className="col-3 d-flex">
              <Link className="text-success d-inline ml-auto font-weight-bold" onClick={logOut} to='/signin'>Выйти</Link>
            </NavItem>
          </Navbar>
        </Container>
      </div>

      <Posts />

    </section>
  )
};

export default Home;