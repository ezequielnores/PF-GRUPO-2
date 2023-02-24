import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientByMail } from "../../redux/reducers/patientReducer";

const Search = (props) => {
    const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.detail);
  const doctor = useSelector((state) => state.doctor.detail);
  const [input, setInput] = useState({
    patientMail: "",
    doctorMail: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearchPatient = () => {
    const mail = { mail: input.patientMail };
    dispatch(getPatientByMail(mail));
  };

  return (
    <div>
      <div>
        <label htmlFor="">Find {props.title} by mail</label>
        <input
          type="text"
          name="patientMail"
          value={input.patientMail}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchPatient}>Find {props.title}</button>
      </div>

      {patient && (
        <div>
          <p>{props?.title} founded by mail:</p>
          <img src={patient?.image} alt="patient image" />
          <p>Name: {patient?.name}</p>
          <p>Surname: {patient?.surname}</p>
          <p>Mail: {patient?.mail}</p>
          <p>State Active: {patient?.active ? "Alta" : "Baja"}</p>
          {patient?.active && (
            <button onClick={() => dispatch(props.updateActive(patient.id))}>
              Unsuscribe
            </button>
          )}
          {!patient?.active && (
            <button onClick={() => dispatch(props.updateActive(patient.id))}>
              Discharge
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;