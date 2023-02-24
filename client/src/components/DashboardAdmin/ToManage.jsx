import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";

const ToManage = (props) => {
  const dispatch = useDispatch();
  const doctor = useSelector(state => state.doctor.detail);
  // const [active, setActive] = useState(false);

  const handleSearchDoctor = () => {};

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
            <Search title={"Patient"} updateActive={props.updateActive}/>
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

            <label htmlFor="">Find doctor by mail</label>
            <input
              type="text"
              name="doctorMail"
              value={null}
              onChange={null}
            />
            <button onClick={handleSearchDoctor}>Find doctor</button>

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
