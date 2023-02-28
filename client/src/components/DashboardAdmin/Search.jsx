import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientByMail } from "../../redux/reducers/patientReducer";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Comments from "./Comments";
import InputFinder from "./InputFinder";
//style
import {
  doctorGetByMail,
  docrtorGetAll,
} from "../../redux/reducers/doctorReducer";
import { commentsByDoctor2 } from "../../redux/reducers/commentsReducer";
import ManageFQ from "./ManageFQ";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "20rem",
  height: "18rem",
}));
const gridContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  marginTop: "1.5rem",
};
const photo = {
  width: "5rem",
  height: "5rem",
};
const Search = (props) => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.detail);
  //const doctor = useSelector((state) => state.doctor.detail);
  const [doctor, setDoctor] = useState({});
  const doctors = useSelector((state) => state.doctor.list);
  const commentsByDoctor = useSelector((state) => state.comments.list);
  const commentsByPatient = useSelector((state) => state.comments.listAll);
  const frequentQuestions = useSelector(
    (state) => state.frequentQuestions.list
  );
  const frequentAsk = useSelector((state) => state.frequentQuestions.detail);
  // const allComments = useSelector((state) => state.comments.listAll);
  // const [commentsDoctor, setCommentsDoctor] = useState([]);
  // const [commentsPatient, setCommentsPatient] = useState([]);
  //agregue para el render on o false
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    patientMail: "",
    doctorMail: "",
  });
  const handleSearchDoctor = () => {
    const mail = { mail: input.doctorMail };
    dispatch(doctorGetByMail(mail));
  };
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
    // setRender(true);
  };

  const handleSearchCommentsByDoctorMail = () => {
    const mail = input.doctorMail;
    // dispatch(doctorGetByMail(mail));
    setDoctor(doctors.find((d) => d.mail === mail));
    dispatch(commentsByDoctor2(mail));
  };

  const handleSearchCommentsByPatientMail = () => {
    const mail = { mail: input.patientMail };
    dispatch(getPatientByMail(mail));
    dispatch(props.commentsByPatient(patient.id));
  };

  useEffect(() => {
    // dispatch(commentsGetAll());
    if (input.doctorMail) dispatch(commentsByDoctor2(input.doctorMail));
    dispatch(docrtorGetAll());
  }, [render]);

  return (
    <>
      {props.findPatient && (
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
      )}

      <Grid container style={gridContainer} gap={4}>
        {patient && props.findPatient && (
          <Grid style={{ position: "relative" }}>
            <Item>
              <Typography variant="h6">
                {props?.title} founded by mail:
              </Typography>
              <img src={patient?.photo} alt="patient" style={photo} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "start",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  Name:<Typography> {patient?.name}</Typography>
                </Typography>
                <Typography
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  Surname:<Typography>{patient?.surname}</Typography>
                </Typography>
                <Typography
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  Mail: <Typography>{patient?.mail}</Typography>
                </Typography>
                <Typography
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  State Active:{" "}
                  <Typography>{patient?.active ? "Alta" : "Baja"}</Typography>
                </Typography>
              </div>

              {patient?.active && (
                <Button
                  onClick={async () => {
                    await dispatch(props.updateActive(patient.id));
                    props.setChange(!props.change);
                  }}
                >
                  Unsuscribe
                </Button>
              )}
              {!patient?.active && (
                <Button
                  size="small"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                  }}
                  onClick={async () => {
                    await dispatch(props.updateActive(patient.id));
                    props.setChange(!props.change);
                  }}
                >
                  Discharge
                </Button>
              )}
            </Item>
          </Grid>
        )}
      </Grid>

      {props.findDoctor && (
        <div>
          <label htmlFor="">Find {props.title} by mail</label>
          <input
            type="text"
            name="doctorMail"
            value={input.doctorMail}
            onChange={handleInputChange}
          />
          <button onClick={handleSearchDoctor}>Find {props.title}</button>
        </div>
      )}

      <Grid container style={gridContainer} gap={4}>
        {doctor && props.findDoctor && (
          <Grid style={{ position: "relative" }}>
            <Item>
              <Typography variant="h6">Doctor founded by mail:</Typography>
              <img src={doctor.image} alt="doctor" style={photo} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "start",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  Name:<Typography> {doctor?.name}</Typography>
                </Typography>
                <Typography
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  Surname:<Typography>{doctor?.lastName}</Typography>
                </Typography>
                <Typography
                  fontWeight="bold"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  Mail: <Typography>{doctor?.mail}</Typography>
                </Typography>
              </div>
              {doctor.active && (
                <Button
                  onClick={async () => {
                    await dispatch(props.updateActive(doctor.id));
                    props.setChange(!props.change);
                  }}
                >
                  Unsuscribe
                </Button>
              )}
              {!doctor?.active && (
                <Button
                  size="small"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                  }}
                  onClick={async () => {
                    await dispatch(props.updateActive(doctor.id));
                    props.setChange(!props.change);
                  }}
                >
                  Discharge
                </Button>
              )}
            </Item>
          </Grid>
        )}
      </Grid>

      {props.findComment && (
        <div>
          <InputFinder
            findBy="mail"
            inputTitle={props.title}
            inputType="text"
            inputName="doctorMail"
            inputValue={input.doctorMail}
            inputOnChange={handleInputChange}
            inputOnClick={handleSearchCommentsByDoctorMail}
          />
          <div>
            {doctor && (
              <h5>
                Doctor comments {doctor?.name} {doctor?.lastName}:
              </h5>
            )}
            {commentsByDoctor?.length && (
              <Comments
                comments={commentsByDoctor}
                authorName={doctor.name}
                authorLastName={doctor.lastName}
                deleteComment={props.deleteComment}
                setChange={props.setChange}
                change={props.change}
                renderSearch={render}
                setRenderSearch={setRender}
              />
            )}
          </div>

          <InputFinder
            findBy="mail"
            inputTitle={props.title}
            inputType="text"
            inputName="patientMail"
            inputValue={input.patientMail}
            inputOnChange={handleInputChange}
            inputOnClick={handleSearchCommentsByPatientMail}
          />

          <div>
            {patient && (
              <h5>
                Patient comments {patient?.name} {patient?.lastName}:
              </h5>
            )}
            {commentsByPatient?.length && (
              <Comments
                comments={commentsByPatient}
                authorName={patient?.name}
                authorLastName={patient?.lastName}
                deleteComment={props.deleteComment}
              />
            )}
          </div>
        </div>
      )}

      {props.findFrequentQuestions && (
        <div>
          <ManageFQ
            frequentAsk={frequentAsk}
            frequentQuestionsByAsk={frequentQuestions}
            ask={input.ask}
            answer={input.answer}
          />
        </div>
      )}
    </>
  );
};

export default Search;
