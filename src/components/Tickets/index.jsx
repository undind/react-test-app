import React, { Fragment } from "react";
import { Table, Input, Button, Container, Form, Label, FormGroup, Alert } from "reactstrap";
// import PropTypes from "prop-types";

import Pagination from "components/Pagination";
import ExtendModal from "components/ExtendModal";

const TicketsUI = ({
  pagination,
  tickets,
  addTickets,
  modalAdd,
  toggleAdd,
  modalEdit,
  editTicket,
  toggleEdit,
  submitForm,
  modalText,
  onChangeHandler,
  values,
  error
}) => {
  return (
    <Fragment>
      <ExtendModal
        formId="tickets-form"
        onеToggleModal={toggleEdit}
        modal={modalEdit}
        header={modalText.header}
        btnText={modalText.btnText}
      >
        <Form>
          <Label for="subject">Subject</Label>
          <Input type="text" name="subject" id="subject" />
        </Form>
      </ExtendModal>
      <ExtendModal
        formId="tickets-form"
        onеToggleModal={toggleAdd}
        modal={modalAdd}
        header={modalText.header}
        btnText={modalText.btnText}
      >
        <Form onSubmit={submitForm} id="tickets-form">
          {error && <Alert color="danger">Something WRONG!</Alert>}
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              required
              name="username"
              id="username"
              value={values.username}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input
              type="text"
              name="subject"
              required
              id="subject"
              value={values.subject}
              onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="textarea"
              required
              name="message"
              id="message"
              value={values.message}
              onChange={onChangeHandler}
            />
          </FormGroup>
        </Form>
      </ExtendModal>
      <Container>
        <Pagination
          totalPages={pagination?.pages}
          numberPage={pagination?.current_page}
          pagesLimit={10}
        />
        <Button outline color="secondary" className="mb-3" id="basic-button" onClick={addTickets}>
          Add ticket
        </Button>
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
                  <td>
                    <span>{item.subject}</span>
                    <Button
                      outline
                      color="secondary"
                      size="sm"
                      className="ml-2"
                      onClick={() => editTicket(item.subject, item.id)}
                    >
                      Edit
                    </Button>
                  </td>
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
