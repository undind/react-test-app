import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import qs from "qs";

import ticketsAction from "redux/actions/tickets";

import TicketsUI from "components/Tickets";
import { useLocation } from "react-router-dom";

const Tickets = props => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    username: "",
    subject: "",
    message: ""
  });
  const [modalText, setTextForModal] = useState({
    header: "",
    btnText: ""
  });

  const toggleAdd = () => setModalAdd(!modalAdd);
  const toggleEdit = () => setModalEdit(!modalEdit);

  let location = useLocation();
  const pagination = props.tickets?.data?.pagination;

  const queryString = qs.parse(location.search.slice(1));

  useEffect(() => {
    props.getTicketsData(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getTicketsData, location.search]);

  const onChangeHandler = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const editTicket = (subject, id) => {
    setTextForModal({
      header: "Edit subject",
      btnText: "Edit"
    });
    toggleEdit();
  };

  const addTickets = () => {
    setTextForModal({
      header: "Add ticket",
      btnText: "Add ticket"
    });
    toggleAdd();
  };

  const submitForm = async e => {
    e.preventDefault();

    try {
      await props.addTicketData(values);
      toggleAdd();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <TicketsUI
      pagination={pagination}
      tickets={props.tickets?.data}
      addTickets={addTickets}
      toggleAdd={toggleAdd}
      editTicket={editTicket}
      toggleEdit={toggleEdit}
      modalAdd={modalAdd}
      modalEdit={modalEdit}
      submitForm={submitForm}
      modalText={modalText}
      onChangeHandler={onChangeHandler}
      values={values}
      error={error}
    />
  );
};

export default connect(({ tickets }) => tickets, ticketsAction)(Tickets);
