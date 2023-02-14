import homePhoto from '../../../assets/homePhoto.jpg';
import homePhoto2 from '../../../assets/homePhoto2.jpg';
const HomeView = () => {
    return(
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",margin:"0"}}>
            <div style={{}}>

                <h1>iCare</h1>
                <h4>Welcome to our online health services page</h4>
            </div>
            <div style={{width:"90%",display:"flex",flexDirection:"row",gap:"1rem",justifyContent:"space-around"}}>

                <img style={{height:"11.5rem"}} src={homePhoto} alt="homePhoto"/>
                <div style={{textAlign:"justify",textJustify:"inter-word"}}>
                    <p>Where we offer a variety of healthcare services to help you achieve optimal health and wellness from the comfort of your own home.</p>
                    <p>Our team of experienced healthcare professionals is dedicated to providing high-quality care and personalized attention to each patient. We offer a range of services, including virtual consultations, online appointments, and telemedicine options that enable you to receive the care you need from the safety and convenience of your home.</p>
                </div>
            </div>
            <div style={{width:"90%",display:"flex",flexDirection:"row",gap:"1rem",justifyContent:"space-around"}}>

                <div style={{textAlign:"justify",textJustify:"inter-word"}}>
                    <p>Our online platform is user-friendly and secure, ensuring that your personal information is protected at all times. Whether you need medical advice, a prescription refill, or ongoing care for a chronic condition, our team is here to support you every step of the way.</p>
                    <p>We understand the importance of accessible, affordable healthcare, and strive to make our services as affordable and convenient as possible. Browse our website to learn more about our online health services and schedule your first appointment today. We look forward to helping you achieve your health and wellness goals!</p>
                </div>
                <img style={{height:"11rem"}} src={homePhoto2} alt="homePhoto2"/>
            </div>
        </div>
    )
}
export default HomeView;