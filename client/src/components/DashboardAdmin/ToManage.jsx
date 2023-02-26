import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Search from "./Search";
import { patientGetAll } from "../../redux/reducers/patientReducer";
import { docrtorGetAll } from "../../redux/reducers/doctorReducer";
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
  getFrequentAskByAsk
} from "../../redux/reducers/frequentQuestionsReducer";

const ToManage = (props) => {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (props.toRenderPatients) dispatch(patientGetAll());
    if (props.toRenderDoctors) dispatch(docrtorGetAll());
    if (props.toRenderComments) dispatch(commentsGetAll());
  }, [dispatch, change]);

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
                    <button
                      onClick={() => {
                        dispatch(props.updateActive(p.id));
                        setChange(!change);
                      }}
                    >
                      Discharge
                    </button>
                  )}
                </div>
              );
            })}
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
          <h3>Doctors</h3>
          {props?.entities
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
                  {d?.id && (
                    <button
                      onClick={() => {
                        dispatch(props.updateActive(d.id));
                        setChange(!change);
                      }}
                    >
                      Discharge
                    </button>
                  )}
                </div>
              );
            })}
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
