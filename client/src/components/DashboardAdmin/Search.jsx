import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientByMail } from "../../redux/reducers/patientReducer";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Comments from "./Comments";
import InputFinder from "./InputFinder";
import Divider from "@mui/material/Divider";
import stylede from "@emotion/styled";
import {
  doctorGetByMail,
  docrtorGetAll,
} from "../../redux/reducers/doctorReducer";
import {
  commentsByDoctor2,
  commentsByPatient2,
  commentsGetAll,
} from "../../redux/reducers/commentsReducer";
import { patientGetAll } from "../../redux/reducers/patientReducer";
import { fontWeight } from "@mui/system";
//styles
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "20rem",
  height: "18rem",
}));
const ScrollableContainer = stylede.div`
  max-height: 500px;
  overflow: auto;
  margin-top: 2rem;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #307196;
  }
`;
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
const containerComments = {
  display: "flex",
  flexDirection: "row",
  width: "115rem",
  justifyContent: "space-around",
  height: "38rem",
};
const cardComments = {
  width: "80rem",
};

const Search = (props) => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.detail);
  const doctor = useSelector((state) => state.doctor.detail);
  const [doctor2, setDoctor2] = useState({});
  const [patient2, setPatient2] = useState({});
  const doctors = useSelector((state) => state.doctor.list);
  const patients = useSelector((state) => state.patient.list);
  // const commentsByDoctor = useSelector((state) => state.comments.list);
  // const commentsByPatient = useSelector((state) => state.comments.listAll);
  const [commentsByPatient, setCommentsByPatient] = useState([]);
  const [commentsByDoctor, setCommentsByDoctor] = useState([]);
  const allComments = useSelector((state) => state.comments.listAll);
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
    setDoctor2(doctors.find((d) => d.mail === mail));
    // dispatch(commentsByDoctor2(mail));
    setCommentsByDoctor(allComments.filter((c) => c.doctor.mail === mail));
  };

  const handleSearchCommentsByPatientMail = () => {
    const mail = input.patientMail;
    setPatient2(patients.find((p) => p.mail === mail));
    // dispatch(commentsByPatient2(mail));
    setCommentsByPatient(allComments.filter((c) => c.Patient.mail === mail));
  };

  useEffect(() => {
    dispatch(commentsGetAll());
    dispatch(docrtorGetAll());
    dispatch(patientGetAll());
    if (input.doctorMail.length) {
      // setDoctor2(doctors.find((d) => d.mail === input.doctorMail));
      // dispatch(commentsByDoctor2(input.doctorMail));
      setCommentsByDoctor(allComments.filter((c) => c.doctor.mail === input.doctorMail));
    }
    if (input.patientMail.length) {
      setCommentsByPatient(allComments.filter((c) => c.Patient.mail === input.patientMail));
    }
    // dispatch(docrtorGetAll());
  }, [render]);

  return (
    <>
      {props.findPatient && (
        <div>
          <TextField
            size="small"
            label="Email for find"
            type="text"
            name="patientMail"
            value={input.patientMail}
            onChange={handleInputChange}
            style={{ width: "18rem", backgroundColor: "#fefefe" }}
          />
          <Button onClick={handleSearchPatient} style={{ marginLeft: "10px" }}>
            Find
          </Button>
        </div>
      )}
      {Object.keys(patient).length ? (
        <Grid container style={gridContainer} gap={4}>
          {patient && props.findPatient && (
            <Grid style={{ position: "relative" }}>
              <Item>
                <Typography variant="h6">
                  {props?.title} founded by mail:
                </Typography>
                {patient.photo && (
                  <img src={patient?.photo} alt="patient" style={photo} />
                )}
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
      ) : null}
      {props.findDoctor && (
        <div>
          {/* <label htmlFor="">Find {props.title} by mail</label> */}
          {/* <Typography>Find {props.title} by mail</Typography> */}
          <TextField
            width="15rem"
            label="Email for find"
            size="small"
            type="text"
            name="doctorMail"
            value={input.doctorMail}
            onChange={handleInputChange}
            style={{ width: "18rem", backgroundColor: "#fefefe" }}
          />
          <Button onClick={handleSearchDoctor} style={{ marginLeft: "10px" }}>
            find
          </Button>
        </div>
      )}
      {/* SI EXISTE ALGO EN ESTADO DETAIL DE :  */}
      {Object.keys(doctor).length ? (
        <Grid container style={gridContainer} gap={4}>
          {doctor && props.findDoctor && (
            <Grid style={{ position: "relative" }}>
              <Item>
                <Typography variant="h6">Doctor founded by mail:</Typography>
                <img src={doctor?.image} alt="doctor" style={photo} />

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
                {doctor?.active && (
                  <Button
                    onClick={async () => {
                      await dispatch(props.updateActive(doctor?.id));
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
                      await dispatch(props.updateActive(doctor?.id));
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
      ) : null}
      {props.findComment && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <div style={containerComments}>
            <div style={cardComments}>
              <Typography
                fontWeight="bold"
                variant="h4"
                color="#307196"
                style={{ marginBottom: "1rem" }}
              >
                Doctor
              </Typography>
              <InputFinder
                findBy="mail"
                inputTitle={props.title}
                inputType="text"
                inputName="doctorMail"
                inputValue={input.doctorMail}
                inputOnChange={handleInputChange}
                inputOnClick={handleSearchCommentsByDoctorMail}
              />
              <ScrollableContainer>
                {doctor2 && (
                  <Typography
                    variant="button"
                    style={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "3px",
                    }}
                  >
                    Doctor /
                    <Typography
                      color="#307196"
                      fontWeight="bold"
                      variant="button"
                    >
                      {doctor2?.name} {doctor2?.lastName}
                    </Typography>
                  </Typography>
                )}
                {commentsByDoctor?.length && doctor2.name && (
                  <Comments
                    comments={commentsByDoctor}
                    authorName={doctor2.name}
                    authorLastName={doctor2.lastName}
                    deleteComment={props.deleteComment}
                    setRenderSearch={setRender}
                    renderSearch={render}
                  />
                )}
              </ScrollableContainer>
            </div>
            <Divider
              orientation="vertical"
              style={{ padding: "5px", fontWeight: "bold" }}
            >
              COMMENTS
            </Divider>
            <div style={cardComments}>
              <Typography
                fontWeight="bold"
                variant="h4"
                color="#307196"
                style={{ marginBottom: "1rem" }}
              >
                Patient
              </Typography>
              <InputFinder
                findBy="mail"
                inputTitle={props.title}
                inputType="text"
                inputName="patientMail"
                inputValue={input.patientMail}
                inputOnChange={handleInputChange}
                inputOnClick={handleSearchCommentsByPatientMail}
              />
              <ScrollableContainer>
                {patient2 && (
                  <Typography
                    variant="button"
                    style={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "3px",
                    }}
                  >
                    Patient /
                    <Typography
                      color="#307196"
                      fontWeight="bold"
                      variant="button"
                    >
                      {patient2?.name} {patient2?.lastName}
                    </Typography>
                  </Typography>
                )}
                {commentsByPatient?.length && patient2?.name && (
                  <Comments
                    comments={commentsByPatient}
                    authorName={patient2?.name}
                    authorLastName={patient2?.lastName}
                    deleteComment={props.deleteComment}
                    setRenderSearch={setRender}
                    renderSearch={render}
                  />
                )}
              </ScrollableContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
