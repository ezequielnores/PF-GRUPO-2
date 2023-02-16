import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

//STYLE
const divPadre = {
  width: "100%",
  height: "100%",
  backgroundColor: "#f7f7f7",
};
const container = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "start",
  alignItems: "center",
};
const carde = {
  width: "60rem",
  height: "70rem",
  padding: "1rem",
  marginBottom: "3rem",
};
const miniNav = {
  marginTop: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};
const noteThree = () => {
  return (
    <div style={divPadre}>
      <div style={container}>
        <div style={miniNav}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Landing
            </Link>
            <Link underline="hover" color="inherit" href="/blog">
              Blog
            </Link>
            <Typography color="text.primary"> Health technology</Typography>
          </Breadcrumbs>
          <Link href="/blog">
            <Button>Back</Button>
          </Link>
        </div>

        <Card style={carde}>
          <div style={{ marginLeft: "5px", marginRight: "5px" }}>
            <Typography
              style={{
                color: "#307196",
                fontWeight: "bold",
                fontSize: "2.5rem",
                marginBottom: "0.5rem",
              }}
            >
              Health technology
            </Typography>
            <CardMedia
              sx={{ height: 400, marginBottom: "1rem" }}
              image="https://www.medidata.com/wp-content/uploads/2019/01/the-patient-experience-medidata-20160427.jpg"
              title="tech"
            />
            <Typography variant="h6">
              In recent years, technology has transformed many aspects of
              healthcare, including the way patients receive medical care. With
              the rise of virtual care, patients can receive medical care from
              the comfort of their home through electronic devices, such as
              smartphones, tablets or computers. Virtual care can take many
              forms, from video conferencing to online chats and text messaging.
              Patients can connect with physicians and healthcare providers
              online and receive medical care for a variety of health issues,
              from minor illness to follow-up care after surgery.
            </Typography>
            <Typography
              variant="h5"
              style={{
                color: "#307196",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                marginTop: "0.8rem",
              }}
            >
              Benefits for patients
            </Typography>
            <Typography style={{ fontSize: "17.5px" }}>
              <li>Convenience</li>
              <li>Accessibility</li>
              <li>Flexibility</li>
            </Typography>
            <Typography variant="h6">
              However, there are also challenges and concerns with virtual care.
              The quality of care may be affected by the lack of face-to-face
              interaction between the physician and patient, and there may be
              concerns about privacy and security of patient data.
            </Typography>
            <Typography variant="h6">
              Overall, virtual care is a growing trend in healthcare, and is
              expected to continue to grow as technology advances and patients
              seek more convenient and accessible options for receiving care. It
              is important that healthcare providers continue to explore virtual
              care and find ways to effectively integrate it into traditional
              healthcare to provide quality care to patients.
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default noteThree;
