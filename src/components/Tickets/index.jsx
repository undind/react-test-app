import React, { Fragment } from "react";
import { Table, Input } from "reactstrap";
// import PropTypes from "prop-types";

import Pagination from "components/Pagination";
import { Container } from "reactstrap";

const TicketsUI = ({ pagination, tickets, onClickFunc }) => {
  return (
    <Fragment>
      <Container>
        <Pagination
          totalPages={pagination?.pages}
          numberPage={pagination?.current_page}
          pagesLimit={10}
        />
        <Table className="tickets-table">
          <thead>
            <tr>
              <th>
                <Input type="checkbox" />
              </th>
              <th>ID</th>
              <th>User</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.tickets?.map(item => {
              return (
                <tr key={item.id}>
                  <td>
                    <Input type="checkbox" />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.login}</td>
                  <td>{item.subject}</td>
                  <td>{item.status_name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

TicketsUI.defaultProps = {};

TicketsUI.propTypes = {};

export default TicketsUI;
