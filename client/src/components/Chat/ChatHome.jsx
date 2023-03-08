import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import "./ChatHome.css";
import { useSearchParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../authentication/firebase";

const Home = (props) => {
  const [searchParams] = useSearchParams();
  const doctorUid = searchParams.get("d");
  const patientUid = searchParams.get("p");
  const [doctorData, setDoctorData] = useState(null);
  const [patientData, setPatientData] = useState(null);

  const fetchDataFromFirebase = async () => {
    const docQ = query(collection(db, "users"), where("uid", "==", doctorUid));
    const querySnapshotDoc = await getDocs(docQ);
    querySnapshotDoc.forEach((doc) => {
      setDoctorData(doc.data());
    });
    const patQ = query(collection(db, "users"), where("uid", "==", patientUid));
    const querySnapshotPat = await getDocs(patQ);
    querySnapshotPat.forEach((doc) => {
      setPatientData(doc.data());
    });
  };

  const createChat = async () => {
    if (doctorData && patientData) {
      const combinedId =
        doctorUid > patientUid
          ? doctorUid + patientUid
          : patientUid + doctorUid;

      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats

        await updateDoc(doc(db, "userChats", doctorData.uid), {
          [combinedId + ".userInfo"]: {
            uid: patientData.uid,
            displayName: patientData.displayName,
            photoURL: patientData.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", patientData.uid), {
          [combinedId + ".userInfo"]: {
            uid: doctorData.uid,
            displayName: doctorData.displayName,
            photoURL: doctorData.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    }
  };
  useEffect(() => {
    if (doctorUid && patientUid) {
      fetchDataFromFirebase();
    }

    return () => {};
  }, [doctorUid]);

  useEffect(() => {
    createChat();
  }, [doctorData, patientData]);

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
