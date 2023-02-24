import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ToManage = (props) => {
  const dispatch = useDispatch();
  const [patient, setPatient] = useState({});
  const [doctor, setDoctor] = useState({});
  // const [active, setActive] = useState(false);
  const [input, setInput] = useState({
    patientMail: "",
    doctorMail: "",
    comment: "",
    ask: "",
    answer: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    setInput({
      input,
      [event.name]: event.value,
    });
  };

  const handleSubmitPatient = (event) => {
    event.preventDefault();
    setPatient(props.entities.find((p) => p.mail === input.patientMail));
  };

  const handleSubmitDoctor = (event) => {
    event.preventDefault();
    setDoctor(props.entities.find((d) => d.mail === input.doctorMail));
  };

  // const handlerActiveTrue = (id) => {
  //   setActive(true);
  //   const objToUpdate = { id: id, active: active };
  //   console.log(objToUpdate);
  //   dispatch(props.update(objToUpdate));
  // };

  return (
    <div>
      {props.toRenderPatients && (
        <div>
          <h3>Patients</h3>
          {props?.entities
            .filter((e) => e.active === false)
            .map((p) => {
              return (
                <div>
                  <h4>Patient:</h4>
                  <img src={p?.image} alt="patient image" />
                  <p>Name: {p?.name}</p>
                  <p>Surname: {p?.surname}</p>
                  <p>Mail: {p?.mail}</p>
                  <p>State Active: {p?.active ? "Alta" : "Baja"}</p>
                  {p?.id && (
                    <button onClick={() => dispatch(props.updateActive(p.id))}>
                      Discharge
                    </button>
                  )}
                </div>
              );
            })}

          <form action="">
            <label htmlFor="">Find patient by mail</label>
            <input
              type="text"
              name="patientMail"
              value={input.patientMail}
              onChange={handleInputChange}
            />
            <button onSubmit={handleSubmitPatient}>Find patient</button>
          </form>

          {patient && (
            <div>
              <p>Patient founded by mail:</p>
              <img src={patient.image} alt="patient image" />
              <p>Name: {patient.name}</p>
              <p>Surname: {patient.surname}</p>
              <p>Mail: {patient.mail}</p>
              <p>State Active: {patient.active ? "Alta" : "Baja"}</p>
              {patient.active && (
                <button
                  onClick={() => dispatch(props.updateActive(patient.id))}
                >
                  Unsuscribe
                </button>
              )}
              {!patient.active && (
                <button
                  onClick={() => dispatch(props.updateActive(patient.id))}
                >
                  Discharge
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {props.toRenderDoctors && (
        <div>
          <h3>Doctors</h3>
          {props.entities
            .filter((e) => e.active === false)
            .map((d) => {
              return (
                <div>
                  <h4>Doctor</h4>
                  <img src={d?.image} alt="doctor image" />
                  <p>Name: {d?.name}</p>
                  <p>Last Name: {d?.lastName}</p>
                  <p>Speciality: {d?.speciality}</p>
                  <p>Mail: {d?.mail}</p>
                  <button
                    onClick={() =>
                      dispatch(props.updateActive({ id: d.id, active: true }))
                    }
                  >
                    Discharge
                  </button>
                </div>
              );
            })}

          <form action="">
            <label htmlFor="">Find doctor by mail</label>
            <input
              type="text"
              name="doctorMail"
              value={input.doctorMail}
              onChange={handleInputChange}
            />
            <button onSubmit={handleSubmitDoctor}>Find doctor</button>
          </form>

          {doctor && (
            <div>
              <p>Patiend founded by mail:</p>
              <img src={doctor.image} alt="doctor image" />
              <p>Name: {doctor.name}</p>
              <p>Surname: {doctor.lastName}</p>
              <p>Mail: {doctor.mail}</p>
              {doctor.active && (
                <button
                  onClick={() =>
                    dispatch(
                      props.updateActive({ id: doctor.id, active: false })
                    )
                  }
                >
                  Unsuscribe
                </button>
              )}
              {!doctor.active && (
                <button
                  onClick={() =>
                    dispatch(
                      props.updateActive({ id: doctor.id, active: true })
                    )
                  }
                >
                  Discharge
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToManage;
