import React from 'react';

import { Container, NavItem, Navbar, NavLink } from 'reactstrap';
import { Posts } from 'containers';

const Home = () => {
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
              <NavLink className="text-success d-inline ml-auto" href="/">Выйти</NavLink>
            </NavItem>
          </Navbar>
        </Container>
      </div>

      <Posts />
    </section>
  )
};

export default Home;