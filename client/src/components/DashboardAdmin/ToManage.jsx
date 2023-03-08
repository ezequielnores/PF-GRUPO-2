import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
//import { deleteReportByCommentNull } from "../../redux/reducers/reportReducer";
import ManageFQ from "./ManageFQ";
// styled-components
import styledComponent from "styled-components";

const ButtonShowReport = styledComponent.button`
  background-color: #FFA500;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.primaryColorDark};
  }
`;

const CommentContainer = styledComponent.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  p {
    margin: 5px 0;
  }

  button {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #f44336;
    color: #fff;
    cursor: pointer;
  }

  button:hover {
    background-color: #d32f2f;
  }

  .report {
    margin-top: 10px;

    p {
      margin: 5px 0;
      font-weight: bold;
    }
  }
`;
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
  const [renderSearchComments, setRenderSearchComments] = useState(true);
  const allComments = useSelector((state) => state.comments.listAll);
  const [commentsReported, setCommentsReported] = useState([]);

  const filterCommentsReported = () => {
    setCommentsReported(allComments.filter((c) => c.reports.length));
    setRenderSearchComments(!renderSearchComments);
  };

  useEffect(() => {
    if (props.toRenderPatients) dispatch(patientGetAll());
    if (props.toRenderDoctors) dispatch(docrtorGetAll());
    if (props.toRenderComments) dispatch(commentsGetAll());
    // if (commentsReported.length) filterCommentsReported();
  }, [dispatch, change, renderSearchComments]);

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
                          <Typography>
                            {p?.active ? "Active" : "No activated"}
                          </Typography>
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
                          Activate
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
                          Activate
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
          <Search
            title={"Comment"}
            deleteComment={deleteComment}
            commentsByPatient={commentsByPatient}
            commentsByDoctor={commentsByDoctor}
            findComment={props.toRenderComments}
            change={change}
            setChange={setChange}
          />
          {/* {renderSearchComments && (
            <Search
              title={"Comment"}
              deleteComment={deleteComment}
              commentsByPatient={commentsByPatient}
              commentsByDoctor={commentsByDoctor}
              findComment={props.toRenderComments}
              change={change}
              setChange={setChange}
            />
          )}
          <ButtonShowReport onClick={filterCommentsReported}>
            {renderSearchComments
              ? "View comments reported"
              : "Hide comments reported"}
          </ButtonShowReport>

          {!renderSearchComments &&
            commentsReported?.length &&
            commentsReported?.map((c) => (
              <CommentContainer>
                <p>
                  <b>Title</b>: {c?.title}
                </p>
                <p>
                  <b>Message</b>: {c?.message}
                </p>
                <p>
                  <b>This comment have {c?.reports.length} reports.</b>
                </p>
                <button
                  onClick={async () => {
                    await dispatch(deleteComment(c?.id));
                    await dispatch(commentsGetAll());
                    await dispatch(deleteReportByCommentNull());
                    setTimeout(setChange, 3000, !change);
                  }}
                >
                  DELETE
                </button>
                {c?.reports.length < 6 &&
                  c?.reports.map((r) => (
                    <div>
                      <p>
                        <b>Reason report</b>: {r?.reasonReport}
                      </p>
                    </div>
                  ))}
              </CommentContainer>
            ))} */}
        </div>
      )}

      {props.toRenderFrequentQuestions && (
        <div>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#307196"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Frequent Questions
          </Typography>
          <ManageFQ />
        </div>
      )}
    </div>
  );
};

export default ToManage;
