import React, { useState, useEffect } from 'react';

import { Container, NavItem, Navbar, NavLink } from 'reactstrap';

const Home = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    fetch("http://www.mocky.io/v2/5d9dc38e3200004e00329939")
      .then(res => res.json())
      .then(data => setPosts(data.data))
      .catch(e => console.log(e))
  }, [setPosts]);

  return (
    <section>
      <div className="bg-secondary">
        <Container>
          <Navbar>
            <NavItem className="text-white">
              Иван Иванов
            </NavItem>
            <NavItem>
              <NavLink className="text-success" href="/">Выйти</NavLink>
            </NavItem>
          </Navbar>
        </Container>
      </div>

      <div>
        <Container>
          <ul className="mt-2 p-0">
            {posts.map(item => (
              <li key={item.id}>
                <h2 className="text-center">{item.title}</h2>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
};

export default Home;