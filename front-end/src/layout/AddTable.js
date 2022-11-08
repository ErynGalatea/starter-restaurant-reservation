import React, { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import FormComponent from "./TableFormComponent";

export default function AddTable() {
  const initialData = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [tablesError, setTablesError] = useState({});

  const history = useHistory();

  // parses the string of capacity into a number and creates a new table, returning to dashboard

  async function submitHandler(event) {
    event.preventDefault();
    formData.capacity = parseInt(formData.capacity);
    const abortController = new AbortController();

    try {
      setTablesError({});
      await createTable(formData, abortController.signal);
      history.push(`/dashboard`);
      return () => abortController.abort();
    } catch (error) {
      setTablesError(error);
    }
  }

  //returns to previous page

  function cancelHandler() {
    history.goBack();
  }

  // changes the form data to match the name and value of the input field being used

  function changeHandler({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  // formats the page
  return (
    <>
      <div className="row container">
        <h1>Create Table</h1>
      </div>
      <FormComponent
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
        formData={formData}
      />
      {tablesError.message && <ErrorAlert error={tablesError} />}
    </>
  );
}
