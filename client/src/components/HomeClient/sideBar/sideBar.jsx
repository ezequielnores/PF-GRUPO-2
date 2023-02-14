import { Link } from "react-router-dom";
const sideBar = () => {
    return (
        <div>
            <button>
                <Link to="/HomeClient/Profile">Profile</Link>
            </button>
            <button>
                <Link to="/HomeClient/MyShifts">MyShifts</Link>
            </button>
            <button>
                <Link to="/HomeClient/Urgency">Urgency</Link>
            </button>
            <button>
                <Link to="/HomeClient/MedicalAppointments">Medical Appointment</Link>
            </button>
            <button>
                <Link to="/HomeClient/MedicalHistory">Medical History</Link>
            </button>
            <button>
                <Link to="/HomeClient/Chat">Chat</Link>
            </button>
            <button>
                <Link to="/HomeClient/Reviews">Reviews</Link>
            </button>

            
        </div>
    )
}
export default sideBar;