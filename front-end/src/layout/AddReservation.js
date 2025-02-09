import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import FormComponent from "./FormComponent";

export default function AddReservation() {
  const initialData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [reservationsError, setReservationsError] = useState({});

  const history = useHistory();

  // converts the string of people to a number, then creates a reservation.

  async function submitHandler(event) {
    event.preventDefault();
    formData.people = parseInt(formData.people);
    const abortController = new AbortController();

    try {
      setReservationsError({});
      await createReservation(formData, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
      return () => abortController.abort();
    } catch (error) {
      setReservationsError(error);
    }
  }

  // changes the form data to match the name and value of the input field being used

  function changeHandler({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  //page formatting

  return (
    <>
      <div className="row container">
        <h1>Add Reservation</h1>
      </div>
      <FormComponent
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        formData={formData}
      />
      {reservationsError.message && <ErrorAlert error={reservationsError} />}
    </>
  );
}
