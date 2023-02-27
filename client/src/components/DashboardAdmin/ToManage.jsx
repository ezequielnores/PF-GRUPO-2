import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Search from "./Search";
import { patientGetAll } from "../../redux/reducers/patientReducer";
import { docrtorGetAll } from "../../redux/reducers/doctorReducer";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  commentsGetAll,
  deleteComment,
  commentsByDoctor,
  commentsByPatient,
} from "../../redux/reducers/commentsReducer";

import {
  createFrequentAsk,
  deleteFrequentAskById,
  updateFrequentAskById,
  getAllFrequentQuestions,
  getFrequentAskById,
  getFrequentAskByAsk,
} from "../../redux/reducers/frequentQuestionsReducer";
//style grid
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "20rem",
  height: "16.2rem",
}));
const gridContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  marginBottom: "1.5rem",
};
const photo = {
  width: "6rem",
  height: "5rem",
};
const ToManage = (props) => {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (props.toRenderPatients) dispatch(patientGetAll());
    if (props.toRenderDoctors) dispatch(docrtorGetAll());
  }, [dispatch, change]);

  return (
    <div>
      {props.toRenderPatients && (
        <div>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#307196"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Inactive Patients
          </Typography>
          <Grid container style={gridContainer} gap={4}>
            {props?.entities
              .filter((e) => e.active === false)
              .map((p) => {
                return (
                  <Grid style={{ position: "relative" }}>
                    <Item>
                      {/* <h4>Patient:</h4> */}
                      <img src={p?.photo} alt="no-img-patient" style={photo} />
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
                          Name: <Typography>{p?.name}</Typography>
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          Surname: <Typography>{p?.surname}</Typography>
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          Mail: <Typography>{p?.mail}</Typography>
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          State Active:
                          <Typography>{p?.active ? "Alta" : "Baja"}</Typography>
                        </Typography>
                      </div>
                      {p?.id && (
                        <Button
                          size="small"
                          style={{
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            right: "0",
                          }}
                          onClick={() => {
                            dispatch(props.updateActive(p.id));
                            setTimeout(setChange, 2000, !change);
                          }}
                        >
                          Discharge
                        </Button>
                      )}
                    </Item>
                  </Grid>
                );
              })}
          </Grid>
          <Search
            title={"Patient"}
            updateActive={props.updateActive}
            findPatient={props.toRenderPatients}
            change={change}
            setChange={setChange}
          />
        </div>
      )}

      {props.toRenderDoctors && (
        <div>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#307196"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Inactive Doctors
          </Typography>
          <Grid container style={gridContainer} gap={4}>
            {props?.entities
              .filter((e) => e.active === false)
              .map((d) => {
                return (
                  <Grid style={{ position: "relative" }}>
                    <Item>
                      <img src={d?.image} alt="no-img-doctor" style={photo} />
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
                          Name: <Typography>{d?.name}</Typography>
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          Last Name:<Typography> {d?.lastName}</Typography>
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          Speciality: <Typography>{d?.speciality}</Typography>
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          Mail: <Typography> {d?.mail}</Typography>
                        </Typography>
                      </div>
                      {d?.id && (
                        <Button
                          size="small"
                          style={{
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            right: "0",
                          }}
                          onClick={() => {
                            dispatch(props.updateActive(d.id));
                            setTimeout(setChange, 2000, !change);
                          }}
                        >
                          Discharge
                        </Button>
                      )}
                    </Item>
                  </Grid>
                );
              })}
          </Grid>
          <Search
            title={"Doctor"}
            updateActive={props.updateActive}
            findDoctor={props.toRenderDoctors}
            change={change}
            setChange={setChange}
          />
        </div>
      )}

      {props.toRenderComments && (
        <div>
          <h3>Comments</h3>

          <Search
            title={"Comment"}
            deleteComment={deleteComment}
            commentsByPatient={commentsByPatient}
            commentsByDoctor={commentsByDoctor}
            findComment={props.toRenderComments}
            change={change}
            setChange={setChange}
          />
        </div>
      )}

      {props.toRenderFrequentQuestions && (
        <div>
          <h3>Frequent Questions</h3>

          <Search
            title={"Frequent Questions"}
            findFrequentQuestions={props.toRenderFrequentQuestions}
            getAllFrequentQuestions={getAllFrequentQuestions}
            getFrequentAskByAsk={getFrequentAskByAsk}
            getFrequentAskById={getFrequentAskById}
            createFrequentAsk={createFrequentAsk}
            updateFrequentAskById={updateFrequentAskById}
            deleteFrequentAskById={deleteFrequentAskById}
          />
        </div>
      )}
    </div>
  );
};

export default ToManage;
