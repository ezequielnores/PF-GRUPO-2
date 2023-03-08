import homePhoto from "../../../assets/homePhoto.jpg";
import homePhoto2 from "../../../assets/homePhoto2.jpg";
import { Typography } from "@mui/material";

const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const test2 = {
  color: "black",
  font: "700 3em/1",
  fontFamily: "tahoma",
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const HomeView = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0",
      }}
    >
      <div>
        <Typography
          fontSize="3rem"
          color="#307196"
          fontWeight="bold"
          style={test}
        >
          i
          <Typography
            variant="button"
            fontSize="3rem"
            color="black"
            fontWeight="bold"
            style={test2}
          >
            Care
          </Typography>
        </Typography>
        <Typography variant="h6" marginBottom="1rem">
          Welcome to our online health services page
        </Typography>
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <img style={{ height: "11.5rem" }} src={homePhoto} alt="homePhoto" />
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "justify",
          }}
        >
          <Typography>
            Where we offer a variety of healthcare services to help you achieve
            optimal health and wellness from the comfort of your own home.
          </Typography>
          <Typography>
            Our team of experienced healthcare professionals is dedicated to
            providing high-quality care and personalized attention to each
            patient. We offer a range of services, including virtual
            consultations, online appointments, and telemedicine options that
            enable you to receive the care you need from the safety and
            convenience of your home.
          </Typography>
        </div>
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          textAlign: "justify",
          gap: "1rem",
        }}
      >
        <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
          <Typography>
            Our online platform is user-friendly and secure, ensuring that your
            personal information is protected at all times. Whether you need
            medical advice, a prescription refill, or ongoing care for a chronic
            condition, our team is here to support you every step of the way.
          </Typography>
          <Typography>
            We understand the importance of accessible, affordable healthcare,
            and strive to make our services as affordable and convenient as
            possible. Browse our website to learn more about our online health
            services and schedule your first appointment today. We look forward
            to helping you achieve your health and wellness goals!
          </Typography>
        </div>
        <img style={{ height: "11rem" }} src={homePhoto2} alt="homePhotos" />
      </div>
    </div>
  );
};
export default HomeView;
